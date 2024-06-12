## spidyr

[EXPERIMENTAL] Do not use

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

Add an index.js with:

```javascript
const { initSpidyr, library } = require('spidyr');

(async () => {

  await initSpidyr()

  const spongebob = await library("spongebob")

  const said = await spongebob.tospongebob("Hello world")

  console.log(said.values)
})();
```

## To load from a local folder containing an R package

Provided you have your funs in `./rfuns` (default after `webrcli init`)

```javascript
const { initSpidyr, mountLocalPackage } = require('spidyr');

(async () => {

  await initSpidyr()

  const rfuns = await mountLocalPackage("./rfuns");

  const hw = await rfuns.hello_world()

  console.log(hw.values);
})();
```