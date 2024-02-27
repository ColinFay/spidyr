// jest tests for library.js
const { WebR } = require('webr');
const { Library } = require('../src/library.js');
const webR = new WebR();

test('library works', async () => {
  await webR.init();

  const lib = new Library('utils');
  await lib.load(webR);

  expect(lib.lib).toBe('utils');
  expect(lib.namespace).toContain('head');
  expect(lib.head).toBeDefined();

  await webR.close();

});