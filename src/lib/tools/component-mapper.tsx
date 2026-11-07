import React from "react";
import dynamic from "next/dynamic";

const LoadingFallback = () => (
  <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
    <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-xs text-slate-500 font-medium">Loading tool engine...</p>
  </div>
);

export const toolComponents: Record<string, React.ComponentType<any>> = {
  // Phase 3: The 15 core tools
  SymbolCopyTool: dynamic(() => import("@/modules/symbols/symbol-copy-tool").then((m) => m.SymbolCopyTool), {
    loading: LoadingFallback,
  }),
  UnicodeSearchTool: dynamic(() => import("@/modules/unicode/unicode-search-tool").then((m) => m.UnicodeSearchTool), {
    loading: LoadingFallback,
  }),
  AltCodeFinderTool: dynamic(() => import("@/modules/symbols/alt-code-finder-tool").then((m) => m.AltCodeFinderTool), {
    loading: LoadingFallback,
  }),
  AccentKeyboardTool: dynamic(() => import("@/modules/keyboard/accent-keyboard-tool").then((m) => m.AccentKeyboardTool), {
    loading: LoadingFallback,
  }),
  EmojiLibraryTool: dynamic(() => import("@/modules/emoji/emoji-library-tool").then((m) => m.EmojiLibraryTool), {
    loading: LoadingFallback,
  }),
  UnicodeConverterTool: dynamic(() => import("@/modules/unicode/unicode-converter-tool").then((m) => m.UnicodeConverterTool), {
    loading: LoadingFallback,
  }),
  CharacterInspectorTool: dynamic(() => import("@/modules/unicode/character-inspector-tool").then((m) => m.CharacterInspectorTool), {
    loading: LoadingFallback,
  }),
  HtmlEntityTool: dynamic(() => import("@/modules/developer/html-entity-tool").then((m) => m.HtmlEntityTool), {
    loading: LoadingFallback,
  }),
  AsciiTableTool: dynamic(() => import("@/modules/developer/ascii-table-tool").then((m) => m.AsciiTableTool), {
    loading: LoadingFallback,
  }),
  FancyTextTool: dynamic(() => import("@/modules/generators/fancy-text-tool").then((m) => m.FancyTextTool), {
    loading: LoadingFallback,
  }),
  Base64Tool: dynamic(() => import("@/modules/developer/base64-tool").then((m) => m.Base64Tool), {
    loading: LoadingFallback,
  }),
  UrlEncodeTool: dynamic(() => import("@/modules/developer/url-encode-tool").then((m) => m.UrlEncodeTool), {
    loading: LoadingFallback,
  }),
  JsonFormatterTool: dynamic(() => import("@/modules/developer/json-formatter").then((m) => m.JsonFormatterTool), {
    loading: LoadingFallback,
  }),
  CharacterCounterTool: dynamic(() => import("@/modules/unicode/character-counter-tool").then((m) => m.CharacterCounterTool), {
    loading: LoadingFallback,
  }),
  ZeroWidthCleaner: dynamic(() => import("@/modules/unicode/zero-width-cleaner").then((m) => m.ZeroWidthCleaner), {
    loading: LoadingFallback,
  }),

  // Additional Developer Tools
  KeyCodeTester: dynamic(() => import("@/modules/keyboard/key-code-tester").then((m) => m.KeyCodeTester), {
    loading: LoadingFallback,
  }),
  CaseConverterTool: dynamic(() => import("@/modules/developer/case-converter").then((m) => m.CaseConverterTool), {
    loading: LoadingFallback,
  }),
  UuidGeneratorTool: dynamic(() => import("@/modules/developer/uuid-generator").then((m) => m.UuidGeneratorTool), {
    loading: LoadingFallback,
  }),
  HashGeneratorTool: dynamic(() => import("@/modules/developer/hash-generator-tool").then((m) => m.HashGeneratorTool), {
    loading: LoadingFallback,
  }),
  TimestampConverterTool: dynamic(() => import("@/modules/developer/timestamp-converter-tool").then((m) => m.TimestampConverterTool), {
    loading: LoadingFallback,
  }),
  DiffCheckerTool: dynamic(() => import("@/modules/developer/diff-checker-tool").then((m) => m.DiffCheckerTool), {
    loading: LoadingFallback,
  }),
  RegexTesterTool: dynamic(() => import("@/modules/developer/regex-tester-tool").then((m) => m.RegexTesterTool), {
    loading: LoadingFallback,
  }),

  // Phase 8 - Batch A: Unicode and text
  Utf8EncoderDecoderTool: dynamic(() => import("@/modules/unicode/utf8-encoder-decoder").then((m) => m.Utf8EncoderDecoderTool), {
    loading: LoadingFallback,
  }),
  Utf16ConverterTool: dynamic(() => import("@/modules/unicode/utf16-converter").then((m) => m.Utf16ConverterTool), {
    loading: LoadingFallback,
  }),
  UnicodeNormalizerTool: dynamic(() => import("@/modules/unicode/unicode-normalizer").then((m) => m.UnicodeNormalizerTool), {
    loading: LoadingFallback,
  }),
  TextReverserTool: dynamic(() => import("@/modules/generators/text-reverser").then((m) => m.TextReverserTool), {
    loading: LoadingFallback,
  }),
  TextRepeaterTool: dynamic(() => import("@/modules/generators/text-repeater").then((m) => m.TextRepeaterTool), {
    loading: LoadingFallback,
  }),
  LineBreakRemoverTool: dynamic(() => import("@/modules/generators/line-break-remover").then((m) => m.LineBreakRemoverTool), {
    loading: LoadingFallback,
  }),

  // Phase 8 - Batch B: Developer utilities
  HtmlFormatterTool: dynamic(() => import("@/modules/developer/html-formatter-tool").then((m) => m.HtmlFormatterTool), {
    loading: LoadingFallback,
  }),
  CssFormatterTool: dynamic(() => import("@/modules/developer/css-formatter-tool").then((m) => m.CssFormatterTool), {
    loading: LoadingFallback,
  }),
  CssEscapeTool: dynamic(() => import("@/modules/developer/css-escape-tool").then((m) => m.CssEscapeTool), {
    loading: LoadingFallback,
  }),
  JsUnicodeConverterTool: dynamic(() => import("@/modules/developer/js-unicode-converter").then((m) => m.JsUnicodeConverterTool), {
    loading: LoadingFallback,
  }),
  HexConverterTool: dynamic(() => import("@/modules/developer/hex-converter").then((m) => m.HexConverterTool), {
    loading: LoadingFallback,
  }),
  BinaryConverterTool: dynamic(() => import("@/modules/developer/binary-converter").then((m) => m.BinaryConverterTool), {
    loading: LoadingFallback,
  }),
  DecimalConverterTool: dynamic(() => import("@/modules/developer/decimal-converter").then((m) => m.DecimalConverterTool), {
    loading: LoadingFallback,
  }),

  // Phase 8 - Batch C: Advanced tools
  JsonValidatorTool: dynamic(() => import("@/modules/developer/json-validator-tool").then((m) => m.JsonValidatorTool), {
    loading: LoadingFallback,
  }),
  XmlFormatterTool: dynamic(() => import("@/modules/developer/xml-formatter-tool").then((m) => m.XmlFormatterTool), {
    loading: LoadingFallback,
  }),
  MarkdownPreviewerTool: dynamic(() => import("@/modules/developer/markdown-previewer-tool").then((m) => m.MarkdownPreviewerTool), {
    loading: LoadingFallback,
  }),
  UrlParserTool: dynamic(() => import("@/modules/developer/url-parser-tool").then((m) => m.UrlParserTool), {
    loading: LoadingFallback,
  }),
  QueryStringBuilderTool: dynamic(() => import("@/modules/developer/query-string-builder-tool").then((m) => m.QueryStringBuilderTool), {
    loading: LoadingFallback,
  }),
  JwtDecoderTool: dynamic(() => import("@/modules/developer/jwt-decoder-tool").then((m) => m.JwtDecoderTool), {
    loading: LoadingFallback,
  }),
  ColorConverterTool: dynamic(() => import("@/modules/developer/color-converter-tool").then((m) => m.ColorConverterTool), {
    loading: LoadingFallback,
  }),
};

export function getToolComponent(componentId: string): React.ComponentType<any> | null {
  return toolComponents[componentId] || null;
}
