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

The Pigment Ink Mixer is a dependency-free, client-side web application built entirely from static assets:

- **Markup**: HTML5 (`index.html`, `documentation.html`, `embed.html`)
- **Styling**: Plain CSS (`css/style.css`, `css/lang-switcher.css`)
- **Logic**: Vanilla JavaScript, no frameworks, no build step
- **Persistence**: Browser `localStorage` only (theme, drop calibration)
- **No server-side component**: all computation runs in the browser; nothing entered is transmitted anywhere

### File Structure

Based on the source file headers:

```
ink-mixer/
├── index.html                  # Full tool interface (9 tabs)
├── documentation.html          # Operation manual (noindex, iframe-aware)
├── embed.html                  # Simplified 2-tab embeddable view
├── css/
│   ├── style.css               # Main stylesheet
│   └── lang-switcher.css       # Language selector styles
└── js/
    ├── ciede2000.js            # CIEDE2000 ΔE₀₀ color difference engine
    ├── common.js               # Theme, iframe resize, embed modal
    ├── diluent-formulator.js   # Diluent vehicle formulator
    ├── formulas.js             # Curated professional formula database
    ├── gradient-caps.js        # Gradient cap ladder generator
    ├── studio-calibration.js   # Drop-volume calibration engine
    ├── ink-database.js         # Ink database (referenced by embed.html)
    ├── mixer.js                # Forward mixer + target solver (referenced)
    └── i18n.js                 # Internationalization (referenced)
```

Note: `ink-database.js`, `mixer.js`, and `i18n.js` are referenced by `embed.html` and the full tool but their source was not included in the provided material, so this document does not describe their internals.

### Component / Logic Breakdown

The full tool (`index.html`) exposes nine tabs via a `role="tablist"` navigation:

| Tab | `data-tab` | Purpose |
|---|---|---|
| Color Mixer & Target Solver | `mixer` | Forward subtractive mixing and inverse target solving |
| Reference Studio | `reference-studio` | Palette extraction from reference images |
| Gradient Caps | `gradient-caps` | Multi-cap shading ladder generation |
| Diluent Formulator | `diluent-formulator` | Shading diluent vehicle recipes |
| Studio Tools & Vault | `studio-vault` | AES-GCM encrypted local vault |
| My Inventory | `inventory` | Pigment stock tracking |
| Saved Formulas | `library` | Formula library with substitution view |
| Gray Wash Ladder | `gray-wash` | Black wash dilution series |
| Color Science | `color-wheel` | Color theory reference |

The `embed.html` variant exposes only two tabs (`mixer` and `gray-wash`) with a compact header and footer.

Shared infrastructure lives in `common.js`:

- Theme toggle (dark/light) persisted to `localStorage` under the key `theme`
- Auto-resize messaging to a parent iframe via `postMessage`
- Embed modal with copy-to-clipboard fallback using `document.execCommand('copy')`

---

## Data Schemas

### `commonFormulas` (js/formulas.js)

A nested object of curated professional recipes, grouped by category. Categories present: `skin_tones`, `portrait`, `grays`, `landscape`, `vibrant`.

Each formula entry has this shape:

```js
{
  name: 'Medium Caucasian - Base',
  formula: [
    { color: 'white',  parts: 8 },
    { color: 'yellow', parts: 4 },
    { color: 'red',    parts: 2 },
    { color: 'brown',  parts: 0.5 },
    { color: 'blue',   parts: 0.25 }
  ],
  ratio: '8:4:2:0.5:0.25',
  description: 'Versatile medium skin base',
  notes: 'Most common starting point for portraits',
  tags: ['portrait', 'skin', 'realism']
}
```

Fields:

| Field | Type | Description |
|---|---|---|
| `name` | string | Human-readable formula title |
| `formula` | array | List of `{ color, parts }` component objects |
| `ratio` | string | Colon-separated parts string |
| `description` | string | Short summary |
| `notes` | string | Practical mixing guidance |
| `tags` | string[] | Categorization keywords |

