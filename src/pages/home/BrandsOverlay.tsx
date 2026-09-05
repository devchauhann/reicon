import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRightUp } from 'reicon-react';

const STORAGE_KEY = 'reicon-agent-overlay-v1';
const COOKIE_KEY = 'reicon_cookie_consent';

export default function BrandsOverlay() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const dismissedRef = useRef(false);

  const isAllowedPage =
    pathname.startsWith('/icons') ||
    pathname.startsWith('/icon/');

  useEffect(() => {
    if (!isAllowedPage) {
      setVisible(false);
      return;
    }

    const ownDismissed = (() => {
      try { return localStorage.getItem(STORAGE_KEY) === 'dismissed'; }
      catch { return false; }
    })();
    if (ownDismissed) { dismissedRef.current = true; return; }

    let delayTimer: ReturnType<typeof setTimeout> | undefined;

    const checkCookie = () => {
      if (dismissedRef.current) return;
      const consented = (() => {
        try { return localStorage.getItem(COOKIE_KEY) !== null; }
        catch { return false; }
      })();
      if (consented) {
        delayTimer = setTimeout(() => {
          if (dismissedRef.current) return;
          setVisible(true);
          requestAnimationFrame(() => setAnimateIn(true));
        }, 1800);
      }
    };

    checkCookie();
    window.addEventListener('storage', checkCookie);
    return () => {
      window.removeEventListener('storage', checkCookie);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [isAllowedPage]);

  const dismiss = () => {
    dismissedRef.current = true;
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 400);
    try { localStorage.setItem(STORAGE_KEY, 'dismissed'); } catch {}
  };

  if (!isAllowedPage || !visible) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 md:right-10 z-[9998] pointer-events-none flex justify-end">
      <div
        className={`pointer-events-auto w-[280px] sm:w-[310px] max-w-[calc(100vw-24px)] bg-bg-base border border-text-base/10 rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.28)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
      >
        {/* Hero image */}
        <div className="relative h-[96px] sm:h-[108px] w-full overflow-hidden bg-gradient-to-br from-[#9B8AFB]/20 to-transparent">
          <img
            src="/launch-banner/reicon-agent.png"
            alt="agent.reicon.dev"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        <div className="relative px-3.5 pb-3.5 pt-2">
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-semibold tracking-[0.1em] uppercase text-[#9B8AFB] mb-0.5">
                New Launch
              </div>
              <h3 className="font-serif text-[14px] sm:text-[15px] text-text-base leading-[1.2] tracking-[-0.01em]">
                agent.reicon.dev
              </h3>
              <p className="text-[11px] sm:text-[12px] text-text-base/50 leading-[1.4] mt-0.5">
                1,100+ rounded SVG icons built for AI Coding Agents.
              </p>
            </div>
            <div className="flex gap-1 shrink-0 pt-0.5">
              <a
                href="https://agent.reicon.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-[#9B8AFB] text-white text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-[#9B8AFB]/90 active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap"
              >
                Browse
                <ArrowRightUp size={11} />
              </a>
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-text-base/5 hover:bg-text-base/10 transition-colors text-text-base/40 hover:text-text-base/70 cursor-pointer"
              >
                <re-icon icon="x" size="11" color="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

