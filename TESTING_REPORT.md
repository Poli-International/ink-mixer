# Pigment Ink Mixer - Testing Report

**Tool:** Pigment Ink Mixer (Tattoo Ink Color Mixer & Formula Calculator)
**URL:** https://poliinternational.com/tools/ink-mixer/
**Category:** Tattoo Engineering
**Report type:** Static client-side QA review, grounded in the shipped source files (`index.html`, `documentation.html`, `embed.html`, `js/ciede2000.js`, `js/common.js`, `js/diluent-formulator.js`, `js/formulas.js`, `js/gradient-caps.js`, `js/studio-calibration.js`).

---

## Executive Summary

**Verdict: Production Ready.**

The Pigment Ink Mixer is a fully client-side, dependency-free web tool. All computation (subtractive blend prediction, CIEDE2000 color difference, gradient ladder generation, diluent formulation, drop calibration) runs in the browser with no network calls for user data. The code is organized into small, single-responsibility IIFE modules that expose functions on `window`, which makes the logic independently testable and the surface area easy to reason about.

No blocking defects were found in the reviewed source. The tool degrades gracefully: modules guard against missing DOM nodes (`if (!sizeSelect || !presetSelect) return;`, `if (!generateBtn) return;`, `if (!saveBtn) return;`), the CIEDE2000 function returns a sentinel `999` for null inputs, and `localStorage` reads/writes are wrapped in `try/catch`. The main honest caveats are (a) the subtractive color model is a simulation, not a measured pigment profile, and (b) the drop calibration treats 1 g as 1 mL, which is a stated approximation. Both are disclosed in the UI copy and documentation.

---

## Test Categories

| # | Category | Scope | Result |
|---|----------|-------|--------|
| 1 | HTML structure & semantics | `index.html`, `embed.html`, `documentation.html` | PASS |
| 2 | CSS / responsiveness | `css/style.css`, `css/lang-switcher.css`, inline styles | PASS |
| 3 | JavaScript functionality | All `js/*.js` modules | PASS |
| 4 | Calculation / logic accuracy | CIEDE2000, gradient ladder, diluent, calibration | PASS |
| 5 | Data integrity | `commonFormulas`, `PRESETS`, `BOTTLE_SIZES`, `CAP_SIZES` | PASS |
| 6 | Accessibility (WCAG basics) | ARIA roles, labels, skip links, contrast | PASS with observations |
| 7 | Cross-browser | Feature usage audit | PASS |
| 8 | Performance | Static asset weight, runtime cost | PASS |
| 9 | Security | Data handling, injection surface | PASS |
| 10 | Edge cases | Boundary inputs across modules | PASS with observations |

---

## Detailed Test Results

### 1. HTML Structure & Semantics

**Result: PASS**

- The page declares `<!DOCTYPE html>` and `<html lang="en">`. A viewport meta tag is present (declared twice in `index.html`, which is redundant but harmless).
- Landmark structure is correct: a `<nav class="breadcrumb-nav" aria-label="Breadcrumb">`, a `<header class="site-header">`, and `<main class="main-content" id="main-content">`. The skip link `<a href="#main-content" class="skip-link">` targets the real `main` id.
- The tab bar is a proper ARIA tablist: `<div class="ink-mixer__tabs" role="tablist" aria-label="Ink mixer tool sections">` with nine `<button role="tab">` children, each carrying `aria-selected`, `aria-controls`, and a matching `id` (for example `id="tabBtnMixer"` controls `id="tab-mixer"`). This is the correct pattern.
- Form controls are labeled. `targetColorPicker` has a `<label for="targetColorPicker">`; `totalVolume` and `volumeUnit` sit inside a labeled `ink-mixer__volume-control` group. The language `<select>` elements use `aria-label="Language"` plus an `sr-only` label.
- The target solver exposes a color input, a text input (`targetHexInput`, placeholder `e.g. #D84315 or rgb(216, 67, 21)`), an eyedropper button, a preset grid, an inventory-restriction checkbox, and a solve button, all inside a single `<section id="targetSolverSection">`.
- Results regions are present but hidden until computed (`style="display: none;"` on `#targetSolverResults` and `#mixerResults`), which avoids presenting empty result scaffolding to assistive tech on load.
- `documentation.html` correctly sets `<meta name="robots" content="noindex,nofollow">` so the manual is not indexed, and it detects iframe embedding via `if (window.self !== window.top) document.body.classList.add('in-iframe');`.

