'use client';
import { useEffect, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  from: 'user' | 'bot';
  text: string;
  ts: number;
};

export default function ScrollToTop() {
  // keep the circular path animation exactly as before
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // chatbot state
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'hello',
      from: 'bot',
      text: "Hi! 👋 How can I help you today?",
      ts: Date.now(),
    },
  ]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength.toString();
    path.getBoundingClientRect(); // force layout
    path.style.transition = 'stroke-dashoffset 10ms linear';

    const updatePath = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const dashoffset = pathLength - (scroll * pathLength) / (height || 1);
      path.style.strokeDashoffset = dashoffset.toString();
      setIsVisible(scroll > 50);
    };

    window.addEventListener('scroll', updatePath);
    updatePath();
    return () => window.removeEventListener('scroll', updatePath);
  }, []);

  // simple demo reply; replace with your real API later
  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      from: 'user',
      text: trimmed,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    // mock bot typing
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        from: 'bot',
        text:
          "Thanks! I’ve noted that. If you need help with bookings, dates, or pricing, just say 'search flights' or 'find hotel'.",
        ts: Date.now(),
      };
      setMessages((m) => [...m, botMsg]);
    }, 500);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Launcher — reuse original circle + visibility/animation classes */}
      <div
        className={`scroll-to-top chatbot ${isVisible ? 'scroll-top-active' : ''}`}
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Open chat"
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

        {/* Chat bubble glyph inside the circle (we disable the old ::after arrow via CSS) */}
        <div className=" chat-icon" aria-hidden>
          <svg width="30" height="30" viewBox="0 0 24 24">
            <path
              d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v8c0 1.38-1.12 2.5-2.5 2.5H10l-4 4v-4.5C4 14.88 4 5.5 4 5.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Chat window */}
      {open && (
        <div className="vv-chatbot" role="dialog" aria-label="Chatbot">
          <div className="vv-chatbot__card">
            <div className="vv-chatbot__hdr">
              <div className="vv-chatbot__brand">
                <span className="vv-dot" />
                Support
              </div>
              <div className="vv-chatbot__hdr-actions">
                <button
                  className="vv-icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="vv-chatbot__msgs" id="vvMessages">
              {messages.map((m) => (
                <div key={m.id} className={`vv-msg ${m.from}`}>
                  <div className="vv-bubble">
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="vv-chatbot__input">
              <input
                type="text"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Message input"
              />
              <button className="vv-send-btn" onClick={sendMessage} aria-label="Send">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
