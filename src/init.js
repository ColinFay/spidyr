const { WebR } = require('webr');
const fs = require('fs');
const { loadPackages } = require('./load');

async function initSpidyr(
  spidyrInitOptions = {
    webr_packages_dir: "./webr_packages"
  }
) {

  console.log("👉 Loading WebR ----");

  globalThis.spidyr_webR = new WebR();

  await globalThis.spidyr_webR.init();

  // only run the code if the folder exists
  if (fs.existsSync(
    spidyrInitOptions.webr_packages_dir
  )){
    console.log("👉 Loading R packages ----");
    await loadPackages(
      spidyrInitOptions.webr_packages_dir
    )
  } else {
    console.log("👉 No R packages found ----");
  }

}

module.exports = {
  initSpidyr: initSpidyr
};