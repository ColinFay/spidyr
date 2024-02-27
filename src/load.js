async function loadPackages(webR, dirPath, libName = "webr_packages") {
  // Create a custom lib so that we don't have to worry about
  // overwriting any packages that are already installed.
  await webR.FS.mkdir(`/usr/lib/R/${libName}`)
  // Mount the custom lib
  await webR.FS.mount("NODEFS", { root: dirPath }, `/usr/lib/R/${libName}`);
  // Add the custom lib to the R search path
  await webR.evalR(`.libPaths(c('/usr/lib/R/${libName}', .libPaths()))`);
}

module.exports = {
  loadPackages: loadPackages
};