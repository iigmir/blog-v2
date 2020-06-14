const StaticSiteGenerator = require( "../lib/index.js" );
const expected = require( "./expect-cases.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    it( "should get the config by input", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        assert.deepStrictEqual( app.config, expected.config );
    } );
    it( "should get the directory files by config", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( app.directory_files, expected.directory_files );
    } );
    it( "should get source markdowns by config", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( await app.source_markdowns, expected.source_markdowns );
    } );
    it( "should get HTML template by config", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.set_template();
        assert.deepStrictEqual( await app.template, await expected.template );
    } );
    it( "should get parsed HTMLs by template and source markdowns", async() =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        await app.set_template();
        assert.deepStrictEqual( await app.parsed_htmls, await expected.parsed_htmls );
    } );
    describe( "main function", () =>
    {
        it( "should works as expected", async() =>
        {
            const app = new StaticSiteGenerator();
            assert.doesNotThrow( async() => await app.main( config_path ), Error );
        } );
    } );
} );
