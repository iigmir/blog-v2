const FileSystemHandler = require( "./utils/FileSystemHandler.js" );
const AJAXHandler = require( "./utils/AJAXHandler.js" );
const error_handling = require( "./utils/error-handling.js" );
const read_template_file = require( "./utils/read-template-file.js" );
const MarkdownIt = require( "markdown-it" );

class BlogAJAXGenerator
{
    config = {};
    directory_files = [];
    template = "";
    fs_handler = new FileSystemHandler();
    ajax_handler = new AJAXHandler();
    /**
     * @returns {Array} - Markdown texts by file
     */
    get source_markdowns()
    {
        return this.ajax_handler.source_markdowns;
    }
    /**
     * @returns {Array} - HTML texts with parsed Markdown HTML
     */
    get parsed_htmls()
    {
        return ( async() =>
        {
            const { config, template } = this;
            // No, 'await' has effects on this.source_markdowns. Don't move "await".
            const source_markdowns = await this.source_markdowns;
            if( source_markdowns.length > 0 && config.replaced_text )
            {
                const MDParser = new MarkdownIt();
                return source_markdowns.map( md_text =>
                    template.replace(
                        config.replaced_text,
                        MDParser.render( md_text )
                    )
                );
            }
            return [];
        })();
    }
    async read_directory()
    {
        try
        {
            this.directory_files = await this.ajax_handler.read_source_directory(
                this.config.source_directory, item => item.name.match( /.md$/g )
            );
        }
        catch ( err )
        {
            return error_handling( err );
        }
    }
    async set_template()
    {
        this.template = await read_template_file( this.config.template_file, this.fs_handler );
    }
    async write_files()
    {
        const parsed_htmls = await this.parsed_htmls;
        this.fs_handler.write_files_to_destination({
            dest_dir: this.config.destination_directory,
            dir_files: this.directory_files,
            mode: this.config.mode,
            parsed_htmls,
        });
    }
    async main( config = {})
    {
        this.config = config;
        await this.read_directory();
        await this.ajax_handler.set_source_markdowns( this.directory_files );
        await this.set_template();
        await this.write_files();
    }
}

module.exports = BlogAJAXGenerator;
