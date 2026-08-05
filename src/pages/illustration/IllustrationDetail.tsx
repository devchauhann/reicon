import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  IllustrationItem,
  getIllustrationDetail,
  getIllustrationUrl,
  loadIllustrationGroup,
  fetchIllustrationSvgCode,
} from '../../lib/illustration-data';
import IllustrationCard from './IllustrationCard';
import IllustrationCodeTabs from './IllustrationCodeTabs';
import { useTheme } from '../../components/layout/ThemeContext';
import { Highlight } from '../../components/ui/Highlight';
import { IconTooltipProvider } from '../../components/ui/IconTooltip';

export default function IllustrationDetail() {
  const { name: slug } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [item, setItem] = useState<IllustrationItem | null>(null);
  const [related, setRelated] = useState<IllustrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewSize, setPreviewSize] = useState(180);
  const [exportSize, setExportSize] = useState(512);
  const [svgCode, setSvgCode] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);

    getIllustrationDetail(slug).then((detail) => {
      if (cancelled) return;
      setItem(detail);
      setLoading(false);

      if (detail) {
        loadIllustrationGroup(detail.category, detail.subcategory).then((groupItems) => {
          if (!cancelled) {
            setRelated(groupItems.filter((i) => i.slug !== slug).slice(0, 12));
          }
        });
      }
    });

    fetchIllustrationSvgCode(slug).then((code) => {
      if (!cancelled && code) setSvgCode(code);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const flashToast = (field: string) => {
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/illustration');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center pt-20">
        <div className="flex items-center gap-3 text-text-base/50 font-mono text-sm">
          <div className="w-5 h-5 rounded-full border-2 border-text-base/20 border-t-text-base/60 animate-spin" />
          <span>Loading illustration...</span>
        </div>
      </div>
    );
  }

  const currentSlug = item?.slug || slug || '';
  const currentTitle = item?.title || item?.name || currentSlug.replace(/-/g, ' ');
  const cdnUrl = getIllustrationUrl(currentSlug);

  const reactSnippet = `<img src="${cdnUrl}" alt="${currentTitle}" width="${previewSize}" height="${previewSize}" />`;
  const htmlSnippet = `<img src="${cdnUrl}" alt="${currentTitle}" width="${previewSize}" height="${previewSize}" />`;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    flashToast(field);
  };

  const handleCopySvgCode = async () => {
    let code = svgCode;
    if (!code && currentSlug) {
      code = await fetchIllustrationSvgCode(currentSlug);
      if (code) setSvgCode(code);
    }
    if (code) {
      navigator.clipboard.writeText(code);
      flashToast('svg');
    } else {
      flashToast('error');
    }
  };

  const handleDownloadSvg = () => {
    if (!svgCode) {
      flashToast('error');
      return;
    }

    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentSlug}-${exportSize}x${exportSize}.svg`;
    a.click();

    URL.revokeObjectURL(url);
    flashToast('download-svg');
  };

  const handleDownloadPng = async () => {
    try {
      if (!svgCode) {
        flashToast('error');
        return;
      }
      const blob = new Blob([svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = exportSize;
        canvas.height = exportSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, exportSize, exportSize);
          const pngUrl = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = pngUrl;
          a.download = `${currentSlug}-${exportSize}x${exportSize}.png`;
          a.click();
          URL.revokeObjectURL(url);
          flashToast('download-png');
        }
      };
      img.src = url;
    } catch {
      flashToast('error');
    }
  };

  return (
    <div className="flex-1">
      <Helmet>
        <title>{`${currentTitle} Illustration — Reicon`}</title>
        <meta name="description" content={`Download free ${currentTitle} doodling handcrafted SVG illustration.`} />
        <link rel="canonical" href={`https://reicon.dev/illustration/${currentSlug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://reicon.dev/illustration/${currentSlug}`} />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content={`${currentTitle} Illustration — Reicon`} />
        <meta property="og:description" content={`Download free ${currentTitle} doodling handcrafted SVG illustration.`} />
        <meta property="og:image" content="https://reicon.dev/og/illustration-detail.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content={`${currentTitle} Illustration — Reicon`} />
        <meta name="twitter:description" content={`Download free ${currentTitle} doodling handcrafted SVG illustration.`} />
        <meta name="twitter:image" content="https://reicon.dev/og/illustration-detail.jpg" />
      </Helmet>

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-12 md:pt-24 md:pb-16">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium text-text-base/60 hover:text-text-base bg-text-base/3 hover:bg-text-base/6 border border-text-base/6 transition-all cursor-pointer group shrink-0"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 shrink-0"
              >
                <path
                  d="M9.70711 4.70711C10.0976 4.31658 10.0976 3.68342 9.70711 3.29289C9.31658 2.90237 8.68342 2.90237 8.29289 3.29289L3.29289 8.29289C2.90237 8.68342 2.90237 9.31658 3.29289 9.70711L8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071C10.0976 13.6834 10.0976 13.6834 9.70711 13.2929L6.41421 10H10.4C12.0967 10 13.309 10.0008 14.2594 10.0784C15.198 10.1551 15.7927 10.3018 16.27 10.545C17.2108 11.0243 17.9757 11.7892 18.455 12.73C18.6982 13.2073 18.8449 13.802 18.9216 14.7406C18.9992 15.691 19 16.9033 19 18.6V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V18.5556C21 16.913 21 15.6191 20.9149 14.5778C20.8281 13.5154 20.6478 12.6283 20.237 11.8221C19.5659 10.5049 18.4951 9.43407 17.1779 8.76295C16.3717 8.35217 15.4846 8.17186 14.4222 8.08507C13.3809 7.99999 12.087 7.99999 10.4444 8L6.41421 8L9.70711 4.70711Z"
                  fill="currentColor"
                />
              </svg>
              <span>Back</span>
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] font-mono text-text-base/40 min-w-0">
              <Link to="/illustration" className="hover:text-text-base/70 transition-colors shrink-0">illustration</Link>
              <span className="text-text-base/25 shrink-0" aria-hidden="true">/</span>
              {item && (
                <>
                  <span className="capitalize shrink-0">{item.category}</span>
                  <span className="text-text-base/25 shrink-0" aria-hidden="true">/</span>
                </>
              )}
              <span className="text-text-base/80 font-medium truncate" aria-current="page">{currentSlug}</span>
            </nav>
          </div>

          {/* Two Column Grid */}
          <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-6 lg:gap-8">
            {/* Left Preview Box */}
            <div className="lg:sticky lg:top-20 lg:self-start flex flex-col gap-4">
              <div className="relative w-full aspect-square bg-text-base/2 border border-text-base/8 rounded-2xl flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-text-base/35 tabular-nums select-none">{previewSize}px</span>

                <img
                  src={cdnUrl}
                  alt={currentTitle}
                  className={`object-contain transition-all duration-200 ${
                    theme === 'dark' ? 'invert brightness-150' : ''
                  }`}
                  style={{ width: previewSize, height: previewSize }}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[18px] font-serif text-text-base truncate capitalize">{currentTitle}</h2>
                  <p className="text-[12px] text-text-base/40 mt-0.5 capitalize">
                    {item?.category || 'object'} / {item?.subcategory || 'misc'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 bg-text-base/4 border border-text-base/8 rounded-lg p-1">
                  {[120, 180, 240].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setPreviewSize(sz)}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                        previewSize === sz ? 'bg-text-base/15 text-text-base font-semibold' : 'text-text-base/40 hover:text-text-base'
                      }`}
                    >
                      {sz}px
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Actions & Code Snippets */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-5 min-w-0 max-w-full overflow-hidden"
            >
              {/* Action Buttons Box */}
              <div className="bg-text-base/3 border border-text-base/8 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => copyToClipboard(reactSnippet, 'react')}
                    className={`flex-1 min-w-[120px] text-[12.5px] font-medium py-2.5 rounded-lg border transition-colors cursor-pointer ${
                      copiedField === 'react' ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]' : 'bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10'
                    }`}
                  >
                    {copiedField === 'react' ? 'Copied!' : 'Copy React'}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => copyToClipboard(htmlSnippet, 'html')}
                    className={`flex-1 min-w-[120px] text-[12.5px] font-medium py-2.5 rounded-lg border transition-colors cursor-pointer ${
                      copiedField === 'html' ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]' : 'bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10'
                    }`}
                  >
                    {copiedField === 'html' ? 'Copied!' : 'Copy HTML'}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCopySvgCode}
                    className={`flex-1 min-w-[120px] text-[12.5px] font-medium py-2.5 rounded-lg border transition-colors cursor-pointer ${
                      copiedField === 'svg' ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]/40 text-[#6C5CE7]' : 'bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10'
                    }`}
                  >
                    {copiedField === 'svg' ? 'Copied!' : 'Copy SVG'}
                  </motion.button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-text-base/35 uppercase tracking-wider font-medium">Export Size</span>
                    <span className="text-[12px] text-text-base/50 font-mono">{exportSize}px</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[256, 512, 1024].map((s) => (
                      <button
                        key={s}
                        onClick={() => setExportSize(s)}
                        className={`flex-1 min-w-[42px] text-[11px] font-medium py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          exportSize === s ? 'bg-[#6C5CE7]/15 border-[#6C5CE7]/30 text-[#6C5CE7]' : 'bg-text-base/3 border-text-base/6 text-text-base/35 hover:text-text-base/60 hover:bg-text-base/6'
                        }`}
                      >
                        {s}px
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadSvg}
                    className="flex-1 text-[12.5px] font-medium py-2.5 rounded-lg border bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    Download SVG
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadPng}
                    className="flex-1 text-[12.5px] font-medium py-2.5 rounded-lg border bg-text-base/5 border-text-base/10 text-text-base/60 hover:text-text-base hover:bg-text-base/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    Download PNG
                  </motion.button>
                </div>
              </div>

              {/* Code Snippets Section */}
              <IllustrationCodeTabs
                slug={currentSlug}
                title={currentTitle}
                cdnUrl={cdnUrl}
                svgCode={svgCode}
                copiedField={copiedField}
                onCopy={copyToClipboard}
              />

              {/* Tags & Keywords */}
              {item?.keywords && (
                <div className="bg-text-base/3 border border-text-base/8 rounded-2xl p-4 flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-text-base/40">Keywords</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.keywords.split(' ').map((kw, i) => (
                      <span
                        key={`${kw}-${i}`}
                        className="text-[11px] font-mono text-text-base/60 bg-text-base/4 px-2 py-0.5 rounded border border-text-base/6"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related Illustrations Grid */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-text-base/8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-serif text-text-base">Related Illustrations</h3>
                <Link to={`/illustration?category=${item?.category || 'object'}`} className="text-[12px] font-mono text-text-base/50 hover:text-text-base">
                  View all in {item?.category} &rarr;
                </Link>
              </div>
              <IconTooltipProvider openDelay={500} closeDelay={200}>
                <Highlight className="absolute inset-0 rounded-xl ring-1 ring-text-base/20 bg-text-base/7 pointer-events-none">
                  <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5">
                    {related.map((rel) => (
                      <IllustrationCard key={rel.slug} item={rel} size={36} />
                    ))}
                  </div>
                </Highlight>
              </IconTooltipProvider>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
