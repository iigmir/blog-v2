const MarkdownIt = require("markdown-it");
const fs = require("fs");
const md = new MarkdownIt();

// Functions
const load_config = (error, conf) =>
{
    if( error ) throw new Error( error );
    try {
        const config = JSON.parse( conf );
        fs.readdir( config.source_directory, ( error, files ) => init( error, files ) );
    } catch ( json_error ) {
        throw new Error( json_error );
    }
};

const init = ( error, fname ) =>
{
    if( error ) throw new Error( error );
    const src_dir = "src/articles";
    fname.map( fname_item =>
        fs.readFile(
            `${src_dir}/${fname_item}`,
            "utf8",
            (error, md_file) => read_markdown_files( error, md_file )
        )
    );
};

const read_markdown_files = ( error, file = "" ) =>
{
    if( error ) throw new Error( error );
    // Add templates
    fs.readFile( "src/template.html", "utf8", (error, template) =>
    {
        if( error ) throw new Error( error );
        parse_html({ file, template });
    });
};

const parse_html = ({ file = "", template = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello</title></head><body></body></html>' }) =>
{
    const text_should_replaced = "<!-- THE MD PARSER PARSES HERE -->";
    const parsed_md_text = md.render( file );
    const result = template.replace( text_should_replaced, parsed_md_text );
    create_new_file( result );
};

const create_new_file = ( new_text = "" ) =>
{
    debugger;
};

module.exports = load_config;
