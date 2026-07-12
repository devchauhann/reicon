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
