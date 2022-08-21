const FileSystemHandler = require( "./utils/FileSystemHandler.js" );
const LocalFileGenerator = require( "./LocalFileGenerator.js" );
const IndexAJAXGenerator = require( "./IndexAJAXGenerator.js" );
const BlogAJAXGenerator = require( "./BlogAJAXGenerator.js" );
const TemplateGenerator = require( "./TemplateGenerator.js" );
const error_handling = require( "./utils/error-handling.js" );

class StaticSiteGenerator
{
    config = {};
    fs_handler = new FileSystemHandler();
    exexute_module( config = {} )
    {
        let app;
        switch ( config.mode )
        {
        case "local":
            app = new LocalFileGenerator();
            break;
        case "ajax":
            app = new BlogAJAXGenerator();
            break;
        case "ajax-index":
            app = new IndexAJAXGenerator();
            break;
        case "template":
            app = new TemplateGenerator();
            break;
        default:
            throw new Error( "Mode unavailable" );
        }
        app.main( config );
    }
    exexute()
    {
        const exexute = config => { this.exexute_module( config ); };
        if( Array.isArray( this.config ) )
        {
            this.config.forEach( exexute );
        }
        else
        {
            exexute( this.config );
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
    async main( config_path = "src/config.json" )
    {
        await this.set_config( config_path );
        this.exexute();
    }
}

module.exports = StaticSiteGenerator;
