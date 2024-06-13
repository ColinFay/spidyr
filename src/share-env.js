const { checkForSpidyrWebR } = require('./utils');

const shareEnv = async (envars) => {

  checkForSpidyrWebR();

  if (envars === undefined || envars === null) {
    envars = Object.keys(process.env);
  }

  if (typeof envars === "string") {
    // convert to array if we pass only one string
    envars = [envars];
  }

  for (const key of envars) {
    try {
      await globalThis.spidyr_webR.evalR(
        `Sys.setenv('${key}' = '${process.env[key]}')`
      );
    } catch (error) {
      console.error(
        `Unable to set environment variable ${key} with value ${envars[key]}`
      );
    }

  }
}

module.exports = {
  shareEnv: shareEnv
};