const assert = require( "assert" );
const FileSystemModule = require( "../lib/FileSystemModule.js" );

describe( "FileSystemModule", () =>
{
    it( "should read a file", async() =>
    {
        const app = new FileSystemModule();
        let test = await app.read_file( "test/fs-module-suits/read-file.txt" );
        assert.deepEqual( test.trim(), "Hello World!" );
    });
    it( "should read a directory", async() =>
    {
        const app = new FileSystemModule();
        let test = await app.read_directory( "test/fs-module-suits" );
        assert.deepEqual( test.length >= 2, true );
    });
    it( "should read the JSON file if it's vaild", async() =>
    {
        const app = new FileSystemModule();
        let test = await app.read_json( "test/fs-module-suits/vaild.json" );
        assert.deepEqual( test.api, 123456 );
    });
    it( "should throw error read_json reads invaild JSON file", async() =>
    {   // https://stackoverflow.com/questions/52449922
        const app = new FileSystemModule();
        await assert.rejects((
            async() => await app.read_json( "test/fs-module-suits/read-file.txt" )
        )());
    });
    it( "should delete files", async() =>
    {
        const app = new FileSystemModule();
        app.write_file({
            path: "test/fs-module-suits/testing.txt",
            data: "This file should delete immediately",
        });
        app.delete_file( "test/fs-module-suits/testing.txt" );
        await assert.rejects((
            async() => await app.read_file( "../test/fs-module-suits/testing.txt" )
        )());
    });
});