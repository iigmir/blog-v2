const StaticSiteGenerator = require( "./lib/StaticSiteGenerator.js" );

const main = async() =>
{
    const app = new StaticSiteGenerator();
    await app.main( "config.json" );
};

main();
