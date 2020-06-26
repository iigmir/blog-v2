const StaticSiteGenerator = require( "../lib/index.js" );
const expected = require( "./test-suits/expect-cases.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", function()
{
    describe( "in Markdown mode", function()
    {
        it( "should get parsed HTMLs by template and source markdowns", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            await app.read_directory();
            await app.set_template();
            assert.deepStrictEqual( await app.parsed_htmls, await expected.parsed_htmls );
        });
        it( "should write parsed HTMLs to specified destination directory", async() =>
        {
            const app = new StaticSiteGenerator();
            await app.set_config( config_path );
            await app.read_directory();
            await app.set_template();
            assert.doesNotThrow( async() => await app.write_files(), Error );
        });
    });
});

