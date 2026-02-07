// Ink Color Mixer - Main Logic
// Handles calculations, UI interactions, and tab management

// Session mix history for CSV export
let mixHistory = [];

// Performance: Cache DOM elements
const DOM = {
  colorSelectors: null,
  mixerResults: null,
  resultColorSwatch: null,
  ratioFormula: null,
  measurementsTableBody: null,
  savedFormulasContainer: null,
  formulaCount: null
};

document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements on load
  DOM.colorSelectors = document.getElementById('colorSelectors');
  DOM.mixerResults = document.getElementById('mixerResults');
  DOM.resultColorSwatch = document.getElementById('resultColorSwatch');
  DOM.ratioFormula = document.getElementById('ratioFormula');
  DOM.measurementsTableBody = document.getElementById('measurementsTableBody');
  DOM.savedFormulasContainer = document.getElementById('savedFormulasContainer');
  DOM.formulaCount = document.getElementById('formulaCount');

  initializeMixer();
  initializeTabs();
  initializeLibrary();
  initializeSkinTones();
  initializeGrayWash();
  initializeColorTheory();
});

// ======================
// UTILITY FUNCTIONS
// ======================

// Debounce function for search input (performance optimization)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ======================
// TAB MANAGEMENT
// ======================
function initializeTabs() {
  const tabs = document.querySelectorAll('.ink-mixer__tab');
  const tabContents = document.querySelectorAll('.ink-mixer__tab-content');

  tabs.forEach((tab, index) => {
    // Click event
    tab.addEventListener('click', function() {
      switchTab(this, tabs, tabContents);
    });

    // Keyboard navigation
    tab.addEventListener('keydown', function(e) {
      let newIndex = -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = index + 1;
        if (newIndex >= tabs.length) newIndex = 0;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = index - 1;
        if (newIndex < 0) newIndex = tabs.length - 1;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== -1) {
        tabs[newIndex].focus();
        switchTab(tabs[newIndex], tabs, tabContents);
      }
    });
  });
}

function switchTab(selectedTab, allTabs, allTabContents) {
  const targetTab = selectedTab.dataset.tab;

  // Remove active from all tabs and update ARIA
  allTabs.forEach(t => {
    t.classList.remove('ink-mixer__tab--active');
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });

  allTabContents.forEach(tc => {
    tc.classList.remove('ink-mixer__tab-content--active');
  });

  // Add active to selected tab and update ARIA
  selectedTab.classList.add('ink-mixer__tab--active');
  selectedTab.setAttribute('aria-selected', 'true');
  selectedTab.setAttribute('tabindex', '0');

  const targetContent = document.getElementById('tab-' + targetTab);
  if (targetContent) {
    targetContent.classList.add('ink-mixer__tab-content--active');
  }

  // Refresh library display when switching to library tab
  if (targetTab === 'library') {
    refreshLibraryDisplay();
  }
}

// ======================
// COLOR MIXER
// ======================
let colorRowCount = 2; // Start with 2 color rows

function initializeMixer() {
  const addColorBtn = document.getElementById('addColorBtn');
  const calculateBtn = document.getElementById('calculateMixBtn');
  const saveFormulaBtn = document.getElementById('saveFormulaBtn');
  const downloadMixesBtn = document.getElementById('downloadMixesBtn');

  if (addColorBtn) {
    addColorBtn.addEventListener('click', addColorRow);
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateMix);
  }

  if (saveFormulaBtn) {
    saveFormulaBtn.addEventListener('click', saveCurrentFormula);
  }

  if (downloadMixesBtn) {
    downloadMixesBtn.addEventListener('click', downloadMixesCSV);
  }
}

