import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { FileDown, Loader2 } from 'lucide-react';
import PortfolioPDF from './PortfolioPDF';

const PDFDownloadCard = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<PortfolioPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '이영호_포트폴리오.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bento-card flex flex-col items-center justify-center text-center h-full">
      <FileDown className="w-10 h-10 text-primary mb-4" />
      <h3 className="text-lg font-bold mb-2">PDF 다운로드</h3>
      <p className="text-text-secondary text-sm mb-4">
        회사 제출용 포트폴리오를 PDF로 내보냅니다.
      </p>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            생성 중...
          </>
        ) : (
          <>
            <FileDown className="w-4 h-4" />
            PDF 다운로드
          </>
        )}
      </button>
    </div>
  );
};

export default PDFDownloadCard;
