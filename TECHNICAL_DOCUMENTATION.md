# Pigment Ink Mixer - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

The Pigment Ink Mixer is a **static, dependency-free** web application built entirely with vanilla HTML, CSS, and JavaScript. No frameworks, libraries, or build tools are required.

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | `localStorage` for user formulas |
| Embedding | `<iframe>` with `postMessage` for height resizing |

### File Structure

```
ink-mixer/
├── index.html              # Main tool interface (all tabs, UI, inline styles)
├── documentation.html      # Standalone documentation page
├── embed.html              # Embed instructions page
├── css/
│   └── style.css           # Tool styling
└── js/
    ├── common.js           # Theme toggle, iframe resizing, embed modal, email form
    ├── feedback.js         # Feedback form submission via Web3Forms API
    ├── formulas.js         # Common professional formulas database (constant object)
    ├── ink-database.js     # Ink color properties database (constant object)
    └── library.js          # FormulaLibrary class for CRUD operations on localStorage
```

### Component / Logic Breakdown

The tool is organized into five tabbed sections within `index.html`:

1. **Color Mixer** - Select colors, set parts, calculate mixture ratios and volumes
2. **My Formulas** - Save, search, import, export custom formulas
3. **Skin Tones** - Generate base/highlight/shadow formulas for 10 skin tone categories
4. **Gray Wash** - Calculate black-to-water ratios with optional witch hazel
5. **Color Theory** - Static educational content about primary/secondary colors

The JavaScript modules handle:

- **`common.js`**: Theme persistence, iframe auto-resize, embed modal, email subscription simulation
- **`feedback.js`**: Submits user feedback to `patrick@poli-international.com` via Web3Forms
- **`formulas.js`**: Defines `commonFormulas` object with 30+ pre-built color formulas
- **`ink-database.js`**: Defines `inkColorDatabase` object with 11 ink colors and their properties
- **`library.js`**: Implements `FormulaLibrary` class for localStorage CRUD operations

---

## Data Schemas

### Ink Color Database (`inkColorDatabase`)

Defined in `js/ink-database.js`. Each color entry follows this structure:

```javascript
{
  name: 'Red',                          // string
  category: 'primary',                  // 'primary' | 'secondary' | 'earth' | 'special' | 'neutral'
  hex: '#FF0000',                       // string - hex color code
  rgb: { r: 255, g: 0, b: 0 },         // object - RGB values 0-255
  properties: {
    opacity: 'medium_high',             // 'very_high' | 'high' | 'medium_high' | 'medium' | 'low'
    tinting_strength: 'strong',         // 'very_strong' | 'strong' | 'medium_strong' | 'medium' | 'weak'
    typical_use: 'Primary color...',    // string
    mixing_note: 'Warm color...'        // string (optional)
  },
  mixing_combinations: {                // object (optional)
    plus_yellow: 'Creates oranges...',
    plus_blue: 'Creates purples...'
  },
  mixing_behavior: {                    // object (optional - only on black/white)
    with_white: 'Creates grays...',
    with_colors: 'Darkens and mutes...',
    caution: 'Overpowers easily...'
  },
  caution: 'Weakest tinting strength...', // string (optional)
  drops_per_ml: 20,                     // number
  made_from: 'Red + Yellow...'          // string (optional - secondary colors)
}
```

**Available colors**: `black`, `white`, `red`, `yellow`, `blue`, `orange`, `green`, `purple`, `brown`, `magenta`

### Common Formulas Database (`commonFormulas`)

Defined in `js/formulas.js`. Organized by category:

```javascript
{
  skin_tones: {
    light_caucasian: {
      name: 'Light Caucasian - Base',           // string
      formula: [                                 // array of {color, parts}
        { color: 'white', parts: 10 },
        { color: 'yellow', parts: 3 },
        { color: 'red', parts: 1 },
        { color: 'blue', parts: 0.25 }
      ],
      ratio: '10:3:1:0.25',                     // string
      description: 'Base for light skin tones',  // string
      notes: 'Adjust yellow for warmth...',      // string
      tags: ['portrait', 'skin', 'realism']      // array of strings
    }
  },
  portrait: { /* ... */ },
  grays: { /* ... */ },
  landscape: { /* ... */ },
  vibrant: { /* ... */ }
}
```

**Categories**: `skin_tones` (8 formulas), `portrait` (5 formulas), `grays` (5 formulas), `landscape` (6 formulas), `vibrant` (4 formulas)

### Saved Formula Object (localStorage)

Stored under key `ink_mixer_formulas` as a JSON array:

