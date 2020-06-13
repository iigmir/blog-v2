const StaticSiteGenerator = require( "../src/new-class.js" );
const expected = require( "./expect-cases.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    it( "should get the config by input", async () =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        assert.deepStrictEqual( app.config, expected.config );
    });
    it( "should get the directory files by config", async () =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( app.directory_files, expected.directory_files );
    });
    it( "should get source markdowns by config", async () =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( await app.source_markdowns, expected.source_markdowns );
    });
    it( "should get HTML template by config", async () =>
    {
        const app = new StaticSiteGenerator();
        await app.set_config( config_path );
        await app.set_template();
        assert.deepStrictEqual( await app.template, expected.template );
    });
    /*
    describe( "main function", () =>
    {
        it( "should works as expected", async () =>
        {
            const app = new StaticSiteGenerator();
            await app.main( config_path );
            assert.deepStrictEqual( app.config, {
                source_directory: "test/articles",
                template_file: "test/test-suits/template.spec.html",
                destination_directory: "test/docs"
            } );
            assert.deepStrictEqual( app.directory_files, [ "test.spec.md", ] );
            assert.deepStrictEqual( await app.source_markdowns, [ `# Test\n\nHello\n`, ] );
        });
    });
    */
});
