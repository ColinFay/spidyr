// // jest tests for utils.js

const { checkForSpidyrWebR, checkIsInstalled } = require('../src/utils.js');
const { WebR } = require('webr');

test('checkForSpidyrWebR works', async () => {

  globalThis.spidyr_webR = undefined;

  expect(
    () => {
      checkForSpidyrWebR()
    }
  ).toThrow("❌ Unable to find spidyr_webR.\nPlease run `initSpidyr()` first.");

  globalThis.spidyr_webR = true;

  console.log(checkForSpidyrWebR())

  const res = checkForSpidyrWebR()

  expect(res).toBe(true);

})

test("checkIsInstalled works", async () => {
  globalThis.spidyr_webR = new WebR();
  await globalThis.spidyr_webR.init()

  const is_tools_installed = await checkIsInstalled(
    "utils"
  );
  expect(is_tools_installed).toBe(true);


  expect(
    async () => {
      await checkIsInstalled("blabla")
    }
  ).rejects.toThrow("blabla is required");

  await globalThis.spidyr_webR.close()
})