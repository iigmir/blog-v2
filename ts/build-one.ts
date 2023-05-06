import BlogAJAXGenerator from "./generators/ajax";
import { ConfigModeEnum } from "./types/index";

const main = (id = "ERROR") =>
{
    if( id.length < 3 )
    {
        console.error("Invalid input");
        return;
    }
    const app = new BlogAJAXGenerator();
    app.main({
        "mode": ConfigModeEnum.Ajax,
        "source_directory": `https://raw.githubusercontent.com/iigmir/blog-source/master/articles/${ id }.md`,
        "template_file": "src/template.html",
        "destination_directory": "docs/articles",
        "replaced_text": "<the-article />"
    });
};

main( process.argv[2] );
