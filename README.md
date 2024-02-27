## spidyr

Tools for extending `webR` in `NodeJS`.

Note that `spidyr` is designed to work with `webrcli`.

## Load a webR library (downloaded with `webrcli`)

```bash
webrcli install dplyr
```

```javascript
const { loadPackages } = require('webrtools');
const { WebR } = require('webr');
const webR = new WebR();

(async () => {

  await webR.init();

  await loadPackages(
    webR,
    path.join(__dirname, 'webr_packages')
  )

  await globalThis.webR.evalR("library(dplyr)");
})();
```

## Load a local R package (contained in a folder) and call it from webR

```javascript
const { loadPackages } = require('webrtools');
const { WebR } = require('webr');
const webR = new WebR();

(async () => {

  await webR.init();

  await loadPackages(
    webR,
    path.join(__dirname, 'webr_packages')
  )

  await globalThis.webR.FS.mkdir("/home/rfuns")

  await globalThis.webR.FS.mount(
    "NODEFS",
    {
      root: path.join(__dirname, 'rfuns')
    },
    "/home/rfuns"
  )

  await globalThis.webR.evalR("options(expressions=1000)")
  await globalThis.webR.evalR("pkgload::load_all('/home/rfuns')");
})();
```