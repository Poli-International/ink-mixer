# Tattoo Inktmenger - Gebruikershandleiding (Nederlands)

> Uitgebreide bedieningshandleiding voor de Tattoo Inktmenger van Poli International, bedenker van BioFlex® lichaamssieraden.

---

## 1. Inleiding
De Tattoo Inktmenger biedt professionele tatoeëerders een complete digitale werkomgeving voor kleurbeheer. De tool waarborgt reproduceerbare pigmentrecepten over meerdere sessies heen, berekent kleurverschillen volgens de CIEDE2000-standaard en analyseert de inktweergave op uiteenlopende huidtypen.

---

## 2. De 12 Studiomodules

### Module 1: Directe Inktmenger
- **Doel**: Nauwkeurige berekening van volumeverhoudingen en druppelaantallen voor complexe pigmentmengsels.
- **Gebruik**:
  1. Kies in het tabblad "Inktmenger" de gewenste componenten uit het keuzemenu.
  2. Vul merk en chargenummer in voor een betrouwbare traceerbaarheid.
  3. Pas de mengverhoudingen aan (bijvoorbeeld 3 delen Karmozijnrood, 1 deel Kobaltblauw).
  4. Geef het gewenste totale volume op in milliliters (ml) of inktcups (#16 / 2 ml).
  5. Klik op **Mengsel berekenen** om de definitieve formule, maatverdelingen, percentages en kleurstaal met L*a*b*-waarden te genereren.
  6. Let bij combinatie van verschillende inktmerken op de **Merkcompatibiliteitswaarschuwing** over viscositeit en dragervloeistoffen.
  7. Sla de formule direct op of print een werkblad voor uw werktafel.


### Module 2: Doelkleur Oplosser
- **Doel**: Automatisch bepalen van de benodigde componenten om een gewenste doeltint na te bootsen via Kubelka-Munk en CIEDE2000.
- **Gebruik**:
  1. Voer in het tabblad "Doelkleur" een hexadecimale kleurcode in of kies een studiokleur.
  2. De oplosser berekent de dichtstbijzijnde wiskundige combinatie op basis van uw voorraad.
  3. Vergelijk de stalen van de **Doelkleur** en het **Berekende Mengsel** met de bijbehorende ΔE-waarde (Delta E).
  4. Klik op **In menger laden** om handmatig bij te sturen of op **Opslaan in bibliotheek**.


### Module 3: Studio-voorraad & Pigmentbeheer
- **Doel**: Overzicht houden over aanwezige inktflessen, chargenummers en houdbaarheidsdata.
- **Gebruik**:
  1. Open het tabblad "Voorraad" om de actuele voorraad te inspecteren.
  2. Filter op merk of inktcategorie (primair, neutraal, wash).
  3. Markeer flessen als "Op voorraad" of "Uitverkocht". Niet-voorradige inkten worden door de doelkleuroplosser automatisch uitgesloten.

### Module 4: Formulebibliotheek
- **Doel**: Gestructureerd bewaren van eigen recepten en raadplegen van beproefde studioformules.
- **Gebruik**:
  1. Zoek in het tabblad "Mijn formules" naar bewaarde recepten op naam, categorie of datum.
  2. Klik op **Formule laden** om een recept direct naar de actieve menger over te brengen.
  3. Gebruik **Bibliotheek exporteren (JSON)** voor een lokale reservekopie of **Exporteer CSV** voor overzichten op papier.
  4. Herstel eerdere gegevens via **Bibliotheek importeren** zonder dat gegevens over een netwerk worden verzonden.

### Module 5: Formule Inkt-Substitutieweergave
- **Doel**: Snel beoordelen en formuleren van vervangingen wanneer een inktkleur halverwege een sessie opraakt.
- **Gebruiksaanwijzing**:
  1. Open de "Substitutieweergave" binnen het tabblad Opgeslagen Formules.
  2. Kies een opgeslagen recept uit uw formulebibliotheek.
  3. Markeer één bestanddeelinkt als niet op voorraad.
  4. Selecteer een vervangende inkt uit uw studio-inventaris.
  5. Vergelijk de kleurstalen Vooraf en Achteraf naast elkaar.
  6. Controleer het CIEDE2000 kleurverschil (ΔE₀₀). Indien ΔE > 5,0, neem de waarschuwing in acht: „Dit zal niet overeenkomen. Meng eerst een testdop.“
  7. Let op dat de schermkleur op een niet-gekalibreerd scherm slechts indicatief is.
  8. Klik op **Laden in Menger** om verhoudingen bij te stellen, of op **Vervangen Recept Opslaan** om de receptuur op te slaan.


### Module 6: Referentiestudio & Palet Extractie
- **Doel**: Direct harmonische kleurenpaletten extraheren uit referentieafbeeldingen.
- **Gebruik**:
  1. Sleep in het tabblad "Referentiestudio" een voorbeeldafbeelding naar het werkveld.
  2. Klik met de pipet op een willekeurige plek op de afbeelding om kleurcoördinaten op te nemen.
  3. Het systeem extraheert automatisch een afgewogen palet van 5 hoofdkleuren.
  4. Klik bij een kleurstaal op **Omzetten naar formule** om deze in te laden in de Doelkleur Oplosser.

### Module 7: Verloop- & Inktcup Formulator
- **Doel**: Voorbereiden van evenwichtige inktcupreeksen voor black-and-grey en vloeiende kleurovergangen.
- **Gebruik**:
  1. Kies in het tabblad "Verloopcups" een set van 3, 4, 5 of 6 cups.
  2. Stel het donkere basispigment en het verdunningsmedium in.
  3. Volg het druppelrecept voor een geleidelijke en natuurlijke toonschaal.

### Module 8: Verdunner Formulator
- **Doel**: Veilig en hygiënisch samenstellen van schaduwoplossingen en verdunningsvloeistoffen.
- **Gebruik**:
  1. Open het tabblad "Verdunner" en kies de toepassing (Lichte Wash, Lijndunner of Zware Schaduwoplossing).
  2. Pas het gewenste volume aan om de exacte verhoudingen gedestilleerd water, toverhazelaar (witch hazel) en plantaardige glycerine te zien.

### Module 9: Gray Wash Studiomengreeks
- **Doel**: Standaardiseren van zwarte inktverdunningen van 5% tot 90% en berekenen van standaardreeksen met 3, 4 en 5 cups.
- **Gebruik**:
  1. Kies in het tabblad "Gray Wash" een standaardsysteem (3 cups, 4 cups of 5 cups).
  2. Selecteer de cupmaat (#9, #12, #16 cups of knijpflessen van 1oz, 2oz, 4oz).
  3. Gebruik de schuifregelaar voor vrije mengpercentages en laad of kopieer het recept direct.

### Module 10: Studioverlichting & Kalibratie
- **Doel**: Kleurbeoordeling optimaliseren en fouten door metamerie uitsluiten.
- **Gebruik**:
  1. Raadpleeg de aanbevolen verlichtingsparameters (5000K tot 6500K neutraal daglicht, CRI > 95).
  2. Controleer de lichtomstandigheden alvorens de kleurverzadiging op genezende huid te beoordelen.

### Module 11: Kleurtheorie & Mengfysica
- **Doel**: Begrip van dekkracht, kleurkracht en subtractieve neutralisatie.
- **Gebruik**:
  1. Bestudeer richtlijnen om sterk dekkende pigmenten zoals Titaanwit met mate te doseren.
  2. Pas de neutralisatiecalculator toe om ongewenste ondertonen bij cover-ups te neutraliseren.

### Module 12: Studiogereedschappen & Kluis
- **Doel**: Beveiligen van klantgegevens en unieke recepten met lokale 256-bits AES-GCM versleuteling.
- **Gebruik**:
  1. Ga naar het tabblad "Studiogereedschap & Kluis".
  2. Stel een wachtwoordzin in om alle gegevens te versleutelen naar een offline bestand (`.vault`).
  3. Ontsleutel het bestand op elke gewenste computer in de studio zonder data over het internet te sturen.

---

## 3. Verificatie en Privacy
- **Gegevensbescherming**: Niets wat je invoert wordt verzonden. Formules, voorraad en notities blijven alleen in je eigen browser; sitegegevens wissen verwijdert ze.
- **Veiligheidsnormering**: Inktmengsels en verdunners dienen te worden bereid volgens de gevestigde professionele praktijk (established professional practice) en wettelijke eisen zoals EU REACH Bijlage XVII.
