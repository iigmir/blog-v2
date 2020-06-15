const StaticSiteGenerator = require( "../lib/index.js" );
const expected = require( "./ajax-mode-suits/expect-cases.js" );
const assert = require( "assert" );

const config_path = "test/ajax-mode-suits/config.json";
const test_main_function = false;

describe( "StaticSiteGenerator in AJAX mode", function()
{
    this.timeout( 300000 );
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
        await app.set_source_markdowns_from_ajax();
        assert.deepStrictEqual( await app.source_markdowns, expected.source_markdowns );
    });
    it( "should get HTML template by config", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.set_template();
        assert.deepStrictEqual( await app.template, await expected.template );
    });
    /*
    it( "should get parsed HTMLs by template and source markdowns", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        await app.set_template();
        await app.set_source_markdowns_from_ajax();
        assert.deepStrictEqual( await app.parsed_htmls, await expected.parsed_htmls );
    });
    */
    it( "should write parsed HTMLs to specified destination directory", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        await app.set_template();
        if( test_main_function === false )
        {
            assert.doesNotThrow( async() => await app.write_files(), Error );
        }
    });
    describe( "main function", () =>
    {
        it( "should works as expected", async() =>
        {
            const app = new StaticSiteGenerator();
            if( test_main_function )
            {
                assert.doesNotThrow( async() => await app.main( config_path ), Error );
            }
        });
    });
});

