import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/usage/SectionHeader';
import UsageLeftSidebar from '../components/usage/sidebar/Left';
import UsageRightSidebar from '../components/usage/sidebar/Right';
import UsageMobileNav from '../components/usage/sidebar/Mobile';
import UsageActionsBar from '../components/usage/ActionsBar';
import { FrameworkIcon } from '../components/usage/framework/icons';
import { FRAMEWORKS, NAV_ITEMS, Framework } from '../components/usage/framework/constants';
import { getFrameworkSectionId, getFrameworkLabel, getOnThisPageSections, isStandaloneFramework } from '../components/usage/framework/helpers';
import { usageSidebarStyles } from '../components/usage/sidebar/styles';

import ReactUsage from './usage/ReactUsage';
import ReactNativeUsage from './usage/ReactNativeUsage';
import VueUsage from './usage/VueUsage';
import SvelteUsage from './usage/SvelteUsage';
import CdnUsage from './usage/CdnUsage';
import FigmaUsage from './usage/FigmaUsage';
import VscodeUsage from './usage/VscodeUsage';
import McpUsage from './usage/McpUsage';
import SvgUsage from './usage/SvgUsage';
import PropsTable from './usage/PropsTable';
import Weights from './usage/Weights';
import TypeScriptSection from './usage/TypeScriptSection';
import Accessibility from './usage/Accessibility';
import Styling from './usage/Styling';
import Performance from './usage/Performance';
import Troubleshooting from './usage/Troubleshooting';

import vanillaDocs from '../../docs/javascript/usage.md?raw';
import reactDocs from '../../docs/react/usage.md?raw';
import reactNativeDocs from '../../docs/react-native/usage.md?raw';
import vueDocs from '../../docs/vue/usage.md?raw';
import svelteDocs from '../../docs/svelte/usage.md?raw';
import figmaDocs from '../../docs/figma/usage.md?raw';
import vscodeDocs from '../../docs/vscode/usage.md?raw';
import mcpDocs from '../../docs/mcp/usage.md?raw';
import svgDocs from '../../docs/svg/usage.md?raw';
import propsDocs from '../../docs/shared/props.md?raw';
import weightsDocs from '../../docs/shared/weights.md?raw';
import typescriptDocs from '../../docs/shared/typescript.md?raw';
import stylingDocs from '../../docs/shared/styling.md?raw';
import accessibilityDocs from '../../docs/shared/accessibility.md?raw';
import performanceDocs from '../../docs/shared/performance.md?raw';
import troubleshootingDocs from '../../docs/shared/troubleshooting.md?raw';

