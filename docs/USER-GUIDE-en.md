# Tattoo Ink Mixer - Professional User Guide (English)

> Comprehensive operation manual for the Tattoo Ink Mixer web tool by Poli International, creator of BioFlex® body jewelry.

---

## 1. Introduction
The Tattoo Ink Mixer provides professional tattooists with a unified digital color workbench. It ensures reproducible pigment formulas across multi-session tattoos, accurate color matching via the CIEDE2000 standard, and clinical understanding of pigment deposition in diverse skin phototypes.

---

## 2. The 12 Studio Modules

### Module 1: Forward Ink Mixer
- **Purpose**: Calculate precise volumetric ratios and drop counts for multi-pigment blends.
- **How to use**:
  1. In the "Color Mixer" tab, choose component inks from the dropdown list.
  2. Enter the brand and batch lot number for studio traceability.
  3. Adjust the ratio parts (e.g., 3 parts Crimson, 1 part Cobalt Blue).
  4. Specify the total required batch volume in milliliters (ml) or ink caps (#16 / 2ml).
  5. Click **Calculate Mix** to generate the final formula, volumetric measurements, percentage breakdown, and visual swatch with L*a*b* coordinates.
  6. If multiple ink brands are selected, review the **Brand Mismatch Alert** for viscosity and carrier differences.
  7. Save the formula directly or print a physical formula sheet for your workstation.


### Module 2: Mix by Target Solver
- **Purpose**: Determine the exact component recipe needed to reproduce a specific target color using Kubelka-Munk and CIEDE2000 algorithms.
- **How to use**:
  1. In the "Mix by Target" tab, input a hex code or pick from realistic tattoo target presets (Deep Crimson, Skin Shadow, Forest Dark, etc.).
  2. The solver computes the closest mathematical match using pigments available in your inventory.
  3. Compare the **Target Color** and **Predicted Mix** swatches alongside the ΔE (Delta E) color-difference rating.
  4. Click **Load Into Forward Mixer** to make manual micro-adjustments, or **Save to Library** to store the result.


### Module 3: Studio Inventory & Pigment Stock
- **Purpose**: Track available pigment bottles, lot numbers, and expiration dates.
- **How to use**:
  1. Open the "Inventory" tab to review your shop's stock.
  2. Filter by brand or category (primary, neutral, wash).
  3. Mark items as "In Stock" or "Depleted". Depleted items are automatically excluded or deprioritized by the Target Solver.

### Module 4: Formula Library
- **Purpose**: Maintain a catalog of custom formulas and access curated professional recipes.
- **How to use**:
  1. Access the "Saved Formulas" tab to search saved recipes by title, tag, or date.
  2. Click **Load Formula** to transfer any recipe into the active mixer.
  3. Click **Export Library (JSON)** to download a full local backup, or **Export CSV** for physical station logs.
  4. Use **Import Library** to restore previous backups without sending data over the network.

### Module 5: Formula Ink Substitution View
- **Purpose**: Rapidly assess and formulate replacements when a project ink shade is depleted mid-session.
- **How to use**:
  1. Open the "Substitution View" within the Saved Formulas tab.
  2. Select any saved recipe from your formula library.
  3. Mark one ingredient ink as out of stock.
  4. Select a replacement ink from your studio inventory.
  5. Review the side-by-side Before and After color swatches.
  6. Examine the CIEDE2000 color difference (ΔE₀₀). If ΔE > 5.0, heed the prominent warning: "This will not match. Mix a test cap first."
  7. Note that screen colour is indicative only on an uncalibrated screen.
  8. Click **Load in Mixer** to fine-tune the ratios, or **Save Substituted Recipe** to store the adjusted formulation in your library.


### Module 6: Reference Studio & Palette Extractor
- **Purpose**: Extract dominant color palettes directly from client reference photos.
- **How to use**:
  1. Go to the "Reference Studio" tab and drop a reference image onto the canvas.
  2. Click anywhere on the image canvas with the eyedropper to sample custom coordinates.
  3. The system extracts a balanced 5-color palette.
  4. Click **Convert to Formula** on any extracted swatch to load it into the Target Solver.

### Module 7: Gradient & Value Cap Formulator
- **Purpose**: Formulate progressive shading caps for black-and-grey and smooth color transitions.
- **How to use**:
  1. In the "Gradient Caps" tab, select a 3, 4, 5, or 6-cap setup.
  2. Set your dark baseline pigment and diluent medium.
  3. Read the drop-by-drop recipe per cap to ensure smooth tonal stepping across your palette.

### Module 8: Diluent & Medium Formulator
- **Purpose**: Mix custom shading solutions and thinning mediums safely.
- **How to use**:
  1. Open the "Diluent Formulator" tab and choose your application (Thin Wash, Lining Medium, or Heavy Shading Solution).
  2. Adjust volume to receive precise ratios of distilled water, cosmetic-grade hamamelis (witch hazel), and vegetable glycerin.

### Module 9: Gray Wash Studio Mixing Series
- **Purpose**: Standardize black wash dilutions from light tint (5%) to deep shade (90%) and calculate master 3-cap, 4-cap, and 5-cap ladders.
- **How to use**:
  1. In the "Gray Wash" tab, select a pre-configured studio system (3-Cap Essential, 4-Cap Smooth Shading, or 5-Cap Micro-Gradient).
  2. Choose container size (#9, #12, #16 caps, or 1oz, 2oz, 4oz squeeze bottles).
  3. Use the slider for continuous wash dilution percentages, copying or loading recipes directly into the mixer.

### Module 10: Lighting & Studio Calibration
- **Purpose**: Ensure accurate pigment perception and avoid metameric failure.
- **How to use**:
  1. Review recommended studio lighting parameters (5000K to 6500K daylight-balanced illumination with CRI > 95).
  2. Check lighting setup advice before evaluating color saturation on healing tattoos.

### Module 11: Color Theory & Principles
- **Purpose**: Review core color mixing physics, pigment tinting power, and complementary neutralization.
- **How to use**:
  1. Read pigment behavior guides to understand why high-opacity pigments (like Titanium White) must be dosed sparingly.
  2. Use the subtractive neutralization calculator to correct unwanted tattoo undertones.

### Module 12: Studio Tools & Vault
- **Purpose**: Secure client records and proprietary studio recipes with local AES-GCM 256-bit encryption.
- **How to use**:
  1. Open the "Studio Tools & Vault" tab.
  2. Create a passphrase to encrypt all stored recipes and client notes into an offline `.vault` backup file.
  3. Decrypt on any studio computer without data ever leaving your browser.

---

## 3. Verification and Compliance
- **Data Protection**: Nothing you enter is sent anywhere. Formulas, inventory and notes are stored only in your own browser, and clearing site data removes them.
- **Safety Standard Notice**: Tattoo pigments and studio formulations must adhere to established professional practice and applicable regional chemical restrictions such as EU REACH Annex XVII.
- **Skin Tone Matching Tool**: For in-depth pigment visibility analysis across Fitzpatrick phototypes and healed melanin interaction, use our dedicated companion tool at [https://poliinternational.com/skin-tone-pigment-matcher/](https://poliinternational.com/skin-tone-pigment-matcher/).
