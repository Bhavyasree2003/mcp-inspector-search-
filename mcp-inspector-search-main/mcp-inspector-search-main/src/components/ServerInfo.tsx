import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Server, CheckCircle2, Terminal } from "lucide-react";

const ServerInfo = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            About MCP Protocol
          </CardTitle>
          <CardDescription>Model Context Protocol fundamentals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide
            context to LLMs. It enables building servers that expose data and functionality to AI models in a
            secure and standardized way.
          </p>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Key Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Standardized protocol for AI model integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Tool-based architecture for extensibility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Secure communication over stdio or HTTP</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            This Implementation
          </CardTitle>
          <CardDescription>File search tool specification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Tool: search_file</h3>
            <p className="text-sm text-muted-foreground">
              Searches for a specified keyword within a file and returns all matching lines with line numbers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Parameters</h3>
            <div className="rounded-md border border-border bg-muted/30 p-3 space-y-2">
              <div>
                <code className="text-xs text-primary">filePath</code>
                <span className="text-xs text-muted-foreground ml-2">(string, required)</span>
                <p className="text-xs text-muted-foreground mt-1">Path to the file to search</p>
              </div>
              <div>
                <code className="text-xs text-primary">keyword</code>
                <span className="text-xs text-muted-foreground ml-2">(string, required)</span>
                <p className="text-xs text-muted-foreground mt-1">Keyword to search for (case-insensitive)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            Running the Server
          </CardTitle>
          <CardDescription>How to run and test the MCP server</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">1. Install Dependencies</h3>
              <div className="rounded-md border border-border bg-muted/30 p-3">
                <code className="text-xs text-primary">npm install</code>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">2. Run with MCP Inspector</h3>
              <div className="rounded-md border border-border bg-muted/30 p-3">
                <code className="text-xs text-primary">npx @modelcontextprotocol/inspector node index.js</code>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">3. Test the Tool</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Use the MCP Inspector web interface to test the search_file tool with sample inputs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerInfo;
