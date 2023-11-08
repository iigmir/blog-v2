// Generators
import { BasicGenerator, generate_default_config } from "../types/generator";
// Utils
import FileSystemModule from "../utils/FileSystemModule.js";
import error_handling from "../utils/error-handling.js";
import jsdom from "jsdom";
// Types
import type { ConfigInterface } from "../types/index";

class TemplateGenerator implements BasicGenerator
{
    config = generate_default_config();
    source_index = "";
    source_template = "";
    async read_file()
    {
        const source_index = this.config.source_directory + "/index.html";
        const source_template = this.config.source_directory + "/templates.html";
        FileSystemModule.read_file( source_index ).then( (res) => { this.source_index = res; }).catch( err => error_handling( err ) );
        FileSystemModule.read_file( source_template ).then( (res) => { this.source_template = res; }).catch( err => error_handling( err ) );
    }
    set_template()
    {
        const { JSDOM } = jsdom;
        const index = new JSDOM( this.source_index );
        const templates = new JSDOM( this.source_template );
        const index_array = [ ...index.window.document.querySelectorAll( this.config.replaced_text ) ];
        const templates_array = [ ...templates.window.document.querySelectorAll( "template" ) ];
    }
    async main( config: ConfigInterface )
    {
        this.config = config;
        await this.read_file();
        await this.set_template();
        // await this.write_file();
    }
}

export default TemplateGenerator;
