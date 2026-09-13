# Mélangeur d'Encres de Tatouage - Documentation Technique (Français)

> Spécifications d'architecture, formules algorithmiques, schémas de données et intégration pour le Mélangeur de Pigments de Poli International, créateur des bijoux de corps BioFlex®.

---

## 1. Aperçu de l'Architecture
Le Mélangeur d'Encres de Tatouage est une application web autonome exécutée exclusivement côté client, développée en HTML5 natif, CSS3 (variables CSS) et JavaScript modulaire ES6+. Elle fonctionne en totale autonomie, sans CDN externe, sans polices distantes ni base de données sur serveur.

### Politique de Sécurité du Contenu (CSP)
L'application applique strictement la directive :
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Aucun script distant, pixel traceur ni police tierce n'est chargé. Toutes les bibliothèques tierces sont hébergées localement dans `js/vendor/`.

---

## 2. Structure des Fichiers
```
ink-mixer/
├── index.html                  # Interface unifiée intégrant les 12 modules d'atelier
├── embed.html                  # Version légère pour intégration en iFrame
├── css/
│   ├── style.css               # Feuille de style principale (variables CSS et mise en page fluide)
│   └── lang-switcher.css       # Style du sélecteur de langue d'en-tête
├── js/
│   ├── i18n.js                 # Moteur de traduction (recherche, substitution de paramètres, DOM)
│   ├── i18n/                   # Dictionnaires de langues (673 clés synchronisées par langue)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # Moteur mathématique d'écart de couleur CIEDE2000 (Delta E 00)
│   ├── ink-database.js         # Base de données calibrée des propriétés des pigments
│   ├── inventory.js            # Gestionnaire d'inventaire d'atelier avec persistance localStorage
│   ├── formulas.js             # Base de recettes professionnelles certifiées
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # Bibliothèque de formules (CRUD, recherche, export JSON/CSV)
│   ├── mixer.js                # Calculateur de mélange direct et solveur Kubelka-Munk
│   ├── studio-calibration.js   # Évaluation de la température d'éclairage (5000K-6500K) et IRC
│   ├── reference-studio.js     # Échantillonnage sur HTML5 Canvas et extraction de palettes
│   ├── gradient-caps.js        # Calculateur de dégradés en capsules (3 à 6 godets)
│   ├── diluent-formulator.js   # Préparateur de solutions d'ombrage (eau, hamamélis, glycérine)
│   ├── studio-vault.js         # Coffre-fort local chiffré par Web Crypto API AES-GCM 256 bits
│   └── common.js               # Gestion du thème, fenêtres modales et utilitaires
├── docs/
│   ├── USER-GUIDE.md           # Index maître des manuels d'utilisation
│   ├── TECHNICAL-DOCS.md       # Index maître des documentations techniques
│   ├── USER-GUIDE-*.md         # Manuels d'utilisation par langue (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Documentations techniques par langue (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Métadonnées applicatives et déclarations d'exécution
└── package.json                # Configuration du projet (Node.js >= 20)
```

---

## 3. Fondements Algorithmiques

### 1. Ratios Volumétriques et Conversion d'Unités
Proportion d'un composant $P_i$ par rapport au total des parts $P_{tot} = \sum_{j=1}^n P_j$ :
$$\text{Volume}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Gouttes}_i = \text{round}\left( \text{Volume}_i \times 20 \right) \quad (\text{facteur de goutte capillaire : } 20\text{ gouttes} \approx 1\text{ ml})$$
$$\text{Capsules}_i = \frac{\text{Volume}_i}{2.0} \quad (\text{capsule de tatouage standard \#16 } \approx 2\text{ ml})$$

### 2. Colorimétrie : Kubelka-Munk et CIEDE2000
- **Modèle de Mélange Soustractif** : Utilise les coefficients d'absorption ($K$) et de diffusion ($S$) déduits de l'opacité et de la force tinctoriale du pigment.
- **Solveur de Teinte Cible** : À partir des coordonnées CIE $L^*a^*b^*$, le système optimise par itération pour minimiser $\Delta E_{00}$ selon la formule normalisée ISO/CIE CIEDE2000 :
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Un indice $\Delta E_{00} < 2.0$ garantit une précision perceptuelle imperceptible à l'œil nu.

### 3. Chiffrement Côté Client (Coffre d'Atelier)
Le Coffre d'Atelier fait appel à l'API standard Web Crypto (`window.crypto.subtle`) :
- **Algorithme** : AES-GCM avec clé symétrique de 256 bits.
- **Dérivation de Clé** : PBKDF2 avec SHA-256, 100 000 itérations et sel aléatoire cryptographique de 16 octets.
- **Vecteur d'Initialisation** : Vecteur IV unique de 12 octets généré pour chaque session de chiffrement.

### 4. Température de Couleur et Étalonnage d'Éclairage
Pour neutraliser le métamérisme, l'évaluation visuelle des encres requiert un éclairage d'atelier équilibré entre 5000K et 6500K avec un indice de rendu des couleurs (IRC) supérieur à 95.

### 5. Moteur d'Internationalisation
Prise en charge synchronisée de 673 clés sur les 7 langues (EN, DE, ES, FR, IT, NL, PT) avec actualisation instantanée sans rechargement de page.

---

## 4. Normes Matérielles et Cadre Légal
- **Normes Matérielles (Hardware et Piercing)** : Désignations officielles : ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Annexe XVII.
- **Mention de Marque** : Patrick Poli est le créateur des bijoux de corps BioFlex®. BioFlex est un copolymère statistique PP-R.
- **Protection des données**: Rien de ce que vous saisissez n'est envoyé. Formules, inventaire et notes restent uniquement dans votre navigateur ; effacer les données du site les supprime.
- **Pratique Professionnelle** : La préparation hygiénique des diluants et encres se conforme à la pratique professionnelle établie (established professional practice) et aux recommandations sanitaires.
