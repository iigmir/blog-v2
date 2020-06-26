const FileSystemHandler = require( "./FileSystemHandler.js" );
const AJAXHandler = require( "./AJAXHandler.js" );
const MarkdownIt = require( "markdown-it" );

const error_handling = up =>
{
    console.error( up );
    throw up;
};

class StaticSiteGenerator
{
    config = {};
    directory_files = [];
    template = "";
    fs_handler = new FileSystemHandler();
    ajax_handler = new AJAXHandler();
    /**
     * Detect which mode StaticSiteGenerator instance used.
     * @return {("local"|"ajax"|"unknown")} result
     */
    get mode()
    {
        const { mode } = this.config;
        let result = "unknown";
        if( mode === "local" || mode === "localfile" )
        {
            result = "local";
        }
        if( mode === "ajax" || mode === "remote" )
        {
            result = "ajax";
        }
        return result;
    }
    /**
     * @returns {Array} - Markdown texts by file
     */
    get source_markdowns()
    {
        const { mode } = this;
        if( mode === "local" )
        {
            return this.fs_handler.read_source_markdowns({
                source_directory: this.config.source_directory,
                directory_files: this.directory_files
            });
        }
        else if( mode === "ajax" )
        {
            return this.ajax_handler.source_markdowns;
        }
        return [];
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
    async set_source_markdowns_from_ajax()
    {
        if( this.mode === "ajax" )
        {
            this.ajax_handler.set_source_markdowns( this.directory_files );
        }
    }
    async set_config( config_path = "src/config.json" )
    {
        try 
        {
            this.config = await this.fs_handler.read_config_file( config_path );
        }
        catch ( error )
        {
            return error_handling( error );
        }
    }
    async read_directory()
    {
        const handler = async({ mode = "local", directory = "" }) =>
        {
            switch( mode )
            {
            case "local" : return this.fs_handler.read_source_directory( directory );
            // Only Markdown files can store
            case "ajax"  : return this.ajax_handler.read_source_directory( directory, item => item.name.match( /.md$/g ));
            default      : return new Error( "Unsupported type" );
            }
        };
        try
        {
            this.directory_files = await handler({
                mode: this.mode,
                directory: this.config.source_directory
            });
        }
        catch ( error_1 )
        {
            return error_handling( error_1 );
        }
    }
    async set_template()
    {
        const { template_file } = this.config;
        if( template_file )
        {
            try
            {
                const res = await this.fs_handler.read_template_file( template_file );
                return this.template = res;
            }
            catch ( error_1 )
            {
                return error_handling( error_1 );
            }
        }
    }
    async write_files()
    {
        const parsed_htmls = await this.parsed_htmls;
        this.fs_handler.write_files_to_destination({
            dest_dir: this.config.destination_directory,
            dir_files: this.directory_files,
            mode: this.mode,
            parsed_htmls,
        });
    }
    async main( config_path = "src/config.json" )
    {
        await this.set_config( config_path );
        await this.read_directory();
        await this.set_source_markdowns_from_ajax();
        await this.set_template();
        await this.write_files();
    }
}

module.exports = StaticSiteGenerator;
