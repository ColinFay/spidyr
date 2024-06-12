// jest tests for library.js
const { WebR } = require('webr');
const path = require('path');
const {
   LibraryFromPackage,
   library,
  mountLocalPackage
} = require('../src/library.js');

test('LibraryFromPackage works', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init()

  const lib = new LibraryFromPackage('utils');
  await lib.load();

  expect(lib.lib).toBe('utils');
  expect(lib.namespace).toContain('head');

  expect(lib.head).toBeDefined();

  const tools = new LibraryFromPackage('tools');
  await tools.load();
  expect(tools.namespace).toContain('toTitleCase');

  await globalThis.spidyr_webR.close();

});

test('library works', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init()

  const lib = await library('utils');

  expect(lib.lib).toBe('utils');
  expect(lib.namespace).toContain('head');

  expect(lib.head).toBeDefined();

  const tools = new LibraryFromPackage('tools');
  await tools.load();
  expect(tools.namespace).toContain('toTitleCase');

  await globalThis.spidyr_webR.close();

});

test('mountLocalPackage works', async () => {
  var dns = require('dns')
  has_internet = await dns.promises.lookup('google.com').then(
    () => true
  ).catch(() => false)
  if (!has_internet) {
    console.log("No internet connection, skipping test")
    return
  } else {
    globalThis.spidyr_webR = new WebR();
    await globalThis.spidyr_webR.init();
    await globalThis.spidyr_webR.evalR("webr::install('pkgload', repos = 'https://repo.r-wasm.org/')");

    const rfuns = await mountLocalPackage(
      path.join(
        __dirname,
        'fixtures',
        'rfuns'
      )
    )
    const has_test_package = await globalThis.spidyr_webR.evalRBoolean(
      '"package:rfuns" %in% search()'
    )

    expect(
      has_test_package
    ).toBe(true)

    expect(
      rfuns.namespace
    ).toContain('hello_world')

    await globalThis.spidyr_webR.close();
  }

}, 100000);