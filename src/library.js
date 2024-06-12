const path = require('path');
const { checkForSpidyrWebR, checkIsInstalled } = require('./utils');

const build_namespace = async function (lib){
  const nmsp = await globalThis.spidyr_webR.evalRRaw(
    `getNamespaceExports("${lib}")`,
    'string[]'
  );
  return nmsp
}

class LibraryFromPackage {
  constructor(lib) {
    this.lib = path.basename(lib);
    this.namespace = [];
  }
  async load() {

    checkForSpidyrWebR()

    await checkIsInstalled(this.lib)

    this.namespace = await build_namespace(this.lib)

    for (const fun of this.namespace) {
      this[fun] = await globalThis.spidyr_webR.evalR(
        `getExportedValue("${this.lib}","${fun}")`
      );
    }
  }
}

const library = async function (lib) {

  const the_lib = new LibraryFromPackage(lib);

  await the_lib.load();

  return the_lib;
}


class LibraryFromLocalFolder extends LibraryFromPackage {

  async load() {

    checkForSpidyrWebR()

    this.namespace = await build_namespace(this.lib)

    for (const fun of this.namespace) {
      this[fun] = await globalThis.spidyr_webR.evalR(
        `getExportedValue("${this.lib}","${fun}")`
      );
    }
  }

  async mountAndLoad(localDir) {
    checkForSpidyrWebR()

    localDir = path.resolve(localDir);
    await checkIsInstalled("pkgload")

    const libraryPath = `/home/${this.lib}`;

    await globalThis.spidyr_webR.FS.mkdir(libraryPath);

    await globalThis.spidyr_webR.FS.mount(
      "NODEFS",
      {
        root: localDir
      },
      libraryPath
    )

    // // see https://github.com/r-wasm/webr/issues/292
    await globalThis.spidyr_webR.evalR("options(expressions=1000)")
    await globalThis.spidyr_webR.evalR(`pkgload::load_all('/home/${this.lib}')`);
    await this.load();
  }

}

mountLocalPackage = async function (localdir) {

  checkForSpidyrWebR()

  const rfuns = new LibraryFromLocalFolder(path.basename(localdir));
  await rfuns.mountAndLoad(
    localdir
  );

  return rfuns
}

exports.library = library;
exports.LibraryFromLocalFolder = LibraryFromLocalFolder;
exports.LibraryFromPackage = LibraryFromPackage;
exports.mountLocalPackage = mountLocalPackage;