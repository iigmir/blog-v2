const BlogAJAXGenerator = require( "./lib/BlogAJAXGenerator.js" );

const main = async() =>
{
    const app = new BlogAJAXGenerator();
    await app.main( "config.json" );
};
main();