function addColorRow() {
  const container = DOM.colorSelectors;
  if (!container) return;

  colorRowCount++;

  const row = document.createElement('div');
  row.className = 'ink-mixer__color-row';
  row.innerHTML = `
    <div class="ink-mixer__color-control">
      <label class="ink-mixer__label">Color ${colorRowCount}</label>
      <select class="ink-mixer__select color-select" data-color-index="${colorRowCount - 1}">
        <option value="">Select</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="orange">Orange</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
        <option value="brown">Brown</option>
        <option value="magenta">Magenta</option>
      </select>
    </div>
    <div class="ink-mixer__color-control">
      <label class="ink-mixer__label">Parts</label>
      <input type="number" class="ink-mixer__input parts-input" data-color-index="${colorRowCount - 1}" min="0.1" step="0.1" value="1">
    </div>
    <button class="ink-mixer__btn ink-mixer__btn--small ink-mixer__btn--danger remove-color-btn">×</button>
  `;

  container.appendChild(row);

  // Add remove functionality
  const removeBtn = row.querySelector('.remove-color-btn');
  removeBtn.addEventListener('click', function() {
    row.remove();
    colorRowCount--;
    renumberColorRows();
  });
}

function renumberColorRows() {
  const rows = document.querySelectorAll('#colorSelectors .ink-mixer__color-row');
  rows.forEach((row, index) => {
    const label = row.querySelector('.ink-mixer__label');
    if (label) {
      label.textContent = `Color ${index + 1}`;
    }
    const select = row.querySelector('.color-select');
    const input = row.querySelector('.parts-input');
    if (select) select.dataset.colorIndex = index;
    if (input) input.dataset.colorIndex = index;
  });
  colorRowCount = rows.length;
}

function calculateMix() {
  // Get all selected colors and parts
  const colorSelects = document.querySelectorAll('.color-select');
  const partsInputs = document.querySelectorAll('.parts-input');
  const totalVolumeInput = document.getElementById('totalVolume');
  const volumeUnit = document.getElementById('volumeUnit');

  // Clear any previous errors
  clearMessages();

  const colors = [];
  let totalParts = 0;
  const errors = [];

  colorSelects.forEach((select, index) => {
    const color = select.value;
    const parts = parseFloat(partsInputs[index].value);

    // Validation: Check for color without parts
    if (color && (!parts || parts <= 0)) {
      errors.push(`Color ${index + 1}: Please enter a valid amount (greater than 0)`);
    }

    // Validation: Check for parts without color
    if (!color && parts > 0) {
      errors.push(`Color ${index + 1}: Please select a color`);
    }

    // Validation: Check for negative values
    if (parts < 0) {
      errors.push(`Color ${index + 1}: Amount cannot be negative`);
    }

    if (color && parts > 0) {
      colors.push({ color, parts });
      totalParts += parts;
    }
  });

  // Validation: No colors selected
  if (colors.length === 0) {
    showMessage('Please select at least one color and enter its amount', 'error');
    return;
  }

  // Validation: Show all collected errors
  if (errors.length > 0) {
    showMessage(errors.join('<br>'), 'error');
    return;
  }

  const totalVolume = parseFloat(totalVolumeInput.value);

  // Validation: Total volume
  if (!totalVolume || totalVolume <= 0) {
    showMessage('Please enter a valid total volume (greater than 0)', 'error');
    return;
  }

  if (totalVolume > 100) {
    showMessage('Warning: Large volume specified. Results may require significant ink amounts.', 'info');
  }

  const unit = volumeUnit.value;

  // Calculate measurements for each color
  const measurements = colors.map(c => {
    const proportion = c.parts / totalParts;
    const ml = totalVolume * proportion;
    const drops = Math.round(ml * 20); // 20 drops per ml

    return {
      color: c.color,
      parts: c.parts,
      ml: ml.toFixed(2),
      drops: drops
    };
  });

  // Generate ratio string
  const ratioString = colors.map(c => c.parts).join(':');

  // Estimate resulting color
  const resultingColor = estimateResultingColor(colors);

  // Add to mix history for CSV export
  addToMixHistory(colors, measurements, ratioString, totalVolume, unit, resultingColor);

  // Display results
  displayMixerResults(measurements, ratioString, resultingColor);
}

