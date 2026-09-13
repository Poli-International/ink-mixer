# Tattoo Ink Mixer - Professional User Guide / Guide d'Utilisation / Benutzerhandbuch

> Comprehensive operation manual for the Tattoo Ink Mixer web tool by Poli International, creator of BioFlex® body jewelry.

---

## Language User Guides / Guides par Langue / Sprachspezifische Handbücher
The user guide is available as dedicated, language-specific files:

- 🇬🇧 **English (EN)**: [`USER-GUIDE-en.md`](./USER-GUIDE-en.md)
- 🇩🇪 **Deutsch (DE)**: [`USER-GUIDE-de.md`](./USER-GUIDE-de.md)
- 🇪🇸 **Español (ES)**: [`USER-GUIDE-es.md`](./USER-GUIDE-es.md)
- 🇫🇷 **Français (FR)**: [`USER-GUIDE-fr.md`](./USER-GUIDE-fr.md)
- 🇮🇹 **Italiano (IT)**: [`USER-GUIDE-it.md`](./USER-GUIDE-it.md)
- 🇳🇱 **Nederlands (NL)**: [`USER-GUIDE-nl.md`](./USER-GUIDE-nl.md)
- 🇵🇹 **Português (PT)**: [`USER-GUIDE-pt.md`](./USER-GUIDE-pt.md)

---

## Master Index / Sections Overview