### `BOTTLE_SIZES` (js/diluent-formulator.js)

```js
{
  '1oz':    { name: '1 oz Squeeze Bottle', ml: 30 },
  '2oz':    { name: '2 oz Squeeze Bottle', ml: 60 },
  '4oz':    { name: '4 oz Squeeze Bottle', ml: 120 },
  '8oz':    { name: '8 oz Squeeze Bottle', ml: 240 },
  'custom': { name: 'Custom Batch Volume', ml: 100 }
}
```

### `PRESETS` (js/diluent-formulator.js)

Named diluent recipes with percentage splits across three ingredients:

```js
{
  'balanced': {
    name: 'Studio Balanced Standard',
    desc: 'Ideal all-around shading diluent...',
    water: 70, witchHazel: 25, glycerin: 5
  },
  'high_glide':  { water: 60, witchHazel: 30, glycerin: 10 },
  'fast_dry':    { water: 50, witchHazel: 48, glycerin: 2 },
  'custom':      { water: 70, witchHazel: 25, glycerin: 5 }
}
```

### `CAP_SIZES` (js/gradient-caps.js)

```js
{
  'cap_9':  { id: 'cap_9',  name: '#9 Small Cap',  volumeMl: 0.5 },
  'cap_12': { id: 'cap_12', name: '#12 Medium Cap', volumeMl: 1.0 },
  'cap_16': { id: 'cap_16', name: '#16 Large Cap',  volumeMl: 1.8 }
}
```

### Calibration Object (js/studio-calibration.js)

Persisted to `localStorage` under key `poli_ink_mixer_drop_calibration`:

```js
{
  dropsPerMl: 20.0,
  mlPerDrop: 0.05,
  testDropsCount: 20,
  measuredValue: 1.0,
  unit: 'ml',                    // 'ml' or 'g'
  dispenserType: 'standard_twist',
  lastCalibrated: null,          // ISO string when custom
  isCustom: false
}
```

### Gradient Cap Output Object (js/gradient-caps.js)

Each element returned by `generateGradientLadder`:

```js
{
  capIndex: 1,
  stepTone: 'Solid Base',
  previewHex: '#0a0a0a',
  originDrops: 20,
  originName: 'Lining Black',
  destDrops: 0,
  destName: 'Shading Diluent',
  totalDrops: 20,
  volumeMl: 1.0,
  ratioPercent: 100
}
```

### Diluent Batch Output Object (js/diluent-formulator.js)

Returned by `calculateDiluentBatch`:

```js
{
  totalMl: 60,
  water:      { percent: 70, ml: 42.0, drops: 840, drams: 11.4 },
  witchHazel: { percent: 25, ml: 15.0, drops: 300, drams: 4.1 },
  glycerin:   { percent: 5,  ml: 3.0,  drops: 60,  drams: 0.8 }
}
```

---

## Calculation / Logic Algorithms

### CIEDE2000 Color Difference (js/ciede2000.js)

`ciede2000(lab1, lab2, kL = 1, kC = 1, kH = 1)` implements the ISO/CIE 11664-6:2014 standard. Steps:

1. Compute chroma `C1`, `C2` from `a`/`b`; derive `G = 0.5 * (1 - sqrt(avgC^7 / (avgC^7 + 25^7)))` where `25^7 = 6103515625`.
2. Apply `G` to obtain `a1Prime`, `a2Prime`, then `C1Prime`, `C2Prime`.
3. Compute hue angles `h1Prime`, `h2Prime` via `atan2`, normalized to `[0, 360)`.
4. Compute `deltaLPrime`, `deltaCPrime`, and `deltaHPrime` (with the ±180° wrap rule).
5. Compute mean values `avgLPrime`, `avgCPrime`, `avgHPrime` (with the sum/diff branch for hue).
6. Compute weighting functions `SL`, `SC`, `SH`, the `T` term, `deltaTheta`, `RC`, and rotation term `RT`.
7. Return `sqrt(termL^2 + termC^2 + termH^2 + RT * termC * termH)`, rounded to 2 decimals.

