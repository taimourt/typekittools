/**
 * Pure TypeScript Line and Word Diff Engine
 * Myers / LCS-based diffing for text comparison.
 */

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
  text: string;
}

export interface DiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
  unchanged: number;
}

/**
 * Longest Common Subsequence line diffing
 */
export function computeLineDiff(
  originalText: string,
  modifiedText: string,
  options: { ignoreWhitespace?: boolean } = {}
): DiffResult {
  let oldLines = originalText.split(/\r?\n/);
  let newLines = modifiedText.split(/\r?\n/);

  if (originalText === "" && modifiedText === "") {
    return { lines: [], additions: 0, deletions: 0, unchanged: 0 };
  }
  if (originalText === "") {
    return {
      lines: newLines.map((line, idx) => ({
        type: "added",
        newLineNumber: idx + 1,
        text: line,
      })),
      additions: newLines.length,
      deletions: 0,
      unchanged: 0,
    };
  }
  if (modifiedText === "") {
    return {
      lines: oldLines.map((line, idx) => ({
        type: "removed",
        oldLineNumber: idx + 1,
        text: line,
      })),
      additions: 0,
      deletions: oldLines.length,
      unchanged: 0,
    };
  }

  const normalize = (s: string) => (options.ignoreWhitespace ? s.trim().replace(/\s+/g, " ") : s);

  const m = oldLines.length;
  const n = newLines.length;

  // LCS Matrix
  // Optimization: use 2D array or 1D Uint32Array for performance
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (normalize(oldLines[i - 1]) === normalize(newLines[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  let i = m;
  let j = n;
  const result: DiffLine[] = [];
  let additions = 0;
  let deletions = 0;
  let unchanged = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normalize(oldLines[i - 1]) === normalize(newLines[j - 1])) {
      result.unshift({
        type: "unchanged",
        oldLineNumber: i,
        newLineNumber: j,
        text: newLines[j - 1],
      });
      unchanged++;
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({
        type: "added",
        newLineNumber: j,
        text: newLines[j - 1],
      });
      additions++;
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({
        type: "removed",
        oldLineNumber: i,
        text: oldLines[i - 1],
      });
      deletions++;
      i--;
    }
  }

  return { lines: result, additions, deletions, unchanged };
}

/**
 * Generate standard Git Unified Patch format
 */
export function generateUnifiedPatch(
  filename: string,
  originalText: string,
  modifiedText: string,
  diff: DiffResult
): string {
  const header = `--- a/${filename}\n+++ b/${filename}\n@@ -1,${originalText.split("\n").length} +1,${modifiedText.split("\n").length} @@\n`;
  const body = diff.lines
    .map((line) => {
      const prefix = line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";
      return prefix + line.text;
    })
    .join("\n");
  return header + body;
}