```javascript
{
  id: 'formula_1680123456789_abc123def',    // string - generated unique ID
  name: 'Light Caucasian Skin',              // string
  colors: [                                  // array of {color, parts}
    { color: 'white', parts: 10 },
    { color: 'yellow', parts: 3 }
  ],
  ratio: '10:3:1:0.25',                     // string
  totalVolume: 5,                            // number
  unit: 'ml',                                // 'ml' | 'caps'
  resultingColor: '#FFE0C0',                // string - hex color
  category: 'custom',                        // string
  notes: 'Works well for portraits...',      // string
  tags: ['portrait', 'skin'],                // array of strings
  createdAt: '2025-01-15T10:30:00.000Z',    // ISO 8601 string
  updatedAt: '2025-01-15T10:30:00.000Z'     // ISO 8601 string
}
```

### Feedback Form Data

Submitted via `js/feedback.js`:

```javascript
{
  access_key: 'ebd0e138-c7aa-4290-b028-74d1c3fa8faa',  // Web3Forms API key
  subject: 'Poli Tools Feedback: Professional Tattoo Ink Color Mixer...',
  from_name: 'user@example.com',
  email: 'user@example.com',
  message: 'New Feedback Received from Poli Tools!\n...'
}
```

---

## Calculation / Logic Algorithms

### Color Mixing Calculation

Triggered by clicking "Calculate Mixture" button (`#calculateMixBtn`). The logic:

1. **Collect inputs**: Read all `.color-select` values and `.parts-input` values from `#colorSelectors`
2. **Calculate total parts**: Sum all parts values
3. **Calculate percentages**: For each color, `percentage = (colorParts / totalParts) * 100`
4. **Calculate volumes**: 
   - If unit is `ml`: `volume = (colorParts / totalParts) * totalVolume`
   - If unit is `caps`: `volume = (colorParts / totalParts) * totalVolume * 2` (1 cap ≈ 2ml)
5. **Calculate drops**: `drops = volume * drops_per_ml` (using `inkColorDatabase[color].drops_per_ml` which is always 20)
6. **Estimate resulting color**: Uses `estimateResultingColor()` function from `ink-database.js`
   - Weighted average of RGB values: `avgR = sum(color.r * color.parts) / totalParts`
   - Converts averaged RGB to hex via `rgbToHex()`

### Gray Wash Calculation

Triggered by clicking "Calculate Gray Wash" button (`#calculateGrayBtn`):

1. Read `grayPercentage` (5-90%), `grayVolume` (ml), and `useWitchHazel` checkbox
2. Calculate black ink volume: `blackVolume = (grayPercentage / 100) * grayVolume`
3. Calculate total diluent volume: `diluentVolume = grayVolume - blackVolume`
4. If witch hazel is enabled: `witchHazelVolume = diluentVolume * 0.30` and `waterVolume = diluentVolume * 0.70`
5. If witch hazel is disabled: `waterVolume = diluentVolume`

### Skin Tone Formula Generation

Triggered by clicking "Generate Skin Tone Formulas" button (`#generateSkinToneBtn`):

1. Read `skinToneCategory` and `skinUndertone` from dropdowns
2. Look up the base formula from `commonFormulas.skin_tones[category]`
3. Generate three variations:
   - **Base**: The formula as-is
   - **Highlight**: Base formula with white increased by 50% and all other colors reduced by 30%
   - **Shadow**: Base formula with black added (10% of total parts) and all colors reduced proportionally
4. Adjust for undertone:
   - **Warm**: Increase yellow by 15%, decrease blue by 50%
   - **Cool**: Decrease yellow by 30%, add 0.25 parts blue
5. Calculate volumes based on `skinVolume` input

### Formula Library CRUD

The `FormulaLibrary` class in `js/library.js` provides:

- **Save**: `save(formulaData)` - Generates unique ID, timestamps, stores in localStorage
- **Read**: `getAll()`, `getById(id)` - Parse JSON from localStorage
- **Update**: `update(id, updatedData)` - Merge changes, update timestamp
- **Delete**: `delete(id)` - Filter out by ID
- **Search**: `search(query)` - Case-insensitive match on name, notes, tags, category
- **Export**: `exportToJSON()` - Download all formulas as JSON file
- **Import**: `importFromJSON(fileContent)` - Parse JSON, generate new IDs, merge with existing

---

## API Reference

### Public Functions

#### `ink-database.js`

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `getColorData(colorName)` | `colorName`: string | Object or `null` | Returns color data from `inkColorDatabase` |
| `estimateResultingColor(colors)` | `colors`: array of `{color, parts}` | Hex string (e.g. `#FFE0C0`) | Weighted RGB average of mixed colors |
| `rgbToHex(r, g, b)` | `r,g,b`: numbers 0-255 | Hex string | Converts RGB to uppercase hex |

#### `formulas.js`

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `getFormulasCategory(category)` | `category`: string | Object | Returns all formulas in a category |
| `getFormula(category, formulaKey)` | `category, formulaKey`: strings | Object or `null` | Returns specific formula |

