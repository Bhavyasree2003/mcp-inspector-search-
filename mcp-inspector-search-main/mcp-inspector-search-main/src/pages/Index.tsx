import { useState } from "react";
import { Search, FileText, Code2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import InspectorPanel from "@/components/InspectorPanel";
import CodeViewer from "@/components/CodeViewer";
import ServerInfo from "@/components/ServerInfo";

const Index = () => {
  const [fileContent, setFileContent] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ line: number; content: string }>>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
        toast.success(`File "${file.name}" loaded successfully`);
      };
      reader.readAsText(file);
    }
  };

  const handleSearch = () => {
    if (!fileContent) {
      toast.error("Please upload a file first");
      return;
    }
    if (!searchKeyword) {
      toast.error("Please enter a keyword to search");
      return;
    }

    const lines = fileContent.split("\n");
    const results = lines
      .map((line, index) => ({ line: index + 1, content: line }))
      .filter((item) => item.content.toLowerCase().includes(searchKeyword.toLowerCase()));

    setSearchResults(results);
    toast.success(`Found ${results.length} matches for "${searchKeyword}"`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="parallax-bg" />
      
      <header className="border-b border-border bg-card/50 backdrop-blur relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-50 animate-pulse" />
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl pulse-glow" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center gap-4 slide-in-3d">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary glow-effect floating pulse-glow">
              <Code2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">MCP Server Inspector</h1>
              <p className="text-sm text-muted-foreground">Model Context Protocol Development Tool</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 perspective-container relative z-10">
        <Tabs defaultValue="inspector" className="space-y-6 slide-in-3d">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 glow-effect">
            <TabsTrigger value="inspector" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:pulse-glow transition-all">
              <Play className="h-4 w-4" />
              Inspector
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:pulse-glow transition-all">
              <FileText className="h-4 w-4" />
              Server Code
            </TabsTrigger>
            <TabsTrigger value="info" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:pulse-glow transition-all">
              <Code2 className="h-4 w-4" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inspector" className="space-y-6">
            <InspectorPanel
              fileContent={fileContent}
              searchKeyword={searchKeyword}
              searchResults={searchResults}
              onFileUpload={handleFileUpload}
              onSearchKeywordChange={setSearchKeyword}
              onSearch={handleSearch}
            />
          </TabsContent>

          <TabsContent value="code">
            <CodeViewer />
          </TabsContent>

          <TabsContent value="info">
            <ServerInfo />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
