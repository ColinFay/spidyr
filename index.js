const load = require('./src/load.js')
const library = require('./src/library.js')

exports.loadPackages = load.loadPackages;

exports.Library = library.Library
exports.LibraryFromLocalFolder = library.LibraryFromLocalFolder