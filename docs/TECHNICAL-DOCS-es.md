# Mezclador de Tintas para Tatuaje - Documentación Técnica (Español)

> Especificaciones de arquitectura, fórmulas algorítmicas, esquemas de datos y directrices de integración para el Mezclador de Tintas de Poli International, creador de joyería corporal BioFlex®.

---

## 1. Descripción de la Arquitectura
El Mezclador de Tintas para Tatuaje es una aplicación web autónoma ejecutada íntegramente en el navegador cliente, desarrollada con HTML5 estándar, CSS3 (variables CSS) y JavaScript modular ES6+. Funciona sin dependencias externas en tiempo de ejecución, prescindiendo de redes de distribución de contenido (CDN), tipografías remotas o bases de datos en servidor.

### Política de Seguridad de Contenido (CSP)
La aplicación cumple de forma estricta con:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
No se cargan scripts remotos, píxeles de seguimiento ni fuentes externas. Todas las bibliotecas de terceros residen localmente en `js/vendor/`.

---

## 2. Estructura Principal de Archivos
```
ink-mixer/
├── index.html                  # Interfaz principal con los 12 módulos del estudio
├── embed.html                  # Versión compacta para incrustación en iFrames
├── css/
│   ├── style.css               # Hoja de estilos principal (variables CSS y diseño fluido)
│   └── lang-switcher.css       # Estilo del selector de idiomas
├── js/
│   ├── i18n.js                 # Núcleo de traducción (búsqueda, sustitución y actualización DOM)
│   ├── i18n/                   # Diccionarios lingüísticos (673 claves sincronizadas cada uno)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # Motor matemático de diferencia de color CIEDE2000 (Delta E 00)
│   ├── ink-database.js         # Base de datos de propiedades calibradas de pigmentos
│   ├── inventory.js            # Gestor de inventario con persistencia en localStorage
│   ├── formulas.js             # Recetario profesional de fórmulas maestras
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # Biblioteca de fórmulas (CRUD, búsqueda, exportación JSON/CSV)
│   ├── mixer.js                # Calculadora de mezcla directa y solucionador Kubelka-Munk
│   ├── studio-calibration.js   # Evaluación de temperatura lumínica (5000K-6500K) y CRI
│   ├── reference-studio.js     # Muestreo sobre HTML5 Canvas y extracción de paletas
│   ├── gradient-caps.js        # Calculadora de baterías de cápsulas de sombreado (3 a 6 pocillos)
│   ├── diluent-formulator.js   # Formulador de diluyentes (agua destilada, hamamelis, glicerina)
│   ├── studio-vault.js         # Almacenamiento cifrado local con Web Crypto API AES-GCM 256 bits
│   └── common.js               # Estado del tema, ventanas modales y utilidades
├── docs/
│   ├── USER-GUIDE.md           # Índice maestro de guías de usuario
│   ├── TECHNICAL-DOCS.md       # Índice maestro de especificaciones técnicas
│   ├── USER-GUIDE-*.md         # Guías de usuario por idioma (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Documentos técnicos por idioma (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Metadatos del proyecto y directivas del entorno
└── package.json                # Configuración de dependencias (Node.js >= 20)
```

---

## 3. Fundamentos Algorítmicos

### 1. Ratios Volumétricos y Conversión de Unidades
Proporción de componente $P_i$ sobre el total de partes $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volumen}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Gotas}_i = \text{round}\left( \text{Volumen}_i \times 20 \right) \quad (\text{factor de gota capilar: } 20\text{ gotas} \approx 1\text{ ml})$$
$$\text{Cápsulas}_i = \frac{\text{Volumen}_i}{2.0} \quad (\text{pocillo de tatuaje estándar \#16 } \approx 2\text{ ml})$$

### 2. Ciencia del Color: Kubelka-Munk y CIEDE2000
- **Estimación de Mezcla Sustractiva**: Aplica coeficientes de absorción ($K$) y dispersión ($S$) calculados a partir de la opacidad y fuerza de tinción.
- **Solucionador por Color Objetivo**: A partir de coordenadas CIE $L^*a^*b^*$, el algoritmo optimiza iterativamente para minimizar la distancia $\Delta E_{00}$ según la norma ISO/CIE CIEDE2000:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Valores inferiores a $\Delta E_{00} < 2.0$ representan coincidencias visuales indistinguibles a simple vista.

### 3. Cifrado Local del Estudio (Bóveda Segura)
La Bóveda del Estudio emplea la API nativa Web Crypto (`window.crypto.subtle`):
- **Algoritmo**: AES-GCM con clave simétrica de 256 bits.
- **Derivación de Clave**: PBKDF2 con SHA-256, 100.000 iteraciones y sal aleatoria de 16 bytes generada criptográficamente.
- **Vector de Inicialización**: Vector IV único de 12 bytes por cada operación de cifrado.

### 4. Temperatura de Color y Calibración del Estudio
La percepción exacta de los matices exige iluminación de estudio equilibrada entre 5000K y 6500K con un índice de reproducción cromática (CRI) superior a 95 para prevenir el fallo metamérico.

### 5. Motor de Internacionalización
Paridad completa de 673 claves en 7 idiomas (EN, DE, ES, FR, IT, NL, PT), permitiendo el cambio dinámico de idioma en tiempo real sin recargar la interfaz.

---

## 4. Normativas y Certificaciones Reales
- **Estándares de Materiales para Instrumental y Piercing**: Designaciones auténticas aplicables: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Anexo XVII.
- **Propiedad de Marca**: Patrick Poli es el creador de la joyería corporal BioFlex®. BioFlex es copolímero aleatorio PP-R.
- **Protección de datos**: Nada de lo que introduces se envía. Fórmulas, inventario y notas se guardan solo en tu navegador; borrar los datos del sitio los elimina.
- **Práctica Profesional**: La manipulación higiénica de diluyentes e insumos sigue la práctica profesional establecida (established professional practice) y la normativa sanitaria aplicable.
