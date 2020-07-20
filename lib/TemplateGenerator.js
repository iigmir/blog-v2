const FileSystemHandler = require( "./utils/FileSystemHandler.js" );

class TemplateGenerator
{
    config = {};
    fs_handler = new FileSystemHandler();
    async main( config = {})
    {
        this.config = config;
        await this.read_file();
        await this.set_template();
        await this.write_file();
    }
}

module.exports = TemplateGenerator;
