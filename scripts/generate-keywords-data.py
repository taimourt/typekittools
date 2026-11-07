import json
import os

RAW_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "raw-keywords-planner.json")
OUT_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "seo-keywords-data.ts")

with open(RAW_FILE, "r", encoding="utf-8") as f:
    raw_data = json.load(f)

def classify(kw):
    k = kw.lower().strip()
    
    # 1. Copyright & Legal
    if any(w in k for w in ['copyright', 'copy right', 'c symbol', 'trademark', 'registered', 'all rights', 'rights reserved', '™', '®', '©']):
        sym = '©'
        if 'trade' in k or '™' in k:
            sym = '™'
        elif 'register' in k or '®' in k:
            sym = '®'
        return 'copyright_legal', sym, '/symbols/legal'
    
    # 2. Accents & Foreign letters
    if any(w in k for w in ['ñ', 'accent', 'tilde', 'french', 'spanish', 'umlaut', 'diaeresis', 'grave', 'acute', 'circumflex', 'á', 'ó', 'à', 'é', 'ü', 'ç']) or k in ['o keyboard', 'letters on a keyboard', 'alternative letters', 'a with accent keyboard shortcut']:
        sym = 'ñ'
        if 'á' in k or 'a with' in k:
            sym = 'á'
        elif 'ó' in k:
            sym = 'ó'
        elif 'à' in k:
            sym = 'à'
        elif 'é' in k or 'french' in k:
            sym = 'é'
        return 'accents_foreign', sym, '/symbols/accents'
    
    # 3. Math & Science
    if any(w in k for w in ['degree', 'plus minus', 'pi', 'infinity', 'square root', 'plus on keyboard', 'plus in keyboard', 'plus sign', 'square keyboard', 'keyboard square', 'square shortcut']):
        if 'degree' in k:
            return 'math_scientific', '°', '/symbols/math'
        if 'plus' in k:
            return 'math_scientific', '±', '/symbols/math'
        if 'pi' in k:
            return 'math_scientific', 'π', '/symbols/math'
        if 'square' in k:
            return 'math_scientific', '²', '/symbols/math'
        return 'math_scientific', '°', '/symbols/math'
        
    # 4. Arrows
    if any(w in k for w in ['arrow', 'pointer']):
        sym = '→'
        if 'up' in k:
            sym = '↑'
        elif 'down' in k:
            sym = '↓'
        elif 'left' in k:
            sym = '←'
        return 'arrows', sym, '/symbols/arrows'
        
    # 5. Hearts & Stars & Checkmarks & Shapes
    if 'heart' in k:
        return 'hearts_stars_shapes', '♥', '/symbols/hearts'
    if any(w in k for w in ['check', 'tick', 'ballot']):
        return 'hearts_stars_shapes', '✓', '/symbols/checkmarks'
    if 'star' in k:
        return 'hearts_stars_shapes', '★', '/symbols/stars'
    if any(w in k for w in ['bullet', 'dot']):
        return 'hearts_stars_shapes', '•', '/symbols/keyboard-signs'
    if any(w in k for w in ['shape', 'box', 'square']):
        return 'hearts_stars_shapes', '■', '/symbols/shapes'
        
    # 6. Punctuation & Keyboard Signs
    if any(w in k for w in ['and symbol', 'at sign', 'number sign', 'section', 'backslash', 'pipe', 'caret', 'bracket', 'ampersand', 'hashtag']):
        sym = '&'
        if 'at sign' in k:
            sym = '@'
        elif 'number sign' in k or 'hashtag' in k:
            sym = '#'
        elif 'section' in k:
            sym = '§'
        return 'punctuation_keyboard', sym, '/symbols/keyboard-signs'
        
    # 7. Word shortcuts
    if any(w in k for w in ['word', 'microsoft word', 'ms word', 'typing shortcuts in word']):
        return 'word_shortcuts', None, '/guides/keyboard-symbol-shortcuts'
        
    # 8. Alt codes & Windows Shortcuts
    if any(w in k for w in ['alt code', 'alt keyboard', 'alt symbols', 'alt shortcut', 'shortcut codes', 'windows codes', 'alt codes symbols', 'alt codes for windows', 'alt keys shortcut', 'alt code shortcuts', 'alt signs', 'alt icon']):
        return 'alt_codes_shortcuts', None, '/tools/symbols/alt-code-finder'
        
    # 9. General Keyboard Symbols
    return 'general_keyboard_symbols', None, '/symbols'

records = []
for item in raw_data:
    kw = item["keyword"]
    searches = item.get("searches", 0)
    competition = item.get("competition", "Low")
    cluster, primary_sym, target_route = classify(kw)
    records.append({
        "keyword": kw,
        "searches": searches,
        "competition": competition,
        "cluster": cluster,
        "primarySymbol": primary_sym,
        "targetRoute": target_route,
    })

# Sort by monthly searches descending, then keyword ascending
records.sort(key=lambda x: (-x["searches"], x["keyword"]))

ts_code = []
ts_code.append("/**")
ts_code.append(" * Google Keyword Planner Dataset & Semantic Cluster Definitions")
ts_code.append(" * Extracted directly from official Keyword Stats export (387 Keywords, >2.6M monthly volume)")
ts_code.append(" */\n")
ts_code.append('export type KeywordClusterType =')
ts_code.append('  | "copyright_legal"')
ts_code.append('  | "accents_foreign"')
ts_code.append('  | "alt_codes_shortcuts"')
ts_code.append('  | "math_scientific"')
ts_code.append('  | "arrows"')
ts_code.append('  | "hearts_stars_shapes"')
ts_code.append('  | "punctuation_keyboard"')
ts_code.append('  | "word_shortcuts"')
ts_code.append('  | "general_keyboard_symbols";\n')

