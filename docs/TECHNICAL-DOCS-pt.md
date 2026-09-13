# Misturador de Tintas de Tatuagem - Documentação Técnica (Português)

> Especificações de arquitetura, formulações algorítmicas, esquemas de dados e diretrizes de integração para o Misturador de Tintas da Poli International, criador de joalharia corporal BioFlex®.

---

## 1. Visão Geral da Arquitetura
O Misturador de Tintas de Tatuagem é uma aplicação web autônoma executada exclusivamente no navegador do cliente, desenvolvida em conformidade com os padrões abertos HTML5, CSS3 (variáveis CSS) e JavaScript modular ES6+. Funciona sem dependências externas em tempo de execução, dispensando CDNs remotas, fontes externas ou bancos de dados em servidor.

### Política de Segurança de Conteúdo (CSP)
A aplicação adere estritamente à diretiva:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self';
```
Nenhum script remoto, pixel de rastreamento ou fonte externa é carregado. Todas as bibliotecas de terceiros residem localmente em `js/vendor/`.

---

## 2. Estrutura Principal de Arquivos
```
ink-mixer/
├── index.html                  # Interface unificada contendo todos os 12 módulos
├── embed.html                  # Interface compacta para incorporação em iFrames
├── css/
│   ├── style.css               # Folha de estilos principal (variáveis CSS e layout responsivo)
│   └── lang-switcher.css       # Estilo do seletor de idiomas do cabeçalho
├── js/
│   ├── i18n.js                 # Núcleo de tradução (busca, substituição e manipulação DOM)
│   ├── i18n/                   # Dicionários de idiomas (673 chaves sincronizadas em cada)
│   │   ├── en.js, fr.js, de.js, it.js, es.js, nl.js, pt.js
│   ├── ciede2000.js            # Motor matemático de diferença de cor CIEDE2000 (Delta E 00)
│   ├── ink-database.js         # Base de dados calibrada de propriedades dos pigmentos
│   ├── inventory.js            # Gestor de estoque do estúdio com persistência em localStorage
│   ├── formulas.js             # Catálogo de receitas profissionais de referência
│   ├── substitution.js         # Formula ink substitution engine with CIEDE2000 Delta E comparison
│   ├── library.js              # Biblioteca de fórmulas (CRUD, busca, exportação JSON/CSV)
│   ├── mixer.js                # Calculadora de mistura direta e solucionador Kubelka-Munk
│   ├── studio-calibration.js   # Avaliação de temperatura de iluminação (5000K-6500K) e CRI
│   ├── reference-studio.js     # Amostragem em Canvas HTML5 e extração de paletas
│   ├── gradient-caps.js        # Calculador de baterias de batoques em gradiente (3 a 6 copos)
│   ├── diluent-formulator.js   # Formulador de diluentes (água, hamamélis, glicerina)
│   ├── studio-vault.js         # Cofre local criptografado via Web Crypto API AES-GCM 256 bits
│   └── common.js               # Estado do tema, janelas modais e utilitários
├── docs/
│   ├── USER-GUIDE.md           # Índice mestre dos manuais de utilização
│   ├── TECHNICAL-DOCS.md       # Índice mestre das especificações técnicas
│   ├── USER-GUIDE-*.md         # Manuais de utilização por idioma (EN, DE, ES, FR, IT, NL, PT)
│   └── TECHNICAL-DOCS-*.md     # Documentos técnicos por idioma (EN, DE, ES, FR, IT, NL, PT)
├── metadata.json               # Metadados do projeto e declarações de runtime
└── package.json                # Configuração do projeto (Node.js >= 20)
```

---

## 3. Fundamentação Algorítmica

### 1. Relações Volumétricas e Conversão de Unidades
Proporção do componente $P_i$ em relação ao total de partes $P_{tot} = \sum_{j=1}^n P_j$:
$$\text{Volume}_i = V_{tot} \times \frac{P_i}{P_{tot}}$$
$$\text{Gotas}_i = \text{round}\left( \text{Volume}_i \times 20 \right) \quad (\text{fator de gota capilar: } 20\text{ gotas} \approx 1\text{ ml})$$
$$\text{Batoques}_i = \frac{\text{Volume}_i}{2.0} \quad (\text{batoque de tatuagem padrão \#16 } \approx 2\text{ ml})$$

### 2. Ciência das Cores: Kubelka-Munk e CIEDE2000
- **Estimativa de Mistura Subtrativa**: Aplica coeficientes de absorção ($K$) e dispersão ($S$) baseados na opacidade e poder de tingimento.
- **Solucionador de Cor Alvo**: Otimiza iterativamente no espaço de cor CIE $L^*a^*b^*$ visando minimizar a divergência $\Delta E_{00}$ segundo o padrão ISO/CIE CIEDE2000:
$$\Delta E_{00} = \sqrt{\left(\frac{\Delta L'}{k_L S_L}\right)^2 + \left(\frac{\Delta C'}{k_C S_C}\right)^2 + \left(\frac{\Delta H'}{k_H S_H}\right)^2 + R_T \left(\frac{\Delta C'}{k_C S_C}\right)\left(\frac{\Delta H'}{k_H S_H}\right)}$$
Resultados com $\Delta E_{00} < 2.0$ indicam compatibilidade visual de alta fidelidade.

### 3. Criptografia no Cliente (Cofre de Estúdio)
O Cofre do Estúdio emprega a Web Crypto API nativa (`window.crypto.subtle`):
- **Algoritmo**: AES-GCM com chave simétrica de 256 bits.
- **Derivação de Chave**: PBKDF2 com SHA-256, 100.000 iterações e sal aleatório criptográfico de 16 bytes.
- **Vetor de Inicialização**: IV exclusivo de 12 bytes gerado para cada gravação cifrada.

### 4. Temperatura de Cor e Calibração de Luz do Estúdio
A análise precisa de gradientes exige iluminação de estúdio regulada entre 5000K e 6500K com Índice de Reprodução de Cor (CRI) superior a 95 para prevenir falha metamérica.

### 5. Motor de Internacionalização
Paridade estrita de 673 chaves nos sete idiomas suportados (EN, DE, ES, FR, IT, NL, PT), com alternância instantânea em tempo real.

---

## 4. Normas e Exigências Legais
- **Padrões de Materiais para Instrumentos e Piercing**: Designações formais vigentes: ASTM F-136, ASTM F-138, ASTM F-67, ASTM B392, ASTM F754, EN 1811, ISO 10993, EU REACH Anexo XVII.
- **Identidade da Marca**: Patrick Poli é o criador de joalharia corporal BioFlex®. BioFlex é copolímero aleatório PP-R.
- **Proteção de dados**: Nada do que introduz é enviado. Fórmulas, inventário e notas ficam apenas no seu navegador; limpar os dados do site remove-os.
- **Prática Profissional**: O manuseio de diluentes e preparo de tintas segue a prática profissional estabelecida (established professional practice) e as diretrizes sanitárias em vigor.