function displayMixerResults(measurements, ratio, resultingColor) {
  if (!DOM.mixerResults) return;

  // Show results section
  DOM.mixerResults.style.display = 'block';

  // Set color swatch
  if (DOM.resultColorSwatch) {
    DOM.resultColorSwatch.style.backgroundColor = resultingColor;
  }

  // Set ratio
  if (DOM.ratioFormula) {
    DOM.ratioFormula.textContent = `Ratio: ${ratio}`;
  }

  // Populate table (use fragment for better performance)
  if (DOM.measurementsTableBody) {
    const fragment = document.createDocumentFragment();
    measurements.forEach(m => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${m.color.charAt(0).toUpperCase() + m.color.slice(1)}</strong></td>
        <td>${m.ml} ml</td>
        <td>${m.drops} drops</td>
      `;
      fragment.appendChild(row);
    });
    DOM.measurementsTableBody.innerHTML = '';
    DOM.measurementsTableBody.appendChild(fragment);
  }

  // Scroll to results
  DOM.mixerResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ======================
// MIX HISTORY & CSV EXPORT
// ======================

function addToMixHistory(colors, measurements, ratio, totalVolume, unit, resultingColor) {
  const timestamp = new Date();
  const colorNames = colors.map(c => c.color.charAt(0).toUpperCase() + c.color.slice(1)).join(' + ');

  mixHistory.push({
    timestamp: timestamp.toISOString(),
    date: timestamp.toLocaleDateString(),
    time: timestamp.toLocaleTimeString(),
    colorNames: colorNames,
    colors: colors,
    measurements: measurements,
    ratio: ratio,
    totalVolume: totalVolume,
    unit: unit,
    resultingColor: resultingColor
  });

  // Update download button state
  updateDownloadButtonState();
}

function updateDownloadButtonState() {
  const downloadBtn = document.getElementById('downloadMixesBtn');
  if (downloadBtn) {
    if (mixHistory.length > 0) {
      downloadBtn.disabled = false;
      downloadBtn.textContent = `📥 Download All Mixes (${mixHistory.length})`;
    } else {
      downloadBtn.disabled = true;
      downloadBtn.textContent = '📥 Download All Mixes';
    }
  }
}

function downloadMixesCSV() {
  if (mixHistory.length === 0) {
    showMessage('No mixes to download yet. Calculate some formulas first!', 'info');
    return;
  }

  // Build CSV content
  let csv = 'Date,Time,Colors,Ratio,Total Volume,';

  // Find max number of color columns needed
  let maxColors = 0;
  mixHistory.forEach(mix => {
    if (mix.colors.length > maxColors) {
      maxColors = mix.colors.length;
    }
  });

  // Add headers for each color (Color, Parts, ML, Drops)
  for (let i = 1; i <= maxColors; i++) {
    csv += `Color ${i},Parts ${i},ML ${i},Drops ${i},`;
  }
  csv += 'Resulting Color,View Color Online\n';

  // Add data rows
  mixHistory.forEach(mix => {
    // Basic info
    csv += `"${mix.date}","${mix.time}","${mix.colorNames}","${mix.ratio}","${mix.totalVolume} ${mix.unit}",`;

    // Color measurements
    mix.measurements.forEach((m, index) => {
      csv += `"${m.color.charAt(0).toUpperCase() + m.color.slice(1)}",${m.parts},${m.ml},${m.drops},`;
    });

    // Fill empty columns if this mix has fewer colors than max
    for (let i = mix.measurements.length; i < maxColors; i++) {
      csv += ',,,,';
    }

    // Resulting color and clickable link to view it online
    const hexWithoutHash = mix.resultingColor.replace('#', '');
    const colorViewerUrl = `https://www.color-hex.com/color/${hexWithoutHash}`;
    csv += `"${mix.resultingColor}","${colorViewerUrl}"\n`;
  });

  // Create and download file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  const date = new Date().toISOString().split('T')[0];
  link.download = `ink-mixes-${date}.csv`;

  link.click();
  URL.revokeObjectURL(url);

  showMessage(`Successfully downloaded ${mixHistory.length} mix formula(s) to CSV!`, 'success');
}

