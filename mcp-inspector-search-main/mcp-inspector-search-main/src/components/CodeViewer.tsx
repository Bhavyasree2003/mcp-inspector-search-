import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeViewer = () => {
  const serverCode = `// index.js - MCP Server Implementation
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";

// Create MCP server instance
const server = new Server(
  {
    name: "file-search-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register the search tool
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_file",
        description: "Search for a keyword within a file and return matching lines",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "Path to the file to search",
            },
            keyword: {
              type: "string",
              description: "Keyword to search for in the file",
            },
          },
          required: ["filePath", "keyword"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "search_file") {
    const { filePath, keyword } = request.params.arguments;

    try {
      // Read the file content
      const content = await fs.readFile(filePath, "utf-8");
      const lines = content.split("\\n");

      // Search for keyword
      const results = lines
        .map((line, index) => ({
          line: index + 1,
          content: line,
        }))
        .filter((item) =>
          item.content.toLowerCase().includes(keyword.toLowerCase())
        );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                matches: results.length,
                results: results,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error.message,
            }),
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error("Unknown tool");
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("File Search MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});`;

  const packageJson = `{
  "name": "mcp-file-search-server",
  "version": "1.0.0",
  "description": "MCP server for searching keywords in files",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  },
  "engines": {
    "node": ">=18"
  }
}`;

  const readmeContent = `# MCP File Search Server

A Model Context Protocol (MCP) server that provides file search capabilities.

## Features

- Search for keywords within text files
- Returns line numbers and matching content
- Supports case-insensitive search

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

### Running the Server

\`\`\`bash
npm start
\`\`\`

### Using with MCP Inspector

1. Install MCP Inspector:
\`\`\`bash
npx @modelcontextprotocol/inspector node index.js
\`\`\`

2. Open the Inspector in your browser
3. Use the \`search_file\` tool with parameters:
   - \`filePath\`: Path to the file to search
   - \`keyword\`: Keyword to search for

### Example Request

\`\`\`json
{
  "name": "search_file",
  "arguments": {
    "filePath": "./example.txt",
    "keyword": "function"
  }
}
\`\`\`

### Example Response

\`\`\`json
{
  "matches": 3,
  "results": [
    {
      "line": 5,
      "content": "function searchFile(keyword) {"
    },
    {
      "line": 12,
      "content": "  // function implementation"
    },
    {
      "line": 20,
      "content": "export default function;"
    }
  ]
}
\`\`\`

## Tool Specification

**Name:** \`search_file\`

**Description:** Search for a keyword within a file and return matching lines

**Parameters:**
- \`filePath\` (string, required): Path to the file to search
- \`keyword\` (string, required): Keyword to search for in the file

## GitHub Repository

Clone or download the complete source code from the repository.
`;

  return (
    <Card className="border-primary/30 bg-card card-3d glow-effect relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <CardHeader className="relative z-10">
        <CardTitle className="gradient-text">MCP Server Implementation</CardTitle>
        <CardDescription>Complete source code for the file search MCP server</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Tabs defaultValue="server" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
            <TabsTrigger value="server">index.js</TabsTrigger>
            <TabsTrigger value="package">package.json</TabsTrigger>
            <TabsTrigger value="readme">README.md</TabsTrigger>
          </TabsList>

          <TabsContent value="server">
            <ScrollArea className="h-[600px] rounded-md border border-border bg-muted/30 p-4">
              <pre className="text-xs text-foreground">
                <code>{serverCode}</code>
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="package">
            <ScrollArea className="h-[600px] rounded-md border border-border bg-muted/30 p-4">
              <pre className="text-xs text-foreground">
                <code>{packageJson}</code>
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="readme">
            <ScrollArea className="h-[600px] rounded-md border border-border bg-muted/30 p-4">
              <pre className="text-xs text-foreground">
                <code>{readmeContent}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
