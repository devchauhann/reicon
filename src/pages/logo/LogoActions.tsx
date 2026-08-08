import { motion } from 'motion/react';

const EXPORT_SIZES = [24, 32, 48, 64, 128, 256, 512];

interface LogoActionsProps {
  pascalName: string;
  slug: string;
  name: string;
  activeUrl: string;
  exportSize: number;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  onCopySvg: () => void;
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
  onDownloadWebp: () => void;
  onSetExportSize: (s: number) => void;
}

export default function LogoActions({
  pascalName,
  slug,
  name,
  activeUrl,
  exportSize,
  copiedField,
  onCopy,
  onCopySvg,
  onDownloadSvg,
  onDownloadPng,
  onDownloadWebp,
  onSetExportSize,
}: LogoActionsProps) {
  return (
    <div className="bg-text-base/3 border border-text-base/8 rounded-2xl p-4 flex flex-col gap-3">
      {/* Quick Copy Buttons */}
      <div className="flex flex-wrap gap-2">
        {([
          ['Copy SVG', onCopySvg, 'svg'],
          ['Copy CDN URL', () => onCopy(activeUrl, 'cdn'), 'cdn'],
          ['Copy Name', () => onCopy(name || slug, 'name'), 'name'],
        ] as const).map(([label, fn, field]) => (
          <motion.button
            key={field}
            onClick={fn}
            whileTap={{ scale: 0.96 }}
            className={`flex-1 min-w-[120px] text-[12.5px] font-medium py-2.5 rounded-lg border transition-colors cursor-pointer ${
              copiedField === field
                ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]'
                : 'bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10'
            }`}
          >
            {copiedField === field ? 'Copied!' : label}
          </motion.button>
        ))}
      </div>

      {/* Export Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-text-base/35 uppercase tracking-wider font-medium">Export size</span>
          <span className="text-[12px] text-text-base/50 font-mono">{exportSize}px</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {EXPORT_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onSetExportSize(s)}
              className={`flex-1 min-w-[42px] text-[11px] font-medium py-1.5 rounded-lg border transition-colors cursor-pointer ${
                exportSize === s
                  ? 'bg-[#6C5CE7]/15 border-[#6C5CE7]/30 text-[#6C5CE7]'
                  : 'bg-text-base/3 border-text-base/6 text-text-base/35 hover:text-text-base/60 hover:bg-text-base/6'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex gap-2">
        {([
          ['SVG', onDownloadSvg],
          ['PNG', onDownloadPng],
          ['WebP', onDownloadWebp],
        ] as const).map(([label, fn]) => (
          <motion.button
            key={label}
            onClick={fn}
            whileTap={{ scale: 0.96 }}
            className="flex-1 text-[12.5px] font-medium py-2.5 rounded-lg border bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