#### `library.js`

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `FormulaLibrary.save(formulaData)` | `formulaData`: object | Object (saved formula) | Saves formula to localStorage |
| `FormulaLibrary.getAll()` | None | Array | Returns all saved formulas |
| `FormulaLibrary.getById(id)` | `id`: string | Object or `null` | Finds formula by ID |
| `FormulaLibrary.update(id, updatedData)` | `id, updatedData`: objects | Object or `null` | Updates existing formula |
| `FormulaLibrary.delete(id)` | `id`: string | Boolean | Deletes formula, returns success |
| `FormulaLibrary.search(query)` | `query`: string | Array | Searches by name, notes, tags |
| `FormulaLibrary.filterByCategory(category)` | `category`: string | Array | Filters by category |
| `FormulaLibrary.exportToJSON()` | None | void | Triggers JSON file download |
| `FormulaLibrary.importFromJSON(fileContent)` | `fileContent`: string | `{success, count}` or `{success, error}` | Imports formulas from JSON |
| `FormulaLibrary.clearAll()` | None | void | Clears all formulas |
| `FormulaLibrary.getStats()` | None | `{total, categories, oldest, newest}` | Returns statistics |

#### `common.js`

| Function | Description |
|----------|-------------|
| `setTheme(theme, save)` | Toggles dark/light mode, persists to localStorage |
| `sendHeight()` | Posts iframe height to parent window via `postMessage` |

---

## Integration Guide

### Standalone Usage

The tool is fully self-contained and requires no server-side processing. Open `index.html` directly in any modern browser.

### Embedding via iframe

Copy and paste this code into any HTML page:

```html
<iframe
  src="https://poliinternational.com/tools/ink-mixer/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 8px;"
  title="Ink Mixer by Poli International">
</iframe>
```

**Available height options**: 600px (compact), 800px (standard), 1000px (large)

### Auto-Resize Behavior

The tool automatically sends its height to the parent window via `window.parent.postMessage({ height: document.body.scrollHeight + 50 }, '*')`. This fires on load, resize, click, and change events. A `MutationObserver` watches for DOM changes.

### Theme Support

The tool listens for `postMessage` events with `{ theme: 'dark' | 'light' }` to sync with a parent page's theme. Users can also toggle theme via the `#darkModeToggle` button.

### No Dependencies

The tool requires zero external dependencies, API keys, or configuration. All data is stored locally in the user's browser.

---

## Customization

### Styling

The tool uses CSS custom properties defined in `css/style.css`. Key variables include:

```css
--primary: #3B82F6;
--success: #10B981;
--danger: #EF4444;
--bg-dark: #1a1a1a;
--bg-light: #ffffff;
```

Override these in your parent page or modify `style.css` directly.

### Color Database

Add new colors to `inkColorDatabase` in `js/ink-database.js` following the existing schema. The color will automatically appear in dropdown menus if added to the `<select>` options in `index.html`.

### Formula Library

Add new pre-built formulas to `commonFormulas` in `js/formulas.js`. Each formula requires a unique key within its category and must follow the schema documented above.

---

## Performance

- **Zero network requests** after initial page load (no CDN, no fonts, no analytics)
- **localStorage** operations are synchronous but operate on small datasets (typically < 100 formulas)
- **No animations or transitions** that could cause layout thrashing
- **MutationObserver** for iframe height resizing is debounced by event timing only
- Total JavaScript footprint across all files: approximately 30KB uncompressed

---

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

**Requirements**: ES6 support, `localStorage`, `MutationObserver`, `fetch` API (for feedback form only).

---

## Security

### Input Handling

- **No user input is rendered as HTML** - all formula names, notes, and tags are displayed as `textContent`, not `innerHTML`
- **No SQL or server-side processing** - all data stays in the browser's localStorage
- **No cookies** are set by the tool
- **No external API calls** except the optional feedback form (Web3Forms)

### XSS Prevention

- Formula card rendering uses `textContent` for all user-supplied strings
- The search function performs string matching only, no DOM injection
- Import/export uses `JSON.parse` with try/catch error handling

### localStorage

- Data is stored under a single key: `ink_mixer_formulas`
- Maximum storage is browser-dependent (typically 5-10MB)
- No sensitive data is stored

### iframe Security

- The embed page (`embed.html`) sets `X-Frame-Options` implicitly through standard iframe usage
- The tool sends height via `postMessage` with wildcard origin (`'*'`) for maximum compatibility

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-15 | Initial release |

---

## Support / Contact

For technical support, feature requests, or custom integration assistance:

- **Email**: `patrick@poli-international.com` (feedback form submits here)
- **Website**: [https://poliinternational.com](https://poliinternational.com)
- **Documentation**: [https://poliinternational.com/ink-mixer-documentation/](https://poliinternational.com/ink-mixer-documentation/)
- **Support**: [Buy Me a Coffee](https://ko-fi.com/patrickkofi)

---

*Technical Standard provided by Poli International Engineering*