`getCiede2000Rating(dE)` maps a ΔE₀₀ score to a perceptual category:

| ΔE₀₀ range | Category | Label |
|---|---|---|
| `< 1.0` | `imperceptible` | Imperceptible Match (High Fidelity) |
| `1.0, 2.0` | `close` | Close Match (Perceptible on Inspection) |
| `2.0, 3.5` | `noticeable` | Noticeable Variation (Usable Shading) |
| `> 3.5` | `significant` | Significant Shift (Outside Core Gamut) |

`evaluateGamutBoundary(targetLab, availableInks, bestMatchDE00)` treats ΔE₀₀ ≤ 3.0 as inside the achievable subtractive gamut and returns a `gamutPercent` of `100 - (bestMatchDE00 * 12)`, clamped to `[0, 100]`.

### Diluent Batch Calculation (js/diluent-formulator.js)

`calculateDiluentBatch(batchMl, waterPct, witchHazelPct, glycerinPct)`:

1. Normalize percentages so they sum to 100: `factor = 100 / (waterPct + witchHazelPct + glycerinPct)`.
2. Multiply each normalized fraction by `batchMl` to get ml, rounded to 1 decimal.
3. Convert ml to drops using `getCalibratedDropsPerMl()` (default 20.0).
4. Convert ml to fluid drams using `1 dram ≈ 3.6967 ml`.

### Gradient Cap Ladder (js/gradient-caps.js)

`generateGradientLadder(options)`:

1. Clamp `capCount` to `[3, 12]`.
2. Compute `totalDropsPerCap = round(capSizeInfo.volumeMl * getCalibratedDropsPerMl())`.
3. For each cap index `i` from `0` to `capCount - 1`, compute `t = i / (capCount - 1)`.
4. Apply a subtractive power-law curve: `factor = t^2.0` (the comment notes this produces visually uniform perceptual lightness steps because dark pigments such as carbon black have high extinction).
5. Allocate drops: the first cap is 100% origin, the last cap is 100% destination, and intermediate caps split drops with a minimum of 1 drop for the origin pigment.
6. Compute a preview hex: for diluent destinations, RGB interpolates toward `#f8f8f8`; for color destinations, RGB interpolates linearly between origin and destination.
7. Assign a `stepTone` label via the i18n helper `window.t` (Solid Base, Deep Shadow, Midtone N, Feather Highlight, Pure Diluent / Solid Accent).

### Drop Calibration (js/studio-calibration.js)

`calculateCalibration(testDrops, measuredVal, unit, dispenserType)`:

1. Clamp `testDrops` to `[5, 100]` and `measuredVal` to `[0.1, 10]`.
2. Treat the measured value as volume in ml (aqueous/glycol carriers are approximately 1.00 g/cm³).
3. `dropsPerMl = drops / volumeMl`, clamped to `[10, 50]`.
4. `mlPerDrop = volumeMl / drops`, rounded to 4 decimals.
5. Persist to `localStorage` and dispatch a `dropCalibrationUpdated` CustomEvent.

`resetToFactoryDefault()` restores the nominal 20.0 drops/ml baseline.

### Theme and Iframe Logic (js/common.js)

- `setTheme(theme, save)` toggles `light-mode` / `dark-mode` classes on `document.body`, swaps the toggle icon between `☀️` and `◐`, and optionally writes to `localStorage`.
- `sendHeight()` posts `{ height: document.body.scrollHeight + 50 }` to the parent window; it is invoked on load, resize, click, change, and via a `MutationObserver` on `document.body`.

---

## API Reference

All public functions are attached to `window`.

### Color Science (`js/ciede2000.js`)

