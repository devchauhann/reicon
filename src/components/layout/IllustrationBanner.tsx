import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredConsent } from './cookie-consent/storage';

const BANNER_SEEN_KEY = 'reicon_illustration_banner_seen_v4';

// Aspen Illustration SVG
function AspenIllustration() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B5CF6]" viewBox="0 0 155 181" fill="currentColor" aria-hidden="true">
      <path d="M54.9 12.9c-1.2 2.8-2.6 5.1-3 5.1q-.8.1-.9 1.5c0 .8-.4 2.3-.9 3.3C47.5 28 47 29.9 47.3 34c.2 2.5 1.1 6 2 7.7 2.1 4 8.3 7.3 13.6 7.3 2.2 0 4.2.4 4.5.9.4.5.9 3.7 1.3 7.2.7 7.4-.5 7.6-5.2 1.1-1.6-2.2-3.6-4.1-4.2-4.1-2.4-.2-1.3 2.7 2.6 6.7 6.2 6.4 6.9 8 7.7 17.6.6 7.4.5 8.8-.7 8.4-.8-.2-2.3-1.9-3.4-3.7a84 84 0 0 0-5.2-7.1c-1.8-2-3.3-4.3-3.3-4.9q-.2-1-1.5-1.1c-2 0-1.9 1.9.2 4.2.9 1 2.1 2.7 2.7 3.7.6 1.1 2.7 4.4 4.7 7.3 4.9 7.1 5.9 11.4 5 22.3l-.6 9-1.7-3c-.9-1.7-4.4-6.6-7.8-11-8.2-10.6-8.2-10.6-7-16.1 1.6-6.8 1.9-12.4.9-12.4-1.3 0-2 2.1-2.8 8.3-.3 2.8-1 5.2-1.5 5.2-1.1 0-8.6-13.4-8.6-15.4 0-.7 1.1-2.2 2.5-3.3 5.3-4.1 7-11.9 4-17.8-2.1-4.1-6.2-8-8.4-8-1 0-2.4-.7-3.1-1.5a5 5 0 0 0-3.2-1.5c-1.1 0-3.3-1-5-2.1-2.5-1.8-3.2-1.9-3.9-.8-.5.8-.9 2.1-.9 3s-.9 2.6-2 3.9a9 9 0 0 0-2 4.7c0 1.2-.4 2.3-.9 2.3s-1.1 2.6-1.5 5.9c-.9 7.8 1.1 12.1 7 15.2 3.5 1.7 5.3 2 9.2 1.5l5-.6 2.6 5.1c1.5 2.8 2.5 5.4 2.1 5.7s-1.9.1-3.6-.5c-2.5-1-3.1-.9-3.6.4-.7 1.9 1.6 3.5 4.1 2.9 3-.7 6.8 1.8 10.4 6.7 1.7 2.5 3.2 4.7 3.2 4.9 0 .1-2.8.2-6.3.1-5.5-.1-6.7-.5-9.5-3.2A14.5 14.5 0 0 0 18.3 93c-2.4 1.3-4.3 2.8-4.3 3.5 0 .6-.9 2-1.9 2.9s-2.2 3.2-2.6 4.9c-.8 3.3-.8 23.8 0 24.5.2.3 2.2 0 4.4-.5q4-1 5 0 1 1.2 4.4-.5c2-1 3.9-1.3 4.7-.8 2.2 1.4 10.9-3.8 13.8-8.3 3.1-4.7 3.5-11.1.9-15-1.9-2.9-1.4-3.7 2.2-3.7 3 0 8.6 3.2 11.2 6.3A71 71 0 0 1 67 130.2c0 1.7-2.1.5-7.2-4-8.8-7.9-8.6-7.7-10.8-5.7q-4.3 3.7 1.3 3.5c1.8 0 3.8.5 4.5 1.2 1.9 1.9-4.1 5-8.3 4.2-4.5-.8-9 1.7-11.4 6.4-1.4 2.8-1.7 4.2-.9 5.5.5 1 .7 2.5.4 3.2s.1 2.7.9 4.2a13 13 0 0 1 1.5 4.1q.1 3.6 7.3-.3c2.7-1.4 5.4-2.5 6.1-2.5 2 0 5.5-4.3 6.2-7.8.7-3.2-1.1-9.2-2.7-9.2-2.1 0-.7-2.8 1.6-3.2q2.4-.7 4.8 2.1c5.7 6.1 7.6 14.6 6.2 27.7-.6 5.8-1.2 7.2-3.7 9.6-1.7 1.5-2.6 2.9-2.2 2.9 4 .6 21.4.2 21.4-.4 0-.4-1.1-1.8-2.6-3-2.2-2-2.6-3.2-3.1-11.2-.7-10.6 1-23 3.6-26.5 1-1.3 3.6-3.4 5.8-4.5 4-2 7-5.2 5.9-6.3-.3-.3-2.9.7-5.7 2.3l-5.2 2.8.7-2.9c.4-1.6 1.9-4.7 3.4-6.9 3.5-5 10.3-7.5 15.1-5.5 3.1 1.2 3.1 1.2 1.2 3.6-4 5.1-3 15.6 1.7 18 1.2.6 3 1.8 3.9 2.6q2.5 2.3 12.4 3.2c2 .2 4.6.9 5.8 1.6q2.1 1 2.7.8c.5-.5 3.4-14.6 3.2-15.6 0-.4.2-1.5.6-2.4s.3-2.5-.3-3.7a10 10 0 0 1-1.1-3.8c0-2-4-6.3-7.7-8.2a16 16 0 0 0-13.1.9c-3.1 1.9-3.6 1.9-7.6.6-3-1-5.4-1.2-8.2-.6-2.1.5-4 .7-4.2.5-.8-.7.9-4.1 3.3-6.8 2.1-2.2 3.5-2.7 7-2.7s4.5-.4 4.5-1.6c0-1.4-.7-1.5-4-1-2.3.3-4 .2-4-.3 0-1.7 8.9-9.9 11.8-10.9 2.7-.9 2.8-.9 2.9 2.9.3 7.2 6.6 12.8 15 13.3 2.1.2 4.7-.2 5.8-.8 1.1-.5 2.8-.9 3.8-.7 1 .1 2.6-.4 3.5-1.2 1-.8 3.2-1.8 5-2.2 3.6-.7 3.8-1.2 1.9-5.8-.8-1.8-1.2-3.7-1-4.3.6-1.8-5.6-13.4-7.2-13.4-.9 0-2.3-.9-3.2-2-4.1-4.7-16.7-1-20.4 5.9q-1.8 3.5-8 6.8a29 29 0 0 1-6.6 2.9c-.3-.2.5-2.4 1.6-4.9 2.3-5 2.6-7.3 1.1-8.2-1.4-.8-3.7 4.2-4.9 10.7-.9 5.1-2.4 8.3-7.9 16.8l-1.7 2.5L87 99c-.7-5.1-2.5-3.3-2.2 2.2.2 4-.5 6-4.8 14l-5.1 9.3.3-18c.4-17.4.5-18.2 3.3-24.3 2.9-6.5 5-8.2 10.1-8.2 1.3 0 2.4-.5 2.4-1s-1.3-1-3-1-3-.3-3-.8 1.7-2.6 3.8-5l3.7-4.3 3.9 1.6c6.8 2.9 11.5 2.4 16.9-1.4 2.6-1.9 4.7-4.2 4.7-5a7 7 0 0 1 1.5-3.5c1.1-1.4 1.3-3.7.9-9-.2-3.9-.9-7.3-1.4-7.4-.6-.2-1-2.4-1-4.8 0-4.9-.2-5-5.3-2.9q-3.5 1.4-4.2.5t-3.5.5c-1.6.8-3.5 1.3-4.2 1-.7-.2-3.8 1.2-6.8 3.3-5 3.4-5.6 4.2-6.9 9.4-1.4 5.5-1.4 5.9.8 10.7l2.4 4.9-3.3 4.6c-2.9 4-3.5 4.4-4.5 2.9-1-1.4-1.3-1.1-1.9 1.8-.9 4.4-5.7 11.5-6.6 9.7-.4-.7-1.2-7.2-1.8-14.4s-1.4-13.8-1.8-14.7q-.5-1.6 1.8-2.7c3.7-1.9 7.8-6.2 7.8-8.1 0-1 .5-2.1 1-2.4 2.9-1.8-1.3-15.8-5.1-17-.9-.3-2-1.2-2.3-2S72 16 70.6 16s-2.6-.7-3-1.5-1.4-1.5-2.5-1.5-3.3-1.2-5-2.6L57 7.8z" />
    </svg>
  );
}

