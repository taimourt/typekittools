with open("src/data/guides-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

new_guides = '''  "keyboard-symbol-shortcuts": {
    slug: "keyboard-symbol-shortcuts",
    title: "Keyboard Shortcuts for Symbols: Windows Alt Codes, Mac & MS Word Reference",
    subtitle: "How to type symbols, special characters, copyright logos, degree marks, arrows, and hearts on any keyboard",
    category: "Keyboard Shortcuts",
    readingTime: "7 min read",
    metaDescription:
      "Complete keyboard shortcuts guide for typing special characters, copyright symbols, degree marks, Spanish ñ, arrows, hearts, and checkmarks on Windows, Mac, and Microsoft Word.",
    summary:
      "Comprehensive cross-platform reference for typing non-standard symbols using Windows numeric keypad Alt codes, macOS Option key combinations, and Microsoft Word shortcuts.",
    sections: [
      {
        heading: "Overview of Keyboard Symbol Input Methods",
        content:
          "Standard physical computer keyboards only have around 100 dedicated keys, but the modern Unicode standard contains over 149,000 characters. To type symbols not on your physical keys—such as the copyright mark (©), the degree sign (°), Spanish accented letters (ñ, é), mathematical operators (±, π), or hearts (♥)—operating systems provide three standard input methods:\\n1. Windows Alt Codes: Holding Alt while typing numeric codes on the physical numeric keypad.\\n2. macOS Option Accents: Holding Option (⌥) together with a modifier letter, then pressing the desired character.\\n3. Microsoft Word Shortcuts: Native application hotkeys such as Ctrl+Alt+C for © or entering the hex codepoint followed by Alt+X.",
      },
      {
        heading: "Master Cross-Platform Symbol Shortcuts Table",
        content:
          "Below is the complete reference table comparing Windows Alt codes, Mac Option shortcuts, and Microsoft Word hotkeys for the most frequently searched keyboard symbols:",
        table: {
          headers: ["Symbol", "Character Name", "Windows Alt Code", "Mac Shortcut", "MS Word Shortcut"],
          rows: [
            ["©", "Copyright Glyph", "Alt + 0169", "Option + G", "Ctrl + Alt + C"],
            ["®", "Registered Trademark", "Alt + 0174", "Option + R", "Ctrl + Alt + R"],
            ["™", "Trade Mark Sign", "Alt + 0153", "Option + 2", "Ctrl + Alt + T"],
            ["ñ", "Spanish Small N Tilde", "Alt + 164 or Alt + 0241", "Option + N then N", "Ctrl + Shift + ~ then N"],
            ["Ñ", "Spanish Capital N Tilde", "Alt + 165 or Alt + 0209", "Option + N then Shift + N", "Ctrl + Shift + ~ then Shift + N"],
            ["°", "Degree Sign", "Alt + 0176 or Alt + 248", "Option + Shift + 8", "Ctrl + Shift + @ then Space"],
            ["♥", "Black Heart Suit", "Alt + 3", "Unicode Hex Input", "Type 2665 then Alt + X"],
            ["✓", "Check Mark (Tick)", "Alt + 251 or Alt + 10003", "Unicode Hex Input", "Type 2713 then Alt + X"],
            ["•", "Bullet Point", "Alt + 0149 or Alt + 7", "Option + 8", "Ctrl + Shift + L"],
            ["±", "Plus-Minus Sign", "Alt + 0177 or Alt + 241", "Option + Shift + =", "Type 00B1 then Alt + X"],
            ["²", "Superscript Two (Square)", "Alt + 0178 or Alt + 253", "Unicode Hex Input", "Ctrl + Shift + = then 2"],
            ["π", "Pi (Greek Letter)", "Alt + 227 or Alt + 960", "Option + P", "Type 03C0 then Alt + X"],
            ["→", "Rightwards Arrow", "Alt + 26", "Unicode Hex Input", "Type --> (AutoCorrect)"],
            ["&", "Ampersand", "Alt + 38", "Shift + 7", "Shift + 7"],
            ["@", "At Sign", "Alt + 64", "Shift + 2", "Shift + 2"],
            ["§", "Section Sign", "Alt + 0167 or Alt + 21", "Option + 6", "Type 00A7 then Alt + X"],
          ],
        },
      },
      {
        heading: "How to Type Symbols in Microsoft Word and Google Docs",
        content:
          "In Microsoft Word, there are multiple built-in ways to insert symbols without a numeric keypad:\\n1. Built-in Word Hotkeys: Word provides direct shortcuts such as Ctrl+Alt+C for ©, Ctrl+Alt+R for ®, and Ctrl+Alt+T for ™.\\n2. The Alt+X Codepoint Method: Type the four-character Unicode hexadecimal code directly into your document and immediately press Alt+X. For example, typing 00A9 followed by Alt+X turns into ©, and typing 2665 followed by Alt+X turns into ♥.\\n3. AutoCorrect Shortcuts: Typing (c) automatically converts into ©, (r) into ®, (tm) into ™, and --> into →.\\n4. Insert Symbol Ribbon: Navigate to Insert > Symbol > More Symbols to browse all Unicode character sets visually.",
      },
      {
        heading: "Typing Symbols on Laptops Without a Numeric Keypad",
        content:
          "If your laptop does not have a physical numeric keypad on the right side of the keyboard, standard Windows Alt codes cannot be typed using the numbers above the letter keys. To solve this:\\n1. Windows Emoji & Symbol Panel: Press Windows Key + . (Period) or Windows Key + ; (Semicolon). Click the Omega (Ω) symbol tab at the top to access thousands of symbols, currency signs, math operators, and Latin accents with one click.\\n2. On-Screen Keyboard (OSK): Type 'osk' in the Windows start menu, click 'Options' on the on-screen keyboard, and enable 'Turn on numeric key pad'. You can then click the Alt key and the on-screen numeric keys.\\n3. TypeKitTools 1-Click Copy: Use our Symbol Copy tool at /symbols to click any symbol and copy it instantly to your clipboard.",
      },
    ],
    faqs: [
      {
        question: "How do I type the copyright symbol (©) on my keyboard?",
        answer:
          "On Windows, hold Alt and type 0169 on the numeric keypad. On Mac, press Option + G. In Microsoft Word, press Ctrl + Alt + C or type (c).",
      },
      {
        question: "How do I type the degree symbol (°) for temperature?",
        answer:
          "On Windows, hold Alt and type 0176 or 248 on the numeric keypad. On Mac, press Option + Shift + 8. In Word, press Ctrl + Shift + @ followed by Spacebar.",
      },
      {
        question: "What is the shortcut for the Spanish letter ñ?",
        answer:
          "On Windows, hold Alt and type 164 (lowercase ñ) or 165 (uppercase Ñ) on the numeric keypad. On Mac, press Option + N, then press N again. In Word, press Ctrl + Shift + ~, then N.",
      },
      {
        question: "How do I type checkmarks (✓) and hearts (♥)?",
        answer:
          "On Windows, Alt + 3 produces a heart (♥), and Alt + 251 produces a checkmark (✓). In Word, type 2665 followed by Alt+X for ♥, or type 2713 followed by Alt+X for ✓.",
      },
    ],
  },
  "spanish-accents-guide": {
    slug: "spanish-accents-guide",
    title: "How to Type Spanish Accents & Ñ on Any Keyboard (Windows, Mac, Word)",
    subtitle: "Step-by-step instructions for typing accented letters (á, é, í, ó, ú, ñ, ü, ¿, ¡) on English keyboards",
    category: "Accent Guides",
    readingTime: "5 min read",
    metaDescription:
      "Learn how to type Spanish accents, the letter ñ/Ñ, and inverted punctuation marks (¿, ¡) on English keyboards using Windows Alt codes, Mac Option keys, and Microsoft Word shortcuts.",
    summary:
      "Typing Spanish accented letters (tildes, acentos agudos, diéresis) on a standard US or UK keyboard is fast and easy once you know the operating system shortcuts.",
    sections: [
      {
        heading: "The Essential Spanish Special Characters",
        content:
          "Spanish writing requires several characters not found on standard English (QWERTY) keyboards:\\n- The consonant Ñ / ñ (eñe), which is a distinct letter in the Spanish alphabet with its own sound.\\n- The five acute-accented vowels: á, é, í, ó, ú (and their capital equivalents Á, É, Í, Ó, Ú).\\n- The vowel with diaeresis: ü (ü con diéresis), used in words like 'pingüino' and 'bilingüe'.\\n- The inverted opening question mark (¿) and inverted exclamation mark (¡), placed at the beginning of questions and exclamations.",
      },
      {
        heading: "Spanish Characters Master Shortcuts Reference Table",
        content:
          "Use this quick lookup table for all Spanish characters across Windows, Mac, and Word:",
        table: {
          headers: ["Character", "Letter Name", "Windows Alt Code", "Mac Option Key", "Word Shortcut"],
          rows: [
            ["ñ", "Small N with Tilde", "Alt + 164", "Option + N then N", "Ctrl + Shift + ~ then N"],
            ["Ñ", "Capital N with Tilde", "Alt + 165", "Option + N then Shift + N", "Ctrl + Shift + ~ then Shift + N"],
            ["á", "Small A with Acute", "Alt + 160", "Option + E then A", "Ctrl + ' then A"],
            ["Á", "Capital A with Acute", "Alt + 0193", "Option + E then Shift + A", "Ctrl + ' then Shift + A"],
            ["é", "Small E with Acute", "Alt + 130", "Option + E then E", "Ctrl + ' then E"],
            ["É", "Capital E with Acute", "Alt + 144", "Option + E then Shift + E", "Ctrl + ' then Shift + E"],
            ["í", "Small I with Acute", "Alt + 161", "Option + E then I", "Ctrl + ' then I"],
            ["Í", "Capital I with Acute", "Alt + 0205", "Option + E then Shift + I", "Ctrl + ' then Shift + I"],
            ["ó", "Small O with Acute", "Alt + 162", "Option + E then O", "Ctrl + ' then O"],
            ["Ó", "Capital O with Acute", "Alt + 0211", "Option + E then Shift + O", "Ctrl + ' then Shift + O"],
            ["ú", "Small U with Acute", "Alt + 163", "Option + E then U", "Ctrl + ' then U"],
            ["Ú", "Capital U with Acute", "Alt + 0218", "Option + E then Shift + U", "Ctrl + ' then Shift + U"],
            ["ü", "Small U with Diaeresis", "Alt + 129", "Option + U then U", "Ctrl + Shift + : then U"],
            ["Ü", "Capital U with Diaeresis", "Alt + 154", "Option + U then Shift + U", "Ctrl + Shift + : then Shift + U"],
            ["¿", "Inverted Question Mark", "Alt + 168", "Option + Shift + ?", "Alt + Ctrl + Shift + ?"],
            ["¡", "Inverted Exclamation Mark", "Alt + 173", "Option + 1", "Alt + Ctrl + Shift + !"],
          ],
        },
      },
      {
        heading: "The US-International Keyboard Layout (No Memorization Needed)",
        content:
          "If you write in Spanish regularly on Windows, the fastest long-term solution is enabling the 'US-International' keyboard layout in Windows Settings > Time & Language > Language > Preferred Languages > Keyboard.\\nWith US-International:\\n- Press ~ then N to get ñ.\\n- Press ' (apostrophe) then any vowel to get an acute accent (e.g., ' + a = á, ' + e = é).\\n- Press Shift + \" then U to get ü.\\n- Hold Right Alt + ! to get ¡, and Right Alt + ? to get ¿.\\n- Hold Right Alt + N to get ñ directly.",
      },
    ],
    faqs: [
      {
        question: "What is the Alt code for ñ on a Windows laptop without a numeric keypad?",
        answer:
          "If you lack a physical number pad, press Windows Key + . (Period) to open the Windows symbol panel, switch to the Latin symbols tab, or use our 1-click Accent Keyboard tool at /tools/keyboard/accent-keyboard.",
      },
      {
        question: "How do I type ñ on macOS?",
        answer:
          "Press Option + N simultaneously (which creates the tilde diacritic accent), then press the letter N. For capital Ñ, press Option + N, then Shift + N.",
      },
      {
        question: "How do I type the inverted question mark (¿) in Microsoft Word?",
        answer:
          "Press Alt + Ctrl + Shift + ? at the same time. On Windows with a numeric keypad, hold Alt and type 168. On Mac, press Option + Shift + ?.",
      },
    ],
  },
'''

# Insert before the closing `};`
last_brace_idx = content.rfind("};")
if last_brace_idx != -1:
    updated = content[:last_brace_idx] + new_guides + content[last_brace_idx:]
    with open("src/data/guides-data.ts", "w", encoding="utf-8") as f:
        f.write(updated)
    print("Added keyboard-symbol-shortcuts and spanish-accents-guide to guides-data.ts!")
else:
    print("Error: Could not find closing brace in guides-data.ts")
