const fs = require('fs');
const https = require('https');
const path = require('path');

const patterns = ['cubes', 'lined-paper', 'diagonal-stripes', 'grid'];
const outputDir = path.join(__dirname, '../public/patterns');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

patterns.forEach((p) => {
  const url = `https://www.transparenttextures.com/patterns/${p}.png`;
  const dest = path.join(outputDir, `${p}.png`);
  const file = fs.createWriteStream(dest);

  https
    .get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${p}.png`);
      });
    })
    .on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
      console.error(`Error downloading ${p}.png: ${err.message}`);
    });
});
