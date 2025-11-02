import { Search, Upload, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTilt } from "@/hooks/use-tilt";

interface InspectorPanelProps {
  fileContent: string;
  searchKeyword: string;
  searchResults: Array<{ line: number; content: string }>;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeywordChange: (value: string) => void;
  onSearch: () => void;
}

const InspectorPanel = ({
  fileContent,
  searchKeyword,
  searchResults,
  onFileUpload,
  onSearchKeywordChange,
  onSearch,
}: InspectorPanelProps) => {
  const inputCardRef = useTilt();
  const outputCardRef = useTilt();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card ref={inputCardRef} className="border-primary/30 bg-card card-3d glow-effect tilt-on-hover relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="absolute top-4 right-4 animate-pulse">
          <Sparkles className="h-6 w-6 text-primary/40" />
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 gradient-text">
            <FileText className="h-5 w-5 text-primary floating" />
            Input
          </CardTitle>
          <CardDescription>Upload a file and search for keywords</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Upload File</label>
            <div className="flex gap-2">
              <Input
                type="file"
                accept=".txt,.js,.ts,.tsx,.jsx,.json,.md,.py,.java,.cpp,.c,.h"
                onChange={onFileUpload}
                className="flex-1 bg-muted/50"
              />
              <Button variant="secondary" className="gap-2">
                <Upload className="h-4 w-4" />
                Browse
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Search Keyword</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter keyword to search..."
                value={searchKeyword}
                onChange={(e) => onSearchKeywordChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                className="flex-1 bg-muted/50"
              />
              <Button onClick={onSearch} className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-effect pulse-glow transition-all hover:scale-105">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {fileContent && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">File Preview</label>
              <ScrollArea className="h-[200px] rounded-md border border-border bg-muted/30 p-4">
                <pre className="text-xs text-muted-foreground">
                  <code>{fileContent}</code>
                </pre>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      <Card ref={outputCardRef} className="border-accent/30 bg-card card-3d glow-effect tilt-on-hover relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
        <div className="absolute top-4 left-4 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="h-6 w-6 text-accent/40" />
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Search className="h-5 w-5 text-accent floating" />
            Output
          </CardTitle>
          <CardDescription>Search results will appear here</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              <div className="rounded-lg border border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 px-3 py-2 glow-effect">
                <p className="text-sm font-medium gradient-text">
                  Found {searchResults.length} match{searchResults.length !== 1 ? "es" : ""}
                </p>
              </div>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-accent/30 bg-muted/30 p-3 transition-all hover:bg-muted/50 hover:border-accent/50 hover:transform hover:scale-[1.02] hover:shadow-lg slide-in-3d"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded bg-gradient-to-r from-accent to-primary px-2 py-0.5 text-xs font-medium text-white pulse-glow">
                          Line {result.line}
                        </span>
                      </div>
                      <pre className="overflow-x-auto text-sm text-foreground">
                        <code>{result.content}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
              <div className="text-center">
                <Search className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No search results yet</p>
                <p className="text-xs text-muted-foreground">Upload a file and search for keywords</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectorPanel;
