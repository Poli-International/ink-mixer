# Tattoo Ink Mixer - Technical Documentation (English)

> Architectural specifications, algorithmic formulas, data schemas, and integration guidelines for the Tattoo Ink Mixer by Poli International, creator of BioFlex® body jewelry.

---

## 1. Architecture Overview
The Tattoo Ink Mixer is a standalone, client-side web application built with vanilla HTML5, CSS3 (using CSS custom properties), and modular ES6+ JavaScript. It operates without external runtime dependencies, requiring no third-party CDNs, external web fonts, or server-side databases.

### Content Security Policy (CSP)
The application adheres strictly to:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Zero remote scripts, tracking pixels, or remote fonts are loaded. All vendor libraries are strictly hosted locally under `js/vendor/`. Zero network requests are made during runtime.

---

## 2. Core File Structure
```
ink-mixer/
├── index.html                  # Unified interface containing all 12 modules and responsive layout
├── embed.html                  # Lightweight iframe embedding interface
├── css/
│   ├── style.css               # Main stylesheet (CSS custom properties, fluid responsive layouts)
│   └── lang-switcher.css       # Header language selector styling
├── js/
│   ├── i18n.js                 # Translation core (lookup, parameter substitution, DOM updates)
│   ├── i18n/                   # Language dictionaries (673 synchronized keys each)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # CIEDE2000 color difference (Delta E 00) mathematical engine
│   ├── ink-database.js         # Calibrated pigment properties database
│   ├── inventory.js            # Studio inventory manager with localStorage persistence
│   ├── formulas.js             # Curated professional formula database
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # FormulaLibrary CRUD, search, JSON import/export, CSV generator
│   ├── mixer.js                # Forward mixing calculator and Kubelka-Munk target solver
│   ├── studio-calibration.js   # Lighting temperature (5000K-6500K) and CRI evaluation
│   ├── reference-studio.js     # HTML5 Canvas color sampling and palette extraction
│   ├── gradient-caps.js        # Value cap progression calculator (3 to 6 caps)
│   ├── diluent-formulator.js   # Shading solution recipe calculator (water, hamamelis, glycerin)
│   ├── studio-vault.js         # Web Crypto API AES-GCM 256-bit client-side encrypted storage
│   └── common.js               # Theme state, modal management, and responsive utilities
├── docs/
│   ├── USER-GUIDE.md           # Master documentation index for user guides
│   ├── TECHNICAL-DOCS.md       # Master documentation index for technical specifications
│   ├── USER-GUIDE-*.md         # Per-language user guides (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Per-language technical docs (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Application metadata and runtime declarations
└── package.json                # Project configuration (Node.js >= 20)
```

---

## 3. Algorithmic Foundations

### 1. Volumetric Ratios and Unit Conversion
Component proportion $P_i$ against total parts $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volume}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Drops}_i = \text{round}\left( \text{Volume}_i \times 20 \right) \quad (\text{standard capillary drop factor: } 20\text{ drops} \approx 1\text{ ml})$$
$$\text{Caps}_i = \frac{\text{Volume}_i}{2.0} \quad (\text{standard tattoo cap size \#16 } \approx 2\text{ ml})$$

### 2. Color Science: Kubelka-Munk and CIEDE2000
- **Forward Mixture Estimation**: Subtractive color mixing uses absorption ($K$) and scattering ($S$) coefficients derived from pigment opacity and tinting strength.
- **Target Solver**: Given target color coordinates in CIE $L^*a^*b^*$, the solver uses iterative optimization to minimize $\Delta E_{00}$ calculated via the standard ISO/CIE CIEDE2000 formulation:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Values below $\Delta E_{00} < 2.0$ indicate high-fidelity perceptual matches. In the Formula Substitution module, $\Delta E_{00} > 5.0$ prompts a prominent warning requiring a physical test cap before tattooing.

### 3. Client-Side Encryption (Studio Vault)
The Studio Vault uses the standard Web Crypto API (`window.crypto.subtle`):
- **Algorithm**: AES-GCM with a 256-bit key.
- **Key Derivation**: PBKDF2 with SHA-256, 100,000 iterations, and a cryptographically secure 16-byte random salt.
- **Initialization Vector**: Unique 12-byte IV generated per encryption.

### 4. Color Temperature and CRI Calibration
Accurate pigment perception requires studio lighting between 5000K and 6500K with a Color Rendering Index (CRI) exceeding 95 to prevent metameric failure when assessing subtle color gradations.

### 5. Internationalization Engine
The localization system maintains 673 synchronized keys across seven supported languages (EN, DE, ES, FR, IT, NL, PT) with live runtime language switching and parameter substitution.

---

## 4. Regulatory and Standard Citations
- **Material Standards for Tattoo Hardware / Piercing**: Cites real designations where applicable: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Annex XVII.
- **Brand Information**: Patrick Poli is the creator of BioFlex® body jewelry. BioFlex is PP-R random copolymer.
- **Data Protection**: Nothing you enter is sent anywhere. Formulas, inventory and notes are stored only in your own browser, and clearing site data removes them.
- **Professional Practice**: Chemical handling and diluent hygiene follow established professional practice and applicable public health guidance.
