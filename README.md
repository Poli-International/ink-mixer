# Tattoo Ink Mixer

> **Professional tattoo ink color mixing calculator, CIEDE2000 target color solver, and formula ink substitution view.**
>
> Published by Poli International, creator of BioFlex® body jewelry.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Plain Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg)](package.json)
[![Zero External Dependencies](https://img.shields.io/badge/Dependencies-Zero%20CDN-brightgreen.svg)](index.html)
[![Languages: 7](https://img.shields.io/badge/Languages-EN%20%7C%20FR%20%7C%20DE%20%7C%20IT%20%7C%20ES%20%7C%20NL%20%7C%20PT-orange.svg)](js/i18n.js)

**Live Application:** [https://poliinternational.com/tools/ink-mixer/](https://poliinternational.com/tools/ink-mixer/)

---

## 🌐 Language Navigation / Navigation Linguistique / Sprachnavigation

- [English](#-english-en)
- [Français](#-français-fr)
- [Deutsch](#-deutsch-de)
- [Italiano](#-italiano-it)
- [Español](#-español-es)
- [Nederlands](#-nederlands-nl)
- [Português](#-português-pt)

---

## 🇬🇧 English (EN)

### Overview
The Tattoo Ink Mixer is a digital color laboratory designed for professional tattoo artists, pigment specialists, and studio owners. It enables precise, reproducible formulation of tattoo inks, computes drop and volumetric ratios, extracts palettes from client references, and calculates custom diluents and gray washes.

### 12 Core Capabilities
1. **Forward Ink Mixer**: Select component pigments from a calibrated database, adjust ratio parts, and calculate volume in milliliters, drops, and standard tattoo ink caps (#16 / 2ml). Includes visual hex and L*a*b* swatches, brand mismatch warnings, and batch tracking.
2. **Mix by Target Solver**: Input any hex color or select realistic pigment presets. Uses an optimized Kubelka-Munk and CIEDE2000 color-difference algorithm to compute the exact recipe required to achieve the target color from studio stock.
3. **Studio Inventory & Pigment Stock**: Track available and depleted inks by brand, pigment line, batch number, and expiration date. Target Solver prioritizes in-stock inventory.
4. **Formula Library**: Save, name, tag, and organize custom recipes. Includes 30+ pre-calibrated professional presets, search filtering, JSON import/export, and CSV formulation sheet generation.
5. **Formula Ink Substitution View**: Rapidly assess and formulate replacements when a project ink shade is depleted mid-session. Features side-by-side Before/After swatches and CIEDE2000 color difference (ΔE₀₀) with test cap alerts.
6. **Reference Studio**: Upload client reference images locally via drag-and-drop or file selector, sample reference points, extract dominant palettes, and convert directly into ink recipes.
7. **Gradient & Value Cap Formulator**: Formulate graduated value setups (3, 4, 5, or 6 ink caps) with drop-by-drop accuracy for smooth transitions in black-and-grey and color realism.
8. **Diluent & Medium Formulator**: Calculate custom shading solutions and thinning mediums using distilled water, cosmetic-grade hamamelis (witch hazel), and vegetable glycerin.
9. **Gray Wash Calculator**: Calculate black-to-diluent proportions from 5% to 90% with quick shade-ladder presets.
10. **Lighting & Studio Calibration**: Best practice guidelines for studio color temperature (5000K–6500K daylight balance) and Color Rendering Index (CRI > 95) to eliminate metameric failure.
11. **Color Theory & Principles**: Educational reference covering pigment tinting strengths, complementary neutralization, and dermal light scattering.
12. **Studio Tools & Vault**: Encrypted client session logging and AES-GCM 256-bit vault backup for proprietary recipes.

### Privacy & Data Integrity
All operations run client-side. No formulas, client notes, or inventory data leave your browser. Zero tracking cookies, zero analytics, zero external CDN scripts.

---

## 🇫🇷 Français (FR)

### Aperçu
Le Mélangeur de Pigments de Tatouage est un laboratoire numérique de colorimétrie conçu pour les tatoueurs professionnels et gestionnaires d'ateliers. Il permet d'élaborer des formules d'encre précises et reproductibles, d'extraire des palettes d'après des images de référence et de doser capsules et diluants.

### Les 12 Fonctionnalités
1. **Mélangeur Direct de Pigments**: Sélection des pigments, dosage en parts, calcul en millilitres, gouttes et capsules standard (#16 / 2ml). Affichage des valeurs hexadécimales et L*a*b*, détection de discordance de marques et numéros de lot.
2. **Solveur par Couleur Cible**: Entrée d'un code hexadécimal ou choix d'un préréglage. Résolution automatique par calculs colorimétriques Kubelka-Munk et CIEDE2000 pour déterminer la recette optimale.
3. **Inventaire de l'Atelier**: Suivi des encres en stock ou épuisées par fabricant, gamme, lot et date de péremption.
4. **Bibliothèque de Formules**: Sauvegarde, classement par étiquettes, recherche instantanée, préréglages professionnels, export/import JSON et génération de feuilles de mélange CSV.
5. **Vue de Substitution des Encres de Formule**: Évaluation et remplacement rapide d'encres épuisées avec comparaison CIEDE2000 (ΔE₀₀) et alertes de godet d'essai.
6. **Studio de Référence**: Importation locale d'images modèles par glisser-déposer, échantillonnage de zones et conversion en recettes d'encres.
7. **Formulateur de Dégradés et Capsules**: Dosage précis capsule par capsule (séries de 3 à 6 godets) pour des dégradés réguliers en noir et gris ou réalisme couleur.
8. **Formulateur de Diluant**: Préparation de solutions d'ombrage à base d'eau distillée, d'eau d'hamamélis et de glycérine végétale.
9. **Calculateur de Gray Wash**: Dosage de 5% à 90% de noir avec raccourcis d'échelle d'ombrage.
10. **Étalonnage Éclairage & Studio**: Recommandations d'éclairage (5000K–6500K, IRC > 95) pour neutraliser le métamérisme.
11. **Théorie des Couleurs**: Notions de force de coloration, neutralisation des complémentaires et diffusion cutanée.
12. **Outils d'Atelier & Coffre**: Historique de séance chiffré localement en AES-GCM 256 bits sans transmission réseau.

---

## 🇩🇪 Deutsch (DE)

### Übersicht
Der Tattoo-Farbmischer ist ein digitales Farblabor für professionelle Tätowierer und Studiobetreiber. Die Anwendung ermöglicht die exakte und reproduzierbare Rezeptur von Tattoofarben, berechnet Tropfen- und Milliliter-Mengen und erstellt individuelle Verdünnungen und Graustufen.

### Die 12 Hauptfunktionen
1. **Direkter Farbmischer**: Auswahl von Komponenten-Pigmenten, Anteilsberechnung, Umrechnung in Milliliter, Tropfen und Standard-Farbkappen (#16 / 2ml). Anzeige von Hex- und L*a*b*-Farbwerten sowie Chargen- und Markenabgleich.
2. **Zielfarben-Solver**: Eingabe eines Hex-Werts oder Auswahl realistischer Farbziele. Automatische Rezepturoptimierung mittels Kubelka-Munk und CIEDE2000.
3. **Studio-Inventar**: Verwaltung des Lagerbestands nach Marke, Produktlinie, Chargennummer und Verfallsdatum.
4. **Formel-Bibliothek**: Speichern, Kennzeichnen und Durchsuchen eigener Rezepturen mit Vorlagen, JSON-Sicherung und CSV-Tabellenexport.
5. **Formel-Tintenersetzungsansicht**: Schneller Ersatz aufgebrauchter Farbtöne mit CIEDE2000-Farbvergleich (ΔE₀₀) und Testkappen-Warnhinweisen.
6. **Referenz-Studio**: Lokaler Bildimport via Drag-and-Drop, Farbpipette zur Entnahme dominanter Töne und direkte Übertragung in Mischformeln.
7. **Farbverlauf- und Kappen-Rechner**: Exakte Abstufung von Farb- und Waschkappen (3 bis 6 Kappen) für sanfte Schattierungen.
8. **Verdünner-Formulierer**: Rezepturen für Schattierungslösungen aus destilliertem Wasser, Hamameliswasser und pflanzlichem Glycerin.
9. **Graustufen-Rechner (Gray Wash)**: Exakte Schwarz-zu-Wasser-Verhältnisse von 5% bis 90% mit Schnellwahltasten.
10. **Beleuchtungs- und Studio-Kalibrierung**: Leitfaden für normgerechte Farbtemperatur (5000K–6500K) und Farbwiedergabeindex (CRI > 95) gegen Metamerie.
11. **Farblehre für Tätowierer**: Deckkraft, Pigmentdichte, komplementäre Neutralisierung und Mischregeln.
12. **Studio-Tools & Tresor**: Verschlüsselte Erfassung von Kundensitzungen und AES-GCM 256-Bit-Tresor für sensible Studio-Rezepturen.

---

## 🇮🇹 Italiano (IT)

### Panoramica
Il Miscelatore per Inchiostri da Tatuaggio è un laboratorio cromatico digitale per tatuatori professionisti e titolari di studi. Consente la formulazione precisa e riproducibile dei pigmenti, il calcolo delle proporzioni in gocce e millilitri e la preparazione di diluenti e gray wash.

### Le 12 Funzionalità Principali
1. **Miscelatore Diretto**: Selezione dei pigmenti base, definizione delle parti, calcolo dei volumi in millilitri, gocce e tappini standard (#16 / 2ml). Campioni visivi con coordinate esadecimali e L*a*b*, verifica del lotto e del produttore.
2. **Risolutore Colore Obiettivo**: Calcolo della combinazione ideale di inchiostri per riprodurre un codice esadecimale tramite algoritmi Kubelka-Munk e CIEDE2000.
3. **Inventario dello Studio**: Monitoraggio degli inchiostri disponibili ed esauriti con dettagli su marca, lotto e scadenza.
4. **Libreria Formule**: Archiviazione delle miscele personalizzate, ricerca per etichette, oltre 30 ricette professionali preimpostate, backup JSON ed esportazione CSV.
5. **Vista di sostituzione degli inchiostri**: sostituisci un inchiostro esaurito in una formula salvata e confronta prima e dopo con la differenza CIEDE2000 (ΔE₀₀), con avviso di cap di prova.
6. **Studio di Riferimento**: Caricamento immagini di riferimento con campionamento colore e generazione automatica della ricetta.
7. **Formulatore Gradienti e Capsule**: Preparazione sequenziale di set da 3 a 6 capsule con dosaggi progressivi goccia a goccia.
8. **Formulatore Diluenti**: Dosaggio calibrato per soluzioni di sfumatura con acqua distillata, amamelide e glicerina vegetale.
9. **Calcolatore Gray Wash**: Percentuali da 5% a 90% di nero con scala di gradazione rapida.
10. **Calibrazione Illuminazione Studio**: Linee guida su temperatura colore (5000K–6500K) e resa cromatica (CRI > 95) per evitare metamerismo.
11. **Teoria del Colore**: Saturazione, potere coprente e neutralizzazione complementare.
12. **Strumenti Studio & Vault**: Registro sessioni cliente con cifratura locale AES-GCM a 256 bit.

---

## 🇪🇸 Español (ES)

### Descripción General
El Mezclador de Tintas para Tatuaje es una herramienta de laboratorio digital diseñada para tatuadores profesionales y estudios. Permite elaborar mezclas exactas y reproducibles, calcular medidas en gotas y mililitros, y formular diluyentes y sets de gray wash.

### Las 12 Funcionalidades Clave
1. **Mezclador Directo de Tintas**: Selección de tintas base, ajuste de partes proporcionales y conversión a mililitros, gotas y cápsulas estándar (#16 / 2ml). Muestra valores hexadecimales y L*a*b*, alertas de mezcla entre marcas y registro de lote.
2. **Solucionador por Color Objetivo**: Encuentra la combinación exacta de tintas para alcanzar cualquier tono objetivo mediante modelos Kubelka-Munk y diferencias de color CIEDE2000.
3. **Inventario del Estudio**: Control de existencias por fabricante, línea de pigmentos, número de lote y fecha de caducidad.
4. **Biblioteca de Fórmulas**: Almacenamiento local de fórmulas con etiquetas, notas, recetas profesionales precargadas, importación/exportación JSON y descarga en CSV.
5. **Vista de sustitución de tintas**: sustituye una tinta agotada en una fórmula guardada y compara antes y después con la diferencia CIEDE2000 (ΔE₀₀), con aviso de cap de prueba.
6. **Estudio de Referencia**: Carga de imágenes de muestra para extracción de paletas y conversión directa a proporciones de mezcla.
7. **Formulador de Degradados y Cápsulas**: Cálculo paso a paso para baterías de 3 a 6 cápsulas de sombreado progresivo.
8. **Formulador de Diluyentes**: Dosificación de soluciones de dilución a base de agua destilada, agua de hamamelis y glicerina vegetal.
9. **Calculadora de Gray Wash**: Ajuste de concentraciones de 5% a 90% de pigmento negro con escalas rápidas.
10. **Calibración de Iluminación del Estudio**: Recomendaciones de luz normalizada (5000K–6500K, CRI > 95) contra el metamerismo.
11. **Teoría del Color**: Guía práctica sobre tinción, opacidad y neutralización cromática en dermis.
12. **Herramientas de Estudio & Bóveda**: Ficha técnica de clientes y respaldo cifrado local AES-GCM de 256 bits sin conexión exterior.

---

## 🇳🇱 Nederlands (NL)

### Overzicht
De Tattoo Inktmenger is een digitaal kleurenlaboratorium voor professionele tatoeëerders en studio-eigenaren. Het biedt nauwkeurige en reproduceerbare inktformules, berekent verhoudingen in druppels en milliliters en stelt verdunners en grijswassingen samen.

### De 12 Hoofdfuncties
1. **Directe Inktmenger**: Selecteer basispigmenten, stel verhoudingsdelen in en bereken het volume in milliliters, druppels en inktcups (#16 / 2ml). Met weergave van hex- en L*a*b*-waarden en waarschuwingen voor verschillende inktmerken.
2. **Doelkleur Oplosser**: Bereken met Kubelka-Munk en CIEDE2000 de exacte samenstelling om een gewenste kleur te mengen uit aanwezige pigmenten.
3. **Studio-inventaris**: Beheer van voorradige en opgebruikte inkten op merk, productlijn, batchnummer en vervaldatum.
4. **Formulebibliotheek**: Bewaar formules met labels en notities, inclusief professionele voorinstellingen, JSON-export en CSV-formuliersheets.
5. **Inktvervangingsweergave**: vervang een opgebruikte inkt in een opgeslagen formule en vergelijk voor en na met het CIEDE2000-verschil (ΔE₀₀), met testcap-waarschuwing.
6. **Referentie Studio**: Afbeeldingen uploaden, dominante kleurenpaletten extraheren en direct omzetten naar mengformules.
7. **Gradiënt en Cup Formulator**: Berekening van 3 tot 6 cups met opeenvolgende kleurwaarden voor vloeiende overgangen.
8. **Verdunningsformulator**: Samenstelling van schaduwoplossingen met gedestilleerd water, toverhazelaar (witch hazel) en plantaardige glycerine.
9. **Grijswassing Calculator**: Verhoudingen zwart en verdunner van 5% tot 90% met handige schaduwpresets.
10. **Studioverlichting Kalibratie**: Richtlijnen voor kleurtemperatuur (5000K–6500K) en kleurweergave-index (CRI > 95) om metamerie te voorkomen.
11. **Kleurentheorie voor Artiesten**: Principes over kleurkracht, dekkend vermogen en complementaire neutralisatie.
12. **Studiotools & Kluis**: Versleutelde registratie van klantformules en lokale 256-bits AES-GCM back-up.

---

## 🇵🇹 Português (PT)

### Visão Geral
O Misturador de Tintas de Tatuagem é um laboratório digital de colorimetria para tatuadores profissionais e gerentes de estúdio. Ele viabiliza formulações precisas e reproduzíveis, calcula medidas em gotas e mililitros e formula diluentes e gray washes.

### As 12 Funcionalidades Principais
1. **Misturador Direto de Tintas**: Seleção de pigmentos, cálculo de partes proporcionais, conversão para mililitros, gotas e batoques padrão (#16 / 2ml). Amostras em hex e L*a*b*, detecção de marcas divergentes e lote.
2. **Solucionador de Cor Alvo**: Algoritmo colorimétrico baseado em Kubelka-Munk e CIEDE2000 que encontra a proporção ideal para reproduzir qualquer tom.
3. **Inventário do Estúdio**: Acompanhamento de tintas em estoque por fabricante, linha, número de lote e validade.
4. **Biblioteca de Fórmulas**: Registro de fórmulas com etiquetas, notas explicativas, predefinições profissionais, backup em JSON e exportação em CSV.
5. **Vista de substituição de tintas**: substitua uma tinta esgotada numa fórmula guardada e compare antes e depois com a diferença CIEDE2000 (ΔE₀₀), com aviso de cap de teste.
6. **Estúdio de Referência**: Carregamento de imagens de referência, extração de paleta e conversão imediata para receitas de tinta.
7. **Formulador de Gradientes e Tampas**: Criação de séries de 3 a 6 batoques com valores escalonados gota a gota para sombreado uniforme.
8. **Formulador de Diluentes**: Dosagens de soluções de sombreamento com água destilada, hamamélis e glicerina vegetal.
9. **Calculadora de Gray Wash**: Ajuste de concentração de preto de 5% a 90% com atalhos de gradação.
10. **Calibração de Iluminação do Estúdio**: Orientações sobre temperatura de cor (5000K–6500K) e índice de reprodução de cor (CRI > 95) contra falha metamérica.
11. **Teoria das Cores**: Poder de tingimento, opacidade e equilíbrio complementar na derme.
12. **Ferramentas de Estúdio & Cofre**: Ficha técnica local de clientes e cofre com criptografia AES-GCM de 256 bits.

---

## 🛠️ Technical Specifications & Local Architecture

- **Runtime**: Plain Node.js (`>=20`), Vanilla JavaScript (ES6+), HTML5, CSS3.
- **CSP Compliant**: `script-src 'self'`. Zero remote CDN calls, zero external web fonts, zero tracking pixels.
- **Offline Capable**: All calculations execute in-browser using standard Web APIs (Canvas API, Web Crypto API for AES-GCM).
- **Responsive Layout**: Fluid grid architecture tested across mobile (320px–480px), tablet (768px–1024px), and desktop (1200px–1400px+).

## 📄 License & Attribution
Distributed under the MIT License. Created and published by **Poli International**, creator of BioFlex® body jewelry.
