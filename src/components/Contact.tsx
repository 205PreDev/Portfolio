import { Mail, Github, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const EMAIL = 'lyh2050609@gmail.com';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bento-card h-full">
      <h2 className="text-xl font-bold mb-4">연락처</h2>
      <p className="text-text-secondary text-sm mb-6">
        아래 채널을 통해 편하게 연락주세요.
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <a
            href={`mailto:${EMAIL}`}
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-border-subtle hover:border-primary/40 hover:bg-primary/10 transition-all text-sm"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span>이메일 보내기</span>
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-border-subtle hover:border-primary/40 hover:bg-primary/10 transition-all text-sm cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-primary" />}
            <span>{copied ? '복사됨' : '복사'}</span>
          </button>
        </div>
        <a
          href="https://github.com/205PreDev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-border-subtle hover:border-primary/40 hover:bg-primary/10 transition-all text-sm"
        >
          <Github className="w-5 h-5 text-primary" />
          <span>GitHub</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
