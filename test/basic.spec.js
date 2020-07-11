const StaticSiteGenerator = require( "../lib/StaticSiteGenerator.js" );
const expected = require( "./test-suits/expect-cases.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    describe( "Basic state", function()
    {
        it( "should get the config by input", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            assert.deepStrictEqual( app.config, expected.config );
        });
        it( "should get the directory files by config", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            await app.read_directory();
            assert.deepStrictEqual( app.directory_files, expected.directory_files );
        });
        it( "should get source markdowns by config", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            await app.read_directory();
            assert.deepStrictEqual( await app.source_markdowns, expected.source_markdowns );
        });
        it( "should get HTML template by config", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            await app.set_template();
            assert.deepStrictEqual( await app.template, await expected.template );
        });
    });
});
