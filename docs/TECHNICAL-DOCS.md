# Tattoo Ink Mixer - Technical Documentation / Documentation Technique / Technische Dokumentation

> Architectural specifications, algorithmic formulas, data schemas, and integration guidelines for the Tattoo Ink Mixer by Poli International, creator of BioFlex® body jewelry.

---

## Language Documentation Files / Fichiers par Langue / Sprachdateien

The technical documentation is available as dedicated, language-specific files:

- 🇬🇧 **English (EN)**: [`TECHNICAL-DOCS-en.md`](./TECHNICAL-DOCS-en.md)
- 🇩🇪 **Deutsch (DE)**: [`TECHNICAL-DOCS-de.md`](./TECHNICAL-DOCS-de.md)
- 🇪🇸 **Español (ES)**: [`TECHNICAL-DOCS-es.md`](./TECHNICAL-DOCS-es.md)
- 🇫🇷 **Français (FR)**: [`TECHNICAL-DOCS-fr.md`](./TECHNICAL-DOCS-fr.md)
- 🇮🇹 **Italiano (IT)**: [`TECHNICAL-DOCS-it.md`](./TECHNICAL-DOCS-it.md)
- 🇳🇱 **Nederlands (NL)**: [`TECHNICAL-DOCS-nl.md`](./TECHNICAL-DOCS-nl.md)
- 🇵🇹 **Português (PT)**: [`TECHNICAL-DOCS-pt.md`](./TECHNICAL-DOCS-pt.md)

---

## Master Index / Sections overview

