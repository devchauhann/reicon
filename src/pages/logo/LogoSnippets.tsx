export function LogoReactSnippet({ pascalName, slug, variant }: { pascalName: string; slug: string; variant: string }) {
  const cdnUrl = `https://cdn.reicon.dev/logos/${slug}/${variant}.svg`;
  return (
    <>
      <span className="text-[#c678dd]">import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}Logo</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-logos'</span><span className="text-text-base/30">;</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">{pascalName}Logo</span>
      <span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span>
      <span className="text-text-base/70"> /{'>'}</span>
      {'\n\n'}
      <span className="text-text-base/30">{`// Or using direct image URL:`}</span>
      {'\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">img</span>
      <span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{cdnUrl}"</span>
      <span className="text-[#d19a66]"> alt</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{pascalName}"</span>
      <span className="text-text-base/70"> className</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6"</span>
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function LogoVueSnippet({ pascalName, slug, variant }: { pascalName: string; slug: string; variant: string }) {
  const cdnUrl = `https://cdn.reicon.dev/logos/${slug}/${variant}.svg`;
  return (
    <>
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
      {'\n'}
      <span className="text-text-base/70">  {'<'}</span><span className="text-[#e06c75]">img</span>
      <span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{cdnUrl}"</span>
      <span className="text-[#d19a66]"> alt</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{pascalName}"</span>
      <span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6"</span>
      <span className="text-text-base/70"> /{'>'}</span>
      {'\n'}
      <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">template</span><span className="text-text-base/70">{'>'}</span>
    </>
  );
}

export function LogoSvelteSnippet({ pascalName, slug, variant }: { pascalName: string; slug: string; variant: string }) {
  const cdnUrl = `https://cdn.reicon.dev/logos/${slug}/${variant}.svg`;
  return (
    <>
      <span className="text-text-base/30">{'<'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/30">{'>'}</span>
      {'\n'}
      <span className="text-[#c678dd]">  import</span><span className="text-text-base/70">{' { '}</span>
      <span className="text-[#e5c07b]">{pascalName}Logo</span><span className="text-text-base/70">{' } '}</span>
      <span className="text-[#c678dd]">from</span><span className="text-[#98c379]"> 'reicon-logos'</span><span className="text-text-base/30">;</span>
      {'\n'}
      <span className="text-text-base/30">{'</'}</span><span className="text-[#e06c75]">script</span><span className="text-text-base/30">{'>'}</span>
      {'\n\n'}
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">img</span>
      <span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{cdnUrl}"</span>
      <span className="text-[#d19a66]"> alt</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{pascalName}"</span>
      <span className="text-[#d19a66]"> class</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"w-6 h-6"</span>
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function LogoCdnSnippet({ slug, variant, pascalName }: { slug: string; variant: string; pascalName: string }) {
  const cdnUrl = `https://cdn.reicon.dev/logos/${slug}/${variant}.svg`;
  return (
    <>
      <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">img</span>
      <span className="text-[#d19a66]"> src</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{cdnUrl}"</span>
      <span className="text-[#d19a66]"> alt</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"{pascalName}"</span>
      <span className="text-[#d19a66]"> width</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span>
      <span className="text-[#d19a66]"> height</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"24"</span>
      <span className="text-text-base/70"> /{'>'}</span>
    </>
  );
}

export function LogoSvgSnippet({ svgCode, slug, variant }: { svgCode: string; slug: string; variant: string }) {
  if (svgCode) {
    return <span className="text-text-base/80 font-mono whitespace-pre-wrap">{svgCode}</span>;
  }
  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">\n  <!-- ${slug} ${variant} SVG -->\n</svg>`;
  return <span className="text-text-base/80 font-mono whitespace-pre-wrap">{fallbackSvg}</span>;
}

export function LogoNpmSnippet({ slug }: { slug: string }) {
  return (
    <>
      <span className="text-[#98c379]">npm install reicon-logos</span>
      {'\n'}
      <span className="text-text-base/30"># or</span>
      {'\n'}
      <span className="text-[#98c379]">yarn add reicon-logos</span>
    </>
  );
}
