export type OrbitItem =
  | { type: 'icon'; name: string }
  | { type: 'logo'; src: string; name: string };

const ORBIT_INNER: OrbitItem[] = [
  { type: 'icon', name: 'home' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/google/original.svg', name: 'Google' },
  { type: 'icon', name: 'star' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/claude/original.svg', name: 'Claude' },
  { type: 'icon', name: 'search' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/openai/original.svg', name: 'OpenAI' },
];

const ORBIT_MIDDLE: OrbitItem[] = [
  { type: 'icon', name: 'camera' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/figma/original.svg', name: 'Figma' },
  { type: 'icon', name: 'lightning' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/react/original.svg', name: 'React' },
  { type: 'icon', name: 'palette' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/github/original.svg', name: 'GitHub' },
  { type: 'icon', name: 'code' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/vercel/original.svg', name: 'Vercel' },
];

const ORBIT_OUTER: OrbitItem[] = [
  { type: 'icon', name: 'compass' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/apple/original.svg', name: 'Apple' },
  { type: 'icon', name: 'wifi' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/stripe/original.svg', name: 'Stripe' },
  { type: 'icon', name: 'pen' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/typescript/original.svg', name: 'TypeScript' },
  { type: 'icon', name: 'lamp' },
  { type: 'logo', src: 'https://cdn.reicon.dev/logos/nextjs/original.svg', name: 'Next.js' },
  { type: 'icon', name: 'flag' },
  { type: 'icon', name: 'rocket' },
];

function OrbitRing({ items, className, counterClassName, size }: {
    items: OrbitItem[];
    className: string;
    counterClassName: string;
    size: string;
}) {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative ${size} aspect-square ${className}`}>
                {items.map((item, i) => {
                    const rad = ((360 / items.length) * i * Math.PI) / 180;
                    const x = 50 + 50 * Math.cos(rad);
                    const y = 50 + 50 * Math.sin(rad);
                    const key = item.type === 'icon' ? item.name : item.src;
                    return (
                        <div key={key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: `${y}%`, left: `${x}%` }}>
                            <div className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-text-base/4 border border-text-base/6 flex items-center justify-center shadow-2xs hover:scale-110 hover:border-[#6C5CE7]/40 transition-all duration-200 ${counterClassName}`} title={item.name}>
                                {item.type === 'icon' ? (
                                    <>
                                        <re-icon icon={item.name} size={18} color="currentColor" className="text-text-base/70 sm:hidden" weight="outline" />
                                        <re-icon icon={item.name} size={22} color="currentColor" className="text-text-base/70 hidden sm:block" weight="outline" />
                                    </>
                                ) : (
                                    <img src={item.src} alt={item.name} className="w-4.5 h-4.5 sm:w-6 sm:h-6 object-contain" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function IconShowcase({ theme }: { theme: string }) {
    return (
        <section className="reveal max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-16 overflow-visible">
            <div className="text-center mb-8 sm:mb-12 px-4">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Icon &amp; Logo Library</div>
                <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">2,700+ icons &amp; 4,900+ brand logos.</h2>
                <p className="text-[14px] sm:text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
                    From UI essentials to popular tech brand logos — find exactly what you need.
                </p>
            </div>

            <div className="relative w-full aspect-square max-w-[480px] sm:max-w-[580px] md:max-w-[620px] mx-auto sm:[mask-image:radial-gradient(circle,black_70%,transparent_100%)] overflow-visible">
                {/* Clean borderless center logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <img
                        src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'}
                        alt="Reicon"
                        loading="lazy"
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain drop-shadow-md select-none pointer-events-none"
                    />
                </div>

                {/* Ambient Soft Glow Behind Center Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 bg-[#6C5CE7]/15 rounded-full blur-2xl pointer-events-none" />

                {/* Ring guides fading from inner (0.18) to outer (0.04) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[38%] aspect-square rounded-full border border-[#6C5CE7]/[0.18]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[66%] aspect-square rounded-full border border-[#6C5CE7]/[0.10]" />
                </div>
                <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none">
                    <div className="w-[90%] aspect-square rounded-full border border-[#6C5CE7]/[0.04]" />
                </div>

                {/* Inner orbit */}
                <OrbitRing items={ORBIT_INNER} size="w-[38%]" className="animate-orbit-slow" counterClassName="animate-orbit-counter-slow" />
                
                {/* Middle orbit */}
                <OrbitRing items={ORBIT_MIDDLE} size="w-[66%]" className="animate-orbit-mid" counterClassName="animate-orbit-counter-mid" />

                {/* Outer orbit (desktop only for clean mobile spacing) */}
                <div className="hidden sm:block absolute inset-0">
                    <OrbitRing items={ORBIT_OUTER} size="w-[90%]" className="animate-orbit-fast" counterClassName="animate-orbit-counter-fast" />
                </div>
            </div>
        </section>
    );
}
