# Tattoo Ink Mixer - Technische Dokumentation (Deutsch)

> Architekturspezifikationen, mathematische Formeln, Datenschemata und Integrationsrichtlinien für den Tattoo Ink Mixer von Poli International, Schöpfer von BioFlex® Körperschmuck.

---

## 1. Architektur-Übersicht
Der Tattoo Ink Mixer ist eine eigenständige, rein clientseitige Webanwendung, die mit nativem HTML5, CSS3 (mittels CSS-Variablen) und modularem ES6+ JavaScript entwickelt wurde. Sie arbeitet ohne externe Laufzeitabhängigkeiten und benötigt weder externe CDNs noch Web-Fonts oder serverseitige Datenbanken.

### Content Security Policy (CSP)
Die Anwendung erfüllt strikt folgende Sicherheitsrichtlinie:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Es werden keinerlei Remote-Skripte, Tracking-Pixel oder externe Schriftarten geladen. Sämtliche Bibliotheken sind lokal unter `js/vendor/` abgelegt.

---

## 2. Zentrale Dateistruktur
```
ink-mixer/
├── index.html                  # Zentrale Benutzeroberfläche mit allen 12 Modulen
├── embed.html                  # Schlanke Einbettungsoberfläche für iFrames
├── css/
│   ├── style.css               # Haupt-Stylesheet (CSS-Variablen, responsive Layouts)
│   └── lang-switcher.css       # Sprachumschalter-Design
├── js/
│   ├── i18n.js                 # Übersetzungskern (Suche, Parametersubstitution, DOM-Aktualisierung)
│   ├── i18n/                   # Sprachwörterbücher (jeweils 673 synchronisierte Schlüssel)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # CIEDE2000 Farbdifferenzberechnung (Delta E 00)
│   ├── ink-database.js         # Kalibrierte Pigmenteigenschaften-Datenbank
│   ├── inventory.js            # Studio-Inventarverwaltung mit localStorage-Persistenz
│   ├── formulas.js             # Kuratierte professionelle Rezepturdatenbank
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # Formel-Bibliothek (CRUD, Suche, JSON/CSV-Export)
│   ├── mixer.js                # Vorwärtsmischrechner und Kubelka-Munk-Zielfarben-Solver
│   ├── studio-calibration.js   # Beleuchtungstemperatur (5000K-6500K) und CRI-Bewertung
│   ├── reference-studio.js     # HTML5 Canvas Farbabtastung und Palettenextraktion
│   ├── gradient-caps.js        # Tonwert-Kappenabstufungsrechner (3 bis 6 Kappen)
│   ├── diluent-formulator.js   # Schattierungslösungsrechner (Wasser, Hamamelis, Glycerin)
│   ├── studio-vault.js         # Web Crypto API AES-GCM 256-Bit lokale Verschlüsselung
│   └── common.js               # Theme-Status, Modalverwaltung und Hilfsfunktionen
├── docs/
│   ├── USER-GUIDE.md           # Zentraler Index für Benutzerhandbücher
│   ├── TECHNICAL-DOCS.md       # Zentraler Index für technische Dokumentation
│   ├── USER-GUIDE-*.md         # Sprachspezifische Handbücher (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Sprachspezifische technische Dokumente (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Anwendungsmetadaten und Plattformdeklarationen
└── package.json                # Projektkonfiguration (Node.js >= 20)
```

---

## 3. Mathematische und Technische Grundlagen

### 1. Volumetrische Verhältnisse und Einheitenumrechnung
Komponentenanteil $P_i$ bezogen auf die Gesamtanteile $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volumen}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Tropfen}_i = \text{round}\left( \text{Volumen}_i \times 20 \right) \quad (\text{Standard-Kapillartropfenfaktor: } 20\text{ Tropfen} \approx 1\text{ ml})$$
$$\text{Kappen}_i = \frac{\text{Volumen}_i}{2.0} \quad (\text{Standard-Farbkappengröße \#16 } \approx 2\text{ ml})$$

### 2. Farbwissenschaft: Kubelka-Munk und CIEDE2000
- **Subtraktive Farbmischung**: Verwendet Absorptions- ($K$) und Streuungskoeffizienten ($S$), abgeleitet von Pigmentopazität und Farbstärke.
- **Zielfarben-Solver**: Für gegebene Zielkoordinaten im Farbraum CIE $L^*a^*b^*$ optimiert der Solver iterativ zur Minimierung des Farbabstands $\Delta E_{00}$ gemäß ISO/CIE CIEDE2000:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Werte unter $\Delta E_{00} < 2.0$ gelten als visuell hochpräzise Übereinstimmungen.

### 3. Clientseitige Verschlüsselung (Studio-Tresor)
Der Studio-Tresor nutzt die standardisierte Web Crypto API (`window.crypto.subtle`):
- **Algorithmus**: AES-GCM mit 256-Bit-Schlüssel.
- **Schlüsselableitung**: PBKDF2 mit SHA-256, 100.000 Runden und kryptografisch sicherem 16-Byte-Zufallssalz.
- **Initialisierungsvektor**: Für jede Verschlüsselung wird ein individueller 12-Byte-IV generiert.

### 4. Farbtemperatur und Studiobeleuchtung
Eine zuverlässige Farbbeurteilung setzt Studiobeleuchtung zwischen 5000K und 6500K mit einem Farbwiedergabeindex (CRI) von über 95 voraus, um metamerische Täuschungen bei feinen Schattierungen auszuschließen.

### 5. Internationalisierungs-Engine
Das Lokalisierungssystem gewährleistet eine strikte Parität von 673 Schlüsseln in allen sieben Sprachen (EN, DE, ES, FR, IT, NL, PT) mit dynamischer Laufzeitumschaltung ohne Seitenneuladen.

---

## 4. Normen und gesetzliche Richtlinien
- **Materialstandards für Piercing- und Tattoo-Hardware**: Echte Normbezeichnungen: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Anhang XVII.
- **Markenangaben**: Patrick Poli ist der Schöpfer von BioFlex® Körperschmuck. BioFlex ist PP-R Random-Copolymer.
- **Datenschutz**: Nichts, was Sie eingeben, wird übertragen. Formeln, Bestand und Notizen bleiben nur in Ihrem Browser; das Löschen der Websitedaten entfernt sie.
- **Fachpraxis**: Chemikalienhandhabung und Verdünnungshygiene folgen etablierter fachlicher Praxis (established professional practice) und geltenden Richtlinien des Gesundheitsschutzes.