// Bag Marbles Illustration SVG
function BagMarblesIllustration() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EC4899]" viewBox="0 0 197 183" fill="currentColor" aria-hidden="true">
      <path d="M78.9 8.9c-1.4.5-3.6 1.4-5 2.2s-5.7 1.3-10.6 1.4c-7.2 0-8.4.3-10.7 2.4-1.4 1.4-2.6 3.4-2.6 4.6 0 2.3 4.4 9.8 9.6 16.2l3.4 4.2-6.2 3.3A63 63 0 0 0 42.9 54a59 59 0 0 0-17.4 33.7c-2.9 13.4-4 15.7-11.1 23.4-6.6 7.2-7 10-1.6 12.8 2.8 1.5 4.7.5 9.5-4.8 5.6-6.2 8.1-12.1 5.8-13.5-.5-.3-2.3 1.8-3.9 4.6-3.9 6.9-8.8 11.6-10.4 10-.8-.8.1-2.4 3.6-6.3a48 48 0 0 0 11.8-24.7 60 60 0 0 1 10.5-25.9 47 47 0 0 1 16.4-15.2l4.3-2.5-4.4 5.2C45.2 63.3 39.8 76.6 36 100c-2.1 12.4-3.4 17-10.7 37.4-3.2 9-2.6 14.2 2.3 19.5 14.2 15.8 80.6 23 115.4 12.6a47 47 0 0 0 21.3-11.2c8-8.4 7.7-18.1-1.3-42.3-2.2-5.8-5.6-16.8-7.6-24.5-5.4-21.2-10.6-32.8-18.7-41.3-4.2-4.4-2.2-4 5.1.8A41 41 0 0 1 158 74.3c4.9 17.2 6.5 21.2 10.5 26.6 7.9 10.7 14.4 13.9 17.9 8.9 2.4-3.3 2.1-4.3-3.4-10.3-6.4-7-8.5-11.4-11.6-23.3-5.3-20.8-14.2-32.6-29.1-38.5a36 36 0 0 0-7.7-1.9c-2-.1-3.6-.4-3.6-.6s1.8-3.4 4-7.1c4.7-7.8 5.2-12.3 1.8-14.5q-5.4-3.4-13.4-1.3c-4.6 1.2-5.6 1.2-8.5-.4-5.8-2.9-9.5-3.2-14.7-1.4-4.4 1.6-5 1.6-7.9.2-3.9-2.1-10-2.9-13.4-1.8" />
    </svg>
  );
}

