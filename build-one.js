const BlogAJAXGenerator = require( "./lib/BlogAJAXGenerator" );
const main = (id = "ERROR") =>
{
    const app = new BlogAJAXGenerator();
    const name = `${ id }.md`;
    if( id.length < 3 )
    {
        console.error("Invalid input");
        return;
    }
    app.main({
        "mode": "ajax",
        "source_directory": [ {
            name,
            download_url: `https://raw.githubusercontent.com/iigmir/blog-source/master/articles/${ id }.md`,
        } ],
        "template_file": "src/template.html",
        "destination_directory": "docs/articles",
        "replaced_text": "<the-article />"
    });
};

main( process.argv[2] );
