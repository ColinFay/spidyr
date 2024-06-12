const {
  initSpidyr,
   mountLocalPackage
} = require('spidyr');

(async () => {

  await initSpidyr()

  const rfuns = await mountLocalPackage("./rfuns");

  const hw = await rfuns.hello_world()

  console.log(hw.values);

  console.log("✅ Everything is ready!");
})();