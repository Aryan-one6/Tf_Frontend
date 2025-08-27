

'use client';
import { useEffect, useRef, useState } from 'react';
import './chatbot.css';

type Sender = 'user' | 'bot';

type ChatMessage = {
  id: string;
  from: Sender;
  text: string;
  ts: number;
};

function uuid() {
  return (crypto as any).randomUUID?.() || Math.random().toString(36).slice(2);
}

export default function ScrollToTop() {
  const pathRef = useRef<SVGPathElement>(null);

  // chat refs
  const msgsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // launcher visibility + modal state
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // input & messages
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'hello', from: 'bot', text: 'Hi! 👋 How can I help you today?', ts: Date.now() },
  ]);

  // === Imported logic from ChatWidget.jsx ===
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // prefer window hostname detection for Next.js/Vite compatibility
  const API_BASE_URL =
    (typeof window !== 'undefined' && window.location.hostname === 'localhost')
      ? 'http://localhost:8080/chat'
      : 'https://triadflair-backend.vercel.app/chat';

  // restore sessionId (SSR-safe)
  useEffect(() => {
    try {
      const sid = localStorage.getItem('chatSessionId');
      if (sid) setSessionId(sid);
    } catch {
      /* ignore */
    }
  }, []);

  // progress ring + show earlier (existing)
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength.toString();
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 10ms linear';

    const updatePath = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const dashoffset = pathLength - (scroll * pathLength) / (height || 1);
      path.style.strokeDashoffset = dashoffset.toString();
      setIsVisible(scroll > 20);
    };
    window.addEventListener('scroll', updatePath);
    updatePath();
    return () => window.removeEventListener('scroll', updatePath);
  }, []);

  // lock background when open + esc to close (existing)
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = 'hidden';
    else root.style.overflow = '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // focus textarea on open (from ChatWidget)
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => textareaRef.current?.focus(), 150);
    return () => clearTimeout(id);
  }, [open]);

  // autoresize textarea (existing)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(160, ta.scrollHeight) + 'px';
  }, [input, open]);

  // scroll to bottom on new messages / loading/quickReplies change
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, loading, quickReplies]);

  // === send message (ChatWidget logic, adapted to your message shape/UI) ===
  const sendMessage = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;

    const userMsg: ChatMessage = { id: uuid(), from: 'user', text: value, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const payload: Record<string, unknown> = { query: value };
    if (sessionId) payload.sessionId = sessionId;

    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server ${res.status}: ${await res.text()}`);
      const data = await res.json();

      // update sessionId if backend returns a new one
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId as string);
        try {
          localStorage.setItem('chatSessionId', data.sessionId as string);
        } catch {}
      }

      const botReply: string = data.message || data.response || "I'm not sure how to respond.";
      const botMsg: ChatMessage = { id: uuid(), from: 'bot', text: botReply, ts: Date.now() };
      setMessages((prev) => [...prev, botMsg]);

      if (Array.isArray(data.quickReplies)) setQuickReplies(data.quickReplies as string[]);
      else setQuickReplies([]);
    } catch (err: any) {
      const botErr: ChatMessage = {
        id: uuid(),
        from: 'bot',
        text: `Error: ${err?.message ?? 'Something went wrong.'}`,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botErr]);
      setQuickReplies([]);
    } finally {
      setLoading(false);
    }
  };

  const onTextareaKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Enter' || (e as any).keyCode === 13) && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      {/* Launcher */}
      <div
        className={`scroll-to-top chatbot ${isVisible ? 'scroll-top-active' : ''} ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        role="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        style={{ cursor: 'pointer' }}
      >
        <svg className="scroll-top-inner" viewBox="-1 -1 102 102" aria-hidden>
          <path
            ref={pathRef}
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div className="chat-icon" aria-hidden>
          {open ? (
            <svg width="35" height="35" viewBox="0 0 30 30">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="35" height="35" viewBox="0 0 24 24">
              <path d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v8c0 1.38-1.12 2.5-2.5 2.5H10l-4 4v-4.5C4 14.88 4 5.5 4 5.5Z" fill="currentColor"/>
            </svg>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="vv-overlay" onClick={() => setOpen(false)} aria-hidden />}

      {/* Chat window */}
      {open && (
        <div id="vv-root">
          <div className="vv-chatbot" role="dialog" aria-modal="true" aria-label="Chatbot">
            <div className="vv-chatbot__card">
              <div className="vv-chatbot__hdr">
                <div className="vv-chatbot__brand">
                  <span className="vv-dot" />
                  Ask Flairo
                </div>
                <div className="vv-chatbot__hdr-actions">
                  <button className="vv-icon-btn" onClick={() => setOpen(false)} aria-label="Close chat" title="Close">✕</button>
                </div>
              </div>

              <div className="vv-chatbot__msgs" ref={msgsRef} aria-live="polite">
                {messages.map((m) => (
                  <div key={m.id} className={`vv-msg ${m.from}`}>
                    <div className="vv-bubble"><p>{m.text}</p></div>
                  </div>
                ))}

                {/* Typing indicator (kept minimal to preserve visuals) */}
                {loading && (
                  <div className="vv-msg bot">
                    <div className="vv-bubble vv-typing">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span className="typing-label">Typing…</span>
                    </div>
                  </div>
                )}

                {/* Quick replies (lightweight chips that match theme) */}
                {quickReplies.length > 0 && (
                  <div className="vv-quick-replies">
                    {quickReplies.map((opt, i) => (
                      <button
                        key={`${opt}-${i}`}
                        className="vv-chip"
                        onClick={() => { void sendMessage(opt); setQuickReplies([]); }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="vv-chatbot__input">
                <textarea
                  ref={textareaRef}
                  placeholder="Type a message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onTextareaKey}
                  rows={1}
                  aria-label="Message input"
                />
                <button
                  className="vv-send-btn"
                  onClick={() => void sendMessage()}
                  aria-label="Send"
                  disabled={loading || !input.trim()}
                  title="Send message"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
