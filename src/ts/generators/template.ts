// Generators
import { BasicGenerator, generate_default_config } from "../types/generator";
// Utils
import { read_file } from "../utils/fs";
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
        Promise.all([
            // Source index
            read_file( `${this.config.source_directory}/index.html` ),
            // Source template
            read_file( `${this.config.source_directory}/templates.html` ),
        ]).then( ([source_index_response, source_template_response]) => {
            this.source_index = String(source_index_response);
            this.source_template = String(source_template_response);
        }).catch( err => error_handling( err ) );
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
