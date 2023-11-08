var Terser = require("terser");
var fs = require("fs");
// var path = require("path");

function getAllFiles(dirPath) {
    return new Promise( (resolve, reject) => {
        fs.readdir(dirPath, (up, files) => {
            if( up ) reject(up);
            const minifiedFiles = files.filter( path => path.match(/\.js$/) );
            resolve(minifiedFiles);
        });
    });
}

async function minifyFiles(filePaths = [""], targetDirectory = "src", outputDirectory = "dist") {
    filePaths.forEach( async (originalPath = "") => {
        const targetPath = `${targetDirectory}/${originalPath}`;
        const newPath = `${outputDirectory}/${originalPath.replace(".js", ".min.js")}`;
        const fileContent = (await Terser.minify(fs.readFileSync(targetPath, "utf8"))).code;
        fs.writeFileSync( newPath, fileContent );
    });
    // await Promise.all(filePaths.map(async (filePath) => {
    //     fs.writeFileSync( filePath, (await Terser.minify(fs.readFileSync(filePath, "utf8"))).code );
    // }));
}

const targetDirectory = "src/js";
const outputDirectory = "docs/assets";
getAllFiles(targetDirectory).then( (files) => {
    minifyFiles(files, targetDirectory, outputDirectory).then(r => r);
});

