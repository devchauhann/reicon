import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import LogoHelmet from './LogoHelmet';
import LogoPreview from './LogoPreview';
import LogoActions from './LogoActions';
import LogoCodeTabs from './LogoCodeTabs';
import RelatedLogos from './RelatedLogos';
import TypeTable from '../../components/docs/TypeTable';
import {
  LogoItem,
  getLogoDetail,
  getLogoUrl,
  getRelatedLogos,
} from '../../lib/logo-data';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function LogoDetail() {
  const { name: slugParam } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [logo, setLogo] = useState<LogoItem | null>(null);
  const [relatedLogos, setRelatedLogos] = useState<LogoItem[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>('original');
  const [previewSize, setPreviewSize] = useState<number>(128);
  const [exportSize, setExportSize] = useState<number>(48);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!slugParam) return;
    setLoading(true);

    getLogoDetail(slugParam).then((item) => {
      setLogo(item);
      const defaultVar = item?.defaultVariant || 'original';
      setSelectedVariant(defaultVar);
      setLoading(false);

      if (item) {
        getRelatedLogos(item.slug).then(setRelatedLogos);
      }
    });
  }, [slugParam]);

  const flashToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleVariantChange = (varKey: string) => {
    setSelectedVariant(varKey);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    flashToast(`Copied ${field.replace('code-', '')} snippet!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadSvg = () => {
    if (!logo) {
      flashToast('error');
      return;
    }
    
    const activeUrl = logo.variants[selectedVariant] || getLogoUrl(logo.slug, selectedVariant);
    const proxyUrl = activeUrl.replace('https://cdn.reicon.dev', '/cdn-proxy');

    fetch(proxyUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${logo.slug}-${selectedVariant}.svg`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        flashToast(`Downloaded ${logo.name} SVG!`);
      })
      .catch(() => {
        window.open(activeUrl, '_blank');
      });
  };

  const handleDownloadRaster = (format: 'png' | 'webp') => {
    if (!logo) {
      flashToast('error');
      return;
    }
    
    const activeUrl = logo.variants[selectedVariant] || getLogoUrl(logo.slug, selectedVariant);
    const proxyUrl = activeUrl.replace("https://cdn.reicon.dev", "/cdn-proxy");
    
    const canvas = document.createElement('canvas');
    canvas.width = exportSize;
    canvas.height = exportSize;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, exportSize, exportSize);
        ctx.drawImage(img, 0, 0, exportSize, exportSize);
        const dataUrl = canvas.toDataURL(`image/${format}`);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${logo.slug}-${selectedVariant}-${exportSize}x${exportSize}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        flashToast(`Downloaded ${format.toUpperCase()} (${exportSize}px)!`);
      }
    };

    img.src = proxyUrl;
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/logos');
    }
  };

  const handleReset = () => {
    if (logo) {
      setSelectedVariant(logo.defaultVariant || 'original');
      setPreviewSize(128);
      setExportSize(48);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base pt-28 pb-16 px-4 md:px-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-text-base/40">
          <div className="w-8 h-8 rounded-full border-2 border-text-base/20 border-t-text-base animate-spin" />
          <p className="text-xs font-mono">Loading logo details...</p>
        </div>
      </div>
    );
  }

  if (!logo) {
    return (
      <div className="min-h-screen bg-bg-base pt-28 pb-16 px-4 md:px-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-text-base mb-2">Logo Not Found</h1>
        <p className="text-sm text-text-base/60 mb-6">Could not find logo details for "{slugParam}".</p>
        <Link
          to="/logos"
          className="px-4 py-2 text-xs font-medium bg-text-base text-bg-base rounded-xl hover:opacity-90 transition-opacity"
        >
          Back to All Logos
        </Link>
      </div>
    );
  }

  const activeUrl = logo.variants[selectedVariant] || getLogoUrl(logo.slug, selectedVariant);
  const pascalName = logo.slug
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  return (
    <div className="flex-1">
      <LogoHelmet
        title={`${logo.name} Vector Logo SVG — Free Download & Code | Reicon`}
        description={`Free vector logo for ${logo.name}. Download SVG & PNG, copy clean code for React, Vue, HTML & CSS. High quality SVG vector logo.`}
        image="https://reicon.dev/og/logos-detail.jpeg"
        url={`https://reicon.dev/logo/${logo.slug}`}
      />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-12 md:pt-24 md:pb-16">
          {/* Header Bar with Back Button & Breadcrumbs */}
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
              <Link to="/logos" className="hover:text-text-base/70 transition-colors shrink-0">logo</Link>
              <span className="text-text-base/25 shrink-0" aria-hidden="true">/</span>
              <span className="text-text-base/80 font-medium truncate" aria-current="page">{logo.slug}</span>
            </nav>
          </div>

          <h1 className="sr-only">{logo.name} brand logo — Reicon</h1>

          {/* Grid Layout matching IconDetail.tsx 100% */}
          <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-6 lg:gap-8">
            <LogoPreview
              logo={logo}
              selectedVariant={selectedVariant}
              previewSize={previewSize}
              activeUrl={activeUrl}
              onSelectVariant={handleVariantChange}
              onSetPreviewSize={setPreviewSize}
              onReset={handleReset}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="flex flex-col gap-5 min-w-0"
            >
              <LogoActions
                pascalName={pascalName}
                slug={logo.slug}
                name={logo.name}
                activeUrl={activeUrl}
                exportSize={exportSize}
                copiedField={copiedField}
                onCopy={handleCopy}
                onDownloadSvg={handleDownloadSvg}
                onDownloadPng={() => handleDownloadRaster('png')}
                onDownloadWebp={() => handleDownloadRaster('webp')}
                onSetExportSize={setExportSize}
              />

              <LogoCodeTabs
                slug={logo.slug}
                name={logo.name}
                variant={selectedVariant}
                svgUrl={activeUrl}
                copiedField={copiedField}
                handleCopy={handleCopy}
              />

              <div>
                <h3 className="text-[11px] font-medium text-text-base/40 uppercase tracking-wider mb-3">Props</h3>
                <TypeTable rows={[
                  { prop: 'src', type: 'string', default: activeUrl, description: 'SVG image source URL' },
                  { prop: 'alt', type: 'string', default: logo.name, description: 'Brand alt title tag' },
                  { prop: 'className?', type: 'string', default: 'w-6 h-6', description: 'CSS sizing classes' },
                ]} />
              </div>
            </motion.div>
          </div>

          {/* Related Brands */}
          {relatedLogos.length > 0 && (
            <RelatedLogos relatedLogos={relatedLogos} />
          )}
        </div>
      </main>

      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4"
          >
            <div className="bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base/80 text-[13px] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