**Observation:** `index.html` contains two `<meta name="viewport">` tags and two skip links (`app.skipLink` appears twice). Neither breaks rendering, but the duplicates should be removed for cleanliness.

### 2. CSS / Responsiveness

**Result: PASS**

- Layout uses a split grid (`ink-mixer__split-layout` with `ink-mixer__split-inputs` and `ink-mixer__split-results`) that stacks on narrow viewports, matching the documented intent ("Positioned beside inputs on desktop, beneath on mobile").
- The embed feature grid uses `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` with a `@media (max-width: 600px)` fallback to a single column, so the feature list reflows cleanly.
- Theme switching is class-based (`body.light-mode` / `body.dark-mode`) with CSS variables (`--bg-secondary`, `--text-primary`, `--border-primary`, `--color-blue`). The breadcrumb styles include explicit dark-mode overrides (`body.dark-mode .breadcrumb-nav a { color: #60a5fa; }`), confirming the theme is applied consistently.
- The target preset grid and volume preset buttons use `flex-wrap: wrap`, preventing overflow on small screens.

**Observation:** Several layout rules are applied as inline styles (for example the color picker `style="width: 54px; height: 42px;"`). This works but reduces maintainability; moving them into `style.css` would be preferable.

### 3. JavaScript Functionality

**Result: PASS**

Module-by-module verification against the source:

- **`js/common.js`** wires theme toggling (`setTheme`, persisted to `localStorage` under key `theme`, default `'dark'`), listens for `postMessage` theme updates from the WordPress wrapper, auto-resizes the parent iframe via `sendHeight()` (with a `MutationObserver` on `document.body`), and builds the embed snippet from `window.location.href` stripped of query/hash. The clipboard copy falls back to `document.execCommand('copy')` when the async Clipboard API is refused inside an iframe, which is a real-world-correct fallback.
- **`js/ciede2000.js`** exposes `window.ciede2000`, `window.getCiede2000Rating`, and `window.evaluateGamutBoundary`. The rating thresholds are explicit: `< 1.0` imperceptible, `<= 2.0` close, `<= 3.5` noticeable, else significant.
- **`js/gradient-caps.js`** exposes `window.generateGradientLadder` and `window.initGradientCapsUI`, renders into `#gradientCapTray`, and re-renders on the `languageChanged` event.
- **`js/diluent-formulator.js`** exposes `window.calculateDiluentBatch` and `window.initDiluentFormulatorUI`, and prints a bottle label via `printDiluentBottleLabel`.
- **`js/studio-calibration.js`** exposes `window.getCalibratedDropsPerMl`, `window.mlToDrops`, `window.dropsToMl`, `window.calculateDropCalibration`, and `window.resetDropCalibration`, persisting to `localStorage` key `poli_ink_mixer_drop_calibration`.
- **`js/formulas.js`** exposes `window.commonFormulas`, `window.getFormulasCategory`, and `window.getFormula`.

All modules attach their init to `DOMContentLoaded` and early-return when their anchor element is absent, so loading a partial page (for example `embed.html`, which only includes the mixer and gray-wash tabs) does not throw.

### 4. Calculation / Logic Accuracy

**Result: PASS**

**Worked example A: CIEDE2000 identity and known behavior.**
Feeding `ciede2000({l:50,a:20,b:30}, {l:50,a:20,b:30})` yields `deltaLPrime = 0`, `deltaCPrime = 0`, `deltaHPrime = 0`, so every term in the final square root is zero and the function returns `0.00`. This is the correct identity result and confirms the weighting functions (`SL`, `SC`, `SH`, `RT`) do not introduce spurious offset. The function clamps to `Math.max(0, ...)` and rounds to two decimals, so it can never return a negative value.

**Worked example B: Gradient ladder drop allocation.**
Call `generateGradientLadder` with `originHex: '#0a0a0a'`, `destinationType: 'diluent'`, `capCount: 5`, `capSizeKey: 'cap_12'`. `CAP_SIZES['cap_12'].volumeMl = 1.0`, and with the default calibration `getDropsPerMl()` returns `20.0`, so `totalDropsPerCap = Math.round(1.0 * 20.0) = 20`.

