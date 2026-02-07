// Comprehensive Ink Color Database
// Each color includes mixing properties, tinting strength, and professional notes

const inkColorDatabase = {
  // PRIMARY COLORS
  black: {
    name: 'Black',
    category: 'neutral',
    hex: '#000000',
    rgb: {r: 0, g: 0, b: 0},
    properties: {
      opacity: 'very_high',
      tinting_strength: 'very_strong',
      typical_use: 'Outlines, shading base, grays',
      mixing_note: 'Extremely strong - add in tiny amounts to colors'
    },
    mixing_behavior: {
      with_white: 'Creates grays - neutral tones',
      with_colors: 'Darkens and mutes colors significantly',
      caution: 'Overpowers easily - use sparingly in mixes'
    },
    drops_per_ml: 20
  },

  white: {
    name: 'White',
    category: 'neutral',
    hex: '#FFFFFF',
    rgb: {r: 255, g: 255, b: 255},
    properties: {
      opacity: 'high',
      tinting_strength: 'strong',
      typical_use: 'Lightening colors, highlights, mixing pastels',
      mixing_note: 'Lightens and desaturates - creates tints'
    },
    mixing_behavior: {
      with_black: 'Creates grays',
      with_colors: 'Creates pastels and tints - lightens',
      with_primaries: 'Makes pastel versions',
      caution: 'Can look chalky if overused - use judiciously'
    },
    drops_per_ml: 20
  },

  red: {
    name: 'Red',
    category: 'primary',
    hex: '#FF0000',
    rgb: {r: 255, g: 0, b: 0},
    properties: {
      opacity: 'medium_high',
      tinting_strength: 'strong',
      typical_use: 'Primary color, skin tones, mixing oranges/purples',
      mixing_note: 'Warm color, strong in mixes'
    },
    mixing_combinations: {
      plus_yellow: 'Creates oranges (warm)',
      plus_blue: 'Creates purples/violets',
      plus_white: 'Creates pinks',
      plus_black: 'Creates burgundy/maroon (dark red)'
    },
    drops_per_ml: 20
  },

  yellow: {
    name: 'Yellow',
    category: 'primary',
    hex: '#FFFF00',
    rgb: {r: 255, g: 255, b: 0},
    properties: {
      opacity: 'low',
      tinting_strength: 'weak',
      typical_use: 'Brightening, gold tones, mixing greens/oranges',
      mixing_note: 'Least opaque - requires more volume than other colors'
    },
    mixing_combinations: {
      plus_red: 'Creates oranges',
      plus_blue: 'Creates greens',
      plus_white: 'Creates pale yellow/cream',
      plus_black: 'Creates olive/khaki'
    },
    caution: 'Weakest tinting strength - need 2-3x more than other colors',
    drops_per_ml: 20
  },

  blue: {
    name: 'Blue',
    category: 'primary',
    hex: '#0000FF',
    rgb: {r: 0, g: 0, b: 255},
    properties: {
      opacity: 'very_high',
      tinting_strength: 'very_strong',
      typical_use: 'Primary color, cooling tones, mixing greens/purples',
      mixing_note: 'EXTREMELY strong - add in very tiny amounts'
    },
    mixing_combinations: {
      plus_red: 'Creates purples/violets',
      plus_yellow: 'Creates greens',
      plus_white: 'Creates light/sky blue',
      plus_black: 'Creates navy/deep blue'
    },
    caution: 'STRONGEST tinting color - very easy to overpower entire mix. Start with 1/4 the amount you think you need.',
    drops_per_ml: 20
  },

  // SECONDARY COLORS
  orange: {
    name: 'Orange',
    category: 'secondary',
    hex: '#FF8800',
    rgb: {r: 255, g: 136, b: 0},
    made_from: 'Red + Yellow (approx 1:1)',
    properties: {
      opacity: 'medium',
      tinting_strength: 'medium',
      typical_use: 'Sunsets, warm tones, autumn colors'
    },
    mixing_combinations: {
      plus_white: 'Creates peach/cream',
      plus_black: 'Creates brown/rust',
      plus_blue: 'Neutralizes/grays'
    },
    drops_per_ml: 20
  },

  green: {
    name: 'Green',
    category: 'secondary',
    hex: '#00FF00',
    rgb: {r: 0, g: 255, b: 0},
    made_from: 'Blue + Yellow (approx 1:2)',
    properties: {
      opacity: 'medium',
      tinting_strength: 'medium_strong',
      typical_use: 'Nature, landscapes, cool tones'
    },
    mixing_combinations: {
      plus_white: 'Creates mint/pale green',
      plus_black: 'Creates forest/dark green',
      plus_red: 'Neutralizes/creates brown'
    },
    drops_per_ml: 20
  },

  purple: {
    name: 'Purple',
    category: 'secondary',
    hex: '#8800FF',
    rgb: {r: 136, g: 0, b: 255},
    made_from: 'Blue + Red (approx 2:1)',
    properties: {
      opacity: 'high',
      tinting_strength: 'strong',
      typical_use: 'Shadows, cool tones, fantasy work'
    },
    mixing_combinations: {
      plus_white: 'Creates lavender/lilac',
      plus_black: 'Creates deep purple',
      plus_yellow: 'Neutralizes/creates gray-brown'
    },
    drops_per_ml: 20
  },

  // EARTH TONES
  brown: {
    name: 'Brown',
    category: 'earth',
    hex: '#8B4513',
    rgb: {r: 139, g: 69, b: 19},
    made_from: 'Red + Yellow + Black (or Red + Green)',
    properties: {
      opacity: 'high',
      tinting_strength: 'medium',
      typical_use: 'Skin tones, earth tones, shading'
    },
    mixing_combinations: {
      plus_white: 'Creates tan/beige',
      plus_red: 'Creates warm brown',
      plus_blue: 'Creates cool brown'
    },
    drops_per_ml: 20
  },

  // SPECIALTY COLORS
  magenta: {
    name: 'Magenta',
    category: 'special',
    hex: '#FF00FF',
    rgb: {r: 255, g: 0, b: 255},
    properties: {
      opacity: 'high',
      tinting_strength: 'very_strong',
      typical_use: 'Vibrant pinks, lip colors, flower petals'
    },
    mixing_combinations: {
      plus_white: 'Creates hot pink',
      plus_red: 'Creates deeper pink/red-violet'
    },
    drops_per_ml: 20
  }
};

// Helper function to get color by name
function getColorData(colorName) {
  return inkColorDatabase[colorName] || null;
}

// Helper function to estimate resulting color from mix (simplified RGB mixing)
function estimateResultingColor(colors) {
  if (!colors || colors.length === 0) return '#808080';

  let totalR = 0, totalG = 0, totalB = 0, totalParts = 0;

  colors.forEach(c => {
    const colorData = inkColorDatabase[c.color];
    if (colorData && colorData.rgb && c.parts > 0) {
      totalR += colorData.rgb.r * c.parts;
      totalG += colorData.rgb.g * c.parts;
      totalB += colorData.rgb.b * c.parts;
      totalParts += c.parts;
    }
  });

  if (totalParts === 0) return '#808080';

  const avgR = Math.round(totalR / totalParts);
  const avgG = Math.round(totalG / totalParts);
  const avgB = Math.round(totalB / totalParts);

  return rgbToHex(avgR, avgG, avgB);
}

// Convert RGB to Hex
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
