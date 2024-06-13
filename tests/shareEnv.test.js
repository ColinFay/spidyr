// tests for shareEnv.js
const { shareEnv } = require('../src/share-env');
const { WebR } = require('webr');

test('shareEnv works with one env', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init();

  process.env["TEST_ENV"] = "test"

  await shareEnv(
    "TEST_ENV"
  )
  const is_in = await globalThis.spidyr_webR.evalRRaw(`names(Sys.getenv())`, "string[]")

  expect(is_in).toContain(
    "TEST_ENV"
  );

  await globalThis.spidyr_webR.close();

})

test('shareEnv works with two env', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init();

  process.env["TEST_ENV2"] = "test"

  await shareEnv(
    [
      "TEST_ENV",
      "TEST_ENV2"
    ]
  )
  const is_in = await globalThis.spidyr_webR.evalRRaw(
    `names(Sys.getenv())`,
    "string[]"
  )

  expect(is_in).toContain(
    "TEST_ENV"
  );

  expect(is_in).toContain(
    "TEST_ENV2"
  );

  await globalThis.spidyr_webR.close();

})

test('shareEnv works with all env', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init();
  process.env["TEST_ENV3"] = "test"
  await shareEnv()

  const is_in = await globalThis.spidyr_webR.evalRRaw(
    `names(Sys.getenv())`,
    "string[]"
  )

  expect(is_in).toContain(
    "TEST_ENV"
  );

  expect(is_in).toContain(
    "TEST_ENV2"
  );

  expect(is_in).toContain(
    "TEST_ENV3"
  );

  await globalThis.spidyr_webR.close();

})