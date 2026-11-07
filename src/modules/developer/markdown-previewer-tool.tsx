"use client";

import React, { useState, useMemo } from "react";
import { Eye, Code, Copy, Check, FileDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { renderMarkdownToHtml } from "@/lib/developer/advanced-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_MARKDOWN = `# TypeKitTools Markdown Previewer 🚀

Welcome to the **TypeKitTools** real-time Markdown editor and previewer!

## Features at a Glance

- **GitHub Flavored Markdown (GFM)** standard support
- Real-time instant side-by-side rendering
- Fenced code blocks with clean formatting:
\`\`\`typescript
interface ToolDefinition {
  id: string;
  name: string;
  category: "unicode" | "developer";
}
\`\`\`
- Interactive blockquotes:
> "Simplicity is the soul of efficiency." — Austin Freeman

### Checklist & Tasks

- [x] High-performance client-side rendering
- [x] Zero-latency typing experience
- [ ] Export directly to HTML file

Visit our [Tool Catalog](https://typekittools.com/tools) to explore all utilities!
`;

export function MarkdownPreviewerTool() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"preview" | "raw-html">("preview");

  const renderedHtml = useMemo(() => {
    return renderMarkdownToHtml(markdown);
  }, [markdown]);

  const handleCopyHtml = async () => {
    const ok = await copyToClipboard(renderedHtml);
    if (ok) {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  const handleDownloadHtml = () => {
    const fullHtmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rendered Markdown</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
    pre { background: #f1f5f9; padding: 16px; border-radius: 8px; overflow-x: auto; font-family: monospace; }
    code { font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
    blockquote { border-left: 4px solid #0d9488; margin: 0; padding-left: 16px; color: #64748b; }
    a { color: #0d9488; }
  </style>
</head>
<body>
${renderedHtml}
</body>
</html>`;

    const blob = new Blob([fullHtmlDoc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rendered-document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={activeTab === "preview" ? "default" : "outline"}
            onClick={() => setActiveTab("preview")}
            className="text-xs font-semibold gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Visual Preview</span>
          </Button>
          <Button
            size="sm"
            variant={activeTab === "raw-html" ? "default" : "outline"}
            onClick={() => setActiveTab("raw-html")}
            className="text-xs font-semibold gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw HTML Code</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyHtml}
            className="text-xs gap-1.5"
          >
            {copiedHtml ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>HTML Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy HTML</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadHtml}
            className="text-xs gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download HTML</span>
          </Button>
        </div>
      </div>

      {/* Main Dual-Pane Editor & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Markdown Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground select-none">
            <span className="uppercase tracking-wider">MARKDOWN EDITOR</span>
            <span className="font-mono text-[11px] opacity-80">
              {Array.from(markdown).length} chars • {markdown.split("\n").length} lines
            </span>
          </div>

          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={20}
            placeholder="Type GitHub Flavored Markdown here..."
            className="w-full p-4 rounded-xl border border-input bg-background font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y leading-relaxed shadow-xs"
          />
        </div>

        {/* Right: Rendered HTML Preview or Raw HTML Code */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground select-none">
            <span className="uppercase tracking-wider">
              {activeTab === "preview" ? "RENDERED OUTPUT" : "GENERATED HTML MARKUP"}
            </span>
            <span className="font-mono text-[11px] opacity-80">
              {renderedHtml.length} bytes HTML
            </span>
          </div>

          {activeTab === "preview" ? (
            <div
              className="p-6 rounded-xl border border-border/60 bg-card min-h-[440px] max-h-[600px] overflow-y-auto shadow-xs text-sm"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          ) : (
            <textarea
              readOnly
              value={renderedHtml}
              rows={20}
              className="w-full p-4 rounded-xl border border-border/60 bg-muted/20 font-mono text-xs text-foreground focus:outline-none resize-y leading-relaxed shadow-xs select-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}