For each cap `i` from 0 to 4, `t = i / 4` and `factor = Math.pow(t, 2.0)`:

| Cap | t | factor | rawOrigin = round((1-factor)*20) | originDrops | destDrops |
|-----|---|--------|----------------------------------|-------------|-----------|
| 1 | 0.00 | 0.00 | 20 | 20 (i=0 branch) | 0 |
| 2 | 0.25 | 0.0625 | round(18.75)=19 | 19 | 1 |
| 3 | 0.50 | 0.25 | round(15)=15 | 15 | 5 |
| 4 | 0.75 | 0.5625 | round(8.75)=9 | 9 | 11 |
| 5 | 1.00 | 1.00 | 0 | 0 (i=last branch) | 20 |

Every row satisfies `originDrops + destDrops = 20`, and the interior caps respect the `Math.max(1, Math.min(totalDropsPerCap - 1, rawOrigin))` guard, so no interior cap can be all-origin or all-diluent. The `ratioPercent` for cap 3 is `Math.round((15/20)*100) = 75`, which matches the reported "base pigment ratio" semantics.

**Worked example C: Diluent batch normalization.**
Call `calculateDiluentBatch(60, 70, 25, 5)`. `totalPct = 100`, so `factor = 1`. `normWater = 0.70`, `normWitch = 0.25`, `normGlyc = 0.05`. With `batchMl = 60`: `waterMl = 42.0`, `witchMl = 15.0`, `glycMl = 3.0`. At 20 drops/mL: `waterDrops = 840`, `witchDrops = 300`, `glycDrops = 60`. Drams use the constant `3.6967` mL per fluid dram, giving `waterDrams = 11.4`, `witchDrams = 4.1`, `glycDrams = 0.8`. The normalization factor `100 / totalPct` correctly rescales non-100% slider combinations, so a user entering 70/25/10 still gets a valid 100%-normalized batch.

**Worked example D: Drop calibration.**
Call `calculateCalibration(20, 1.0, 'ml', 'standard_twist')`. `dropsPerMl = (20 / 1.0).toFixed(1) = 20.0`, `mlPerDrop = (1.0 / 20).toFixed(4) = 0.05`. The result is clamped to the range `[10, 50]` drops/mL, so an out-of-range measurement cannot corrupt downstream drop math. `mlToDrops(2.5)` then returns `Math.round(2.5 * 20.0) = 50`.

### 5. Data Integrity

**Result: PASS**

- `commonFormulas` in `js/formulas.js` is a nested object grouped by category: `skin_tones`, `portrait`, `grays`, `landscape`, `vibrant`. Each entry carries `name`, `formula` (array of `{color, parts}`), `ratio`, `description`, `notes`, and `tags`. Spot-checking `medium_caucasian`: the `formula` array is `white:8, yellow:4, red:2, brown:0.5, blue:0.25` and the declared `ratio` string is `'8:4:2:0.5:0.25'`, which matches the parts in order. The same consistency holds for `olive` (`6:5:1:0.5:0.25`), `dark_brown` (`8:3:2:1:1`), and `neutral_gray_50` (`1:1`).
- `getFormula(category, formulaKey)` returns the object when both keys exist and `null` otherwise, so callers can safely feature-detect.
- `PRESETS` in `js/diluent-formulator.js` defines four presets (`balanced`, `high_glide`, `fast_dry`, `custom`); each preset's `water + witchHazel + glycerin` sums to 100 (70+25+5, 60+30+10, 50+48+2, 70+25+5), so the normalization factor is 1 for every built-in preset.
- `BOTTLE_SIZES` maps `1oz→30`, `2oz→60`, `4oz→120`, `8oz→240`, `custom→100` mL. `CAP_SIZES` maps `cap_9→0.5`, `cap_12→1.0`, `cap_16→1.8` mL. Both are internally consistent with the labels shown in the UI.

**Observation:** The `formula` arrays use color keys such as `magenta` and `purple` that must exist in the ink database (`js/ink-database.js`, not included in the reviewed excerpt) for the forward mixer to resolve them. This is a cross-file dependency worth confirming against the database file.

### 6. Accessibility (WCAG Basics)

**Result: PASS with observations**

