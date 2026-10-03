# Pigment Ink Mixer - Complete Guide

## Target Keywords

**Primary keyword:** tattoo ink mixer

**Long-tail keywords:**

1. tattoo ink color mixing calculator
2. pigment blending ratio calculator for tattoo ink
3. mix tattoo ink by target color hex code
4. CIEDE2000 tattoo ink color match checker
5. scale tattoo ink recipe to any volume
6. tattoo ink substitution out of stock color match
7. gray wash dilution ladder calculator
8. tattoo ink drops per ml calibration
9. tattoo ink formula library save and export
10. diluent formulator witch hazel glycerin ratio
11. gradient cap shading ladder generator
12. tattoo ink inventory tracker on hand bottles
13. subtractive CMYKW ink blend predictor
14. tattoo ink batch lot number record keeping
15. reference photo palette extractor for tattoo ink

---

## Meta Title

```
Professional Tattoo Ink Mixer & Color Blender
```

## Meta Description

```
Mix tattoo ink colours by ratio, scale a recipe to any volume, swap an out-of-stock ink with a CIEDE2000 match check, and keep batch-recorded formulas.
```

---

## H1 + Content Outline

# Pigment Ink Mixer

## What is the Pigment Ink Mixer?
### A browser-based subtractive pigment workbench
### What it calculates and what it stores

## Who Should Use This
### Tattoo artists and studio owners
### Apprentices learning color theory
### Artists matching a client reference photo

## How to Use the Pigment Ink Mixer
### Tab 1: Color Mixer & Target Solver
#### Mix by Target Color (Inverse Ratio Solver)
#### Manual Subtractive Ink Mixing Calculator
#### Reading the Predicted Color & Dispenser Breakdown
### Tab 2: Reference Studio
### Tab 3: Gradient Caps
### Tab 4: Diluent Formulator
### Tab 5: Studio Tools & Vault
### Tab 6: My Inventory
### Tab 7: Saved Formulas
### Tab 8: Gray Wash Ladder
### Tab 9: Color Science

## Inputs and Outputs at a Glance
### Volume units (ml, caps, oz)
### Drop calibration and drops per ml
### CIEDE2000 match ratings explained

## Use-Case Examples
### Example 1: Solving a target hex for a client reference
### Example 2: Scaling a saved skin-tone recipe to a 30 ml bottle
### Example 3: Substituting a depleted ink mid-session

## Frequently Asked Questions (FAQ)

## Structured Data

---

## What is Pigment Ink Mixer?

The Pigment Ink Mixer is a free browser tool that calculates tattoo ink colour mixtures, scales a recipe to any batch volume, and records the result so the same mix can be made again. It runs entirely in the browser: formulas, inventory and notes are stored locally, and nothing you enter is sent anywhere.

The tool models tattoo ink as a **subtractive pigment system (CMYKW)**. When you enter pigment parts, it predicts the blended colour, shows a large judgeable swatch with its hex value, lightness, L\* value and tone label, and breaks the batch down into volume (ml), percentage and drops at roughly 20 drops per ml (adjustable via calibration).

Alongside the forward mixer, the tool includes an **inverse solver**: you enter a target colour as a hex code or RGB value (or pick a preset, or eyedrop from screen), and it calculates the closest achievable parts ratio from your ink stock. The match is scored with **CIEDE2000 (ΔE₀₀)**, the ISO/CIE 11664-6:2014 colour difference standard, and rated from "Imperceptible Match (High Fidelity)" through "Close Match", "Noticeable Variation (Usable Shading)" to "Significant Shift (Outside Core Gamut)". A gamut boundary check tells you whether the target sits inside or outside the achievable range of your on-hand pigments.

The tool also covers the surrounding studio workflow: extracting palettes from client reference photos, generating gradient cap ladders, formulating diluent vehicles from distilled water, witch hazel and vegetable glycerin, tracking bottle stock, saving and exporting formulas, and encrypting records into an offline vault.

---

## Who Should Use This

**Tattoo artists and studio owners.** Anyone who mixes custom shades and needs the mix to be repeatable across sessions. The formula library, batch lot fields and print sheets exist for exactly this.

