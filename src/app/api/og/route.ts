import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = (searchParams.get("title") || "TypeKitTools").replace(/[<>&"']/g, "");
  const description = (
    searchParams.get("description") ||
    "All-in-one typing tools, special symbols, Unicode utilities & developer converters."
  ).replace(/[<>&"']/g, "");
  const category = (searchParams.get("category") || "Utility Platform").replace(/[<>&"']/g, "");

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#14b8a6" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Grid overlay -->
  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="100" x2="1200" y2="100" />
    <line x1="0" y1="200" x2="1200" y2="200" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="400" x2="1200" y2="400" />
    <line x1="0" y1="500" x2="1200" y2="500" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Top Logo & Brand -->
  <g transform="translate(80, 70)">
    <rect width="48" height="48" rx="12" fill="url(#tealGrad)" />
    <text x="24" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">TK</text>
    <text x="64" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#f8fafc">
      TypeKit<tspan fill="#14b8a6">Tools</tspan>
    </text>
  </g>

  <!-- Category Badge -->
  <g transform="translate(920, 75)">
    <rect width="200" height="40" rx="20" fill="#14b8a6" fill-opacity="0.15" stroke="#14b8a6" stroke-opacity="0.4" />
    <text x="100" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#2dd4bf" text-anchor="middle" letter-spacing="1">
      ${category.toUpperCase()}
    </text>
  </g>

  <!-- Title & Description -->
  <g transform="translate(80, 240)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-1">
      ${title}
    </text>
    <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">
      ${description}
    </text>
  </g>

  <!-- Bottom Divider & Features -->
  <line x1="80" y1="520" x2="1120" y2="520" stroke="#334155" stroke-width="1" />

  <g transform="translate(80, 565)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#64748b">
    <text x="0" y="0">✓ 100% Client-Side Privacy</text>
    <text x="240" y="0">✓ Zero Network Latency</text>
    <text x="460" y="0">✓ Instant 1-Click Copy</text>
    <text x="960" y="0" fill="#14b8a6" font-weight="700">typekittools.com</text>
  </g>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