function saveCurrentFormula() {
  const colorSelects = document.querySelectorAll('.color-select');
  const partsInputs = document.querySelectorAll('.parts-input');
  const totalVolumeInput = document.getElementById('totalVolume');
  const volumeUnit = document.getElementById('volumeUnit');

  const colors = [];
  let totalParts = 0;

  colorSelects.forEach((select, index) => {
    const color = select.value;
    const parts = parseFloat(partsInputs[index].value) || 0;

    if (color && parts > 0) {
      colors.push({ color, parts });
      totalParts += parts;
    }
  });

  if (colors.length === 0) {
    showMessage('Please create a formula first by selecting colors and calculating', 'error');
    return;
  }

  const name = prompt('Enter a name for this formula:');
  if (!name) return;

  // Validate formula name
  if (name.trim().length === 0) {
    showMessage('Formula name cannot be empty', 'error');
    return;
  }

  if (name.length > 50) {
    showMessage('Formula name is too long (max 50 characters)', 'error');
    return;
  }

  const notes = prompt('Add notes (optional):') || '';

  const ratio = colors.map(c => c.parts).join(':');
  const resultingColor = estimateResultingColor(colors);

  const formulaData = {
    name: name.trim(),
    colors,
    ratio,
    totalVolume: parseFloat(totalVolumeInput.value) || 5,
    unit: volumeUnit.value,
    resultingColor,
    category: 'custom',
    notes: notes.trim(),
    tags: []
  };

  try {
    FormulaLibrary.save(formulaData);
    showMessage(`Formula "${name}" saved successfully!`, 'success');
  } catch (error) {
    showMessage(`Error saving formula: ${error.message}`, 'error');
  }
}

// ======================
// FORMULA LIBRARY
// ======================
function initializeLibrary() {
  const searchInput = document.getElementById('librarySearchInput');
  const exportBtn = document.getElementById('exportFormulasBtn');
  const importBtn = document.getElementById('importFormulasBtn');
  const importFileInput = document.getElementById('importFileInput');

  if (searchInput) {
    // Debounce search for better performance (300ms delay)
    const debouncedSearch = debounce(function(query) {
      const results = FormulaLibrary.search(query);
      displaySearchResults(results);
    }, 300);

    searchInput.addEventListener('input', function() {
      debouncedSearch(this.value);
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      FormulaLibrary.exportToJSON();
    });
  }

  if (importBtn && importFileInput) {
    importBtn.addEventListener('click', function() {
      importFileInput.click();
    });

    importFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        const result = FormulaLibrary.importFromJSON(event.target.result);
        if (result.success) {
          alert(`Successfully imported ${result.count} formula(s)!`);
          refreshLibraryDisplay();
        } else {
          alert(`Import failed: ${result.error}`);
        }
      };
      reader.readAsText(file);
    });
  }

  // Load common formulas buttons
  initializeCommonFormulas();
}

function initializeCommonFormulas() {
  const commonFormulasList = document.getElementById('commonFormulasList');
  if (!commonFormulasList) return;

  commonFormulasList.innerHTML = '';

  // Add all formula categories
  const categories = [
    { key: 'skin_tones', label: 'Skin Tones' },
    { key: 'portrait', label: 'Portrait Details' },
    { key: 'grays', label: 'Grays & Neutrals' },
    { key: 'landscape', label: 'Landscape' },
    { key: 'vibrant', label: 'Vibrant Colors' }
  ];

  categories.forEach(category => {
    const formulas = commonFormulas[category.key];
    if (!formulas) return;

    // Add category header
    const header = document.createElement('h4');
    header.className = 'ink-mixer__formula-category-header';
    header.textContent = category.label;
    commonFormulasList.appendChild(header);

    // Add formulas in this category
    Object.keys(formulas).forEach(key => {
      const formula = formulas[key];
      const btn = createCommonFormulaButton(formula, category.key);
      commonFormulasList.appendChild(btn);
    });
  });
}

