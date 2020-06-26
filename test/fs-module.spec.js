const assert = require( "assert" );
const FileSystemModule = require( "../lib/FileSystemModule.js" );

describe( "FileSystemModule", () =>
{
    it( "should read the file", async() =>
    {
        const app = new FileSystemModule();
        let text = await app.read_file( "test/fs-module-suits/read-file.txt" );
        assert.deepEqual( text.trim(), "Hello World!" );
    });
});