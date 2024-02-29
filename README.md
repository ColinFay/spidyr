## spidyr

[EXPERIMENTAL] Do not use in prod

Tools for extending `webR` in `NodeJS`.

Note that `spidyr` is designed to work with `webrcli`.

<https://github.com/ColinFay/webrcli>

## Load a webR library (downloaded with `webrcli`)

```bash
mkdir spongebob
cd spongebob
npm init -y
npm install webr spidyr
webrcli install spongebob
```

```javascript
const path = require('path');
const { loadPackages, Library } = require('spidyr');
const { WebR } = require('webr');
const webR = new WebR();
const spongebob = new Library("spongebob");

(async () => {

  await webR.init();

  await loadPackages(
    webR,
    path.join(__dirname, 'webr_packages')
  )

  await spongebob.load(
    webR
  )

  const said = await spongebob.tospongebob("Hello world")

  console.log(said.values)
})();
```

## To load from a local folder containing an R package

Provided you have your funs in `./rfuns` (default after `webrcli init`)

```javascript
const path = require('path');
const { WebR } = require('webr');
const { loadPackages, LibraryFromLocalFolder } = require('spidyr');

const rfuns = new LibraryFromLocalFolder("rfuns");


(async () => {

  console.log("👉 Loading WebR ----");
  globalThis.webR = new WebR();
  await globalThis.webR.init();

  console.log("👉 Loading R packages ----");

  await loadPackages(
    globalThis.webR,
    path.join(__dirname, 'webr_packages')
  )

  await rfuns.mountAndLoad(
    globalThis.webR,
    path.join(__dirname, 'rfuns')
  );

  const hw = await rfuns.hello_world()

  console.log(hw.values);

  console.log("✅ Everything is ready!");

})();
```