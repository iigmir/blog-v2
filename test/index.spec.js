const StaticSiteGenerator = require( "../lib/StaticSiteGenerator.js" );
const assert = require( "assert" );

const config_path = "test/test-suits/config.json";

describe( "StaticSiteGenerator", () =>
{
    describe( "main function", () =>
    {
        it( "should works as expected", async() =>
        {
            const app = new StaticSiteGenerator();
            assert.doesNotThrow( async() => await app.main( config_path ), Error );
        });
    });
});