export default function UsagePage() {
  const { framework: fwParam } = useParams<{ framework?: string }>();
  const navigate = useNavigate();
  const initialFw = (fwParam as Framework) || 'vanilla';

  const [framework, setFramework] = useState<Framework>(
    FRAMEWORKS.some((f) => f.id === initialFw) ? initialFw : 'vanilla'
  );
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const otpListRef = useRef<HTMLUListElement>(null);

  const frameworkSectionId = getFrameworkSectionId(framework);
  const frameworkLabel = getFrameworkLabel(framework);

  const introItems = !fwParam
    ? [{ id: 'what-is-reicon', label: 'What is Reicon?' }]
    : [{ id: 'intro', label: '← Back to Intro' }];

  const onThisPage = !fwParam
    ? [
      { id: 'what-is-reicon', label: 'What is Reicon?' },
      { id: 'props', label: 'Props' },
      { id: 'weights', label: 'Icon Weights' },
      { id: 'styling', label: 'Styling & Color' },
      { id: 'accessibility', label: 'Accessibility' },
      { id: 'performance', label: 'Performance' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
    ]
    : getOnThisPageSections(framework);

  const githubUrl = 'https://github.com/dqev/reicon';

  const getDocsPath = () => {
    switch (framework) {
      case 'react': return 'react/usage.md';
      case 'react-native': return 'react-native/usage.md';
      case 'vue': return 'vue/usage.md';
      case 'svelte': return 'svelte/usage.md';
      case 'figma': return 'figma/usage.md';
      case 'vscode': return 'vscode/usage.md';
      case 'mcp': return 'mcp/usage.md';
      case 'svg': return 'svg/usage.md';
      default: return 'javascript/usage.md';
    }
  };

  const githubEditUrl = `https://github.com/dqev/reicon/edit/main/docs/${getDocsPath()}`;

  // ── helpers ──────────────────────────────────────────────────────────────

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const getActiveFwDocs = () => {
    switch (framework) {
      case 'react': return reactDocs;
      case 'react-native': return reactNativeDocs;
      case 'vue': return vueDocs;
      case 'svelte': return svelteDocs;
      case 'figma': return figmaDocs;
      case 'vscode': return vscodeDocs;
      case 'mcp': return mcpDocs;
      case 'svg': return svgDocs;
      default: return vanillaDocs;
    }
  };

  const getFullMarkdown = () => {
    const fwDocs = getActiveFwDocs();
    if (isStandaloneFramework(framework)) return fwDocs;
    return `${fwDocs}\n\n${propsDocs}\n\n${weightsDocs}\n\n${stylingDocs}\n\n${accessibilityDocs}\n\n${performanceDocs}\n\n${typescriptDocs}\n\n${troubleshootingDocs}`;
  };

  const handleCopyPageMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(getFullMarkdown());
      setCopiedPage(true);
      showToast('Full page markdown copied!');
      setTimeout(() => setCopiedPage(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const openInLLM = async (platform: 'chatgpt' | 'claude' | 't3') => {
    const markdown = getFullMarkdown();
    try { await navigator.clipboard.writeText(markdown); } catch { /* silent */ }
    const promptText = `Here is the Reicon documentation for ${frameworkLabel}. Please read it and help me use the library:\n\n${markdown}`;
    const urls = {
      chatgpt: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(promptText)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(promptText)}`,
      t3: `https://t3.chat/new?q=${encodeURIComponent(promptText)}`,
    };
    setOpenDropdown(false);
    showToast('Markdown copied! Opening AI Chat...');
    window.open(urls[platform], '_blank');
  };

  const scrollTo = (id: string) => {
    if (id === 'intro') {
      navigate('/usage');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const switchFramework = (fw: Framework) => {
    setFramework(fw);
    setDropdownOpen(false);
    navigate(`/usage/${fw}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const fw = fwParam as Framework;
    if (fw && FRAMEWORKS.some((f) => f.id === fw)) setFramework(fw);
  }, [fwParam]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) { if (e.isIntersecting) setActiveSection(e.target.id); }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    contentRef.current?.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [framework]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (openDropdownRef.current && !openDropdownRef.current.contains(e.target as Node)) setOpenDropdown(false);
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) setMobileNavOpen(false);
    };
    const handleScroll = () => setMobileNavOpen(false);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!otpListRef.current) return;
    const activeEl = otpListRef.current.querySelector('.otp-item.active') as HTMLElement;
    if (activeEl) {
      setOtpIndicatorStyle({ top: activeEl.offsetTop + (activeEl.offsetHeight - 16) / 2, height: 16, opacity: 1 });
    } else {
      setOtpIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, framework]);

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Helmet>
        <title>Usage Guide & Documentation — Reicon Icons</title>
        <meta name="description" content="Integrate Reicon icons into your project. Complete documentation for Vanilla JS, React, React Native, Vue, Svelte, Figma, VS Code, MCP Server, and direct SVG integration." />
        <link rel="canonical" href="https://reicon.dev/usage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/usage" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Usage Guide & Documentation — Reicon" />
        <meta property="og:description" content="Integrate Reicon icons into your project. Complete documentation for Vanilla JS, React, React Native, Vue, Svelte, Figma, VS Code, MCP Server, and direct SVG integration." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=4" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Usage Guide — Reicon" />
        <meta name="twitter:description" content="Integrate Reicon icons into your project. Complete documentation for React, React Native, Vue, Svelte, MCP Server, and more." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=4" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
            { "@type": "ListItem", "position": 2, "name": "Usage", "item": "https://reicon.dev/usage" },
          ],
        })}</script>
      </Helmet>

      <Header />

      <div className="flex flex-1 pt-14">
        <style>{usageSidebarStyles}</style>

        <UsageLeftSidebar
          framework={framework}
          fwParam={fwParam}
          frameworkSectionId={frameworkSectionId}
          frameworkLabel={frameworkLabel}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          dropdownRef={dropdownRef}
          introItems={introItems}
          activeSection={activeSection}
          onNavClick={scrollTo}
          onFrameworkSwitch={switchFramework}
        />

        <UsageMobileNav
          mobileNavRef={mobileNavRef}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
          framework={framework}
          fwParam={fwParam}
          activeSection={activeSection}
          onThisPage={onThisPage}
          onNavClick={scrollTo}
          onFrameworkSwitch={switchFramework}
        />

        {/* ── Main content ── */}
        <main ref={contentRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-16 pt-14 lg:pt-8 pb-36 lg:pb-8 overflow-x-hidden">
          <div className="max-w-3xl">

            {/* What is Reicon — shown on base /usage route */}
            {!fwParam && (
              <>
                <section id="what-is-reicon" data-section className="mb-12 scroll-mt-24">
                  <SectionHeader id="what-is-reicon" title="What is Reicon?" level="h2" markdownContent={vanillaDocs} />
                  <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
                    Reicon is an open-source icon library that provides beautifully crafted vector (SVG) icons for digital projects.
                    The library offers the core <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon</code> package for JavaScript and CDN, plus framework-specific packages for{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react-native</code>,{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code>, and{' '}
                    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-svelte</code>.
                  </p>
                  <p className="text-text-base/60 text-[15px] leading-[1.8]">
                    Every icon comes in two weights — Outline and Filled — and is fully customizable with size, color, and custom props.
                    Icons are tree-shakeable when used with bundlers, ensuring minimal bundle size.
                  </p>
                </section>
                <hr className="border-text-base/6 mb-12" />
              </>
            )}

            {/* Framework selector grid — shown on base /usage route */}
            {!fwParam ? (
              <section className="mb-12">
                <h2 className="text-lg font-serif text-text-base mb-6">Choose an Integration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => switchFramework(fw.id)}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-text-base/3 hover:bg-text-base/6 text-left transition-all border border-transparent hover:border-text-base/5 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-text-base/5 flex items-center justify-center text-lg shrink-0">
                        <FrameworkIcon id={fw.id} size={20} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-text-base mb-0.5">{fw.label}</h3>
                        <p className="text-[12px] text-text-base/40">View the {fw.label} integration guide</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ) : framework === 'react' ? (
              <ReactUsage markdownContent={reactDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'react-native' ? (
              <ReactNativeUsage markdownContent={reactNativeDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'vue' ? (
              <VueUsage markdownContent={vueDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'svelte' ? (
              <SvelteUsage markdownContent={svelteDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'figma' ? (
              <FigmaUsage markdownContent={figmaDocs} />
            ) : framework === 'vscode' ? (
              <VscodeUsage markdownContent={vscodeDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'mcp' ? (
              <McpUsage markdownContent={mcpDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'svg' ? (
              <SvgUsage markdownContent={svgDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : (
              <CdnUsage markdownContent={vanillaDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            )}

            {/* Shared docs sections — not shown for standalone frameworks */}
            {!isStandaloneFramework(framework) && (
              <>
                <hr className="border-text-base/6 mb-12" />
                <PropsTable markdownContent={propsDocs} />
                <hr className="border-text-base/6 mb-12" />
                <Weights markdownContent={weightsDocs} copiedField={copiedField} onCopy={copyToClipboard} />
                <hr className="border-text-base/6 mb-12" />
                <TypeScriptSection markdownContent={typescriptDocs} copiedField={copiedField} onCopy={copyToClipboard} />
                <hr className="border-text-base/6 mb-12" />
                <Styling markdownContent={stylingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
                <hr className="border-text-base/6 mb-12" />
                <Accessibility markdownContent={accessibilityDocs} copiedField={copiedField} onCopy={copyToClipboard} />
                <hr className="border-text-base/6 mb-12" />
                <Performance markdownContent={performanceDocs} copiedField={copiedField} onCopy={copyToClipboard} />
                <hr className="border-text-base/6 mb-12" />
                <Troubleshooting markdownContent={troubleshootingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
              </>
            )}

            <hr className="border-text-base/6 my-12" />

            <UsageActionsBar
              copiedPage={copiedPage}
              openDropdown={openDropdown}
              openDropdownRef={openDropdownRef}
              githubEditUrl={githubEditUrl}
              githubUrl={githubUrl}
              onCopyMarkdown={handleCopyPageMarkdown}
              onOpenDropdown={setOpenDropdown}
              onOpenInLLM={openInLLM}
            />

            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-[999] bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
        </main>

        <UsageRightSidebar
          onThisPage={onThisPage}
          activeSection={activeSection}
          otpIndicatorStyle={otpIndicatorStyle}
          otpListRef={otpListRef}
          onNavClick={scrollTo}
        />
      </div>

      <Footer />
    </div>
  );
}
