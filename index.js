const main = require( "./src/main.js" );
const fs = require("fs");

fs.readFile( "./config.json", "utf8", (error, conf) => main(error, conf) );
