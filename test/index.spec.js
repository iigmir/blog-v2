const StaticSiteGenerator = require( "../src/new-class.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    it( "should get the input setting by out input", async () =>
    {
        const instance = new StaticSiteGenerator();
        await instance.load_config( config_path );
        assert.deepStrictEqual( instance.config, {
            source_directory: "test/articles",
            template_file: "test/test-suits/template.spec.html",
            destination_directory: "test/docs"
        });
    });
    it( "should get the directory array by out input", async () =>
    {
        const instance = new StaticSiteGenerator();
        await instance.load_config( config_path );
        await instance.read_directory();
        assert.deepStrictEqual( instance.directory_files, ["test.spec.md"]);
    });
});