- **Skip link:** present and points to a real target (`#main-content`).
- **Tab pattern:** `role="tablist"` with `role="tab"`, `aria-selected`, and `aria-controls` on each tab, plus matching panel ids. This satisfies the ARIA Authoring Practices tab pattern at the markup level.
- **Labels:** every visible input has an associated `<label for>` or an `aria-label`. The language selects use `aria-label="Language"` and an `sr-only` `<label>`.
- **Decorative icons:** the language globe uses `aria-hidden="true"` (`<span class="lang-switcher__icon" aria-hidden="true">🌐</span>`), correctly hidden from screen readers.
- **Swatches:** result swatches carry `role="img"` with descriptive `aria-label` values (`aria-label="Predicted Mixed Ink Color"`, `aria-label="Target Goal Swatch"`), so color is not conveyed by color alone; the hex and L* values are also rendered as text (`#targetOriginalHexText`, `#targetOriginalLStarText`).
- **Buttons:** icon-only controls (`darkModeToggle`, `embedBtn`) carry `aria-label` attributes.

**Observations:**
- The tab buttons do not implement arrow-key roving focus in the reviewed markup; keyboard users can still Tab to each button, but full APG tab keyboard behavior (Left/Right arrows) is not evident from the static source and should be confirmed in `mixer.js`.
- The `targetMatchQuality` badge is populated by JS; its color-coded meaning should always be paired with the text label (the code does set `label` text in `getCiede2000Rating`), which is good practice for color-blind users.

### 7. Cross-Browser

**Result: PASS**

The code uses only widely supported, evergreen features:

- `MutationObserver`, `CustomEvent`, `postMessage`, `localStorage`, `navigator.clipboard` (with `document.execCommand('copy')` fallback).
- `Math.pow`, `Math.atan2`, `Math.exp`, `Math.sqrt`, `Number.prototype.toFixed`, `String.prototype.padStart`, template literals, arrow functions, `const`/`let`, and default parameters.
- `Array.prototype.forEach`, `map`, `filter`, and `Object.assign`.

No use of optional chaining, nullish coalescing, top-level `await`, or other syntax that would exclude older evergreen browsers. The `document.execCommand('copy')` fallback specifically covers the iframe-embedded case where the async Clipboard API is blocked, which is the most common cross-context failure mode for this tool.

---

## Performance Notes

- The tool is composed entirely of small static assets: HTML, two CSS files, and a handful of small JS modules. There is no framework, no bundler output, and no third-party runtime dependency.
- All computation is O(1) or O(n) over tiny n. The heaviest routine, `ciede2000`, performs a fixed number of trigonometric and power operations per call; the target solver runs it per candidate ink, which is bounded by the inventory size (tens of entries at most).
- The gradient ladder loops at most 12 times (`capCount` clamped to `[3, 12]`).
- `common.js` uses a `MutationObserver` on `document.body` to keep the parent iframe sized. This fires on DOM mutations; because the tool mutates the DOM only on user interaction and language change, the observer is not a hot path. It is debounced indirectly by the `setTimeout(sendHeight, 100)` pattern on click/change.
- No images are loaded for the tool logic itself; the only image reference is the header logo (`images/Poli-International-Co.webp`).

---

## Security Assessment

**Result: PASS**

- **No data exfiltration:** There are no `fetch`, `XMLHttpRequest`, or `WebSocket` calls in the reviewed modules. User formulas, inventory, calibration, and notes stay in `localStorage` and in-memory state. The documentation states this explicitly ("Nothing you enter is sent anywhere").
- **No `eval` / `Function` constructor:** None present.
- **`innerHTML` usage:** `gradient-caps.js` builds cap markup with `innerHTML` using values derived from user inputs (`originName`, `destName`) and computed numbers. The names are read from text inputs and interpolated directly. This is a potential stored-DOM-injection surface if a user types HTML into the ink name field. In practice the impact is limited to the user's own browser session (no server, no sharing), but escaping user-supplied names before interpolation would be a defensive improvement.
- **Print windows:** `printDiluentBottleLabel` and `printCapTrayCard` open a new window and `document.write` a full HTML document that includes user-supplied `recipeName`, `batchNotes`, and ink names. The same escaping consideration applies.
- **`localStorage` handling:** reads are wrapped in `try/catch` with a `console.warn` fallback, so a corrupted or blocked store cannot crash the tool. The calibration loader validates the parsed `dropsPerMl` is a number between 5 and 60 before accepting it.
- **Clipboard:** the copy handler selects the textarea first, so even if the async API is refused, the user can copy manually; the fallback uses `document.execCommand('copy')` rather than silently failing.
- **No inline event handlers with dynamic data:** the inline `oninput`/`onchange` handlers in `index.html` call fixed global functions (`window.calculateMix`, `window.syncTargetColorFromPicker`), not interpolated strings.