function createCommonFormulaButton(formula, category) {
  const btn = document.createElement('button');
  btn.className = 'ink-mixer__common-formula-btn';
  btn.textContent = formula.name;
  btn.title = formula.description;
  btn.addEventListener('click', function() {
    loadCommonFormula(formula);
  });
  return btn;
}

function loadCommonFormula(formula) {
  const formulaObj = {
    name: formula.name,
    colors: formula.formula,
    ratio: formula.ratio,
    totalVolume: 5,
    unit: 'ml',
    resultingColor: estimateResultingColor(formula.formula),
    category: 'common',
    notes: formula.notes || formula.description
  };

  loadFormulaToMixer(formulaObj);
}

function displaySearchResults(results) {
  const container = document.getElementById('savedFormulasContainer');
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = '<p class="ink-mixer__empty-state">No formulas found</p>';
    return;
  }

  container.innerHTML = '';
  results.forEach(formula => {
    const card = renderFormulaCard(formula);
    container.appendChild(card);
  });
}

// ======================
// SKIN TONE MIXER
// ======================
function initializeSkinTones() {
  const categorySelect = document.getElementById('skinToneCategory');
  const volumeInput = document.getElementById('skinVolume');
  const generateBtn = document.getElementById('generateSkinToneBtn');

  if (generateBtn) {
    generateBtn.addEventListener('click', function() {
      const category = categorySelect.value;
      const volume = parseFloat(volumeInput.value) || 5;

      if (!category) {
        alert('Please select a skin tone');
        return;
      }

      const formula = commonFormulas.skin_tones[category];
      if (!formula) {
        alert('Formula not found');
        return;
      }

      displaySkinToneResults(formula, volume);
    });
  }
}

