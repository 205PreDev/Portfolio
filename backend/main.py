import os
import uuid
import shutil
from pathlib import Path
from typing import Optional
from datetime import datetime

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
import chromadb
from chromadb.utils import embedding_functions

# 환경변수 로드
load_dotenv()

# ===== 설정 =====
CHROMA_PATH = "./chroma_db"
UPLOAD_PATH = "./uploads"
PORTFOLIO_PATH = "./portfolio_data"
Path(UPLOAD_PATH).mkdir(exist_ok=True)
Path(PORTFOLIO_PATH).mkdir(exist_ok=True)

# FastAPI 앱
app = FastAPI(title="RAG Agent API")

# CORS 설정
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini 클라이언트
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = "gemini-2.5-flash"

# ChromaDB 클라이언트 (내장 임베딩 사용)
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
embedding_func = embedding_functions.DefaultEmbeddingFunction()
collection = chroma_client.get_or_create_collection(
    name="documents",
    embedding_function=embedding_func
)


# ===== 유틸리티 함수 =====
def split_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """텍스트를 청크로 분할"""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks


# ===== RAG 에이전트 =====
class RAGAgent:
    def __init__(self):
        self.sessions: dict = {}  # 세션별 대화 기록
        self.documents: list = []  # 업로드된 문서 목록

    def get_session(self, session_id: str) -> list:
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        return self.sessions[session_id]

    def add_document(self, content: str, filename: str) -> int:
        """문서를 Vector DB에 추가"""
        chunks = split_text(content)

        ids = []
        metadatas = []
        documents = []

        for i, chunk in enumerate(chunks):
            chunk_id = f"{filename}_{i}_{uuid.uuid4().hex[:8]}"
            ids.append(chunk_id)
            metadatas.append({"source": filename, "chunk": i})
            documents.append(chunk)

        # ChromaDB가 자동으로 임베딩 생성
        collection.add(
            ids=ids,
            metadatas=metadatas,
            documents=documents
        )

        self.documents.append({
            "id": str(uuid.uuid4()),
            "filename": filename,
            "chunks": len(chunks),
            "uploaded_at": datetime.now().isoformat()
        })

        return len(chunks)

    def search_similar(self, query: str, n_results: int = 3) -> list[dict]:
        """유사한 문서 검색"""
        if collection.count() == 0:
            return []

        # ChromaDB가 자동으로 쿼리 임베딩 생성
        results = collection.query(
            query_texts=[query],
            n_results=n_results
        )

        similar_docs = []
        for i in range(len(results['documents'][0])):
            similar_docs.append({
                "content": results['documents'][0][i],
                "source": results['metadatas'][0][i]['source']
            })

        return similar_docs

    def chat(self, question: str, session_id: str) -> dict:
        """RAG 채팅"""
        history = self.get_session(session_id)

        # 유사 문서 검색
        similar_docs = self.search_similar(question)

        # 컨텍스트 구성
        context = ""
        sources = []
        if similar_docs:
            context = "참고 문서:\n"
            for doc in similar_docs:
                context += f"- {doc['content']}\n"
                if doc['source'] not in sources:
                    sources.append(doc['source'])

        # 프롬프트 구성
        system_prompt = f"""당신은 포트폴리오 주인을 대신해서 방문자의 질문에 답변하는 AI 비서입니다.

## 역할
- 포트폴리오 주인의 프로젝트, 기술 스택, 경험에 대해 친절하게 안내합니다.
- 아래 참고 문서에 있는 정보를 바탕으로 답변하세요.
- 정보가 없는 질문에는 "해당 정보는 포트폴리오에 없습니다"라고 안내하세요.

## 답변 스타일
- 친근하고 전문적인 톤
- 간결하면서도 핵심을 담은 답변
- 한국어로 답변

{context}"""

        # 대화 기록 구성
        contents = []
        for msg in history[-10:]:  # 최근 10개 대화만
            contents.append({
                "role": msg["role"],
                "parts": [{"text": msg["text"]}]
            })

        contents.append({
            "role": "user",
            "parts": [{"text": question}]
        })

        # Gemini 호출
        response = gemini_client.models.generate_content(
            model=MODEL,
            contents=contents,
            config={"system_instruction": system_prompt}
        )

        answer = response.text

        # 대화 기록 저장
        history.append({"role": "user", "text": question})
        history.append({"role": "model", "text": answer})

        return {
            "answer": answer,
            "sources": sources
        }


# 에이전트 인스턴스
agent = RAGAgent()


def load_portfolio_data():
    """포트폴리오 데이터 자동 로드"""
    portfolio_file = Path(PORTFOLIO_PATH) / "portfolio.txt"

    if not portfolio_file.exists():
        print("⚠️ 포트폴리오 파일이 없습니다.")
        return

    # ChromaDB에서 이미 로드되었는지 확인
    existing = collection.get(where={"source": "portfolio.txt"})
    if existing and len(existing["ids"]) > 0:
        print(f"✅ 포트폴리오 데이터가 이미 로드되어 있습니다. ({len(existing['ids'])}개 청크)")
        return

    # 포트폴리오 문서 로드
    with open(portfolio_file, "r", encoding="utf-8") as f:
        content = f.read()

    chunks = agent.add_document(content, "portfolio.txt")
    print(f"✅ 포트폴리오 데이터 로드 완료 ({chunks}개 청크)")


# ===== API 모델 =====
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    sources: list[str]
    session_id: str


class DocumentResponse(BaseModel):
    id: str
    filename: str
    chunks: int
    uploaded_at: str


# ===== 서버 시작 시 포트폴리오 로드 =====
@app.on_event("startup")
def startup_event():
    load_portfolio_data()


# ===== API 엔드포인트 =====
@app.get("/")
def root():
    return {"status": "RAG Agent API Running", "portfolio_loaded": len(agent.documents) > 0}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    session_id = request.session_id or str(uuid.uuid4())
    result = agent.chat(request.message, session_id)

    return ChatResponse(
        response=result["answer"],
        sources=result["sources"],
        session_id=session_id
    )


@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    allowed_extensions = {'.txt', '.md', '.csv'}
    file_ext = Path(file.filename).suffix.lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"지원하지 않는 파일 형식입니다. ({', '.join(allowed_extensions)})"
        )

    file_path = Path(UPLOAD_PATH) / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    chunks = agent.add_document(content, file.filename)

    return {
        "status": "success",
        "filename": file.filename,
        "chunks": chunks,
        "message": f"문서가 {chunks}개 청크로 분할되어 저장되었습니다."
    }


@app.get("/documents", response_model=list[DocumentResponse])
def list_documents():
    return agent.documents


@app.delete("/session/{session_id}")
def clear_session(session_id: str):
    if session_id in agent.sessions:
        agent.sessions[session_id] = []
    return {"status": "cleared"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
