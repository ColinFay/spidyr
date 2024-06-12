const { checkForSpidyrWebR } = require("./utils");

async function loadPackages(
  dirPath,
  libName = "webr_packages"
) {
  checkForSpidyrWebR();

  // Create a custom lib so that we don't have to worry about
  // overwriting any packages that are already installed.
  await spidyr_webR.FS.mkdir(`/usr/lib/R/${libName}`)
  // Mount the custom lib
  await spidyr_webR.FS.mount("NODEFS", { root: dirPath }, `/usr/lib/R/${libName}`);
  // Add the custom lib to the R search path
  await spidyr_webR.evalR(`.libPaths(c('/usr/lib/R/${libName}', .libPaths()))`);
}

module.exports = {
  loadPackages: loadPackages
};