import SectionHeader from '../../components/usage/SectionHeader';
import SyntaxBlock from '../../components/usage/SyntaxBlock';
import { McpIcon } from '../../components/usage/framework/icons';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

const MCP_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["reicon-mcp"]
    }
  }
}`;

const MCP_DEV_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "node",
      "args": ["./packages/reicon-mcp/bin/run.cjs"]
    }
  }
}`;

const SEARCH_TOOL = `search_icons({ query: "heart", weight: "Filled" })`;

const APPLY_TOOL = `apply_icon({
  name: "heart",
  weight: "Filled",
  framework: "react",
  size: 24,
  color: "#ef4444"
})`;

const FILE_MARKER_CMD = `npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"`;

export default function McpUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="mcp" className="mb-16 scroll-mt-24">
      <SectionHeader
        id="mcp"
        title="MCP Server"
        level="h2"
        markdownContent={markdownContent}
        icon={<McpIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> package exposes Reicon icons to AI agents through the{' '}
        <a href="https://modelcontextprotocol.io" className="text-[#6C5CE7] hover:underline" target="_blank" rel="noopener noreferrer">
          Model Context Protocol
        </a>
        . Agents can search, preview SVG markup, and generate copy-pasteable code snippets without human input.
      </p>

      <ul className="text-text-base/55 text-[14px] leading-[1.8] mb-8 list-disc pl-5 space-y-1">
        <li>Search 2,700+ icons by keyword with ranked results</li>
        <li>Preview raw SVG markup before applying an icon</li>
        <li>Generate framework-specific import and usage snippets</li>
        <li>Browse icons by category</li>
        <li>Run the same logic from a CLI for scripts and CI</li>
      </ul>

      <div className="mt-8 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">1. Installation</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Install from npm or build from the monorepo.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-4">
        <SyntaxBlock
          title="npm"
          onCopy={() => onCopy('npm install reicon-mcp', 'mcp-install')}
          copied={copiedField === 'mcp-install'}
        >
          <span className="text-[#98c379]">npm install</span>
          <span className="text-text-base/70"> reicon-mcp</span>
        </SyntaxBlock>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <p className="text-text-base/50 text-[14px] leading-relaxed mb-4">From source:</p>
        <SyntaxBlock
          title="monorepo"
          onCopy={() => onCopy('git clone https://github.com/dqev/reicon.git\ncd reicon\nnpm run build:mcp', 'mcp-source')}
          copied={copiedField === 'mcp-source'}
        >
          <span className="text-[#98c379]">git clone</span>
          <span className="text-text-base/70"> https://github.com/dqev/reicon.git</span>
          <br />
          <span className="text-[#98c379]">cd</span>
          <span className="text-text-base/70"> reicon</span>
          <br />
          <span className="text-[#98c379]">npm run</span>
          <span className="text-text-base/70"> build:mcp</span>
        </SyntaxBlock>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">2. MCP Configuration</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Add the server to your MCP client. With no arguments, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> starts a stdio MCP server.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-4">
        <SyntaxBlock
          title="MCP config"
          onCopy={() => onCopy(MCP_CONFIG, 'mcp-config')}
          copied={copiedField === 'mcp-config'}
        >
          <span className="text-text-base/70">{MCP_CONFIG}</span>
        </SyntaxBlock>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <p className="text-text-base/50 text-[14px] leading-relaxed mb-4">For a local development build:</p>
        <SyntaxBlock
          title="local dev"
          onCopy={() => onCopy(MCP_DEV_CONFIG, 'mcp-dev-config')}
          copied={copiedField === 'mcp-dev-config'}
        >
          <span className="text-text-base/70">{MCP_DEV_CONFIG}</span>
        </SyntaxBlock>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">3. Agent Workflow</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          A typical two-step flow for an agent adding an icon to a React component.
        </p>
      </div>

      <div className="space-y-6 text-[14px] text-text-base/50 leading-relaxed mb-8">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs">1</div>
          <div>
            <h4 className="text-text-base font-medium mb-2">Search with concise keywords</h4>
            <p className="mb-3">Use short terms like <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">cart</code> or <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">settings</code> — not full sentences.</p>
            <SyntaxBlock
              title="search_icons"
              onCopy={() => onCopy(SEARCH_TOOL, 'mcp-search-tool')}
              copied={copiedField === 'mcp-search-tool'}
            >
              <span className="text-text-base/70">{SEARCH_TOOL}</span>
            </SyntaxBlock>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs">2</div>
          <div>
            <h4 className="text-text-base font-medium mb-2">Apply the chosen icon</h4>
            <p className="mb-3">Returns <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">importStatement</code> and <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">usageSnippet</code> for the agent to insert.</p>
            <SyntaxBlock
              title="apply_icon"
              onCopy={() => onCopy(APPLY_TOOL, 'mcp-apply-tool')}
              copied={copiedField === 'mcp-apply-tool'}
            >
              <span className="text-text-base/70 whitespace-pre">{APPLY_TOOL}</span>
            </SyntaxBlock>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">4. Tools Reference</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Four MCP tools are exposed by the server.
        </p>
      </div>

      <div className="overflow-x-auto mb-8 rounded-2xl border border-text-base/4">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-text-base/6 bg-text-base/3">
              <th className="px-5 py-3 font-medium text-text-base">Tool</th>
              <th className="px-5 py-3 font-medium text-text-base">Input</th>
              <th className="px-5 py-3 font-medium text-text-base">Returns</th>
            </tr>
          </thead>
          <tbody className="text-text-base/55">
            <tr className="border-b border-text-base/4">
              <td className="px-5 py-3 font-mono text-text-base/70">search_icons</td>
              <td className="px-5 py-3"><code className="text-[12px]">query</code>, optional <code className="text-[12px]">weight</code>, <code className="text-[12px]">limit</code></td>
              <td className="px-5 py-3">Ranked matches with name, weight, category, tags, score</td>
            </tr>
            <tr className="border-b border-text-base/4">
              <td className="px-5 py-3 font-mono text-text-base/70">view_icon</td>
              <td className="px-5 py-3"><code className="text-[12px]">name</code>, <code className="text-[12px]">weight</code></td>
              <td className="px-5 py-3">Raw SVG string, viewBox, tags, category</td>
            </tr>
            <tr className="border-b border-text-base/4">
              <td className="px-5 py-3 font-mono text-text-base/70">apply_icon</td>
              <td className="px-5 py-3"><code className="text-[12px]">name</code>, <code className="text-[12px]">weight</code>, <code className="text-[12px]">framework</code>, optional <code className="text-[12px]">size</code>, <code className="text-[12px]">color</code></td>
              <td className="px-5 py-3">Framework-specific import and usage snippets</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-mono text-text-base/70">list_categories</td>
              <td className="px-5 py-3">None</td>
              <td className="px-5 py-3">All distinct category values</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">5. CLI Usage</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          The same binary supports CLI mode when arguments are provided.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <SyntaxBlock
          title="Search"
          onCopy={() => onCopy('npx reicon-mcp search "shopping cart"', 'mcp-search')}
          copied={copiedField === 'mcp-search'}
        >
          <span className="text-[#98c379]">npx reicon-mcp search</span>
          <span className="text-text-base/70"> "shopping cart"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="View"
          onCopy={() => onCopy('npx reicon-mcp view heart --weight Filled', 'mcp-view')}
          copied={copiedField === 'mcp-view'}
        >
          <span className="text-[#98c379]">npx reicon-mcp view</span>
          <span className="text-text-base/70"> heart --weight Filled</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Apply"
          onCopy={() => onCopy('npx reicon-mcp apply heart --framework react --size 32 --color "#ef4444"', 'mcp-apply')}
          copied={copiedField === 'mcp-apply'}
        >
          <span className="text-[#98c379]">npx reicon-mcp apply</span>
          <span className="text-text-base/70"> heart --framework react --size 32 --color "#ef4444"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Categories"
          onCopy={() => onCopy('npx reicon-mcp categories', 'mcp-categories')}
          copied={copiedField === 'mcp-categories'}
        >
          <span className="text-[#98c379]">npx reicon-mcp categories</span>
        </SyntaxBlock>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">6. Scripted File Insertion</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          For CI or scripts without an agent supervising edits, use <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">--file</code> and <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">--marker</code> to insert code directly.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <SyntaxBlock
          title="file marker"
          onCopy={() => onCopy(FILE_MARKER_CMD, 'mcp-file-marker')}
          copied={copiedField === 'mcp-file-marker'}
        >
          <span className="text-[#98c379]">npx reicon-mcp apply</span>
          <span className="text-text-base/70"> heart --framework react --file src/App.tsx --marker "&#123;/* ICON */&#125;"</span>
        </SyntaxBlock>
        <p className="text-text-base/45 text-[13px] leading-relaxed mt-4">
          Replaces the exact marker with the usage snippet and inserts the import at the top if missing. Exits non-zero if the marker is not found.
        </p>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">7. Offline Operation</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          The search index is bundled at build time from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">data/icon-data.json</code>. No network calls are made at runtime — once installed, the server works fully offline.
        </p>
        <p className="text-text-base/45 text-[14px] leading-relaxed mt-3">
          Rebuild with <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">npm run build:mcp</code> after the icon dataset changes to refresh the bundled index.
        </p>
      </div>
    </section>
  );
}
