# TypeKitTools.com

> The production-grade all-in-one utility platform for typing, special characters, Windows Alt codes, Mac Option shortcuts, official Unicode 16.0 character lookups, text generators, emoji directories, and developer utilities.

- **Primary Target Markets**: United States, United Kingdom, Canada, Australia
- **Business Model**: 100% Free utilities, high-intent organic Google traffic, GDPR/CCPA compliant Google AdSense monetization
- **Architecture**: Next.js 15 App Router, TypeScript strict mode, Prisma ORM 6, Tailwind CSS, shadcn/ui design tokens, zero-CLS advertising containers

---

## 🛠 Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router with React Server Components)
- **Language**: TypeScript 5 in strict mode
- **Database & ORM**: PostgreSQL 16 with [Prisma ORM](https://www.prisma.io/) 6 (15 models + migrations)
- **Design System**: Tailwind CSS with dark slate typography and teal accents (`#14b8a6`)
- **Typography & UI**: Accessible UI primitives, Lucide icons, `next/dynamic` code splitting
- **Cryptography & Security**: PBKDF2 password hashing, HMAC-SHA256 session tokens, client-side Web Crypto
- **Unicode Database**: Official Unicode 16.0 database pipeline (150,000+ characters, multi-field search engine)
- **Testing**: Zero-dependency high-speed test runner (`tests/test-runner.ts`) + Playwright E2E suite
- **Containerization**: Multi-stage production `Dockerfile` and `docker-compose.yml`

---

## 🏛 Platform Architecture & Core Pillars

### 1. Symbols & Special Characters
- **Symbol Copy & Paste Library**: Search, filter, and 1-click copy thousands of symbols, currency marks, arrows, and math operators.
- **Alt Code Finder**: Numeric keypad Alt codes for Windows and Option-key shortcuts for macOS.
- **Unicode Character Detail Pages** (`/symbols/detail/[slug]`): Preview, official Unicode notation, decimal, UTF-8 byte representation, HTML entity, and platform typing instructions.

### 2. Keyboard & Typing Tools
- **Virtual Accent Keyboard**: Type European diacritics for Spanish, French, German, and Portuguese.
- **JavaScript KeyCode Tester**: Real-time event inspector for `event.key`, `event.code`, `which`, and modifier states.
- **Character & Word Counter**: Live grapheme-accurate counter (surrogate pairs and emoji sequences), reading time, and byte sizes.

### 3. Unicode Utilities
- **Unicode Search Engine**: Multi-field search by name, glyph, hex code point (`U+XXXX`), decimal, or curated aliases.
- **Unicode Converter**: Convert between escape sequences (`\uXXXX`), UTF-8 hex bytes, and HTML entities.
- **Character Inspector**: Deep inspect strings to reveal hidden zero-width spaces, surrogate pairs, and grapheme counts.
- **Invisible Character Cleaner**: Detect, copy, or strip zero-width spaces, word joiners, and soft hyphens.

### 4. Text Generators
- **Fancy Text Generator**: Aesthetic Unicode font transformations: Fraktur, bold script, bubbles, small caps.
- **Text Case Converter**: Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.

### 5. Emoji Directory
- **Emoji Library & Directory**: Full emoji catalogue with category filters, skin-tone modifier selector, and 1-click copy.

### 6. Developer Utilities & Encoders
- **Cryptographic Hash Generator**: Browser-side MD5 (RFC 1321), CRC32, SHA-1, SHA-256, SHA-384, SHA-512, and HMAC signatures.
- **Unix Timestamp & Epoch Converter**: Live clock, bidirectional timestamp/date conversion, relative offsets, and target market timezones (US Eastern/Pacific, UK GMT/BST, Canada, Australia AEST).
- **Text Diff Checker**: Side-by-side split & unified code comparison with additions/deletions stats and Git patch export.
- **Regex Tester & Match Visualizer**: Live regular expression tester with capture groups table, substitution tool, presets, and cheat sheet.
- **Base64 Encoder / Decoder**: RFC 4648 compliant string and file encoder/decoder with UTF-8 support.
- **URL Encoder / Decoder**: Percent-encode and decode query parameters according to RFC 3986.
- **JSON Formatter & Validator**: Prettify, validate, minify, and inspect JSON payloads with real-time error syntax highlighting.
- **HTML Entity Converter**: Encode text to named, decimal, and hex HTML entities and decode entities back to plain text.
- **ASCII Table Reference**: Full 0–255 standard and extended ASCII chart with decimal, hex, octal, and descriptions.
- **UUID / GUID Generator**: RFC 4122 v4 cryptographically secure random UUID generator.

---

## 🔒 Admin Command Center & RBAC

The platform includes a secured administration dashboard (`/admin`) with role-based access control:

- **Roles Supported**: `super_admin`, `admin`, `editor`, `viewer`
- **Session Security**: Cryptographically signed HMAC-SHA256 HTTP-only cookies (`tkt_admin_session`)
- **Pre-Configured Development Administrator**:
  - **Email**: `admin@typekittools.com`
  - **Password**: `AdminPassword2026!`
- **Management Consoles**:
  - **Overview Dashboard** (`/admin`): Live KPI metrics across tools, categories, redirects, and system health.
  - **Tools Catalogue** (`/admin/tools`): Toggle tool publication (`isPublished`), toggle homepage features (`isFeatured`), and edit Google SERP meta titles/descriptions.
  - **Categories Taxonomy** (`/admin/categories`): Reorder categories, update descriptions, and inspect tool counts.
  - **Redirects Manager** (`/admin/redirects`): Create, toggle, and monitor 301/308 canonical redirects with hit counters.
  - **Site Settings** (`/admin/settings`): Configure platform branding, Google AdSense master toggle, and GA measurement ID.
  - **Audit Logs** (`/admin/audit`): Chronological, immutable security event log with expandable JSON payloads.

---

## 🌐 Technical SEO & Monetization

- **Universal Search (`Cmd+K`)**: Keyboard-navigable quick search modal indexing all tools, categories, and Unicode symbols.
- **Dynamic Multi-Sitemap** (`/sitemap.xml`): Automatically indexes 77+ live URLs including category hubs, tool pages, guides, and Unicode detail pages.
- **Dynamic Robots** (`/robots.txt`): Crawl optimization rules and sitemap discovery pointers.
- **Dynamic Open Graph Images** (`/api/og`): Sub-50ms vector SVG Open Graph generator for social card previews.
- **AdSense Zero-CLS Framework**: Standardized `AdSlot` components with fixed dimensions to guarantee 0.00 Cumulative Layout Shift.
- **GDPR / CCPA / Australia Privacy Act Consent**: Granular cookie banner and preferences modal that only initializes advertising scripts after explicit consent.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node 22 & Node 24)
- npm 10+
- PostgreSQL 16 (optional locally; platform includes zero-config fallback storage for immediate local development)

### 2. Installation
```bash
git clone https://github.com/your-username/TypeKitTools.com.git
cd TypeKitTools.com
npm install
```

### 3. Environment Variables
Copy the sample environment file:
```bash
cp .env.example .env
```
Default configuration in `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/typekittools?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="TypeKitTools"
ADMIN_SECRET_KEY="typekit-tools-development-secure-secret-key-32chars"
ADMIN_SESSION_COOKIE="tkt_admin_session"
NEXT_PUBLIC_ENABLE_ADS="false"
NEXT_TELEMETRY_DISABLED="1"
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Tests
```bash
# High-speed unit test runner (29 tests across 5 suites)
npm run test

# End-to-end Playwright tests
npm run test:e2e
```

### 6. Production Deployment with Docker Compose
Spin up the complete production stack (PostgreSQL 16 + Next.js web application):
```bash
docker compose up --build -d
```
The application will be accessible at [http://localhost:3000](http://localhost:3000) with automatic database healthchecks.

---

## 📄 License
MIT License. Created for TypeKitTools.com.
