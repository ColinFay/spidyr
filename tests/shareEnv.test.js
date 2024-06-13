// tests for shareEnv.js
const { shareEnv } = require('../src/share-env');
const { WebR } = require('webr');

test('shareEnv works with one env', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init();

  await shareEnv(
    Object.keys(process.env)[1]
  )
  const is_in = await globalThis.spidyr_webR.evalRRaw(`Sys.getenv()`, "string[]")

  expect(is_in).toContain(
    Object.keys(process.env)[1]
  );

  await globalThis.spidyr_webR.close();

})

test('shareEnv works with all env', async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init();

  await shareEnv()

  const is_in = await globalThis.spidyr_webR.evalRBoolean(`"${Object.keys(process.env)[0]}" %in% names(Sys.getenv())`)


  expect(is_in).toBe(true);

  const is_in_bis = await globalThis.spidyr_webR.evalRBoolean(`"${process.env[0]}" %in% unname(Sys.getenv())`)

  expect(is_in_bis).toBe(true);

  await globalThis.spidyr_webR.close();

})