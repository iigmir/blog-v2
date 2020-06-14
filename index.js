const StaticSiteGenerator = require( "./lib/index.js" );

const main = async() =>
{
    const app = new StaticSiteGenerator();
    await app.main( "config.json" );
};
main();
