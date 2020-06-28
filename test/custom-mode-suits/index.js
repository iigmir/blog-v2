const FileSystemModule = require( "../../lib/FileSystemModule.js" );
const fsm = new FileSystemModule();

fsm.write_file({
    path: "test/custom-mode-suits/docs/test.txt",
    data: "Hello World",
});

// console.log( "done" );
