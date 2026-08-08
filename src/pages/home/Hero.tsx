import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HandHeart, Search3, Doc, PenSparkle } from 'reicon-react';
import { SiJavascript, SiReact } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import Background from '../../components/layout/Background';
import ClayButton from '../../components/ui/Button';
import { FigmaIcon, VscodeIcon, VueIcon, SvelteIcon, McpIcon, FlutterIcon } from './icons';

interface Props {
  theme?: string;
  toggleTheme?: () => void;
  heroCardRef: React.RefObject<HTMLDivElement | null>;
  stars?: number | null;
}

function ClaudeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg fill="#D97757" className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Claude</title>
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
    </svg>
  );
}

function OpenAiIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
      <path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
    </svg>
  );
}

export default function Hero({ heroCardRef }: Props) {
  const [newIconCount, setNewIconCount] = useState(0);
  useEffect(() => {
    import('../../data/new-icons-added.json').then((m) => {
      setNewIconCount((m.default as string[]).length);
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-start justify-center">
      <div
        ref={heroCardRef}
        className="sticky top-0 w-full h-screen overflow-hidden origin-top will-change-transform"
        style={{ transformOrigin: 'top center' }}
      >
        <Background />

        <div className="absolute inset-0 z-[2] flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-6 px-[18px] md:px-[40px]">
          {/* Center content */}
          <div className="my-auto text-center px-3 max-w-4xl mx-auto flex flex-col items-center justify-center">
            {/* Top pill badges */}
            <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
              <a
                href="https://github.com/dqev/reicon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[6px] bg-text-base/[0.04] hover:bg-text-base/10 backdrop-blur-lg rounded-full px-[14px] py-[6px] text-[12px] text-text-base/90 transition-colors"
              >
                <HandHeart size={16} color="currentColor" />
                <span>Open Source Library</span>
              </a>

              <Link
                to="/logos"
                className="hidden sm:inline-flex items-center gap-2 bg-text-base/[0.04] hover:bg-text-base/10 backdrop-blur-lg rounded-full px-3.5 py-1.5 text-[12px] text-text-base/90 transition-colors group"
              >
                {/* Inline SVG brand icons stack */}
                <div className="flex items-center -space-x-1.5 shrink-0">
                  <OpenAiIcon className="w-4 h-4 shrink-0 relative z-[3] text-text-base" />
                  <ClaudeIcon className="w-4 h-4 shrink-0 relative z-[2]" />
                </div>
                <span>4,900+ Brand Logos</span>
              </Link>
            </div>

            <h1 className="font-serif text-[clamp(34px,6.8vw,84px)] font-semibold text-text-base leading-[1.06] tracking-[-0.03em] mb-4">
              The icon library<br />designers actually want.
            </h1>
            <p className="text-[clamp(13px,1.45vw,18px)] text-text-base/60 leading-[1.65] max-w-[480px] mx-auto mb-7">
              Open‑source SVGs &amp; illustrations for React, Vue, Svelte, Figma, and the web, drawn with care.
            </p>
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2 sm:gap-2.5 max-w-[440px] sm:max-w-none mx-auto w-full">
              <ClayButton to="/icons" variant="primary" className="w-full justify-center px-2.5 sm:px-5 text-[12px] sm:text-[14px] whitespace-nowrap">
                <Search3 size={15} />
                <span className="sm:hidden whitespace-nowrap">Icons</span>
                <span className="hidden sm:inline whitespace-nowrap">Browse Icons</span>
              </ClayButton>

              <Link
                to="/logos"
                className="bg-text-base/[0.04] hover:bg-text-base/10 text-text-base text-[12px] sm:text-[14px] font-medium px-2.5 sm:px-5 py-3 rounded-full backdrop-blur-lg flex items-center justify-center gap-1.5 transition-all duration-150 shadow-2xs group w-full whitespace-nowrap"
              >
                {/* Inline SVG brand icons stack */}
                <div className="flex items-center -space-x-1.5 shrink-0">
                  <OpenAiIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 relative z-[3] text-text-base" />
                  <ClaudeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 relative z-[2]" />
                </div>
                <span className="whitespace-nowrap">Brand Logos</span>
              </Link>

              <Link
                to="/illustration"
                className="bg-text-base/[0.04] hover:bg-text-base/10 text-text-base text-[12px] sm:text-[14px] font-medium px-2.5 sm:px-5 py-3 rounded-full backdrop-blur-lg flex items-center justify-center gap-1.5 transition-all duration-150 shadow-2xs w-full whitespace-nowrap"
              >
                <PenSparkle size={15} />
                <span className="whitespace-nowrap">Illustrations</span>
              </Link>

              <ClayButton to="/docs" variant="primary" className="w-full justify-center px-2.5 sm:px-5 text-[12px] sm:text-[14px] whitespace-nowrap">
                <Doc size={15} color="currentColor" />
                <span className="whitespace-nowrap">Docs Guide</span>
              </ClayButton>
            </div>

            {/* Integrations row */}
            <div className="mt-8 md:mt-10 flex flex-col items-center justify-center gap-3 select-none">
              <span className="text-[10px] tracking-[0.15em] text-text-base/35 dark:text-text-base/30 uppercase font-semibold">Integrations</span>
              <div className="flex items-center justify-center gap-x-5 gap-y-3 sm:gap-7 flex-wrap max-w-[250px] sm:max-w-[600px] mx-auto">
                <Link to="/docs/react" title="React" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <SiReact className="text-[#61DAFB]/70 hover:text-[#61DAFB] transition-colors" size={18} />
                  <span className="hidden sm:inline">React</span>
                </Link>
                <Link to="/docs/vue" title="Vue 3" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <VueIcon size={17} />
                  <span className="hidden sm:inline">Vue</span>
                </Link>
                <Link to="/docs/figma" title="Figma" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <FigmaIcon size={16} />
                  <span className="hidden sm:inline">Figma</span>
                </Link>
                <Link to="/docs/svelte" title="Svelte" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <SvelteIcon size={16} />
                  <span className="hidden sm:inline">Svelte</span>
                </Link>
                <Link to="/docs/react-native" title="React Native" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <FaReact className="text-[#61DAFB]/60 hover:text-[#61DAFB] transition-colors" size={17} />
                  <span className="hidden sm:inline">React Native</span>
                </Link>
                <Link to="/docs/vanilla" title="Vanilla JavaScript" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <SiJavascript className="text-[#F7DF1E]/80 hover:text-[#F7DF1E] transition-colors" size={16} />
                  <span className="hidden sm:inline">JavaScript</span>
                </Link>
                <Link to="/docs/vscode" title="VS Code" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <VscodeIcon size={17} />
                  <span className="hidden sm:inline">VS Code</span>
                </Link>
                <Link to="/docs/flutter" title="Flutter" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <FlutterIcon size={14} />
                  <span className="hidden sm:inline">Flutter</span>
                </Link>
                <Link to="/docs/mcp" title="MCP Server" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                  <McpIcon size={16} />
                  <span className="hidden sm:inline">MCP Server</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom stats bar - mobile responsive */}
          <div className="flex items-end justify-center pb-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 sm:gap-6 px-3 sm:px-8 py-2 max-w-full text-center">
              {[
                { num: '2,700+', label: 'Icons' },
                { num: '4,900+', label: 'Logos' },
                { num: '71,000+', label: 'Illustrations' },
                { num: 'MIT', label: 'License' },
              ].map((s, idx) => (
                <div key={s.label} className="flex items-center gap-3 sm:gap-6">
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="font-serif text-[13px] sm:text-[19px] font-semibold text-text-base leading-none">{s.num}</span>
                    <span className="text-[10px] sm:text-[12px] text-text-base/60 font-medium">{s.label}</span>
                  </div>
                  {idx < 3 && <div className="hidden sm:block w-[1px] h-3.5 bg-white/15" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