const FIVE_ITEMS = [
  { type: 'illustration', component: AspenIllustration, label: 'Aspen', bg: 'bg-[#8B5CF6]/12 border-[#8B5CF6]/30', rotate: '-rotate-6 hover:rotate-0' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/google/original.svg', label: 'Google', bg: 'bg-[#ea4335]/12 border-[#ea4335]/30', rotate: 'rotate-6 hover:rotate-0' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/claude/original.svg', label: 'Claude', bg: 'bg-[#D97757]/12 border-[#D97757]/30', rotate: '-rotate-3 hover:rotate-0' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/openai/original.svg', label: 'OpenAI', bg: 'bg-[#10a37f]/12 border-[#10a37f]/30', rotate: 'rotate-8 hover:rotate-0' },
  { type: 'illustration', component: BagMarblesIllustration, label: 'Bag Marbles', bg: 'bg-[#EC4899]/12 border-[#EC4899]/30', rotate: '-rotate-6 hover:rotate-0' },
];

export default function IllustrationBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const checkAndShowModal = () => {
    try {
      if (localStorage.getItem(BANNER_SEEN_KEY) === 'true') return;
    } catch {}

    setVisible(true);
    requestAnimationFrame(() => setAnimateIn(true));
  };

  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      const timer = setTimeout(() => checkAndShowModal(), 1200);
      return () => clearTimeout(timer);
    }

    const handleDismissed = () => {
      setTimeout(() => checkAndShowModal(), 600);
    };

    window.addEventListener('reicon-cookie-consent-dismissed', handleDismissed);
    return () => window.removeEventListener('reicon-cookie-consent-dismissed', handleDismissed);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const dismiss = () => {
    try {
      localStorage.setItem(BANNER_SEEN_KEY, 'true');
    } catch {}
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Center Banner Modal Card */}
      <div
        className={`relative max-w-[420px] w-full bg-[var(--dropdown-bg)] border border-text-base/12 backdrop-blur-2xl rounded-3xl p-7 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-text-base/5 hover:bg-text-base/12 flex items-center justify-center text-text-base/50 hover:text-text-base transition-all cursor-pointer border border-text-base/8"
          aria-label="Close modal"
        >
          <re-icon icon="x" size="14" color="currentColor" />
        </button>

        {/* 5 Real Extracted Showcase Cards */}
        <div className="relative p-4 sm:p-5 mb-6 rounded-2xl overflow-hidden mt-6">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, var(--border-muted) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />

          <div className="relative grid grid-cols-5 gap-2.5 sm:gap-3">
            {FIVE_ITEMS.map((item, idx) => {
              const IconComp = item.type === 'illustration' ? item.component : null;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-center aspect-square rounded-xl border transition-all duration-300 cursor-pointer shadow-xs ${item.bg} ${item.rotate} hover:scale-110 hover:z-10`}
                  title={item.label}
                >
                  {item.type === 'illustration' && IconComp ? (
                    <IconComp />
                  ) : (
                    <img src={item.src} alt={item.label} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-serif font-bold text-text-base mb-1.5 leading-tight">
          71,000+ Free SVG Illustrations &amp; Brand Logos
        </h3>

        <p className="text-xs text-text-base/60 leading-relaxed mb-5">
          Browse 71,000+ free, open-source vector SVG illustrations and 4,900+ brand logos for React, Vue, HTML, and Figma. MIT licensed.
        </p>

        {/* Action Buttons - Brand Logos & Illustrations */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/logos"
            onClick={dismiss}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#6C5CE7] text-white font-semibold text-xs hover:bg-[#6C5CE7]/90 transition-all cursor-pointer text-center shadow-md shadow-[#6C5CE7]/20 whitespace-nowrap"
          >
            <span>Brand Logos</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            to="/illustration"
            onClick={dismiss}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#6C5CE7] text-white font-semibold text-xs hover:bg-[#6C5CE7]/90 transition-all cursor-pointer text-center shadow-md shadow-[#6C5CE7]/20 whitespace-nowrap"
          >
            <span>Illustrations</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
