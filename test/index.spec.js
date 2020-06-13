const StaticSiteGenerator = require( "../src/new-class.js" );
const assert = require( "assert" );

describe( "StaticSiteGenerator", () =>
{
    it( "should get the input setting by out input", async () =>
    {
        const instance = new StaticSiteGenerator();
        await instance.load_config( "test/config.json" );
        assert.deepStrictEqual( instance.config, {
            source_directory: "test/articles",
            template_file: "test/template.spec.html",
            destination_directory: "test/docs"
        });
    });
    it( "should get the directory array by out input", async () =>
    {
        const instance = new StaticSiteGenerator();
        await instance.load_config( "test/config.json" );
        await instance.read_directory();
        assert.deepStrictEqual( instance.directory_files, ["test.spec.md"]);
    });
});
