const FileSystemModule = require( "./utils/FileSystemModule.js" );

class TemplateGenerator
{
    config = {};
    source_index_file = "";
    source_template = "";
    fs_module = new FileSystemModule();
    read_file()
    {
        // 
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
