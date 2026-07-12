import { Framework } from './constants';

export function getFrameworkSectionId(framework: Framework): string {
  switch (framework) {
    case 'react': return 'react-usage';
    case 'react-native': return 'react-native-usage';
    case 'vue': return 'vue-usage';
    case 'svelte': return 'svelte-usage';
    case 'figma': return 'figma';
    case 'vscode': return 'vscode';
    case 'mcp': return 'mcp';
    case 'svg': return 'svg-usage';
    default: return 'cdn';
  }
}

export function getFrameworkLabel(framework: Framework): string {
  switch (framework) {
    case 'react': return 'React';
    case 'react-native': return 'React Native';
    case 'vue': return 'Vue';
    case 'svelte': return 'Svelte';
    case 'figma': return 'Figma';
    case 'vscode': return 'VS Code';
    case 'mcp': return 'MCP Server';
    case 'svg': return 'Raw SVGs';
    default: return 'Vanilla JS / CDN';
  }
}

export function isStandaloneFramework(framework: Framework): boolean {
  return framework === 'figma' || framework === 'vscode' || framework === 'mcp' || framework === 'svg';
}

export const MCP_ON_THIS_PAGE = [
  { id: 'mcp', label: 'MCP Server' },
  { id: 'mcp-installation', label: 'Installation' },
  { id: 'mcp-configuration', label: 'MCP Configuration' },
  { id: 'mcp-agent-workflow', label: 'Agent Workflow' },
  { id: 'mcp-tools-reference', label: 'Tools Reference' },
  { id: 'mcp-cli-usage', label: 'CLI Usage' },
  { id: 'mcp-file-insertion', label: 'Scripted File Insertion' },
  { id: 'mcp-offline-operation', label: 'Offline Operation' },
] as const;

export function getOnThisPageSections(framework: Framework): { id: string; label: string }[] {
  const frameworkEntry = {
    id: getFrameworkSectionId(framework),
    label: getFrameworkLabel(framework),
  };

  if (framework === 'mcp') return [...MCP_ON_THIS_PAGE];

  if (isStandaloneFramework(framework)) return [frameworkEntry];

  return [
    frameworkEntry,
    { id: 'props', label: 'Props' },
    { id: 'weights', label: 'Icon Weights' },
    { id: 'styling', label: 'Styling & Color' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'performance', label: 'Performance' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];
}
