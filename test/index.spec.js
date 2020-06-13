const StaticSiteGenerator = require( "../src/new-class.js" );
const assert = require( "assert" );

describe( "StaticSiteGenerator", () =>
{
    it( "should get the input setting by out input", async () => {
        const instance = new StaticSiteGenerator();
        return instance.load_config( "test/config.json" ).then( result =>
        {
            assert.deepStrictEqual( instance.config, {
                source_directory: "test/articles",
                template_file: "test/template.spec.html",
                destination_directory: "test/docs"
            });
        });
    });
});
