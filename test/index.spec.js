const StaticSiteGenerator = require( "../src/new-class.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    it( "should get the input setting by out input", async () =>
    {
        const app = new StaticSiteGenerator();
        await app.load_config( config_path );
        assert.deepStrictEqual( app.config, {
            source_directory: "test/articles",
            template_file: "test/test-suits/template.spec.html",
            destination_directory: "test/docs"
        });
    });
    it( "should get the directory array by out input", async () =>
    {
        const app = new StaticSiteGenerator();
        await app.load_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( app.directory_files, [ "test.spec.md", ]);
    });
    it( "should get markdowns by source file paths", async () =>
    {
        const app = new StaticSiteGenerator();
        const expected_cases =  [ `# Test\n\nHello\n`, ];
        await app.load_config( config_path );
        await app.read_directory();
        assert.deepStrictEqual( await app.source_markdowns, expected_cases );
    });
});
