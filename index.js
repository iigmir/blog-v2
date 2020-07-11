const BlogArticleGenerator = require( "./lib/BlogArticleGenerator.js" );

const main = async() =>
{
    const app = new BlogArticleGenerator();
    await app.main( "config.json" );
};
main();
