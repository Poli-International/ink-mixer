// Formula Library System
// LocalStorage-based save/load/search for user's custom formulas

const FormulaLibrary = {
  STORAGE_KEY: 'ink_mixer_formulas',

  // Generate unique ID for each formula
  generateId() {
    return 'formula_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Save a new formula
  save(formulaData) {
    const formulas = this.getAll();
    const newFormula = {
      id: this.generateId(),
      name: formulaData.name || 'Untitled Formula',
      colors: formulaData.colors || [], // [{color: 'red', parts: 2}, ...]
      ratio: formulaData.ratio || '',
      totalVolume: formulaData.totalVolume || 5,
      unit: formulaData.unit || 'ml',
      resultingColor: formulaData.resultingColor || '#808080',
      category: formulaData.category || 'custom',
      notes: formulaData.notes || '',
      tags: formulaData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    formulas.push(newFormula);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formulas));
    return newFormula;
  },

  // Get all formulas
  getAll() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing formulas:', e);
      return [];
    }
  },

  // Get formula by ID
  getById(id) {
    const formulas = this.getAll();
    return formulas.find(f => f.id === id) || null;
  },

  // Update existing formula
  update(id, updatedData) {
    const formulas = this.getAll();
    const index = formulas.findIndex(f => f.id === id);

    if (index === -1) return null;

    formulas[index] = {
      ...formulas[index],
      ...updatedData,
      id: id, // preserve original ID
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formulas));
    return formulas[index];
  },

  // Delete formula
  delete(id) {
    const formulas = this.getAll();
    const filtered = formulas.filter(f => f.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    return filtered.length < formulas.length; // true if something was deleted
  },

  // Search formulas by name, tags, or notes
  search(query) {
    if (!query) return this.getAll();

    const formulas = this.getAll();
    const lowerQuery = query.toLowerCase();

    return formulas.filter(f => {
      // Search in name
      if (f.name && f.name.toLowerCase().includes(lowerQuery)) return true;

      // Search in notes
      if (f.notes && f.notes.toLowerCase().includes(lowerQuery)) return true;

      // Search in tags
      if (f.tags && f.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;

      // Search in category
      if (f.category && f.category.toLowerCase().includes(lowerQuery)) return true;

      return false;
    });
  },

  // Filter by category
  filterByCategory(category) {
    const formulas = this.getAll();
    return formulas.filter(f => f.category === category);
  },

  // Export all formulas as JSON
  exportToJSON() {
    const formulas = this.getAll();
    const dataStr = JSON.stringify(formulas, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'ink-formulas-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();

    URL.revokeObjectURL(url);
  },

  // Import formulas from JSON file
  importFromJSON(fileContent) {
    try {
      const imported = JSON.parse(fileContent);

      if (!Array.isArray(imported)) {
        throw new Error('Invalid format: expected array of formulas');
      }

      const existing = this.getAll();

      // Add imported formulas with new IDs to prevent conflicts
      const newFormulas = imported.map(formula => ({
        ...formula,
        id: this.generateId(), // generate new ID
        createdAt: formula.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      const combined = [...existing, ...newFormulas];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(combined));

      return {
        success: true,
        count: newFormulas.length
      };
    } catch (e) {
      console.error('Import error:', e);
      return {
        success: false,
        error: e.message
      };
    }
  },

  // Clear all formulas (with confirmation in UI)
  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // Get statistics
  getStats() {
    const formulas = this.getAll();
    const categories = {};

    formulas.forEach(f => {
      const cat = f.category || 'uncategorized';
      categories[cat] = (categories[cat] || 0) + 1;
    });

    return {
      total: formulas.length,
      categories: categories,
      oldest: formulas.length > 0 ? formulas[0].createdAt : null,
      newest: formulas.length > 0 ? formulas[formulas.length - 1].createdAt : null
    };
  }
};

// Render formula card for library display
function renderFormulaCard(formula) {
  const card = document.createElement('div');
  card.className = 'ink-mixer__formula-card';
  card.dataset.formulaId = formula.id;

  // Color swatch
  const swatch = document.createElement('div');
  swatch.className = 'ink-mixer__swatch ink-mixer__swatch--small';
  swatch.style.backgroundColor = formula.resultingColor || '#808080';

  // Formula details
  const details = document.createElement('div');
  details.className = 'ink-mixer__formula-details';

  const name = document.createElement('h4');
  name.className = 'ink-mixer__formula-name';
  name.textContent = formula.name;

  const ratio = document.createElement('p');
  ratio.className = 'ink-mixer__formula-ratio';
  ratio.textContent = formula.ratio || 'Custom Mix';

  const colors = document.createElement('p');
  colors.className = 'ink-mixer__formula-colors';
  const colorNames = formula.colors.map(c => c.color).join(', ');
  colors.textContent = colorNames || 'No colors';

  details.appendChild(name);
  details.appendChild(ratio);
  details.appendChild(colors);

  if (formula.notes) {
    const notes = document.createElement('p');
    notes.className = 'ink-mixer__formula-notes';
    notes.textContent = formula.notes;
    details.appendChild(notes);
  }

  // Action buttons
  const actions = document.createElement('div');
  actions.className = 'ink-mixer__formula-actions';

  const loadBtn = document.createElement('button');
  loadBtn.className = 'ink-mixer__btn ink-mixer__btn--small';
  loadBtn.textContent = 'Load';
  loadBtn.onclick = () => loadFormulaToMixer(formula);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'ink-mixer__btn ink-mixer__btn--small ink-mixer__btn--danger';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteFormula(formula.id);

  actions.appendChild(loadBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(swatch);
  card.appendChild(details);
  card.appendChild(actions);

  return card;
}

// Load formula into mixer
function loadFormulaToMixer(formula) {
  // Switch to mixer tab
  const mixerTab = document.querySelector('[data-tab="mixer"]');
  if (mixerTab) mixerTab.click();

  // Clear existing colors
  const colorSelectors = document.getElementById('colorSelectors');
  colorSelectors.innerHTML = '';

  // Add each color from formula
  formula.colors.forEach((colorData, index) => {
    if (index > 0) {
      addColorRow();
    }

    const selects = document.querySelectorAll('.color-select');
    const partsInputs = document.querySelectorAll('.parts-input');

    if (selects[index]) selects[index].value = colorData.color;
    if (partsInputs[index]) partsInputs[index].value = colorData.parts;
  });

  // Set total volume
  const volumeInput = document.getElementById('totalVolume');
  if (volumeInput) volumeInput.value = formula.totalVolume || 5;

  const volumeUnit = document.getElementById('volumeUnit');
  if (volumeUnit) volumeUnit.value = formula.unit || 'ml';

  // Auto-calculate
  const calculateBtn = document.getElementById('calculateMixBtn');
  if (calculateBtn) calculateBtn.click();
}

// Delete formula with confirmation
function deleteFormula(id) {
  const formula = FormulaLibrary.getById(id);
  if (!formula) return;

  if (confirm(`Delete formula "${formula.name}"?`)) {
    FormulaLibrary.delete(id);
    refreshLibraryDisplay();
  }
}

// Refresh library display
function refreshLibraryDisplay() {
  const container = document.getElementById('savedFormulasContainer');
  if (!container) return;

  const formulas = FormulaLibrary.getAll();

  if (formulas.length === 0) {
    container.innerHTML = '<p class="ink-mixer__empty-state">No saved formulas yet. Create a mix and save it!</p>';
    return;
  }

  // Use DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  formulas.forEach(formula => {
    const card = renderFormulaCard(formula);
    fragment.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(fragment);

  // Update count
  const countElement = document.getElementById('formulaCount');
  if (countElement) {
    countElement.textContent = `${formulas.length} saved formula${formulas.length !== 1 ? 's' : ''}`;
  }
}
