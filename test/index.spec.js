const StaticSiteGenerator = require( "../src/new-class.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    it( "should get the input setting by input", async () =>
    {
        const app = new StaticSiteGenerator();
        const expected_cases = {
            source_directory: "test/articles",
            template_file: "test/test-suits/template.spec.html",
            destination_directory: "test/docs"
        };
        await app.set_config( config_path );
        assert.deepStrictEqual( app.config, expected_cases );
    });
    it( "should get the directory array by input", async () =>
    {
        const app = new StaticSiteGenerator();
        const expected_cases = [ "test.spec.md", ];
        await app.set_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( app.directory_files, expected_cases );
    });
    it( "should get markdowns by source file paths", async () =>
    {
        const app = new StaticSiteGenerator();
        const expected_cases = [ `# Test\n\nHello\n`, ];
        await app.set_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( await app.source_markdowns, expected_cases );
    });
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
});
