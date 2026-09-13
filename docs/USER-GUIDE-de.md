# Tattoo Ink Mixer - Benutzerhandbuch (Deutsch)

> Umfassendes Betriebshandbuch für den Tattoo Ink Mixer von Poli International, Schöpfer von BioFlex® Körperschmuck.

---

## 1. Einleitung
Der Tattoo Ink Mixer bietet professionellen Tätowierern eine ganzheitliche digitale Farbumgebung. Er gewährleistet reproduzierbare Pigmentformeln über mehrere Sitzungen hinweg, berechnet Farbabstände nach dem CIEDE2000-Standard und analysiert das Einheilverhalten auf verschiedenen Hauttypen.

---

## 2. Die 12 Studio-Module

### Modul 1: Direkter Farbmischer
- **Zweck**: Berechnung exakter Volumenverhältnisse und Tropfenanzahlen für Mehrkomponentenmischungen.
- **Anwendung**:
  1. Wählen Sie im Reiter "Farbmischer" die gewünschten Komponenten aus.
  2. Geben Sie Hersteller und Chargennummer zur Rückverfolgbarkeit ein.
  3. Passen Sie die Mischungsanteile an (z. B. 3 Teile Karmesinrot, 1 Teil Kobaltblau).
  4. Bestimmen Sie das Gesamtvolumen in Millilitern (ml) oder Kappen (#16 / 2 ml).
  5. Klicken Sie auf **Mischung berechnen**, um die Rezeptur, Messwerte, Prozentanteile und die Farbprobe mit L*a*b*-Koordinaten anzuzeigen.
  6. Beachten Sie bei mehreren Marken den **Marken-Kompatibilitätshinweis** bezüglich Viskosität und Trägerflüssigkeiten.
  7. Speichern Sie die Rezeptur direkt oder drucken Sie ein Mischblatt für Ihren Arbeitsplatz aus.


### Modul 2: Zielfarben-Solver
- **Zweck**: Automatische Ermittlung der exakten Farbrezeptur für einen Zielton mittels Kubelka-Munk- und CIEDE2000-Algorithmen.
- **Anwendung**:
  1. Geben Sie im Reiter "Zielfarbe" einen Hex-Code ein oder wählen Sie eine Vorlage.
  2. Der Solver ermittelt die mathematisch beste Annäherung anhand Ihrer Inventarfarben.
  3. Vergleichen Sie Zielfarbe und berechnete Mischung anhand der ΔE-Bewertung (Delta E).
  4. Klicken Sie auf **In Mischer laden** für manuelle Feinjustierungen oder auf **In Bibliothek speichern**.


### Modul 3: Studio-Inventar & Farblager
- **Zweck**: Erfassung vorhandener Pigmentflaschen, Chargennummern und Ablaufdaten.
- **Anwendung**:
  1. Öffnen Sie den Reiter "Inventar", um den Lagerbestand zu prüfen.
  2. Filtern Sie nach Marke oder Farbkategorie (Primär, Neutral, Waschung).
  3. Markieren Sie Flaschen als "Auf Lager" oder "Aufgebraucht". Aufgebrauchte Farben werden vom Solver automatisch nachrangig behandelt.

### Modul 4: Formel-Bibliothek
- **Zweck**: Katalogisierung eigener Mischungen und Zugriff auf professionelle Vorlagen.
- **Anwendung**:
  1. Suchen Sie im Reiter "Meine Formeln" nach Rezepten via Titel, Tag oder Datum.
  2. Klicken Sie auf **Rezeptur laden**, um eine Formel in den aktiven Mischer zu übertragen.
  3. Nutzen Sie **Bibliothek exportieren (JSON)** für eine lokale Datensicherung oder **CSV exportieren** für physische Dokumente.
  4. Stellen Sie Backups mittels **Bibliothek importieren** ohne Netzwerkübertragung wieder her.

### Modul 5: Formel-Tintenersetzungsansicht
- **Zweck**: Schnelles Bewerten und Formulieren eines Ersatzes, wenn eine Farbnuance mitten in der Sitzung zur Neige geht.
- **Bedienung**:
  1. Öffnen Sie die "Ersetzungsansicht" im Reiter "Gespeicherte Formeln".
  2. Wählen Sie eine gespeicherte Rezeptur aus Ihrer Bibliothek.
  3. Markieren Sie eine Tinte als nicht vorrätig.
  4. Wählen Sie eine Ersatztinte aus Ihrem Studioinventar.
  5. Vergleichen Sie die Farbfelder Vorher und Nachher nebeneinander.
  6. Prüfen Sie die CIEDE2000-Farbdifferenz (ΔE₀₀). Liegt ΔE > 5,0, beachten Sie die Warnung: „Dies wird nicht übereinstimmen. Mischen Sie zuerst eine Testkappe.“
  7. Beachten Sie, dass die Bildschirmfarbe auf einem unkalibrierten Bildschirm nur indikativ ist.
  8. Klicken Sie auf **In den Mischer laden** für Feinabstimmungen oder auf **Ersetztes Rezept speichern**, um die Variante in der Bibliothek zu sichern.


### Modul 6: Referenz-Studio & Palettenextraktion
- **Zweck**: Direkte Farbpaletten-Extraktion aus Bildvorlagen des Kunden.
- **Anwendung**:
  1. Ziehen Sie im Reiter "Referenz-Studio" eine Bilddatei auf die Arbeitsfläche.
  2. Klicken Sie mit der Pipette auf Bildbereiche zur genauen Farbentnahme.
  3. Das System extrahiert automatisch eine harmonische 5-Farben-Palette.
  4. Klicken Sie bei einer Farbprobe auf **In Formel konvertieren**, um sie im Zielfarben-Solver zu öffnen.

### Modul 7: Farbverlauf- & Kappen-Rechner
- **Zweck**: Tropfengenaue Vorbereitung von Schattierungskappen für weiche Übergänge.
- **Anwendung**:
  1. Wählen Sie im Reiter "Farbverlauf-Kappen" ein Setup mit 3, 4, 5 oder 6 Kappen.
  2. Bestimmen Sie das Ausgangspigment und die Verdünnungslösung.
  3. Nutzen Sie die Tropfen-für-Tropfen-Rezeptur für kontinuierliche Helligkeitsstufen.

### Modul 8: Verdünner-Formulierer
- **Zweck**: Sicheres Mischen von Schattierungslösungen und Verdünnungsmedien.
- **Anwendung**:
  1. Öffnen Sie den Reiter "Verdünner" und wählen Sie den Einsatzzweck (Thin Wash, Lining Medium oder Heavy Shading Solution).
  2. Passen Sie die Menge an, um genaue Anteile von destilliertem Wasser, Hamamelis (Witch Hazel) und pflanzlichem Glycerin zu erhalten.

### Modul 9: Gray Wash Studio-Mischserie
- **Zweck**: Standardisierung von Schwarzverdünnungen von 5% bis 90% und Berechnung von 3-, 4- und 5-Kappen-Serien.
- **Anwendung**:
  1. Wählen Sie im Reiter "Gray Wash" ein Standardsystem (3-Kappen, 4-Kappen oder 5-Kappen).
  2. Wählen Sie die Behältergröße (#9, #12, #16 Kappen oder 1oz, 2oz, 4oz Quetschflaschen).
  3. Verwenden Sie den Schieberegler für individuelle Dichten und kopieren oder laden Sie die Rezepturen direkt.

### Modul 10: Studiobeleuchtung & Kalibrierung
- **Zweck**: Vermeidung metamerischer Fehlschlüsse bei der Farbbeurteilung.
- **Anwendung**:
  1. Beachten Sie die Empfehlungen zur Beleuchtung (5000K bis 6500K tageslichtneutral, CRI > 95).
  2. Prüfen Sie die Lichtverhältnisse vor der finalen Farbbewertung auf heilender Haut.

### Modul 11: Farblehre & Mischphysik
- **Zweck**: Verständnis von Pigmentdichte, Farbstärke und Komplementärneutralisation.
- **Anwendung**:
  1. Studieren Sie die Hinweise zur Farbstärke, um hochdeckende Pigmente wie Titanweiß dosiert einzusetzen.
  2. Nutzen Sie den Subtraktiv-Neutralisator zur Korrektur unerwünschter Farbstiche.

### Modul 12: Studio-Tools & Tresor
- **Zweck**: Schutz von Kundennotizen und Studioformeln mittels lokaler AES-GCM 256-Bit-Verschlüsselung.
- **Anwendung**:
  1. Öffnen Sie den Reiter "Studio-Tools & Tresor".
  2. Vergeben Sie ein Passwort, um alle Rezepte und Kundendaten in eine Offline-Datei (`.vault`) zu exportieren.
  3. Entschlüsseln Sie die Daten auf jedem Computer im Studio, ohne dass Daten den Browser verlassen.

---

## 3. Verifikation und Datenschutz
- **Datenschutz**: Nichts, was Sie eingeben, wird übertragen. Formeln, Bestand und Notizen bleiben nur in Ihrem Browser; das Löschen der Websitedaten entfernt sie.
- **Sicherheitsstandards**: Tattoofarben und Verdünnungslösungen müssen der etablierten fachlichen Praxis (established professional practice) und den regionalen Bestimmungen wie EU REACH Anhang XVII entsprechen.
