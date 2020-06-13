const StaticSiteGenerator = require( "../src/new-class.js" );
const assert = require( "assert" );

describe( "StaticSiteGenerator", () =>
{
    it( "should get the input setting by out input", () => {
        const instance = new StaticSiteGenerator( "test/config.json" );
        const expected = {
            source_directory: "test/articles",
            template_file: "test/template.spec.html",
            destination_directory: "test/docs"
        };
        assert.deepStrictEqual( instance.config, expected );
    });
});
