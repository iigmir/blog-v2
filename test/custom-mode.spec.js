const StaticSiteGenerator = require( "../lib/index.js" );
const assert = require( "assert" );
const fs = require( "fs" );

const config_path = "test/custom-mode-suits/config.json";

describe( "StaticSiteGenerator", function()
{
    describe( "in custom mode", function()
    {
        it( "should NOT execute any scripts but for custom script calling.", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            assert.deepEqual( app.mode, "custom" );
            assert.deepStrictEqual( app.directory_files, []);
            assert.deepEqual( app.template, "" );
        });
        // it( "should only execute own script by given script", async() =>
        // {
        //     fs.stat( "test/custom-mode-suits/docs/test.html", ( err, stat ) =>
        //     {   // https://stackoverflow.com/questions/17699599
        //         assert.strictEqual( err, null );
        //     });
        // });
    });
});

