const MarkdownIt = require( "markdown-it" );

const RenderMarkdown = (md_text = "") => 
{
    const MDParser = new MarkdownIt();
    try 
    {
        return MDParser.render( md_text );
    }
    catch (error) 
    {
        return "";
    }
};

const RequestSource = async(
    source_directory = "",
    ajax_handler = { read_source_directory: () => {} },
) =>
{
    const is_ajax = typeof( source_directory ) === "string";
    const directly_import = typeof( source_directory ) === "object";
    if( is_ajax )
    {
        const result = await ajax_handler.read_source_directory(source_directory);
        return result;
    }
    else if( directly_import )
    {
        return source_directory;
    }
    throw new Error("Unspecified type");
};

module.exports = { RenderMarkdown, RequestSource };
