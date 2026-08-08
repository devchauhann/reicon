import { motion, AnimatePresence } from 'motion/react';
import { LogoItem } from '../../lib/logo-data';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface LogoPreviewProps {
  logo: LogoItem;
  selectedVariant: string;
  previewSize: number;
  activeUrl: string;
  onSelectVariant: (v: string) => void;
  onSetPreviewSize: (s: number) => void;
  onReset: () => void;
}

export default function LogoPreview({
  logo,
  selectedVariant,
  previewSize,
  activeUrl,
  onSelectVariant,
  onSetPreviewSize,
  onReset,
}: LogoPreviewProps) {
  const variantKeys = Object.keys(logo.variants || {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="lg:sticky lg:top-20 lg:self-start flex flex-col gap-4 z-10"
    >
      {/* Main Preview Box with Opaque Base & Grid Background */}
      <div className="relative w-full aspect-square bg-bg-base border border-text-base/8 rounded-2xl flex items-center justify-center overflow-hidden">
        {/* Grid pattern overlay behind logo */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-text-base/35 tabular-nums select-none z-10">
          {previewSize}px
        </span>
        <span className="absolute bottom-2.5 left-3 text-[8px] font-mono text-text-base/25 select-none lowercase z-10">
          {selectedVariant}
        </span>

        {/* Logo Image in front of grid lines */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVariant}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="flex items-center justify-center p-6 relative z-10"
          >
            <img
              src={activeUrl}
              alt={logo.name}
              style={{ width: previewSize, height: previewSize }}
              className="object-contain max-w-full max-h-full transition-all duration-200"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Brand Title & Code Badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[18px] font-serif text-text-base truncate">{logo.name}</h2>
          {logo.category && <p className="text-[12px] text-text-base/40 mt-0.5">{logo.category}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <code className="text-[11px] text-text-base/40 bg-text-base/4 border border-text-base/6 rounded-md px-2 py-1 font-mono">
            {logo.slug}
          </code>
        </div>
      </div>

      {/* Customize Box */}
      <div className="bg-bg-base border border-text-base/8 rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/35 font-semibold">Customize</span>
          <button
            onClick={onReset}
            title="Reset"
            aria-label="Reset"
            className="w-7 h-7 flex items-center justify-center rounded-md text-text-base/30 hover:text-text-base/75 hover:bg-text-base/6 transition-colors cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.5 2.8L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* Variant Buttons */}
        {variantKeys.length > 1 && (
          <div>
            <label className="text-[12px] text-text-base/50 mb-2 block">Variant</label>
            <div className="flex gap-2">
              {variantKeys.map((vKey) => (
                <button
                  key={vKey}
                  onClick={() => onSelectVariant(vKey)}
                  className={`flex-1 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1 capitalize ${
                    selectedVariant === vKey
                      ? 'bg-[#6C5CE7]/15 text-[#6C5CE7] border border-[#6C5CE7]/30'
                      : 'bg-text-base/5 text-text-base/40 border border-text-base/10 hover:text-text-base/60'
                  }`}
                >
                  <span>{vKey}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[12px] text-text-base/50">Size</label>
            <span className="text-[12px] text-text-base/40 font-mono">{previewSize}px</span>
          </div>
          <input
            type="range"
            min={24}
            max={256}
            value={previewSize}
            onChange={(e) => onSetPreviewSize(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-text-base/10 accent-[#6C5CE7] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C5CE7] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(108,92,231,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
