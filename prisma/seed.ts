import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Roles
  const roles = [
    { name: "Super Administrator", slug: "super_admin", description: "Full system access and settings control" },
    { name: "Administrator", slug: "admin", description: "Tool, symbol, and guide management" },
    { name: "Editor", slug: "editor", description: "Content drafting and publication" },
    { name: "Viewer", slug: "viewer", description: "Read-only access to admin reports" },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { slug: r.slug },
      update: {},
      create: r,
    });
  }
  console.log("Roles seeded.");

  // 2. Seed Core Categories
  const categories = [
    {
      slug: "symbols",
      name: "Symbols & Special Characters",
      description: "Alt codes, currency symbols, arrows, math, and copy-paste characters.",
      icon: "Sparkles",
      sortOrder: 1,
      isPublished: true,
    },
    {
      slug: "keyboard",
      name: "Keyboard & Typing",
      description: "Key event tester, typing speed tests (WPM), keyboard layout guides, and shortcuts.",
      icon: "Keyboard",
      sortOrder: 2,
      isPublished: true,
    },
    {
      slug: "unicode",
      name: "Unicode Utilities",
      description: "Character inspector, codepoint lookup, zero-width space remover, and homoglyphs.",
      icon: "FileCode2",
      sortOrder: 3,
      isPublished: true,
    },
    {
      slug: "generators",
      name: "Text Generators",
      description: "Aesthetic fancy fonts, small text, upside down, strikethrough, and NATO phonetic.",
      icon: "Sparkles",
      sortOrder: 4,
      isPublished: true,
    },
    {
      slug: "developer",
      name: "Developer Utilities",
      description: "Base64, JSON formatter, URL encoder, Hash generator, UUIDs, and timestamps.",
      icon: "Binary",
      sortOrder: 5,
      isPublished: true,
    },
    {
      slug: "emoji",
      name: "Emoji Directory",
      description: "Categorized emoji picker, skin tones, combinations, and copy-ready slugs.",
      icon: "Smile",
      sortOrder: 6,
      isPublished: true,
    },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  console.log("Categories seeded.");

  // 3. Seed Default Site Settings
  const settings = [
    { key: "SITE_NAME", value: "TypeKitTools", description: "Public brand name", isPublic: true },
    { key: "ENABLE_ADS", value: "false", description: "Global Google AdSense display toggle", isPublic: true },
    { key: "TARGET_LOCALES", value: "en-US,en-GB,en-CA,en-AU", description: "Target primary geographic markets", isPublic: true },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log("Site settings seeded.");

  // 4. Seed Ad Placements
  const adPlacements = [
    { zoneKey: "HEADER_BELOW_NAV", name: "Header Banner", provider: "ADSENSE", format: "leaderboard", responsive: true, isEnabled: true },
    { zoneKey: "TOOL_BELOW_MAIN", name: "Tool Bottom Slot", provider: "ADSENSE", format: "rectangle", responsive: true, isEnabled: true },
    { zoneKey: "ARTICLE_INLINE", name: "Article In-Text", provider: "ADSENSE", format: "rectangle", responsive: true, isEnabled: true },
    { zoneKey: "FOOTER_ABOVE", name: "Footer Banner", provider: "ADSENSE", format: "leaderboard", responsive: true, isEnabled: true },
  ];

  for (const a of adPlacements) {
    await prisma.adPlacement.upsert({
      where: { zoneKey: a.zoneKey },
      update: {},
      create: a,
    });
  }
  console.log("Ad placements seeded.");

  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

