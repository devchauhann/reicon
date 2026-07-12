import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { FigmaIcon, McpIcon, SvelteIcon, VueIcon, SvgIcon } from '../../components/usage/framework/icons';

export interface PackageItem {
    id: string;
    name: string;
    npmPkg: string;
    description: string;
    icon: React.ReactNode;
    npmUrl: string;
    sourceUrl: string;
    guideUrl: string;
}

export const PACKAGES: PackageItem[] = [
    {
        id: 'vanilla',
        name: 'reicon',
        npmPkg: 'reicon',
        description: 'A Reicon icon library package for web and JavaScript applications.',
        icon: <IoLogoJavascript className="text-yellow-400" size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/usage/vanilla',
    },
    {
        id: 'react',
        name: 'reicon-react',
        npmPkg: 'reicon-react',
        description: 'A Reicon icon library package for React applications.',
        icon: <FaReact className="text-[#61DAFB]" size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-react',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/usage/react',
    },
    {
        id: 'react-native',
        name: 'reicon-react-native',
        npmPkg: 'reicon-react-native',
        description: 'React Native icon components for Reicon. Tree-shakeable, TypeScript-ready. Works with Expo and bare React Native.',
        icon: <FaReact className="text-[#61DAFB]" size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-react-native',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/usage/react-native',
    },
    {
        id: 'vue',
        name: 'reicon-vue',
        npmPkg: 'reicon-vue',
        description: 'Vue 3 icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with Nuxt 3.',
        icon: <VueIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-vue',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/usage/vue',
    },
    {
        id: 'svelte',
        name: 'reicon-svelte',
        npmPkg: 'reicon-svelte',
        description: 'Svelte icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with SvelteKit.',
        icon: <SvelteIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-svelte',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/usage/svelte',
    },
];

export interface ToolItem {
    id: string;
    name: string;
    badge: { label: string; color: string };
    version: string;
    description: string;
    icon: React.ReactNode;
    guideUrl: string;
    primaryAction: { label: string; href: string };
    sourceUrl: string;
}

export const TOOLS: ToolItem[] = [
    {
        id: 'figma',
        name: 'reicon-figma',
        badge: { label: 'Figma Plugin', color: '#F24E1E' },
        version: 'v1.0.0',
        description: 'Integrate Reicon directly into your Figma workspace. Search, customize size/stroke weights, and insert vector shapes into your designs.',
        icon: <FigmaIcon size={48} />,
        guideUrl: '/usage/figma',
        primaryAction: { label: 'Open in Figma', href: 'https://www.figma.com/community/plugin/1652983191908763066' },
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-figma',
    },
    {
        id: 'vscode',
        name: 'reicon-vscode',
        badge: { label: 'VS Code Extension', color: '#007ACC' },
        version: 'v1.0.3',
        description: "Browse and insert Reicon icons directly into your HTML, React, Vue, Svelte, or vanilla JS code from your editor's sidebar panel.",
        icon: <VscVscodeInsiders className="text-[#007ACC]" size={48} />,
        guideUrl: '/usage/vscode',
        primaryAction: { label: 'Use', href: 'https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon' },
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-vscode',
    },
    {
        id: 'mcp',
        name: 'reicon-mcp',
        badge: { label: 'MCP Server', color: '#6C5CE7' },
        version: 'v1.0.0',
        description: 'Search, preview, and apply Reicon icons from AI agents and automation tools via MCP or CLI.',
        icon: <McpIcon size={48} />,
        guideUrl: '/usage/mcp',
        primaryAction: { label: 'Guide', href: '/usage/mcp' },
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-mcp',
    },
];

export const SVG_PACKAGE = {
    name: 'reicon-svg',
    guideUrl: '/usage/svg',
    downloadUrl: '/reicon-icons.zip',
    description: 'Download the complete raw vector assets. Includes all Reicon icons in both outline and filled weights in black SVG format, fully compressed.',
    icon: <SvgIcon size={48} />,
};
