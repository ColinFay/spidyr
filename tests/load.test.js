// jest tests fo load.js

const { WebR } = require('webr');
const { loadPackages } = require('../src/load.js');
const webR = new WebR();

const fs = require('fs');
const path = require('path');
const os = require('os');

test('loadPackages works', async () => {
  await webR.init();

  // create temp dir
  const dirPath = path.join(os.tmpdir(), 'temp');

  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
    // create a file in the temp dir
    fs.writeFileSync(path.join(dirPath, 'test.txt'), 'Hello, World!');
  }

  await loadPackages(webR, dirPath);

  const libPaths = await webR.evalR('.libPaths()');
  const libPathsJS = await libPaths.toJs()
  expect(
    libPathsJS.values
    ).toContain(
      '/usr/lib/R/webr_packages'
   );

  const contains = await webR.evalRBoolean('file.exists("/usr/lib/R/webr_packages/test.txt")');
  expect(contains).toBe(true);

  await webR.close();
}
);