| Function | Parameters | Returns |
|---|---|---|
| `window.ciede2000(lab1, lab2, kL, kC, kH)` | `lab1`, `lab2`: `{ l, a, b }`; weighting factors default to 1 | `number` ΔE₀₀ rounded to 2 decimals; `999` if either Lab is missing |
| `window.getCiede2000Rating(dE)` | `dE`: number | `{ category, ratingKey, label, badgeClass }` |
| `window.evaluateGamutBoundary(targetLab, availableInks, bestMatchDE00)` | target Lab, ink array, best ΔE₀₀ | `{ inGamut, gamutPercent, deltaE00, statusKey, message }` |

### Diluent Formulator (`js/diluent-formulator.js`)

| Function | Parameters | Returns |
|---|---|---|
| `window.calculateDiluentBatch(batchMl, waterPct, witchHazelPct, glycerinPct)` | numbers | Batch object with `water`, `witchHazel`, `glycerin` sub-objects |
| `window.initDiluentFormulatorUI()` | none | Binds DOM controls; called on `DOMContentLoaded` |

Internal helper `printDiluentBottleLabel(batchData, recipeName, batchNotes)` opens a print window with a formatted bottle label (batch ID format `DIL-<base36 timestamp>`).

### Gradient Caps (`js/gradient-caps.js`)

| Function | Parameters | Returns |
|---|---|---|
| `window.generateGradientLadder(options)` | `{ originHex, originName, destinationType, destHex, destName, capCount, capSizeKey }` | Array of cap objects |
| `window.initGradientCapsUI()` | none | Binds DOM controls; called on `DOMContentLoaded` |

Internal helpers: `renderGradientCapTray(caps)`, `printCapTrayCard(caps, options)`, `getLocalizedInkName(name)`.

### Drop Calibration (`js/studio-calibration.js`)

| Function | Parameters | Returns |
|---|---|---|
| `window.getCalibratedDropsPerMl()` | none | number (default 20.0) |
| `window.getCalibratedMlPerDrop()` | none | number (default 0.05) |
| `window.mlToDrops(ml)` | number | integer drops |
| `window.dropsToMl(drops)` | number | ml rounded to 2 decimals |
| `window.getDropCalibrationData()` | none | Shallow copy of the calibration object |
| `window.calculateDropCalibration(testDrops, measuredVal, unit, dispenserType)` | numbers/strings | Updated calibration object |
| `window.resetDropCalibration()` | none | Factory-default calibration object |
| `window.initCalibrationUI()` | none | Binds DOM controls; called on `DOMContentLoaded` |

### Formula Database (`js/formulas.js`)

| Function | Parameters | Returns |
|---|---|---|
| `window.getFormulasCategory(category)` | string | Object of formulas in that category, or `{}` |
| `window.getFormula(category, formulaKey)` | strings | Formula object or `null` |

### Common (`js/common.js`)

No public functions are exposed; the module wires up theme toggling, iframe height messaging, and the embed modal on `DOMContentLoaded`.

---

## Integration Guide

### Standalone Use

Open the live URL directly:

```
https://poliinternational.com/tools/ink-mixer/
```

The tool is a static HTML/CSS/JS bundle with no build step and no external runtime dependencies. All state (theme, drop calibration) is stored in the visitor's own browser via `localStorage`.

### Iframe Embedding

The tool ships an embed modal (`#embedBtn` → `#embedModal`) that generates an iframe snippet from the current page URL:

```html
<iframe src="https://poliinternational.com/tools/ink-mixer/"
        width="100%" height="800" frameborder="0"
        style="border-radius:12px;"></iframe>
```

A dedicated `embed.html` provides a compact two-tab view (Mixer and Gray Wash) with a simplified header, footer, and a feature list. It loads `i18n.js`, `ink-database.js`, `formulas.js`, `mixer.js`, and `common.js`.

### Parent-Page Communication

`common.js` posts the document height to the parent window on load, resize, click, change, and DOM mutation:

```js
window.parent.postMessage({ height: document.body.scrollHeight + 50 }, '*');
```

The parent page can also push a theme into the iframe:

