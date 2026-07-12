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

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> package exposes Reicon icons to AI agents through the Model Context Protocol. Agents can search, preview SVG markup, and generate copy-pasteable code snippets without human input.
      </p>

      <div className="mt-8 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">1. Installation</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Install from npm or build from the monorepo.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <SyntaxBlock
          title="npm"
          onCopy={() => onCopy('npm install reicon-mcp', 'mcp-install')}
          copied={copiedField === 'mcp-install'}
        >
          <span className="text-[#98c379]">npm install</span>
          <span className="text-text-base/70"> reicon-mcp</span>
        </SyntaxBlock>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">2. MCP Configuration</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          Add the server to your MCP client. With no arguments, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> starts a stdio MCP server.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-2xl p-6 border border-text-base/4 mb-8">
        <SyntaxBlock
          title="MCP config"
          onCopy={() => onCopy(MCP_CONFIG, 'mcp-config')}
          copied={copiedField === 'mcp-config'}
        >
          <span className="text-text-base/70">{MCP_CONFIG}</span>
        </SyntaxBlock>
      </div>

      <div className="mt-10 mb-6 border-b border-text-base/6 pb-4">
        <h3 className="text-xl font-serif text-text-base mb-2">3. CLI Usage</h3>
        <p className="text-text-base/60 text-[15px] leading-[1.8]">
          The same binary supports CLI mode when arguments are provided.
        </p>
      </div>

      <div className="space-y-4">
        <SyntaxBlock
          title="Search"
          onCopy={() => onCopy('npx reicon-mcp search "shopping cart"', 'mcp-search')}
          copied={copiedField === 'mcp-search'}
        >
          <span className="text-[#98c379]">npx reicon-mcp search</span>
          <span className="text-text-base/70"> "shopping cart"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Apply"
          onCopy={() => onCopy('npx reicon-mcp apply heart --framework react --size 32 --color "#ef4444"', 'mcp-apply')}
          copied={copiedField === 'mcp-apply'}
        >
          <span className="text-[#98c379]">npx reicon-mcp apply</span>
          <span className="text-text-base/70"> heart --framework react --size 32 --color "#ef4444"</span>
        </SyntaxBlock>
      </div>
    </section>
  );
}