- [1. English Technical Specifications (EN)](#1-english-technical-specifications-en)
- [2. Spécifications Techniques en Français (FR)](#2-spécifications-techniques-en-français-fr)
- [3. Deutsche Technische Spezifikationen (DE)](#3-deutsche-technische-spezifikationen-de)
- [4. Specifiche Tecniche in Italiano (IT)](#4-specifiche-tecniche-in-italiano-it)
- [5. Especificaciones Técnicas en Español (ES)](#5-especificaciones-técnicas-en-español-es)
- [6. Nederlandse Technische Specificaties (NL)](#6-nederlandse-technische-specificaties-nl)
- [7. Especificações Técnicas em Português (PT)](#7-especificações-técnicas-em-português-pt)

---

## 1. English Technical Specifications (EN)

### Architecture Overview
The Tattoo Ink Mixer is a standalone, client-side web application built with vanilla HTML5, CSS3 (using CSS custom properties), and modular ES6+ JavaScript. It operates without external runtime dependencies, requiring no third-party CDNs, external web fonts, or server-side databases.

#### Content Security Policy (CSP)
The application adheres strictly to:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Zero remote scripts, tracking pixels, or remote fonts are loaded.

### Core File Structure
```
ink-mixer/
├── index.html                  # Unified interface containing all 12 modules and responsive layout
├── embed.html                  # Lightweight iframe embedding interface
├── css/
│   ├── style.css               # Main stylesheet (custom properties, fluid responsive layouts)
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
│   ├── USER-GUIDE.md           # Multilingual user operations manual
│   └── TECHNICAL-DOCS.md       # Technical specification document
├── metadata.json               # Application metadata and runtime declarations
└── package.json                # Project configuration (Node.js >= 20)
```

### Algorithmic Foundations

#### 1. Volumetric Ratios & Unit Conversion
Component proportion $P_i$ against total parts $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volume}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Drops}_i = \text{round}\left( \text{Volume}_i \times 20 \right) \quad (\text{standard capillary drop factor: } 20\text{ drops} \approx 1\text{ ml})$$
$$\text{Caps}_i = \frac{\text{Volume}_i}{2.0} \quad (\text{standard tattoo cap size \#16 } \approx 2\text{ ml})$$

#### 2. Color Science: Kubelka-Munk & CIEDE2000
- **Forward Mixture Estimation**: Subtractive color mixing uses absorption ($K$) and scattering ($S$) coefficients derived from pigment opacity and tinting strength.
- **Target Solver**: Given target color coordinates in CIE $L^*a^*b^*$, the solver uses iterative optimization to minimize $\Delta E_{00}$ calculated via the standard ISO/CIE CIEDE2000 formulation:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Values below $\Delta E_{00} < 2.0$ indicate high-fidelity perceptual matches.

#### 3. Client-Side Encryption (Studio Vault)
The Studio Vault uses the standard Web Crypto API (`window.crypto.subtle`):
- **Algorithm**: AES-GCM with a 256-bit key.
- **Key Derivation**: PBKDF2 with SHA-256, 100,000 iterations, and a cryptographically secure 16-byte random salt.
- **Initialization Vector**: Unique 12-byte IV generated per encryption.

---

## 2. Spécifications Techniques en Français (FR)

### Aperçu de l'Architecture
Le Mélangeur de Pigments est une application web autonome exécutée exclusivement côté client (HTML5, CSS3, JavaScript ES6+). Elle fonctionne sans dépendance externe ni appel à des CDN tiers, garantissant une conformité totale avec une politique de sécurité de contenu stricte (`script-src 'self'`).

### Modules et Algorithmes
1. **Mélangeur Direct et Volumétrie**: Calcul précis des parts, volumes en ml, gouttes (facteur de 20 gouttes par ml) et capsules (#16 / 2ml).
2. **Solveur par Couleur Cible**: Optimisation itérative basée sur l'écart de couleur normalisé CIEDE2000 ($\Delta E_{00}$) et le modèle de transfert radiatif de Kubelka-Munk.
3. **Chiffrement du Coffre d'Atelier**: Utilisation de l'API standard Web Crypto avec l'algorithme AES-GCM 256 bits et dérivation PBKDF2 (100 000 itérations, sel de 16 octets).
4. **Moteur d'Internationalisation**: Dictionnaires synchronisés à 673 clés pour chaque langue, avec substitution de paramètres dynamique sans rechargement de page.

---

## 3. Deutsche Technische Spezifikationen (DE)

### Architektur-Übersicht
Die Anwendung ist als vollständig lokale Webapplikation (Vanilla JavaScript, HTML5, CSS3) ohne externe Abhängigkeiten konzipiert. Alle Berechnungen, Farbabgleiche und Datenspeicherungen erfolgen im Browser des Nutzers.

### Mathematische und Technische Grundlagen
1. **Volumen- und Tropfenberechnung**: Lineare Anteilszerlegung mit 20 Tropfen pro Milliliter und Standard-Farbkappengröße #16 (2 ml).
2. **CIEDE2000 Farbdifferenz**: Implementierung der ISO/CIE-Farbabstandsformel zur Ermittlung wahrnehmungsgetreuer Farbabstände ($\Delta E_{00}$).
3. **AES-GCM 256-Bit-Verschlüsselung**: Lokale Datensicherung über die Web Crypto API mit PBKDF2-Schlüsselableitung (100.000 Runden, SHA-256).
4. **I18n-Architektur**: Einheitliche Datenstrukturen in allen 7 Sprachen mit identischer Schlüsselanzahl (673 Schlüssel).

---

## 4. Specifiche Tecniche in Italiano (IT)

### Panoramica Architetturale
L'applicazione opera interamente sul lato client mediante standard aperti del W3C (HTML5, CSS3, JavaScript ES6+), senza librerie esterne caricate da CDN o cookie di tracciamento.

### Fondamenti Algoritmici
1. **Calcolo Volumetrico**: Conversione in millilitri, gocce (20 gocce/ml) e capsule standard (#16 / 2ml).
2. **Algoritmo CIEDE2000**: Valutazione della tolleranza cromatica $\Delta E_{00}$ nello spazio colore CIE $L^*a^*b^*$.
3. **Sicurezza Locale (Vault)**: Crittografia simmetrica AES-GCM a 256 bit tramite Web Crypto API con derivazione PBKDF2.
4. **Internazionalizzazione**: Dizionari sincronizzati su 673 chiavi in 7 lingue.

---

## 5. Especificaciones Técnicas en Español (ES)

### Descripción de la Arquitectura
El Mezclador de Tintas opera exclusivamente en el entorno del navegador cliente mediante HTML5, CSS3 y JavaScript moderno, cumpliendo estrictamente con la política `script-src 'self'` sin peticiones a redes de distribución de contenido (CDN).

### Fundamentos Técnicos y Algoritmos
1. **Modelos Volumétricos**: Partición proporcional con factor de 20 gotas/ml y capacidad estándar de cápsula #16 (2 ml).
2. **Resolución Colorimétrica CIEDE2000**: Cálculo de diferencias de color $\Delta E_{00}$ y estimación sustractiva de Kubelka-Munk.
3. **Cifrado Local de Fórmulas**: Protección de recetas mediante Web Crypto API (AES-GCM de 256 bits, PBKDF2 con 100.000 iteraciones).
4. **Localización**: 7 idiomas sincronizados con 673 claves exactas por diccionario.

---

## 6. Nederlandse Technische Specificaties (NL)

### Architectuuroverzicht
Volledig client-side webapplicatie gebouwd met HTML5, CSS3 en JavaScript ES6+. Bevat geen externe scripts, remote lettertypen of tracking mechanismen en voldoet aan een strikt Content Security Policy (`script-src 'self'`).

### Algoritmische Grondslagen
1. **Verhoudings- en Volumeberekening**: Lineaire berekening in ml, druppels (20 druppels/ml) en #16 inktcups (2 ml).
2. **CIEDE2000 Kleurverschil**: Mathematische bepaling van $\Delta E_{00}$ op basis van de internationale CIE normering.
3. **AES-GCM 256-Bit Versleuteling**: Geheime studio-opslag via de browser Web Crypto API met PBKDF2 sleutelafleiding.
4. **I18n Motor**: Volledige pariteit over 7 talen met elk 673 vertaalsleutels.

---

## 7. Especificações Técnicas em Português (PT)

### Visão Geral da Arquitetura
Aplicação puramente local para navegadores web, desenvolvida com HTML5, CSS3 e JavaScript modular. Opera sob política estrita de segurança de conteúdo (`script-src 'self'`), dispensando qualquer recurso externo ou biblioteca remota.

### Fundamentação Algorítmica
1. **Cálculo de Proporções e Gotas**: Divisão proporcional de partes com taxa de 20 gotas/ml e batoques #16 (2 ml).
2. **Equação CIEDE2000**: Otimização de cor com cálculo de erro perceptivo $\Delta E_{00}$ no espaço CIE $L^*a^*b^*$.
3. **Criptografia do Cofre de Estúdio**: Módulo local AES-GCM de 256 bits via Web Crypto API com PBKDF2 (100.000 iterações).
4. **Motor de Tradução**: Estrutura sincronizada em 7 idiomas com 673 chaves por idioma.

---

### Regulatory and Standard Citations
- **Material Standards for Tattoo Hardware / Piercing**: Cites real designations where applicable: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Annex XVII.
- **Data Protection**: Nothing you enter is sent anywhere. Formulas, inventory and notes are stored only in your own browser, and clearing site data removes them.
- **Professional Practice**: Chemical handling and diluent hygiene follow established professional practice and applicable public health guidance.
