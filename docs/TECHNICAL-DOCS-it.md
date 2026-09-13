# Miscelatore Inchiostri per Tatuaggio - Documentazione Tecnica (Italiano)

> Specifiche architetturali, formulazioni algoritmiche, schemi dati e linee guida di integrazione per il Miscelatore Inchiostri di Poli International, creatore dei gioielli per il corpo BioFlex®.

---

## 1. Panoramica Architetturale
Il Miscelatore Inchiostri per Tatuaggio è un'applicazione web autonoma eseguita interamente lato client nel browser dell'utente, sviluppata con standard aperti HTML5, CSS3 (variabili CSS) e JavaScript modulare ES6+. Funziona senza dipendenze esterne a runtime, eliminando la necessità di CDN esterne, font remoti o database su server.

### Content Security Policy (CSP)
L'applicazione osserva rigorosamente la seguente policy:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Non viene caricato alcuno script remoto, pixel di tracciamento o risorsa esterna. Tutte le librerie fornitore sono collocate localmente in `js/vendor/`.

---

## 2. Struttura dei File Principali
```
ink-mixer/
├── index.html                  # Interfaccia unificata con i 12 moduli di studio
├── embed.html                  # Interfaccia compatta per incorporamento iFrame
├── css/
│   ├── style.css               # Foglio di stile primario (variabili CSS e layout reattivo)
│   └── lang-switcher.css       # Selettore di lingua nella testata
├── js/
│   ├── i18n.js                 # Motore di internazionalizzazione (lookup e sostituzione DOM)
│   ├── i18n/                   # Dizionari di lingua (673 chiavi sincronizzate ciascuno)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # Motore matematico per differenza cromatica CIEDE2000 (Delta E 00)
│   ├── ink-database.js         # Database calibrato delle proprietà ottiche dei pigmenti
│   ├── inventory.js            # Gestione inventario dello studio con storage locale
│   ├── formulas.js             # Archivio formule e ricette professionali
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # Libreria formule (CRUD, ricerca, esportazione JSON/CSV)
│   ├── mixer.js                # Calcolatore di miscelazione diretta e risolutore Kubelka-Munk
│   ├── studio-calibration.js   # Valutazione della temperatura colore (5000K-6500K) e CRI
│   ├── reference-studio.js     # Campionamento su Canvas HTML5 ed estrazione palette
│   ├── gradient-caps.js        # Calcolatore per serie di capsule graduate (da 3 a 6 pozzetti)
│   ├── diluent-formulator.js   # Formulatore soluzioni di diluizione (acqua, amamelide, glicerina)
│   ├── studio-vault.js         # Cassaforte locale cifrata con Web Crypto API AES-GCM 256 bit
│   └── common.js               # Stato del tema, gestione modali e funzioni di utilità
├── docs/
│   ├── USER-GUIDE.md           # Indice principale guide utente
│   ├── TECHNICAL-DOCS.md       # Indice principale documentazione tecnica
│   ├── USER-GUIDE-*.md         # Guide utente per lingua (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Documenti tecnici per lingua (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Metadati applicazione e definizioni di runtime
└── package.json                # Configurazione del progetto (Node.js >= 20)
```

---

## 3. Fondamenti Algoritmici

### 1. Rapporti Volumetrici e Conversione di Unità
Proporzione della componente $P_i$ rispetto al totale delle parti $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volume}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Gocce}_i = \text{round}\left( \text{Volume}_i \times 20 \right) \quad (\text{fattore goccia capillare: } 20\text{ gocce} \approx 1\text{ ml})$$
$$\text{Capsule}_i = \frac{\text{Volume}_i}{2.0} \quad (\text{dimensione standard pozzetto \#16 } \approx 2\text{ ml})$$

### 2. Scienza del Colore: Kubelka-Munk e CIEDE2000
- **Stima di Miscelazione Sottrattiva**: Calcola i coefficienti di assorbimento ($K$) e diffusione ($S$) partendo da opacità e forza colorante.
- **Risolutore Colore Obiettivo**: Ottimizza iterativamente nello spazio colore CIE $L^*a^*b^*$ per minimizzare il divario $\Delta E_{00}$ definito dalla norma ISO/CIE CIEDE2000:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Valori di $\Delta E_{00} < 2.0$ denotano un'accuratezza visiva impeccabile.

### 3. Cifratura Locale (Cassaforte dello Studio)
La Cassaforte dello Studio opera mediante l'API Web Crypto (`window.crypto.subtle`):
- **Algoritmo**: AES-GCM con chiave simmetrica a 256 bit.
- **Derivazione Chiave**: PBKDF2 con SHA-256, 100.000 iterazioni e salt casuale da 16 byte.
- **Vettore di Inizializzazione**: IV da 12 byte generato in modo univoco per ogni cifratura.

### 4. Temperatura Colore e Illuminazione dello Studio
La fedeltà cromatica richiede una sorgente luminosa compresa tra 5000K e 6500K con un indice di resa cromatica (CRI) superiore a 95 per prevenire il fenomeno del metamerismo.

### 5. Motore di Internazionalizzazione
Parità costante di 673 chiavi su tutti i 7 idiomi supportati (EN, DE, ES, FR, IT, NL, PT), garantendo la transizione fluida e reattiva tra le lingue.

---

## 4. Riferimenti Normativi e Conformità
- **Standard per Materiali da Piercing e Tatuaggio**: Citazioni formali vigenti: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Allegato XVII.
- **Riferimento di Marchio**: Patrick Poli è il creatore dei gioielli per il corpo BioFlex®. BioFlex è copolimero casuale PP-R.
- **Protezione dei dati**: Nulla di ciò che inserisci viene inviato. Formule, inventario e note restano solo nel tuo browser; cancellare i dati del sito li rimuove.
- **Pratica Professionale**: La gestione igienica di diluenti e pigmenti segue la pratica professionale consolidata (established professional practice) e i requisiti sanitari del settore.
