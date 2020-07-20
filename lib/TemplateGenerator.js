const FileSystemModule = require( "./utils/FileSystemModule.js" );
const error_handling = require( "./utils/error-handling.js" );

class TemplateGenerator
{
    config = {};
    source_index = "";
    source_template = "";
    fs_module = new FileSystemModule();
    async read_file()
    {
        const source_index = this.config.source_directory + "/index.html";
        const source_template = this.config.source_directory + "/templates.html";
        try
        {
            this.source_index = await this.fs_module.read_file( source_index );
            this.source_template = await this.fs_module.read_file( source_template );
        }
        catch ( err )
        {
            return error_handling( err );
        }
    }
    set_template()
    {
    }
    async main( config = {})
    {
        this.config = config;
        await this.read_file();
        await this.set_template();
        await this.write_file();
    }
}

module.exports = TemplateGenerator;