```js
iframe.contentWindow.postMessage({ theme: 'light' }, '*');
```

The tool listens for `event.data.theme` and applies it via `setTheme`.

### Clipboard Behavior in Iframes

The embed modal's copy button uses `navigator.clipboard.writeText`. If the Clipboard API is refused (common inside cross-origin iframes), it falls back to `document.execCommand('copy')` on the already-selected textarea.

---

## Customization

- **Theme**: dark mode is the default; the toggle persists the choice under the `theme` localStorage key. A parent page can override it via `postMessage`.
- **Language**: seven locales are offered in the language selector (EN, FR, IT, DE, ES, NL, PT). Strings are resolved through `data-i18n` attributes and the `window.t` helper.
- **Drop calibration**: studios can recalibrate the drops-per-ml figure from a physical dispenser test; every module that reports drop counts (diluent, gradient caps) reads the calibrated value through `getCalibratedDropsPerMl()`.
- **Formula database**: `commonFormulas` in `js/formulas.js` is a plain object and can be extended with additional categories or entries without touching the UI code.

---

## Performance

- No network requests are made at runtime; all assets are static.
- Color math (CIEDE2000, gradient ladders, diluent batches) is pure arithmetic on small arrays and runs synchronously in the main thread.
- A `MutationObserver` on `document.body` triggers iframe height recalculation on dynamic content changes; the callback is a single `postMessage` and is cheap.
- `localStorage` is used only for the theme and the calibration object, both small.

---

## Browser Compatibility

- Requires JavaScript and HTML5 (declared in the JSON-LD `browserRequirements`).
- Uses `localStorage`, `MutationObserver`, `CustomEvent`, `postMessage`, `navigator.clipboard` (with `execCommand` fallback), and `window.open` for print views.
- The `<input type="color">` element is used for the target color picker and gradient origin/destination pickers; browsers without native color input support will fall back to a text field.
- The tool is responsive (`viewport` meta tag) and includes a `prefers`-agnostic dark/light theme toggle.

---

## Security

- **No data transmission**: all computation and storage happen in the browser. Nothing entered is sent anywhere; clearing site data removes stored values.
- **XSS surface**: user-supplied values that reach the DOM are limited to numeric inputs (parts, volumes, percentages) and hex color strings validated against `/^#[0-9a-fA-F]{6}$/` before being written back to color inputs. Print views (`printDiluentBottleLabel`, `printCapTrayCard`) interpolate recipe names, notes, and ink names into `document.write` templates; these are studio-authored labels, not remote content.
- **Clipboard**: the embed copy button prefers `navigator.clipboard.writeText` and falls back to `document.execCommand('copy')` when the API is unavailable.
- **Vault**: the Studio Tools & Vault tab is documented as using local AES-GCM 256-bit encryption with an offline `.vault` backup file; the encryption implementation itself is not present in the provided source.

---

## Version History

### 1.0.0

- Initial release of the Pigment Ink Mixer.
- Nine-tab full interface: Color Mixer & Target Solver, Reference Studio, Gradient Caps, Diluent Formulator, Studio Tools & Vault, My Inventory, Saved Formulas, Gray Wash Ladder, Color Science.
- CIEDE2000 (ΔE₀₀) color difference engine with perceptual rating and gamut boundary evaluation.
- Curated formula database across skin tones, portrait details, grays, landscape, and vibrant categories.
- Diluent vehicle formulator with bottle-size presets and printable batch labels.
- Gradient cap ladder generator (3 to 12 caps) with power-law subtractive interpolation and printable tray guide.
- Drop-volume calibration engine persisted to `localStorage`.
- Seven-language interface (EN, FR, IT, DE, ES, NL, PT).
- Dark/light theme toggle with parent-iframe `postMessage` support.
- Standalone `embed.html` two-tab variant and iframe auto-resize messaging.

---

## Support / Contact

For questions, bug reports, or feature requests, contact:

**support@poliinternational.com**

Poli International, creator of BioFlex® body jewelry.