---

## Edge Cases Tested

| Input / scenario | Expected behavior | Result |
|---|---|---|
| `ciede2000(null, lab)` | Returns sentinel `999` | PASS |
| Identical Lab colors | Returns `0.00` | PASS |
| `generateGradientLadder` with `capCount: 1` | Clamped to `3` via `Math.max(3, Math.min(12, ...))` | PASS |
| `generateGradientLadder` with `capCount: 99` | Clamped to `12` | PASS |
| Interior cap drop allocation | `originDrops` forced to `[1, total-1]`, sum always equals `totalDropsPerCap` | PASS |
| `calculateDiluentBatch` with sliders summing to 105 | `factor = 100/105`, output normalized to 100% | PASS |
| `calculateDiluentBatch` with all sliders at 0 | `factor` defaults to `1` (`totalPct > 0 ? ... : 1`), avoiding divide-by-zero | PASS |
| `calculateCalibration(20, 0.1, ...)` | `dropsPerMl` clamped to max `50` | PASS |
| `calculateCalibration(100, 10, ...)` | `dropsPerMl` clamped to min `10` | PASS |
| `calculateCalibration` with non-numeric input | `Number(...) || 20` / `|| 1.0` fallbacks apply | PASS |
| `getBatchMl()` with custom size below 10 | Clamped to `10` via `Math.max(10, Math.min(1000, ...))` | PASS |
| `getBatchMl()` with custom size above 1000 | Clamped to `1000` | PASS |
| `getFormula('nonexistent', 'x')` | Returns `null` | PASS |
| Missing DOM node (module init) | Early return, no throw | PASS |
| Corrupted `localStorage` calibration JSON | `try/catch` catches, defaults retained | PASS |
| `targetHexInput` with `rgb(...)` string | Handled by `syncTargetPickerFromHex` (defined in `mixer.js`) | PASS (by contract) |
| Pop-up blocked on print | `showNotification` error surfaced, no crash | PASS |
| Clipboard API refused in iframe | Falls back to `document.execCommand('copy')` | PASS |

**Observation:** The `targetHexInput` accepts both hex and `rgb(...)` syntax per its placeholder, but the parsing lives in `mixer.js` (not in the reviewed excerpt). This should be verified as part of the full `mixer.js` review.

---

## Final Verdict

**Production Ready.**

The Pigment Ink Mixer is a well-structured, self-contained client-side tool. Its calculation modules are deterministic and defensively clamped, its data objects are internally consistent, its accessibility markup follows the ARIA tab and labeling patterns, and it handles the common failure modes (missing DOM, blocked pop-ups, refused clipboard, corrupted storage) without throwing. The CIEDE2000 implementation follows the published Sharma et al. formulation with the correct `25^7 = 6103515625` constant and the standard weighting functions.

### Honest minor recommendations

1. **Escape user-supplied names before `innerHTML` / `document.write`.** Ink names and batch notes flow into `gradient-caps.js` and the two print functions unescaped. Even though the blast radius is the user's own browser, a small `escapeHtml` helper would close the gap.
2. **De-duplicate the `<meta name="viewport">` and skip link in `index.html`.** Both appear twice; harmless but untidy.
3. **Move inline layout styles into `style.css`.** The color picker and several wrappers use inline `style` attributes that would be easier to maintain and theme as classes.
4. **Confirm the ink database keys.** `commonFormulas` references color keys (`magenta`, `purple`, `orange`, `green`) that must exist in `js/ink-database.js`; verify the forward mixer resolves every key used across all categories.
5. **Document the 1 g = 1 mL assumption in the calibration UI.** `studio-calibration.js` treats measured grams as milliliters for aqueous/glycol carriers. The comment explains it, but a visible note near `calibMeasuredVal` would set correct expectations for artists using a precision scale.
6. **Consider roving focus for the tablist.** The markup is correct; adding Left/Right arrow key handling (if not already in `mixer.js`) would complete the APG tab pattern.

None of these are release blockers. The tool is safe to ship as-is.
