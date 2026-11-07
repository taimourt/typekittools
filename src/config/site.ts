export const siteConfig = {
  name: "TypeKitTools",
  domain: "typekittools.com",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://typekittools.com",
  description:
    "The all-in-one utility platform for typing, special characters, alt codes, Unicode inspectors, text styling, emoji tools, and developer encoders.",
  author: "TypeKitTools Team",
  targetLocales: ["en-US", "en-GB", "en-CA", "en-AU"],
  ogImage: "/icons/og-image.png",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  themeColor: "#0284c7", // Sky/Blue-600
};

export type SiteConfig = typeof siteConfig;

