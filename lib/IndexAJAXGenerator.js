const FileSystemHandler = require( "./utils/FileSystemHandler.js" );
const AJAXHandler = require( "./utils/AJAXHandler.js" );
const error_handling = require( "./utils/error-handling.js" );
const read_template_file = require( "./utils/read-template-file.js" );
const new_index_text = require( "../src/new-index-text.js" );

class IndexAJAXGenerator
{
    config = {};
    directory_files = [];
    api_source = [];
    template = "";
    fs_handler = new FileSystemHandler();
    ajax_handler = new AJAXHandler();
    /**
     * @returns {Array} - Remanting API items
     */
    get api_remanting()
    {
        return this.api_source.length > 0 ? this.api_source.map( item => ({
            id: item.id,
            title: item.title
        })) : [];
    }
    /**
     * @returns {Array} - HTML texts with parsed Markdown HTML
     */
    get parsed_htmls()
    {
        const { config, template, api_remanting } = this;
        if( api_remanting.length > 0 && config.replaced_text )
        {
            const new_api_dom = api_remanting.map( item => (
                new_index_text( item.id + ".html", item.title )
            ));
            return template.replace( config.replaced_text, new_api_dom );
        }
        return [];
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
    async read_api()
    {
        try
        {
            const a = await this.ajax_handler.read_source_directory( this.config.source_directory );
            this.api_source = a;
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
    async main( config = {})
    {
        this.config = config;
        await this.read_api();
        await this.set_template();
        await this.write_files();
    }
}

module.exports = IndexAJAXGenerator;
