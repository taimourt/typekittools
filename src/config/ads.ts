export interface AdZoneConfig {
  id: string;
  name: string;
  minHeight: number; // In pixels, to reserve layout space and prevent CLS
  defaultFormat: "leaderboard" | "rectangle" | "responsive" | "banner";
  ariaLabel: string;
}

export const adZones: Record<string, AdZoneConfig> = {
  HEADER_BELOW_NAV: {
    id: "HEADER_BELOW_NAV",
    name: "Header Below Navigation",
    minHeight: 90,
    defaultFormat: "leaderboard",
    ariaLabel: "Advertisement banner below navigation",
  },
  TOOL_BELOW_MAIN: {
    id: "TOOL_BELOW_MAIN",
    name: "Tool Bottom Placement",
    minHeight: 250,
    defaultFormat: "rectangle",
    ariaLabel: "Advertisement below primary utility interface",
  },
  ARTICLE_INLINE: {
    id: "ARTICLE_INLINE",
    name: "Article In-Text Placement",
    minHeight: 250,
    defaultFormat: "rectangle",
    ariaLabel: "Advertisement within article content",
  },
  FOOTER_ABOVE: {
    id: "FOOTER_ABOVE",
    name: "Footer Placement",
    minHeight: 90,
    defaultFormat: "leaderboard",
    ariaLabel: "Advertisement banner above footer",
  },
};

