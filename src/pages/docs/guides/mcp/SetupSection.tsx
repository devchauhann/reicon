import SyntaxBlock from '../../../../components/docs/SyntaxBlock';
import { MCP_CONFIG, MCP_DEV_CONFIG } from './config';

interface SetupSectionProps {
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export default function SetupSection({ copiedField, onCopy }: SetupSectionProps) {
  return (
    <>
      <h3 id="mcp-configuration" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        MCP Configuration
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Add the server to your MCP client (like Claude Desktop or Cursor). With no arguments, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> starts a stdio MCP server.
      </p>

      <SyntaxBlock
        title="MCP config"
        onCopy={() => onCopy(MCP_CONFIG, 'mcp-config')}
        copied={copiedField === 'mcp-config'}
      >
        <span className="text-text-base/70">{'{'}</span>{' \n'}
        {'  '}<span className="text-[#e06c75]">&quot;mcpServers&quot;</span><span className="text-text-base/50">: </span><span className="text-text-base/70">{'{'}</span>{'\n'}
        {'    '}<span className="text-[#e06c75]">&quot;reicon&quot;</span><span className="text-text-base/50">: </span><span className="text-text-base/70">{'{'}</span>{'\n'}
        {'      '}<span className="text-[#e06c75]">&quot;command&quot;</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">&quot;npx&quot;</span><span className="text-text-base/70">,</span>{'\n'}
        {'      '}<span className="text-[#e06c75]">&quot;args&quot;</span><span className="text-text-base/50">: </span><span className="text-text-base/70">[</span><span className="text-[#98c379]">&quot;reicon-mcp&quot;</span><span className="text-text-base/70">]</span>{'\n'}
        {'    '}<span className="text-text-base/70">{'}'}</span>{'\n'}
        {'  '}<span className="text-text-base/70">{'}'}</span>{'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4 mt-6">
        For a local development build from the cloned monorepo, point directly to the binary build:
      </p>

      <SyntaxBlock
        title="local dev"
        onCopy={() => onCopy(MCP_DEV_CONFIG, 'mcp-dev-config')}
        copied={copiedField === 'mcp-dev-config'}
      >
        <span className="text-text-base/70">{'{'}</span>{'\n'}
        {'  '}<span className="text-[#e06c75]">&quot;mcpServers&quot;</span><span className="text-text-base/50">: </span><span className="text-text-base/70">{'{'}</span>{'\n'}
        {'    '}<span className="text-[#e06c75]">&quot;reicon&quot;</span><span className="text-text-base/50">: </span><span className="text-text-base/70">{'{'}</span>{'\n'}
        {'      '}<span className="text-[#e06c75]">&quot;command&quot;</span><span className="text-text-base/50">: </span><span className="text-[#98c379]">&quot;node&quot;</span><span className="text-text-base/70">,</span>{'\n'}
        {'      '}<span className="text-[#e06c75]">&quot;args&quot;</span><span className="text-text-base/50">: </span><span className="text-text-base/70">[</span><span className="text-[#98c379]">&quot;./packages/reicon-mcp/bin/run.cjs&quot;</span><span className="text-text-base/70">]</span>{'\n'}
        {'    '}<span className="text-text-base/70">{'}'}</span>{'\n'}
        {'  '}<span className="text-text-base/70">{'}'}</span>{'\n'}
        <span className="text-text-base/70">{'}'}</span>
      </SyntaxBlock>
    </>
  );
}
