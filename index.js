import chalk from 'chalk'; // Source # box optic in output
import chroma from 'chroma-js'; // Color Source

// Adjustment settings for hue and luminosity
function getColor(hue, luminosity) {
  const isValidHue = chroma.valid(hue);

  if (isValidHue) {
    if (luminosity === 'dark') {
      return chroma(hue).darken(2).hex();
    } else if (luminosity === 'light') {
      return chroma(hue).brighten(2).hex();
    } else {
      return chroma(hue).hex();
    }
  }

  // Generate random color based on luminosity if no valid hue is provided
  if (luminosity === 'dark') {
    return chroma.random().darken(2).hex();
  } else if (luminosity === 'light') {
    return chroma.random().brighten(2).hex();
  }

  return chroma.random().hex(); // Default random color
}

const userInput = process.argv.slice(2).join(' ');
const userHue = userInput.split(' ')[0]?.toLowerCase();
const userLuminosity = userInput.split(' ')[1]?.toLowerCase() || '';

// Show color based on user input
const color = getColor(userHue, userLuminosity);

// Block for color output
const width = 31;
const height = 9;
const centerText = (text, width) => {
  const padding = Math.floor((width - text.length) / 2);
  return ' '.repeat(padding) + text + ' '.repeat(padding);
};

const coloredBlock = Array.from({ length: height })
  .map((_, rowIndex) => {
    if (rowIndex === Math.floor(height / 2)) {
      const row = centerText(color, width - 2);
      return chalk.hex(color)('#' + row + '#');
    }
    return chalk.hex(color)('#'.repeat(width));
  })
  .join('\n');

console.log(coloredBlock);
