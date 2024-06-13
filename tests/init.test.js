// tests for init

const { initSpidyr } = require('../src/init.js');
const fs = require('fs');
const path = require('path');
const os = require('os');

test('initSpidyr works', async () => {
  await initSpidyr();
  expect(globalThis.spidyr_webR).toBeDefined();
  await globalThis.spidyr_webR.close();

  // create temp dir
  const dirPath = path.join(os.tmpdir(), 'webr_packages');

  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true });
  }
  fs.mkdirSync(dirPath);
  fs.writeFileSync(
    path.join(dirPath, 'test.txt'),
    'Hello, World!'
  );

  await initSpidyr({
    webr_packages_dir: dirPath
  });
  expect(globalThis.spidyr_webR).toBeDefined();
  await globalThis.spidyr_webR.close();
});