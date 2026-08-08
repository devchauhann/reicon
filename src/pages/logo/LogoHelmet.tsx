import { useEffect } from 'react';

interface LogoHelmetProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function LogoHelmet({
  title = '4,900+ Free SVG Brand Logos — High Quality Vector Logos | Reicon',
  description = 'Browse and download 4,900+ clean vector brand logos for tech companies, frameworks, AI, and global brands. Free SVG & PNG formats. MIT licensed.',
  image = 'https://reicon.dev/og/logos.jpeg',
  url = 'https://reicon.dev/logos',
}: LogoHelmetProps) {
  useEffect(() => {
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // Standard Description
    setMeta('name', 'description', description);

    // OpenGraph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
  }, [title, description, image, url]);

  return null;
}