- [1. English Guide (EN)](#1-english-guide-en)
- [2. Guide en Français (FR)](#2-guide-en-français-fr)
- [3. Deutsches Handbuch (DE)](#3-deutsches-handbuch-de)
- [4. Guida in Italiano (IT)](#4-guida-in-italiano-it)
- [5. Guía en Español (ES)](#5-guía-en-español-es)
- [6. Nederlandse Handleiding (NL)](#6-nederlandse-handleiding-nl)
- [7. Guia em Português (PT)](#7-guia-em-português-pt)

---

## 1. English Guide (EN)

### Introduction
The Tattoo Ink Mixer provides professional tattooists with a unified digital color workbench. It ensures reproducible pigment formulas across multi-session tattoos, accurate color matching via the CIEDE2000 standard, and clinical understanding of pigment deposition in diverse skin phototypes.

### The 12 Studio Modules

#### 1. Forward Ink Mixer
- **Purpose**: Calculate precise volumetric ratios and drop counts for multi-pigment blends.
- **How to use**:
  1. In the "Color Mixer" tab, choose component inks from the dropdown list.
  2. Enter the brand and batch lot number for studio traceability.
  3. Adjust the ratio parts (e.g., 3 parts Crimson, 1 part Cobalt Blue).
  4. Specify the total required batch volume in milliliters (ml) or ink caps (#16 / 2ml).
  5. Click **Calculate Mix** to generate the final formula, volumetric measurements, percentage breakdown, and visual swatch with L*a*b* coordinates.
  6. If multiple ink brands are selected, review the **Brand Mismatch Alert** for viscosity and carrier differences.
  7. Save the formula directly or print a physical formula sheet for your workstation.


#### 2. Mix by Target Solver
- **Purpose**: Determine the exact component recipe needed to reproduce a specific target color using Kubelka-Munk and CIEDE2000 algorithms.
- **How to use**:
  1. In the "Mix by Target" tab, input a hex code or pick from realistic tattoo target presets (Deep Crimson, Skin Shadow, Forest Dark, etc.).
  2. The solver computes the closest mathematical match using pigments available in your inventory.
  3. Compare the **Target Color** and **Predicted Mix** swatches alongside the ΔE (Delta E) color-difference rating.
  4. Click **Load Into Forward Mixer** to make manual micro-adjustments, or **Save to Library** to store the result.


#### 3. Studio Inventory & Pigment Stock
- **Purpose**: Track available pigment bottles, lot numbers, and expiration dates.
- **How to use**:
  1. Open the "Inventory" tab to review your shop's stock.
  2. Filter by brand or category (primary, neutral, wash).
  3. Mark items as "In Stock" or "Depleted". Depleted items are automatically excluded or deprioritized by the Target Solver.

#### 4. Formula Library
- **Purpose**: Maintain a catalog of custom formulas and access curated professional recipes.
- **How to use**:
  1. Access the "My Formulas" tab to search saved recipes by title, tag, or date.
  2. Click **Load Formula** to transfer any recipe into the active mixer.
  3. Click **Export Library (JSON)** to download a full local backup, or **Export CSV** for physical station logs.
  4. Use **Import Library** to restore previous backups without sending data over the network.

#### 5. Formula Ink Substitution View
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


#### 6. Reference Studio & Palette Extractor
- **Purpose**: Extract dominant color palettes directly from client reference photos.
- **How to use**:
  1. Go to the "Reference Studio" tab and drop a reference image onto the canvas.
  2. Click anywhere on the image canvas with the eyedropper to sample custom coordinates.
  3. The system extracts a balanced 5-color palette.
  4. Click **Convert to Formula** on any extracted swatch to load it into the Target Solver.

#### 7. Gradient & Value Cap Formulator
- **Purpose**: Formulate progressive shading caps for black-and-grey and smooth color transitions.
- **How to use**:
  1. In the "Gradient Caps" tab, select a 3, 4, 5, or 6-cap setup.
  2. Set your dark baseline pigment and diluent medium.
  3. Read the drop-by-drop recipe per cap to ensure smooth tonal stepping across your palette.

#### 8. Diluent & Medium Formulator
- **Purpose**: Mix custom shading solutions and thinning mediums safely.
- **How to use**:
  1. Open the "Diluent Formulator" tab and choose your application (Thin Wash, Lining Medium, or Heavy Shading Solution).
  2. Adjust volume to receive precise ratios of distilled water, cosmetic-grade hamamelis (witch hazel), and vegetable glycerin.

#### 9. Gray Wash Calculator
- **Purpose**: Standardize black wash dilutions from light tint (5%) to deep shade (90%).
- **How to use**:
  1. In the "Gray Wash" tab, drag the slider to your desired black percentage or select a preset ladder.
  2. Select total volume and review drop count and water proportions.

#### 10. Lighting & Studio Calibration
- **Purpose**: Ensure accurate pigment perception and avoid metameric failure.
- **How to use**:
  1. Review recommended studio lighting parameters (5000K–6500K daylight-balanced illumination with CRI > 95).
  2. Check lighting setup advice before evaluating color saturation on healing tattoos.

#### 11. Color Theory & Principles
- **Purpose**: Review core color mixing physics, pigment tinting power, and complementary neutralization.
- **How to use**:
  1. Read pigment behavior guides to understand why high-opacity pigments (like Titanium White) must be dosed sparingly.

#### 12. Studio Tools & Vault
- **Purpose**: Secure client records and proprietary studio recipes with local AES-GCM 256-bit encryption.
- **How to use**:
  1. Open the "Studio Tools & Vault" tab.
  2. Create a passphrase to encrypt all stored recipes and client notes into an offline `.vault` backup file.
  3. Decrypt on any studio computer without data ever leaving your browser.

---

## 2. Guide en Français (FR)

### Introduction
Le Mélangeur de Pigments de Tatouage offre aux artistes un environnement colorimétrique numérique complet. Il garantit la reproductibilité des mélanges, une correspondance basée sur la norme CIEDE2000 et l'évaluation du rendu pigmentaire sur les différents phototypes cutanés.

### Les 12 Modules du Studio
1. **Mélangeur Direct**: Dosage des pigments en parts, conversion instantanée en millilitres, gouttes et capsules (#16 / 2ml), contrôle des discordances de marques et coordonnées L*a*b*.
2. **Solveur par Couleur Cible**: Recherche de la formule d'encre optimale d'après un code hexadécimal via le modèle Kubelka-Munk et le calcul d'écart CIEDE2000.
3. **Inventaire de l'Atelier**: Suivi des stocks de pigments, gestion des flacons entamés ou épuisés, numéros de lots et dates de péremption.
4. **Bibliothèque de Formules**: Archivage local des recettes, filtres par étiquettes, préréglages professionnels et exports JSON/CSV.
5. **Vue de substitution des encres**: remplacez une encre épuisée dans une formule enregistrée et comparez avant et après avec l'écart CIEDE2000 (ΔE₀₀), avec avertissement de godet d'essai.
6. **Studio de Référence**: Importation d'images modèles, pipette d'échantillonnage et extraction automatique de palettes prêtes à être mélangées.
7. **Formulateur de Dégradés et Capsules**: Préparation de séries de 3 à 6 capsules pour des dégradés réguliers en noir et gris ou réalisme.
8. **Formulateur de Diluant**: Dosages équilibrés d'eau distillée, d'hydrolat d'hamamélis et de glycérine végétale.
9. **Calculateur de Gray Wash**: Gradation précise de 5% à 90% de noir avec raccourcis d'échelle d'ombrage.
10. **Étalonnage Éclairage & Studio**: Conseils d'éclairage (5000K–6500K, IRC > 95) pour éliminer le métamérisme.
11. **Théorie des Couleurs**: Notions de force de coloration, saturation et complémentarité.
12. **Outils d'Atelier & Coffre**: Historique de séance et chiffrement local AES-GCM 256 bits sans aucune transmission vers des serveurs distants.

---

## 3. Deutsches Handbuch (DE)

### Einleitung
Der Tattoo-Farbmischer dient professionellen Tätowierern als präzises Farblabor. Er stellt sicher, dass Farbmischungen über mehrere Sitzungen hinweg reproduzierbar bleiben, berechnet Farbgenauigkeiten nach CIEDE2000 und analysiert das Einheilen auf unterschiedlichen Hauttypen.

### Die 12 Arbeitsbereiche
1. **Direkter Farbmischer**: Komponenten auswählen, Anteile festlegen, Umrechnung in Milliliter, Tropfen und Kappen (#16 / 2ml).
2. **Zielfarben-Solver**: Automatische Berechnung von Mischrezepturen für Ziel-Hex-Werte mittels Kubelka-Munk-Modell.
3. **Studio-Inventar**: Erfassung vorhandener und aufgebrauchter Farbbestände inklusive Chargennummern.
4. **Formel-Bibliothek**: Verwaltung eigener Mischungen mit Schlagwörtern, Notizen sowie JSON- und CSV-Export.
5. **Farbersatz-Ansicht**: Ersetzen Sie eine ausgegangene Farbe in einer gespeicherten Formel und vergleichen Sie vorher und nachher mit der CIEDE2000-Abweichung (ΔE₀₀), inklusive Testkappen-Hinweis.
6. **Referenz-Studio**: Bildimport via Drag-and-Drop, Pipetten-Werkzeug und Paletten-Extraktion.
7. **Farbverlauf- und Kappen-Rechner**: Tropfengenaue Abstufung von Schattierungs- und Farbkappen (3 bis 6 Kappen).
8. **Verdünner-Formulierer**: Mischverhältnisse für Schattierungslösungen aus destilliertem Wasser, Hamamelis und Glycerin.
9. **Graustufen-Rechner (Gray Wash)**: Exakte Schwarz-Verdünnungs-Stufen von 5% bis 90%.
10. **Beleuchtungs- und Studio-Kalibrierung**: Farbtemperatur (5000K–6500K) und Farbwiedergabe (CRI > 95) zur Vermeidung von Metamerie.
11. **Farblehre für Tätowierer**: Deckkraft, Pigmentdichte und optische Wechselwirkungen in der Haut.
12. **Studio-Tools & Tresor**: Verschlüsselte Kundensitzungs-Dokumentation mit lokalem AES-GCM 256-Bit-Schutz.

---

## 4. Guida in Italiano (IT)

### Introduzione
Il Miscelatore per Inchiostri da Tatuaggio mette a disposizione dei tatuatori uno strumento colorimetrico completo e scientificamente fondato per creare sfumature riproducibili e studiare l'interazione con la melanina.

### I 12 Moduli Operativi
1. **Miscelatore Diretto**: Dosaggi percentuali, volumi in ml, gocce e tappini (#16 / 2ml), con avviso di compatibilità delle marche.
2. **Risolutore Colore Obiettivo**: Calcolo della ricetta pigmentaria corrispondente a un codice colore tramite Kubelka-Munk e CIEDE2000.
3. **Inventario dello Studio**: Gestione del magazzino inchiostri per produttore, lotto e data di scadenza.
4. **Libreria Formule**: Salvataggio ricette, modelli preimpostati, esportazione in CSV e backup JSON.
5. **Vista di sostituzione degli inchiostri**: sostituisci un inchiostro esaurito in una formula salvata e confronta prima e dopo con la differenza CIEDE2000 (ΔE₀₀), con avviso di cap di prova.
6. **Studio di Riferimento**: Campionamento colori da immagini di riferimento ed estrazione di palette di lavoro.
7. **Formulatore Gradienti e Capsule**: Preparazione sequenziale di serie da 3 a 6 capsule con incrementi calibrati goccia a goccia.
8. **Formulatore Diluenti**: Miscelazione sicura di soluzioni per sfumature con acqua distillata, amamelide e glicerina.
9. **Calcolatore Gray Wash**: Gradazioni dal 5% al 90% di nero per lavori black-and-grey.
10. **Calibrazione Illuminazione Studio**: Parametri di illuminazione standard (5000K–6500K, CRI > 95).
11. **Teoria del Colore**: Saturazione, dominanza pigmentaria e neutralizzazione delle tinte complementari.
12. **Strumenti Studio & Vault**: Registro clienti e formule protetto localmente con cifratura AES-GCM a 256 bit.

---

## 5. Guía en Español (ES)

### Introducción
El Mezclador de Tintas para Tatuaje es una plataforma digital de formulación de pigmentos diseñada para garantizar la coherencia en sesiones múltiples, optimizar el uso de tintas y analizar la curación en distintos fototipos.

### Los 12 Módulos del Estudio
1. **Mezclador Directo de Tintas**: Ajuste de partes, conversión a mililitros, gotas y cápsulas (#16 / 2ml), y detección de divergencias de lote o marca.
2. **Solucionador por Color Objetivo**: Algoritmo Kubelka-Munk y CIEDE2000 para encontrar la mezcla exacta para cualquier color objetivo.
3. **Inventario del Estudio**: Control de existencias de pigmentos por marca, lote y caducidad.
4. **Biblioteca de Fórmulas**: Registro de fórmulas personalizadas, etiquetas de búsqueda, recetas maestras y exportación CSV/JSON.
5. **Vista de sustitución de tintas**: sustituye una tinta agotada en una fórmula guardada y compara antes y después con la diferencia CIEDE2000 (ΔE₀₀), con aviso de cap de prueba.
6. **Estudio de Referencia**: Carga de imágenes de muestra, selección por cuentagotas y generación de paletas.
7. **Formulador de Degradados y Cápsulas**: Cálculo sistemático de baterías de 3 a 6 cápsulas de sombreado.
8. **Formulador de Diluyentes**: Recetas proporcionales con agua destilada, agua de hamamelis y glicerina vegetal.
9. **Calculadora de Gray Wash**: Ratios de pigmento negro de 5% a 90% con escalas rápidas de sombreado.
10. **Calibración de Iluminación del Estudio**: Directrices sobre temperatura de color (5000K–6500K) e índice de rendimiento de color (CRI > 95).
11. **Teoría del Color**: Fundamentos de fuerza de tinción, opacidad y complementariedad.
12. **Herramientas de Estudio & Bóveda**: Notas confidenciales de sesión y respaldo cifrado local AES-GCM de 256 bits sin envío a la nube.

---

## 6. Nederlandse Handleiding (NL)

### Inleiding
De Tattoo Inktmenger biedt tatoeëerders een digitaal precisielaboratorium voor het samenstellen van pigmenten, het voorspellen van genezen resultaten op verschillende huidtypen en het organiseren van studioformules.

### De 12 Werkmodules
1. **Directe Inktmenger**: Dosering in delen, berekening naar milliliters, druppels en inktcups (#16 / 2ml).
2. **Doelkleur Oplosser**: Kubelka-Munk en CIEDE2000 rekenmodel voor de exacte verhouding naar een gewenste kleur.
3. **Studio-inventaris**: Voorraadbeheer per merk, batchnummer en vervaldatum.
4. **Formulebibliotheek**: Bewaar en exporteer formules in CSV- en JSON-formaat.
5. **Inktvervangingsweergave**: vervang een opgebruikte inkt in een opgeslagen formule en vergelijk voor en na met het CIEDE2000-verschil (ΔE₀₀), met testcap-waarschuwing.
6. **Referentie Studio**: Extraheer kleurenpaletten direct uit foto's van de klant.
7. **Gradiënt en Cup Formulator**: Exacte druppelverdeling voor sets van 3 tot 6 cups voor vloeiende overgangen.
8. **Verdunningsformulator**: Veilige recepten voor schaduwvloeistof met gedestilleerd water, toverhazelaar en glycerine.
9. **Grijswassing Calculator**: Verhoudingen van 5% tot 90% zwart voor black-and-grey tatoeages.
10. **Studioverlichting Kalibratie**: Aanbevelingen voor daglichtverlichting (5000K–6500K, CRI > 95) ter voorkoming van metamerie.
11. **Kleurentheorie voor Artiesten**: Praktische handleiding over dekkracht, pigmentdichtheid en complementaire menging.
12. **Studiotools & Kluis**: Lokale klantendocumentatie met 256-bits AES-GCM versleuteling.

---

## 7. Guia em Português (PT)

### Introdução
O Misturador de Tintas de Tatuagem é um sistema colorimétrico desenvolvido para tatuadores e estúdios que buscam consistência cromática, precisão de mistura e compreensão da cicatrização em diferentes fototipos.

### Os 12 Módulos do Estúdio
1. **Misturador Direto de Tintas**: Cálculo de partes, conversão em mililitros, gotas e batoques (#16 / 2ml) com amostras L*a*b*.
2. **Solucionador de Cor Alvo**: Resolução matemática de fórmulas a partir de tons de destino por meio de Kubelka-Munk e CIEDE2000.
3. **Inventário do Estúdio**: Gestão de estoque de tintas por fabricante, linha, número de lote e validade.
4. **Biblioteca de Fórmulas**: Catálogo de receitas com etiquetas, receitas de referência e exportações JSON/CSV.
5. **Vista de substituição de tintas**: substitua uma tinta esgotada numa fórmula guardada e compare antes e depois com a diferença CIEDE2000 (ΔE₀₀), com aviso de cap de teste.
6. **Estúdio de Referência**: Carregamento de imagens de referência com extração de paleta e conversão direta.
7. **Formulador de Gradientes e Tampas**: Programação progressiva de 3 a 6 batoques com contagem exata de gotas.
8. **Formulador de Diluentes**: Dosagem calibrada de água destilada, água de hamamélis e glicerina vegetal.
9. **Calculadora de Gray Wash**: Ajuste de concentração de preto de 5% a 90% com escalas de gradação.
10. **Calibração de Iluminação do Estúdio**: Iluminação recomendada (5000K–6500K, IRC > 95) para evitar falha metamérica.
11. **Teoria das Cores**: Poder de tingimento, opacidade e saturação na derme.
12. **Ferramentas de Estúdio & Cofre**: Registro de clientes com cofre criptografado local AES-GCM de 256 bits sem transmissão externa.

---

### Verification and Compliance
- **Data Protection**: Nothing you enter is sent anywhere. Formulas, inventory and notes are stored only in your own browser, and clearing site data removes them.
- **Safety Standard Notice**: Tattoo pigments and studio formulations must adhere to established professional practice and applicable regional chemical restrictions such as EU REACH Annex XVII.