function displaySkinToneResults(formula, totalVolume) {
  const resultsDiv = document.getElementById('skinToneResults');
  if (!resultsDiv) return;

  let totalParts = 0;
  formula.formula.forEach(c => totalParts += c.parts);

  const measurements = formula.formula.map(c => {
    const proportion = c.parts / totalParts;
    const ml = totalVolume * proportion;
    const drops = Math.round(ml * 20);

    return {
      color: c.color,
      parts: c.parts,
      ml: ml.toFixed(2),
      drops: drops
    };
  });

  const resultingColor = estimateResultingColor(formula.formula);

  let html = `
    <div class="ink-mixer__results-card">
      <h3>${formula.name}</h3>
      <div class="ink-mixer__swatch" style="background-color: ${resultingColor};"></div>
      <p class="ink-mixer__ratio-formula">Ratio: ${formula.ratio}</p>
      <p class="ink-mixer__description">${formula.description}</p>
      ${formula.notes ? `<p class="ink-mixer__notes"><em>${formula.notes}</em></p>` : ''}

      <table class="ink-mixer__table">
        <thead>
          <tr>
            <th>Color</th>
            <th>Parts</th>
            <th>ml</th>
            <th>Drops</th>
          </tr>
        </thead>
        <tbody>
  `;

  measurements.forEach(m => {
    html += `
      <tr>
        <td><strong>${m.color.charAt(0).toUpperCase() + m.color.slice(1)}</strong></td>
        <td>${m.parts}</td>
        <td>${m.ml} ml</td>
        <td>${m.drops} drops</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  resultsDiv.innerHTML = html;
  resultsDiv.style.display = 'block';
}

// ======================
// GRAY WASH
// ======================
function initializeGrayWash() {
  const slider = document.getElementById('grayPercentage');
  const sliderValue = document.getElementById('grayPercentageValue');
  const volumeInput = document.getElementById('grayVolume');
  const calculateBtn = document.getElementById('calculateGrayBtn');

  if (slider && sliderValue) {
    slider.addEventListener('input', function() {
      sliderValue.textContent = this.value + '%';
    });
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      const percentage = parseInt(slider.value);
      const volume = parseFloat(volumeInput.value) || 10;

      calculateGrayWash(percentage, volume);
    });
  }
}

function calculateGrayWash(percentage, totalVolume) {
  // percentage = amount of black in the mix
  // 50% = 1:1 black:white
  // 10% = 1:9 black:white
  // 70% = 7:3 black:white

  const blackProportion = percentage / 100;
  const whiteProportion = 1 - blackProportion;

  const blackMl = (totalVolume * blackProportion).toFixed(2);
  const whiteMl = (totalVolume * whiteProportion).toFixed(2);
  const blackDrops = Math.round(blackMl * 20);
  const whiteDrops = Math.round(whiteMl * 20);

  // Calculate hex color
  const grayValue = Math.round(255 * (1 - blackProportion));
  const hexColor = rgbToHex(grayValue, grayValue, grayValue);

  displayGrayWashResults(percentage, blackMl, whiteMl, blackDrops, whiteDrops, hexColor, totalVolume);
}

function displayGrayWashResults(percentage, blackMl, whiteMl, blackDrops, whiteDrops, hexColor, totalVolume) {
  const resultsDiv = document.getElementById('grayWashResults');
  if (!resultsDiv) return;

  let html = `
    <div class="ink-mixer__results-card">
      <h3>${percentage}% Gray Wash</h3>
      <div class="ink-mixer__swatch" style="background-color: ${hexColor};"></div>

      <table class="ink-mixer__table">
        <thead>
          <tr>
            <th>Color</th>
            <th>ml</th>
            <th>Drops</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Black</strong></td>
            <td>${blackMl} ml</td>
            <td>${blackDrops} drops</td>
          </tr>
          <tr>
            <td><strong>White</strong></td>
            <td>${whiteMl} ml</td>
            <td>${whiteDrops} drops</td>
          </tr>
          <tr class="ink-mixer__table-total">
            <td><strong>Total</strong></td>
            <td>${totalVolume} ml</td>
            <td>${blackDrops + whiteDrops} drops</td>
          </tr>
        </tbody>
      </table>

      <div class="ink-mixer__shade-ladder">
        <h4>Shade Ladder (10ml each)</h4>
        <div class="ink-mixer__shade-ladder-grid">
  `;

  // Generate shade ladder: 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%
  const shades = [10, 20, 30, 40, 50, 60, 70, 80];
  shades.forEach(shade => {
    const blackFor10ml = (10 * shade / 100).toFixed(1);
    const whiteFor10ml = (10 * (100 - shade) / 100).toFixed(1);
    const shadeGray = Math.round(255 * (1 - shade / 100));
    const shadeHex = rgbToHex(shadeGray, shadeGray, shadeGray);

    html += `
      <div class="ink-mixer__shade-card">
        <div class="ink-mixer__swatch ink-mixer__swatch--small" style="background-color: ${shadeHex};"></div>
        <p class="ink-mixer__shade-percentage">${shade}%</p>
        <p class="ink-mixer__shade-formula">${blackFor10ml}ml B + ${whiteFor10ml}ml W</p>
      </div>
    `;
  });

  html += `
        </div>
      </div>
    </div>
  `;

  resultsDiv.innerHTML = html;
  resultsDiv.style.display = 'block';
}

// ======================
// COLOR THEORY
// ======================
function initializeColorTheory() {
  // Load color mixing combinations from database
  const theoryContent = document.getElementById('colorTheoryContent');
  if (!theoryContent) return;

  let html = `
    <div class="ink-mixer__theory-grid">
      <div class="ink-mixer__theory-card">
        <h3>🎨 Primary Colors</h3>
        <p><strong>Red, Yellow, Blue</strong></p>
        <p>Cannot be created by mixing other colors. Foundation of all color mixing.</p>
        <ul>
          <li><strong>Red:</strong> Warm, strong tinting power</li>
          <li><strong>Yellow:</strong> Weak tinting power - use 2-3x more</li>
          <li><strong>Blue:</strong> VERY strong - start with 1/4 what you think</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🌈 Secondary Colors</h3>
        <p>Created by mixing two primary colors:</p>
        <ul>
          <li><strong>Orange:</strong> Red + Yellow (1:1)</li>
          <li><strong>Green:</strong> Blue + Yellow (1:2 - more yellow)</li>
          <li><strong>Purple:</strong> Blue + Red (2:1 - more blue)</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>⚫⚪ Neutrals & Grays</h3>
        <p><strong>Black + White</strong> creates neutral grays.</p>
        <p><strong>Warm Gray:</strong> Add tiny amounts of yellow/red</p>
        <p><strong>Cool Gray:</strong> Add tiny amounts of blue</p>
        <p><em>Tip: Start with 10% black, add more gradually</em></p>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🎭 Complementary Colors</h3>
        <p>Opposite on color wheel - neutralize each other:</p>
        <ul>
          <li>Red + Green = Brown/Neutral</li>
          <li>Blue + Orange = Gray-Brown</li>
          <li>Yellow + Purple = Gray-Brown</li>
        </ul>
        <p><em>Use to mute/desaturate colors</em></p>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>👤 Skin Tone Basics</h3>
        <p>All skin tones are variations of:</p>
        <p><strong>White + Yellow + Red + (Brown/Blue)</strong></p>
        <ul>
          <li>More yellow = warmer undertone</li>
          <li>More red = rosier/ruddier</li>
          <li>Tiny blue = cooler undertone</li>
          <li>Brown/black = darker skin</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>⚠️ Common Mistakes</h3>
        <ul>
          <li><strong>Too much blue:</strong> Overpowers everything - use sparingly!</li>
          <li><strong>Too little yellow:</strong> Yellow is weak - use more than you think</li>
          <li><strong>Adding black too fast:</strong> Start with 5-10%, add gradually</li>
          <li><strong>Not testing first:</strong> Always test small batches</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li>Mix small test batches first (1-2ml)</li>
          <li>Write down every formula you create</li>
          <li>Consider ink brand differences in opacity</li>
          <li>Warm colors advance, cool colors recede</li>
          <li>Use gray wash for smooth gradients</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>📏 Measurement Conversions</h3>
        <p><strong>Standard: 20 drops = 1ml</strong></p>
        <ul>
          <li>1 cap ≈ 1ml (brand dependent)</li>
          <li>5ml = 100 drops = ~5 caps</li>
          <li>10ml = 200 drops = ~10 caps</li>
        </ul>
        <p><em>Note: Varies slightly by ink brand</em></p>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🔬 Advanced Mixing Techniques</h3>
        <ul>
          <li><strong>Layering:</strong> Build depth by applying colors in layers</li>
          <li><strong>Glazing:</strong> Thin transparent layers over opaque base</li>
          <li><strong>Scumbling:</strong> Light color over dark for texture</li>
          <li><strong>Optical mixing:</strong> Dots of pure color blend visually</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🌡️ Temperature & Mood</h3>
        <p><strong>Warm Colors:</strong> Red, Orange, Yellow</p>
        <ul>
          <li>Advance visually (appear closer)</li>
          <li>Energetic, passionate, aggressive mood</li>
          <li>Use for focal points and highlights</li>
        </ul>
        <p><strong>Cool Colors:</strong> Blue, Green, Purple</p>
        <ul>
          <li>Recede visually (appear farther)</li>
          <li>Calm, peaceful, serene mood</li>
          <li>Use for backgrounds and shadows</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🎨 Saturation Control</h3>
        <p><strong>To Desaturate (mute) Colors:</strong></p>
        <ul>
          <li>Add complementary color (opposite on wheel)</li>
          <li>Add small amount of gray</li>
          <li>Mix with brown for warm desaturation</li>
        </ul>
        <p><strong>To Saturate (intensify):</strong></p>
        <ul>
          <li>Use pure pigments without white/black</li>
          <li>Layer transparent colors</li>
          <li>Add complementary's neighbor for vibrance</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🧪 Color Bias Understanding</h3>
        <p>All "primary" inks lean warm or cool:</p>
        <ul>
          <li><strong>Warm Red:</strong> Leans orange (best for skin)</li>
          <li><strong>Cool Red:</strong> Leans purple (best for purples)</li>
          <li><strong>Warm Yellow:</strong> Leans orange (best for oranges)</li>
          <li><strong>Cool Yellow:</strong> Leans green (best for greens)</li>
          <li><strong>Warm Blue:</strong> Leans purple (ultramarine)</li>
          <li><strong>Cool Blue:</strong> Leans green (phthalocyan blue)</li>
        </ul>
        <p><em>Choose ink bias based on desired secondary color</em></p>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>🔍 Troubleshooting Muddy Colors</h3>
        <p><strong>Color looks muddy/dull?</strong></p>
        <ul>
          <li>Too many colors mixed together (limit to 3-4)</li>
          <li>Using opposite temperature biases</li>
          <li>Too much black added too quickly</li>
          <li>Over-mixing complementary colors</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Start fresh with fewer colors</li>
          <li>Use gray wash instead of pure black</li>
          <li>Match color biases (warm + warm, cool + cool)</li>
          <li>Test small batches before committing</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>💎 Creating Realistic Depth</h3>
        <p><strong>3-Value System:</strong></p>
        <ul>
          <li><strong>Base color:</strong> Mid-tone foundation</li>
          <li><strong>Shadow:</strong> Base + purple/blue + brown</li>
          <li><strong>Highlight:</strong> Base + yellow + white</li>
        </ul>
        <p><strong>5-Value System (Advanced):</strong></p>
        <ul>
          <li>Core shadow (darkest)</li>
          <li>Form shadow</li>
          <li>Mid-tone</li>
          <li>Highlight</li>
          <li>Specular highlight (lightest)</li>
        </ul>
      </div>

      <div class="ink-mixer__theory-card">
        <h3>⚡ Quick Reference Cheat Sheet</h3>
        <table class="ink-mixer__cheat-table">
          <tr><th>To Make...</th><th>Mix...</th></tr>
          <tr><td>Warmer</td><td>+ Yellow or Red</td></tr>
          <tr><td>Cooler</td><td>+ Blue or Purple</td></tr>
          <tr><td>Darker</td><td>+ Black (sparingly) or Complement</td></tr>
          <tr><td>Lighter</td><td>+ White (creates tint)</td></tr>
          <tr><td>Less Intense</td><td>+ Gray or Complement</td></tr>
          <tr><td>More Vibrant</td><td>Use pure colors, no white/black</td></tr>
          <tr><td>Brown</td><td>Red + Yellow + Blue OR Red + Green</td></tr>
          <tr><td>Peach</td><td>Orange + White</td></tr>
          <tr><td>Olive</td><td>Yellow + Black + touch Green</td></tr>
        </table>
      </div>
    </div>
  `;

  theoryContent.innerHTML = html;
}

// ======================
// ERROR HANDLING & VALIDATION
// ======================

// Show message to user
function showMessage(message, type = 'info') {
  const container = document.querySelector('.ink-mixer__tab-content--active .ink-mixer__section');
  if (!container) return;

  // Remove any existing messages
  clearMessages();

  const messageDiv = document.createElement('div');
  messageDiv.className = `ink-mixer__message ink-mixer__message--${type}`;
  messageDiv.innerHTML = message;
  messageDiv.setAttribute('role', 'alert');

  container.insertBefore(messageDiv, container.firstChild);

  // Auto-dismiss info messages after 5 seconds
  if (type === 'info') {
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Clear all messages
function clearMessages() {
  const messages = document.querySelectorAll('.ink-mixer__message');
  messages.forEach(msg => msg.remove());
}
