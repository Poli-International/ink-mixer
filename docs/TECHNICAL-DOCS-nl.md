# Tattoo Inktmenger - Technische Documentatie (Nederlands)

> Architectuurspecificaties, algoritmische formules, dataschema's en integratierichtlijnen voor de Tattoo Inktmenger van Poli International, bedenker van BioFlex® lichaamssieraden.

---

## 1. Architectuuroverzicht
De Tattoo Inktmenger is een zelfstandige, zuiver client-side webapplicatie gebouwd met standaard HTML5, CSS3 (met CSS-variabelen) en modulaire ES6+ JavaScript. De applicatie functioneert zonder externe runtime-afhankelijkheden en maakt geen gebruik van externe CDN's, externe lettertypen of databases op een server.

### Content Security Policy (CSP)
De software volgt strikt de onderstaande beveiligingsrichtlijn:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Er worden geen scripts van derden, volgpixels of externe webfonts geladen. Alle leveranciersbibliotheken zijn lokaal ondergebracht in `js/vendor/`.

---

## 2. Bestandsstructuur
```
ink-mixer/
├── index.html                  # Centrale interface met alle 12 studiomodules
├── embed.html                  # Compacte weergave voor iFrame-invoeging
├── css/
│   ├── style.css               # Hoofdstijlbestand (CSS-variabelen, responsieve lay-out)
│   └── lang-switcher.css       # Vormgeving van de taalkeuze
├── js/
│   ├── i18n.js                 # Vertaalmotor (opzoeken, parametersubstitutie, DOM-updates)
│   ├── i18n/                   # Taalwoordenboeken (elk 673 gesynchroniseerde sleutels)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # CIEDE2000 kleurverschil rekenmodel (Delta E 00)
│   ├── ink-database.js         # Gekalibreerde database van pigmentkenmerken
│   ├── inventory.js            # Studio-voorraadbeheer met localStorage-opslag
│   ├── formulas.js             # Geverifieerde verzameling professionele recepten
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # Formulebibliotheek (CRUD, zoeken, JSON/CSV-export)
│   ├── mixer.js                # Directe mengcalculator en Kubelka-Munk doelkleuroplosser
│   ├── studio-calibration.js   # Verlichtingstemperatuur (5000K-6500K) en CRI-evaluatie
│   ├── reference-studio.js     # HTML5 Canvas kleurmonsterneming en paletextractie
│   ├── gradient-caps.js        # Verloopcupcalculator (3 tot 6 inktcups)
│   ├── diluent-formulator.js   # Schaduwverdunningsrecepten (water, toverhazelaar, glycerine)
│   ├── studio-vault.js         # Web Crypto API AES-GCM 256-bits lokale versleuteling
│   └── common.js               # Themakleurstatus, modale vensters en hulpfuncties
├── docs/
│   ├── USER-GUIDE.md           # Hoofdindex gebruikershandleidingen
│   ├── TECHNICAL-DOCS.md       # Hoofdindex technische documentatie
│   ├── USER-GUIDE-*.md         # Handleidingen per taal (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Technische documenten per taal (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Applicatiemetadata en platformdeclaraties
└── package.json                # Projectconfiguratie (Node.js >= 20)
```

---

## 3. Algoritmische Grondslagen

### 1. Volumetrische Verhoudingen en Eenheidsconversie
Componentverhouding $P_i$ ten opzichte van het totaal aantal delen $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volume}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Druppels}_i = \text{round}\left( \text{Volume}_i \times 20 \right) \quad (\text{capillaire druppelfactor: } 20\text{ druppels} \approx 1\text{ ml})$$
$$\text{Cups}_i = \frac{\text{Volume}_i}{2.0} \quad (\text{standaard inktcupmaat \#16 } \approx 2\text{ ml})$$

### 2. Kleurwetenschap: Kubelka-Munk en CIEDE2000
- **Subtractieve Mengberekening**: Past absorptie- ($K$) en verstrooiingscoëfficiënten ($S$) toe, afgeleid van pigmentdichtheid en kleurkracht.
- **Doelkleur Oplosser**: Optimaliseert iteratief in de CIE $L^*a^*b^*$ kleurruimte om $\Delta E_{00}$ te minimaliseren volgens de ISO/CIE CIEDE2000 normering:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Waarden onder $\Delta E_{00} < 2.0$ garanderen een visueel naadloze overeenkomst.

### 3. Client-Side Encryptie (Studiokluis)
De Studiokluis benut de gestandaardiseerde Web Crypto API (`window.crypto.subtle`):
- **Algoritme**: AES-GCM met een 256-bits symmetrische sleutel.
- **Sleutelafleiding**: PBKDF2 met SHA-256, 100.000 iteraties en een cryptografisch willekeurige zoutwaarde van 16 bytes.
- **Initialisatievector**: Unieke IV van 12 bytes per versleutelingssessie.

### 4. Kleurtemperatuur en Studioverlichting
Kleurbeoordeling vereist studioverlichting tussen 5000K en 6500K met een Color Rendering Index (CRI) van meer dan 95 om metamerie bij fijne overgangen te vermijden.

### 5. Taalsynchronisatie (I18n)
Exacte gelijkheid van 673 sleutels over alle 7 ondersteunde talen (EN, DE, ES, FR, IT, NL, PT), direct wisselbaar zonder herladen van de pagina.

---

## 4. Normering en Wettelijk Kader
- **Materiaaleisen voor Piercing- en Tattoo-Apparatuur**: Authentieke standaardaanduidingen: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Bijlage XVII.
- **Merkaanduiding**: Patrick Poli is de bedenker van BioFlex® lichaamssieraden. BioFlex is PP-R willekeurig copolymeer.
- **Gegevensbescherming**: Niets wat je invoert wordt verzonden. Formules, voorraad en notities blijven alleen in je eigen browser; sitegegevens wissen verwijdert ze.
- **Vakpraktijk**: De hygiënische behandeling van verdunners en pigmenten volgt de gevestigde professionele praktijk (established professional practice) en de van toepassing zijnde volksgezondheidsrichtlijnen.