ts_code.append("export interface PlannerKeyword {")
ts_code.append("  keyword: string;")
ts_code.append("  searches: number;")
ts_code.append('  competition: "Low" | "Medium" | "High";')
ts_code.append("  cluster: KeywordClusterType;")
ts_code.append("  primarySymbol?: string | null;")
ts_code.append("  targetRoute?: string | null;")
ts_code.append("}\n")

ts_code.append("export interface ClusterSummary {")
ts_code.append("  id: KeywordClusterType;")
ts_code.append("  name: string;")
ts_code.append("  totalMonthlySearches: number;")
ts_code.append("  keywordCount: number;")
ts_code.append("  primaryRoute: string;")
ts_code.append("  topKeywords: string[];")
ts_code.append("  description: string;")
ts_code.append("}\n")

ts_code.append("export const PLANNER_KEYWORDS: PlannerKeyword[] = " + json.dumps(records, indent=2) + ";\n")

# Compute cluster summaries
clusters_dict = {}
for r in records:
    c = r["cluster"]
    if c not in clusters_dict:
        clusters_dict[c] = {"searches": 0, "count": 0, "route": r["targetRoute"], "keywords": []}
    clusters_dict[c]["searches"] += r["searches"]
    clusters_dict[c]["count"] += 1
    clusters_dict[c]["keywords"].append(r["keyword"])

cluster_metadata = {
    "copyright_legal": {
        "name": "Copyright, Trademark & Legal Glyphs",
        "desc": "High-intent queries for copyright symbol (©), registered trademark (®), and trademark (™) copy-paste, Alt codes, and shortcuts.",
    },
    "general_keyboard_symbols": {
        "name": "General Keyboard Symbols & Special Characters",
        "desc": "Mass-volume searches for keyboard symbol names, keyboard layout references, typing shortcuts, and copy-paste character tables.",
    },
    "alt_codes_shortcuts": {
        "name": "Windows Alt Codes & Keyboard Shortcuts",
        "desc": "Direct queries looking for Windows numeric keypad Alt codes, Mac Option equivalents, and symbol combination codes.",
    },
    "accents_foreign": {
        "name": "Spanish Accents & Foreign Letters",
        "desc": "Queries for Spanish ñ/Ñ, French accents (é, à, ç), German umlauts (ü), and international diacritics keyboard shortcuts.",
    },
    "word_shortcuts": {
        "name": "Microsoft Word & Document Symbol Shortcuts",
        "desc": "Keyboard shortcuts specifically in Microsoft Word, Google Docs, and desktop word processors for special characters.",
    },
    "math_scientific": {
        "name": "Mathematical & Scientific Symbols",
        "desc": "Searches for degree symbol (°), plus-minus (±), superscript square (²), pi (π), and mathematical operators.",
    },
    "punctuation_keyboard": {
        "name": "Punctuation & Keyboard Signs",
        "desc": "Shortcuts and Alt codes for ampersand (&), at-sign (@), number sign (#), section sign (§), and keyboard punctuation.",
    },
    "hearts_stars_shapes": {
        "name": "Hearts, Stars, Checkmarks & Bullets",
        "desc": "Searches for heart emojis/symbols (♥), checkmarks (✓), stars (★), bullets (•), and geometric squares.",
    },
    "arrows": {
        "name": "Directional Arrows & Pointers",
        "desc": "Shortcuts and copy-paste for right (→), left (←), up (↑), down (↓), and double exchange arrows.",
    },
}

cluster_summaries = []
for cid, data in clusters_dict.items():
    meta = cluster_metadata.get(cid, {"name": cid, "desc": ""})
    cluster_summaries.append({
        "id": cid,
        "name": meta["name"],
        "totalMonthlySearches": data["searches"],
        "keywordCount": data["count"],
        "primaryRoute": data["route"] or "/symbols",
        "topKeywords": data["keywords"][:6],
        "description": meta["desc"],
    })

cluster_summaries.sort(key=lambda x: -x["totalMonthlySearches"])

ts_code.append("export const KEYWORD_CLUSTERS: ClusterSummary[] = " + json.dumps(cluster_summaries, indent=2) + ";\n")

# Utility functions
ts_code.append("""
/**
 * Find all keywords associated with a specific character
 */
export function findKeywordsForSymbol(char: string): PlannerKeyword[] {
  return PLANNER_KEYWORDS.filter((k) => k.primarySymbol === char);
}

/**
 * Find all keywords in a cluster
 */
export function findKeywordsByCluster(cluster: KeywordClusterType): PlannerKeyword[] {
  return PLANNER_KEYWORDS.filter((k) => k.cluster === cluster);
}

/**
 * Filter keywords matching a search query
 */
export function searchPlannerKeywords(query: string, limit = 20): PlannerKeyword[] {
  const q = query.toLowerCase().trim();
  if (!q) return PLANNER_KEYWORDS.slice(0, limit);
  return PLANNER_KEYWORDS.filter((k) => k.keyword.toLowerCase().includes(q)).slice(0, limit);
}
""")

with open(OUT_FILE, "w", encoding="utf-8") as f:
    f.write("\n".join(ts_code))

print(f"Generated {OUT_FILE} with {len(records)} keywords across {len(cluster_summaries)} clusters.")
