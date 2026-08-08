import { Link } from 'react-router-dom';

const socials = [
  {
    href: 'https://github.com/dqev/reicon',
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/reicon-dev',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://www.npmjs.com/package/reicon-react',
    label: 'npm',
    icon: (
      <svg viewBox="0 0 2500 2500" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0h2500v2500H0z M1241.5 268.5h-973v1962.9h972.9V763.5h495v1467.9h495V268.5z" />
      </svg>
    ),
  },
  {
    href: 'https://bsky.app/profile/reicondev.bsky.social',
    label: 'Bluesky',
    icon: (
      <svg viewBox="0 0 256 226" fill="currentColor" className="w-4 h-4">
        <path d="M55.491 15.172c29.35 22.035 60.917 66.712 72.509 90.686 11.592-23.974 43.159-68.651 72.509-90.686C221.686-.727 256-13.028 256 26.116c0 7.818-4.482 65.674-7.111 75.068-9.138 32.654-42.436 40.983-72.057 35.942 51.775 8.812 64.946 38 36.501 67.187-54.021 55.433-77.644-13.908-83.696-31.676-1.11-3.257-1.63-4.78-1.637-3.485-.008-1.296-.527.228-1.637 3.485-6.052 17.768-29.675 87.11-83.696 31.676-28.445-29.187-15.274-58.375 36.5-67.187-29.62 5.041-62.918-3.288-72.056-35.942C4.482 91.79 0 33.934 0 26.116 0-13.028 34.314-.727 55.491 15.172Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto pt-16 pb-8 text-text-base overflow-hidden" role="contentinfo">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Multi-Column Section Matching Left Sidebar Structure with Fading Vertical Lines */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-x-8 pb-12 sm:pb-16 text-left">
          {/* Column 1: Use / Integration */}
          <div className="relative flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-wider text-text-base/40 uppercase">
              <div className="w-5 h-5 rounded-[5px] bg-text-base/4 flex items-center justify-center text-text-base/50 shrink-0">
                <re-icon icon="folder" size="13" />
              </div>
              <span>Use</span>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="absolute left-[10px] top-[-4px] bottom-[4px] w-[1px] transform -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
              <Link to="/docs/react" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                React Packages
              </Link>
              <Link to="/docs/react-native" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                React Native
              </Link>
              <Link to="/docs/vue" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Vue Package
              </Link>
              <Link to="/docs/svelte" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Svelte Package
              </Link>
              <Link to="/docs/flutter" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Flutter SDK
              </Link>
              <Link to="/docs/vanilla" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Vanilla JS & CDN
              </Link>
            </div>
          </div>

          {/* Column 2: Icons */}
          <div className="relative flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-wider text-text-base/40 uppercase">
              <div className="w-5 h-5 rounded-[5px] bg-text-base/4 flex items-center justify-center text-text-base/50 shrink-0">
                <re-icon icon="widget" size="13" />
              </div>
              <span>Icons</span>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="absolute left-[10px] top-[-4px] bottom-[4px] w-[1px] transform -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
              <Link to="/icons" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                All Icons
              </Link>
              <Link to="/illustration" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Illustrations
              </Link>
              <Link to="/logos" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Brand Logos
              </Link>
              <Link to="/icons?weight=outline" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Outline Icons
              </Link>
              <Link to="/icons?weight=filled" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Filled Icons
              </Link>
              <Link to="/docs/vscode" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                VS Code Extension
              </Link>
              <Link to="/docs/mcp" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                MCP AI Server
              </Link>
              <Link to="/docs/figma" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Figma UI Kit
              </Link>
            </div>
          </div>

          {/* Column 3: Ecosystem */}
          <div className="relative flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-wider text-text-base/40 uppercase">
              <div className="w-5 h-5 rounded-[5px] bg-text-base/4 flex items-center justify-center text-text-base/50 shrink-0">
                <re-icon icon="layers" size="13" />
              </div>
              <span>Ecosystem</span>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="absolute left-[10px] top-[-4px] bottom-[4px] w-[1px] transform -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
              <Link to="/docs" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Documentation
              </Link>
              <Link to="/docs/vanilla#props" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Props Reference
              </Link>
              <Link to="/docs/vanilla#styling" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Styling & Color
              </Link>
              <Link to="/docs/vanilla#accessibility" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Accessibility Guide
              </Link>
              <Link to="/docs/vanilla#typescript" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                TypeScript Definitions
              </Link>
            </div>
          </div>

          {/* Column 4: Support */}
          <div className="relative flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-wider text-text-base/40 uppercase">
              <div className="w-5 h-5 rounded-[5px] bg-text-base/4 flex items-center justify-center text-text-base/50 shrink-0">
                <re-icon icon="headphones" size="13" />
              </div>
              <span>Support</span>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="absolute left-[10px] top-[-4px] bottom-[4px] w-[1px] transform -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
              <Link to="/support" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Support Reicon
              </Link>
              <Link to="/faq" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Questions & Answers
              </Link>
              <Link to="/license" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                MIT License
              </Link>
              <Link to="/terms" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Terms of Service
              </Link>
              <Link to="/privacy" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium">
                Privacy Policy
              </Link>
              <a href="mailto:hello@reicon.dev" className="relative flex items-center pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium cursor-pointer">
                Contact
              </a>
            </div>
          </div>

          {/* Column 5: Socials */}
          <div className="col-span-2 md:col-span-1 relative flex flex-col">
            <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-wider text-text-base/40 uppercase">
              <div className="w-5 h-5 rounded-[5px] bg-text-base/4 flex items-center justify-center text-text-base/50 shrink-0">
                <re-icon icon="at" size="13" />
              </div>
              <span>Socials</span>
            </div>
            <div className="relative flex flex-col gap-1">
              <div className="absolute left-[10px] top-[-4px] bottom-[4px] w-[1px] transform -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--border-base) 0%, var(--border-base) 60%, transparent 100%)' }} />
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-2 pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium cursor-pointer"
                >
                  <span className="text-text-base/50">{icon}</span>
                  <span>{label}</span>
                </a>
              ))}
              <a
                href="https://devchauhan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 pl-[26px] py-1 text-[13px] text-text-base/70 hover:text-text-base transition-colors font-medium cursor-pointer"
              >
                <span className="text-text-base/50"><re-icon icon="user" size="13" /></span>
                <span>@devchauhan</span>
              </a>
            </div>
          </div>
        </div>

        {/* Big Branding Watermark Display */}
        <div className="pt-6 sm:pt-8 flex flex-col items-center justify-center text-center overflow-hidden">
          <h2 className="font-serif font-bold text-[clamp(44px,13vw,160px)] leading-none tracking-[-0.04em] text-text-base/6 select-none pointer-events-none transition-colors">
            reicon<span className="text-[#6C5CE7]/35">.dev</span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