**Artists working on multi-session pieces.** When a large piece spans several appointments, the saved formula plus batch number lets you rebuild the same colour months later.

**Apprentices and artists learning colour theory.** The Color Science tab, the subtractive blend prediction and the neutralisation guidance explain why a mix behaves the way it does.

**Artists matching a client reference photo.** The Reference Studio extracts a balanced 5-colour palette from an uploaded image, and any extracted swatch can be converted straight into a target formula.

**Artists managing studio stock.** The Inventory tab tracks bottles, lot numbers and expiration dates, and depleted items can be excluded from the solver so it only proposes mixes you can actually make.

---

## How to Use the Pigment Ink Mixer

### Tab 1: Color Mixer & Target Solver

This tab contains two workflows that feed each other.

#### Mix by Target Color (Inverse Ratio Solver)

1. Enter your target colour. Use the colour picker, type a hex code such as `#8B3A3A` or an `rgb(216, 67, 21)` value into the hex field, click **🔍 Eyedrop** to sample from your screen, or choose a preset from the **Quick Target Presets** grid.
2. Optionally tick **Restrict solver strictly to bottles marked "On Hand" in My Inventory** so the solver only uses stock you have.
3. Click **🔍 Calculate Optimal Mix Ratio**.
4. Review the results: a **Target Goal** swatch beside a **Predicted Match** swatch, each with its hex value and L\* value, plus a match quality badge.
5. Read the **Honest Match Assessment** box, which explains the result in plain terms.
6. Check the **Solved Recipe** ratio string and the measurements table, which lists each component ink with its brand, ratio parts, and the amount needed for a single cap (#16 / 2 ml), a 5 ml mix, and a 30 ml bottle.
7. Choose an action: **📥 Load Into Forward Mixer** to fine-tune by hand, **💾 Save to Formula Library**, or **🖨️ Print Formula Sheet**.

#### Manual Subtractive Ink Mixing Calculator

1. In the **Manual Subtractive Ink Mixing Calculator** section, pick component inks from the dynamically populated colour selectors. Each row carries a visual swatch plus brand and batch number fields for traceability.
2. Set the **parts** value for each pigment, for example 3 parts crimson to 1 part blue.
3. Click **+ Add Another Component** to add more pigments, or **↺ Reset Inputs** to start over.
4. Set **Total Volume Needed** and choose a unit: **ml (Milliliters)**, **caps (#16 Large / 2ml)**, **caps (#9 Small / 1ml)**, or **oz (Fluid Ounces / 30ml)**. Quick presets are available: **1 Large Cap (2ml)**, **Standard 5 ml**, and **1 oz Bottle (30ml)**.
5. Click **🧪 Calculate Subtractive Blend**.

If you select inks from more than one brand, a **Brand Mismatch Alert** banner appears warning about viscosity and carrier differences.

#### Reading the Predicted Color & Dispenser Breakdown

The results panel shows:

- A large **Predicted Blend** swatch with its hex value, lightness, L\* value and tone label, labelled as a Subtractive Pigment Model Simulation (CMYKW).
- The **Proportional Formula Ratio** string.
- A **Dispenser Breakdown** table listing each pigment or shade with its parts, volume in ml, drops at approximately 20 drops per ml, and percentage.

### Tab 2: Reference Studio

Drop a client reference image onto the canvas, then click anywhere on the image with the eyedropper to sample coordinates. The tool extracts a balanced 5-colour palette. Click **Convert to Formula** on any extracted swatch to send it to the Target Solver.

### Tab 3: Gradient Caps

1. Set the origin pigment: enter a hex value or use the colour picker, and give it a name (defaults to Lining Black).
2. Choose the destination type: **diluent** or **colour**. If colour, set the destination hex and name.
3. Select the number of caps (3 to 12) and the cap size: **#9 Small Cap (0.5 ml)**, **#12 Medium Cap (1.0 ml)**, or **#16 Large Cap (1.8 ml)**.
4. Click **Generate** to build the ladder. Each cap shows a preview circle, a step tone name (Solid Base, Deep Shadow, Midtone, Feather Highlight, Pure Diluent or Solid Accent), the drop count for origin and destination pigments, and the base pigment ratio percentage.
5. Click **Print** to output a workstation cap tray guide card with the ladder, cap size and calibrated drops per ml.

The ladder uses a power-law interpolation (factor = t²) rather than a linear step, because dark pigments such as carbon black have high extinction and linear steps do not produce visually uniform lightness.

### Tab 4: Diluent Formulator

1. Choose a bottle size: **1 oz (30 ml)**, **2 oz (60 ml)**, **4 oz (120 ml)**, **8 oz (240 ml)**, or **Custom Batch Volume**.
2. Choose a preset: **Studio Balanced Standard** (70% water / 25% witch hazel / 5% glycerin), **High-Glide Feathering Blend** (60/30/10), **Fast-Drying Light Wash** (50/48/2), or **Custom Artist Ratio**.
3. Adjust the three sliders for distilled water, distilled witch hazel and USP vegetable glycerin. Moving any slider switches the preset to custom.
4. Read the output: ml and drop counts for each ingredient, plus the total batch volume. Percentages are normalised so they always total 100%.
5. Click **Print** to output a bottle label with the recipe name, batch ID, preparation date, ingredient breakdown and any notes you entered.

### Tab 5: Studio Tools & Vault

Create a passphrase to encrypt stored recipes and client notes into an offline `.vault` backup file using AES-GCM 256-bit encryption. The vault can be decrypted on any studio computer, and data never leaves your browser.

### Tab 6: My Inventory

Review your shop's pigment stock, filter by brand or category (primary, neutral, wash), and mark items as **In Stock** or **Depleted**. Depleted items are excluded or deprioritised by the Target Solver.

### Tab 7: Saved Formulas

Search saved recipes by title, tag or date. Click **Load Formula** to transfer a recipe into the active mixer. Use **Export Library (JSON)** for a full local backup, **Export CSV** for physical station logs, or **Import Library** to restore a backup without sending data over the network.

The **Substitution View** lives inside this tab:

1. Select a saved recipe.
2. Mark one ingredient as out of stock.
3. Choose a replacement from your inventory.
4. Compare the Before and After swatches and read the CIEDE2000 ΔE₀₀ value. If ΔE > 5.0, the tool warns: "This will not match. Mix a test cap first."
5. Click **Load in Mixer** to fine-tune ratios, or **Save Substituted Recipe** to store the adjusted formulation.

### Tab 8: Gray Wash Ladder

Choose a pre-configured system: **3-Cap Essential**, **4-Cap Smooth Shading**, or **5-Cap Micro-Gradient**. Select a container size (#9, #12, #16 caps, or 1 oz, 2 oz, 4 oz squeeze bottles). Use the slider for continuous wash dilution percentages from 5% to 90%, then copy or load recipes directly into the mixer.

### Tab 9: Color Science

Read pigment behaviour guides explaining why high-opacity pigments such as Titanium White must be dosed sparingly, and use the subtractive neutralisation calculator to correct unwanted undertones. This tab also covers studio lighting calibration: 5000K to 6500K daylight-balanced illumination with CRI > 95, which matters for avoiding metameric failure when judging colour.

---

## Inputs and Outputs at a Glance

### Volume units

| Unit | Equivalent |
|---|---|
| ml | Milliliters |
| caps (#16 Large) | 2 ml |
| caps (#9 Small) | 1 ml |
| oz | Fluid ounces, 30 ml |

### Drop calibration

The tool assumes **20 drops per ml** by default. The calibration engine lets you test your own dispenser: enter the number of test drops (5 to 100) and the measured volume in ml or grams, and it calculates your actual drops per ml. Aqueous and glycol carriers are treated as density 1.00 g/cm³, so 1 g equals 1 ml. Calibration is saved to your browser and applies across the mixer, gradient caps and diluent formulator. You can reset to the 20 drops/ml factory default at any time.

### CIEDE2000 match ratings

| ΔE₀₀ | Rating |
|---|---|
| < 1.0 | Imperceptible Match (High Fidelity) |
| 1.0 to 2.0 | Close Match (Perceptible on Inspection) |
| 2.0 to 3.5 | Noticeable Variation (Usable Shading) |
| > 3.5 | Significant Shift (Outside Core Gamut) |

The gamut boundary check treats a ΔE₀₀ of 3.0 or below as practically achievable within the subtractive pigment gamut, and reports whether your target sits inside or outside the range of your on-hand inks.

---

## Use-Case Examples

### Example 1: Solving a target hex for a client reference

A client brings a photo of a muted brick-red wall they want echoed in a small piece. You open the Color Mixer & Target Solver tab, type `#8B3A3A` into the target hex field, and click **Calculate Optimal Mix Ratio**. The solver returns a recipe from your on-hand stock with a predicted match swatch, a ΔE₀₀ score and a match quality badge. If the badge reads "Noticeable Variation (Usable Shading)", the Honest Match Assessment box explains the gap. You click **Load Into Forward Mixer**, nudge the parts by hand, and recalculate until the predicted swatch sits where you want it. Then you click **Save to Formula Library** with a title and tags.

### Example 2: Scaling a saved skin-tone recipe to a 30 ml bottle

You have a medium skin base saved at a 8:4:2:0.5:0.25 ratio (white, yellow, red, brown, blue). You need enough for a full sleeve session. Load the formula into the mixer, set **Total Volume Needed** to 30 and the unit to **oz (Fluid Ounces / 30ml)**, or simply click the **1 oz Bottle (30ml)** preset. Click **Calculate Subtractive Blend**. The Dispenser Breakdown table gives you the ml, drops and percentage for each of the five pigments. You print the formula sheet and tape it to the workstation.

### Example 3: Substituting a depleted ink mid-session

Halfway through a session you run out of the brown in a saved portrait recipe. Open the Saved Formulas tab, go to the Substitution View, select the recipe, mark the brown as out of stock, and pick a replacement from your inventory. The tool shows Before and After swatches and the CIEDE2000 ΔE₀₀. If the value comes back above 5.0, the warning tells you it will not match and to mix a test cap first. You decide to load it into the mixer and adjust the parts until the ΔE₀₀ drops, then save the substituted recipe under a new name.

---

## Frequently Asked Questions (FAQ)

**Is the Pigment Ink Mixer free to use?**
Yes. The tool is free, requires no account, and runs entirely in your browser.

**Does the tool send my formulas or client notes anywhere?**
No. Formulas, inventory and notes are stored only in your own browser, and clearing site data removes them. The Studio Vault encrypts records locally with AES-GCM 256-bit encryption into an offline `.vault` file.

**How accurate is the predicted colour?**
The prediction is a subtractive pigment model simulation (CMYKW), not a spectrophotometer reading. It is a planning aid. The tool states plainly that screen colour is indicative only on an uncalibrated screen, and recommends mixing a test cap before committing to a large batch.

**What is CIEDE2000 and why does the tool use it?**
CIEDE2000 (ΔE₀₀) is the ISO/CIE 11664-6:2014 colour difference standard. The tool uses it to score how close a solved or substituted recipe is to the target, and rates the result from Imperceptible Match through to Significant Shift.

**Can I mix inks from different brands in one recipe?**
Yes, but the tool will show a Brand Mismatch Alert banner warning about viscosity and carrier differences between brands.

**How do I scale a recipe to a different batch size?**
Set the Total Volume Needed field and choose your unit (ml, #16 caps at 2 ml, #9 caps at 1 ml, or oz at 30 ml), or use a volume preset. The Dispenser Breakdown recalculates ml, drops and percentage for every component.

**What if my dropper does not dispense 20 drops per ml?**
Use the drop calibration engine. Enter the number of test drops and the measured volume, and the tool calculates your actual drops per ml. That figure then applies across the mixer, gradient caps and diluent formulator. You can reset to the 20 drops/ml default at any time.

**Can I back up my formula library?**
Yes. Export Library (JSON) downloads a full local backup, Export CSV produces a station log, and Import Library restores a backup without sending data over the network.

**What does the Gray Wash Ladder do?**
It standardises black wash dilutions from 5% to 90% and calculates master 3-cap, 4-cap and 5-cap ladders, with container sizes from #9 caps up to 4 oz squeeze bottles.

**What is the Diluent Formulator for?**
It formulates custom shading carrier solutions from sterile distilled water, distilled witch hazel and USP vegetable glycerin, with presets for balanced studio use, high-glide feathering and fast-drying light wash, and prints a bottle label with a batch ID.

---

## Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Pigment Ink Mixer",
      "url": "https://poliinternational.com/tools/ink-mixer/",
      "description": "Mix tattoo ink colours by ratio, scale a recipe to any volume, swap an out-of-stock ink with a CIEDE2000 match check, and keep batch-recorded formulas.",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Poli International",
        "url": "https://poliinternational.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Poli International",
        "url": "https://poliinternational.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is the Pigment Ink Mixer free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The tool is free, requires no account, and runs entirely in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool send my formulas or client notes anywhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Formulas, inventory and notes are stored only in your own browser, and clearing site data removes them. The Studio Vault encrypts records locally with AES-GCM 256-bit encryption into an offline .vault file."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the predicted colour?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The prediction is a subtractive pigment model simulation (CMYKW), not a spectrophotometer reading. It is a planning aid. Screen colour is indicative only on an uncalibrated screen, and the tool recommends mixing a test cap before committing to a large batch."
          }
        },
        {
          "@type": "Question",
          "name": "What is CIEDE2000 and why does the tool use it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CIEDE2000 (Delta E 00) is the ISO/CIE 11664-6:2014 colour difference standard. The tool uses it to score how close a solved or substituted recipe is to the target, rating the result from Imperceptible Match through to Significant Shift."
          }
        },
        {
          "@type": "Question",
          "name": "Can I mix inks from different brands in one recipe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, but the tool will show a Brand Mismatch Alert banner warning about viscosity and carrier differences between brands."
          }
        },
        {
          "@type": "Question",
          "name": "How do I scale a recipe to a different batch size?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Set the Total Volume Needed field and choose your unit (ml, #16 caps at 2 ml, #9 caps at 1 ml, or oz at 30 ml), or use a volume preset. The Dispenser Breakdown recalculates ml, drops and percentage for every component."
          }
        },
        {
          "@type": "Question",
          "name": "What if my dropper does not dispense 20 drops per ml?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the drop calibration engine. Enter the number of test drops and the measured volume, and the tool calculates your actual drops per ml. That figure then applies across the mixer, gradient caps and diluent formulator. You can reset to the 20 drops/ml default at any time."
          }
        },
        {
          "@type": "Question",
          "name": "Can I back up my formula library?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Export Library (JSON) downloads a full local backup, Export CSV produces a station log, and Import Library restores a backup without sending data over the network."
          }
        },
        {
          "@type": "Question",
          "name": "What does the Gray Wash Ladder do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It standardises black wash dilutions from 5% to 90% and calculates master 3-cap, 4-cap and 5-cap ladders, with container sizes from #9 caps up to 4 oz squeeze bottles."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Diluent Formulator for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It formulates custom shading carrier solutions from sterile distilled water, distilled witch hazel and USP vegetable glycerin, with presets for balanced studio use, high-glide feathering and fast-drying light wash, and prints a bottle label with a batch ID."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## Internal Linking Suggestions

Link out from this guide to related Poli International content on the following topics:

- **Skin tone pigment matching** for Fitzpatrick phototype and healed melanin interaction analysis, referenced from the Color Science and Target Solver sections.
- **Tattoo ink safety and REACH compliance**, linked from the Inventory and Diluent Formulator sections where pigment restrictions and sterile technique are relevant.
- **Colour theory fundamentals**, linked from the Color Science tab discussion of tinting power, neutralisation and complementary correction.
- **Studio lighting and colour perception**, linked from the lighting calibration guidance (5000K to 6500K, CRI > 95, metameric failure).
- **Black and grey shading technique**, linked from the Gray Wash Ladder and Gradient Caps sections.
- **Tattoo ink brands and carrier differences**, linked from the Brand Mismatch Alert explanation.
- **Client consultation and reference gathering**, linked from the Reference Studio section.
- **Studio record keeping and batch traceability**, linked from the Saved Formulas, batch lot fields and Studio Vault sections.
