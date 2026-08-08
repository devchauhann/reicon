import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FrameworkIcon, SvgIcon } from '../../components/docs/framework/icons';

interface LogoCodeTabsProps {
  slug: string;
  name: string;
  variant: string;
  svgCode: string;
  svgUrl: string;
  copiedField: string | null;
  handleCopy: (text: string, field: string) => void;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// Tokenize & highlight code syntax matching IllustrationCodeTabs 100%
function HighlightedCode({ code }: { code: string }) {
  if (!code) return null;

  const tokens = code.split(/("[^"]*"|'[^']*'|<\/?[a-zA-Z0-9_-]+|\/>|>|<|\{|\})/g);

  return (
    <>
      {tokens.map((token, i) => {
        if (!token) return null;

        // Quoted String Values -> Green (#98c379)
        if (/^["'].*["']$/.test(token)) {
          return <span key={i} className="text-[#98c379]">{token}</span>;
        }
        // XML / Tag Name -> Coral (#e06c75)
        if (/^<\/?[a-zA-Z0-9_-]+/i.test(token)) {
          return <span key={i} className="text-[#e06c75]">{token}</span>;
        }
        // Tag brackets -> Coral (#e06c75)
        if (token === '>' || token === '/>' || token === '<') {
          return <span key={i} className="text-[#e06c75]">{token}</span>;
        }
        // JSX Braces -> Blue (#61afef)
        if (token === '{' || token === '}') {
          return <span key={i} className="text-[#61afef]">{token}</span>;
        }
        // Attribute names -> Orange (#d19a66)
        if (token.includes('=')) {
          const parts = token.split(/([a-zA-Z0-9_-]+=)/g);
          return (
            <span key={i}>
              {parts.map((p, idx) => {
                if (p.endsWith('=')) {
                  return (
                    <span key={idx}>
                      <span className="text-[#d19a66]">{p.slice(0, -1)}</span>
                      <span className="text-text-base/40">=</span>
                    </span>
                  );
                }
                return <span key={idx} className="text-text-base/80">{p}</span>;
              })}
            </span>
          );
        }

        return <span key={i} className="text-text-base/80">{token}</span>;
      })}
    </>
  );
}

export default function LogoCodeTabs({
  slug,
  name,
  variant,
  svgCode,
  svgUrl,
  copiedField,
  handleCopy,
}: LogoCodeTabsProps) {
  // Show CDN first, then SVG Code
  const [codeTab, setCodeTab] = useState<'cdn' | 'svg'>('cdn');

  const pascalName = slug
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  const CODE_TABS = [
    {
      id: 'cdn',
      label: 'JS CDN',
      icon: <FrameworkIcon id="javascript" size={14} />,
    },
    {
      id: 'svg',
      label: 'SVG Code',
      icon: <SvgIcon size={14} />,
    },
  ] as const;

  const formattedSvg = svgCode || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">\n  <!-- ${name} ${variant} SVG -->\n</svg>`;
  const cdnCode = `<img src="${svgUrl}" alt="${name}" width="24" height="24" />`;

  const rawSnippets: Record<string, string> = {
    cdn: cdnCode,
    svg: formattedSvg,
  };

  const activeRaw = rawSnippets[codeTab] || '';
  const isCopied = copiedField === codeTab || copiedField === `code-${codeTab}`;

  return (
    <figure className="relative rounded-xl bg-text-base/3 border border-text-base/8 text-sm max-w-full overflow-hidden">
      {/* Code Header Tabs matching IllustrationCodeTabs */}
      <div className="flex items-center w-full h-11 pl-3 border-b border-text-base/8 overflow-x-auto scrollbar-none">
        <div className="flex items-center h-full gap-1 shrink-0">
          {CODE_TABS.map((tab) => {
            const isActive = codeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCodeTab(tab.id as any)}
                className={`relative flex items-center gap-1.5 h-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive ? 'text-text-base' : 'text-text-base/40 hover:text-text-base/70'
                }`}
              >
                <span className={isActive ? '' : 'opacity-60'}>{tab.icon}</span>
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="logo-code-tab-underline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-t-full bg-[#6C5CE7]"
                    style={{ boxShadow: '0 0 8px rgba(108,92,231,0.45)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Box Container matching IllustrationCodeTabs 100% */}
      <div className="px-1.5 py-1.5 max-w-full">
        <div className="bg-bg-base rounded-md min-h-[92px] max-h-[200px] relative overflow-hidden flex flex-col">
          {/* Copy Button matching IllustrationCodeTabs 100% */}
          <button
            type="button"
            onClick={() => handleCopy(activeRaw, `code-${codeTab}`)}
            aria-label="Copy code"
            className="absolute top-1.5 right-1.5 z-10 inline-flex items-center justify-center w-7 h-7 rounded-md bg-bg-base text-text-base/30 hover:text-text-base hover:bg-text-base/8 transition-colors cursor-pointer border border-text-base/6"
          >
            {isCopied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>

          {/* Syntax Highlighted Code Box with Auto Scroll */}
          <AnimatePresence mode="wait">
            <motion.pre
              key={codeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="p-4 pr-10 text-[13px] font-mono leading-[1.7] overflow-auto min-h-0 min-w-0 flex-1 whitespace-pre focus-visible:outline-none text-text-base select-text max-h-[200px] scrollbar-thin"
            >
              <HighlightedCode code={activeRaw} />
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </figure>
  );
}
