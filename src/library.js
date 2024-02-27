const fs = require('fs');
const path = require('path');

class Library {
  constructor(lib) {
    this.lib = lib;
    this.namespace = [];
  }
  async load(webR) {

    this.namespace = await webR.evalRRaw(
      `getNamespaceExports("${this.lib}")`,
      'string[]'
    );

    for (const fun of this.namespace) {
      this[fun] = await webR.evalR(
        `getExportedValue("${this.lib}","${fun}")`
      );
    }
  }
}

class LibraryFromLocalFolder extends Library{

  load (webR){
    throw new Error("load is not supported for LibraryFromLocalFolder, use mountAndLoad instead");
  }

  async mountAndLoad(webR, localDir) {

    const pkg_in_lib = await webR.evalRBoolean(`"pkgload" %in% rownames(installed.packages())`);

    if (!pkg_in_lib) {
      console.log("Installing {pkgload} ----")
      console.log("To avoid this, you can install {pkgload} with `spidycli install pkgload`.")
      console.log("Then use `spidyr.loadPackages(webR)`.")
      await webR.evalR(`install.packages("pkgload")`);
    }

    // bundling pkgdload
    await webR.FS.mkdir('/home/webrtoolslib');
    await webR.evalR(`.libPaths(c('/home/webrtoolslib', .libPaths()))`);

    // Download image data
    const datae = fs.readFileSync(
      path.join(__dirname, 'src/webrtools_deps/webrtools_deps.data')
    );
    const metadata = fs.readFileSync(
      path.join(__dirname, 'src/webrtools_deps/webrtools_deps.js.metadata')
    );

    // Mount image data
    const options2 = {
      packages: [{
        blob: await new Blob([datae]),
        metadata: await JSON.parse(metadata),
      }],
    }
    await webR.FS.mount("WORKERFS", options2, '/data');

    const libraryPath = `/home/${this.lib}`;

    await webR.FS.mkdir(libraryPath);

    await webR.FS.mount(
      "NODEFS",
      {
        root: localDir
      },
      libraryPath
    )

    // see https://github.com/r-wasm/webr/issues/292
    await webR.evalR("options(expressions=1000)")
    await webR.evalR(`pkgload::load_all('/home/${this.lib}')`);
    await this.load(webR);
  }

}

exports.LibraryFromLocalFolder = LibraryFromLocalFolder;
exports.Library = Library;