// jest tests fo load.js

const { WebR } = require('webr');
const { loadPackages } = require('../src/load.js');
const fs = require('fs');
const path = require('path');
const os = require('os');

test('loadPackages works', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init()

  // create temp dir
  const dirPath = path.join(os.tmpdir(), 'temp');

  if (fs.existsSync(dirPath)){
    fs.rmSync(dirPath, { recursive: true });
  }
  fs.mkdirSync(dirPath);
  fs.writeFileSync(
    path.join(dirPath, 'test.txt'),
     'Hello, World!'
  );

  await loadPackages(dirPath);

  const libPathsJS = await globalThis.spidyr_webR.evalRRaw('.libPaths()','string[]');
  expect(
    libPathsJS
    ).toContain(
      '/usr/lib/R/webr_packages'
   );

  const contains = await globalThis.spidyr_webR.evalRBoolean('file.exists("/usr/lib/R/webr_packages/test.txt")');

  expect(contains).toBe(true);

  await globalThis.spidyr_webR.close();
}
);