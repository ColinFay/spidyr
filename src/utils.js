const checkForSpidyrWebR  = function(){
  if (globalThis.spidyr_webR){
    return true;
  } else {
    throw new Error("❌ Unable to find spidyr_webR.\nPlease run `initSpidyr()` first.");
  }
}

const checkIsInstalled = async function(library_to_check){
  checkForSpidyrWebR();

  const pkg_in_lib = await globalThis.spidyr_webR.evalRBoolean(`"${library_to_check}" %in% rownames(installed.packages())`);

  if (pkg_in_lib) {
    return true;
  }
  console.error("❌ {" + library_to_check + "} is required")
  console.error(`👉 Please run 'webrcli install ${library_to_check}'\n`)
  throw new Error(`${library_to_check} is required`)
}

exports.checkForSpidyrWebR = checkForSpidyrWebR;
exports.checkIsInstalled = checkIsInstalled;