import { BasicGenerator, generate_default_config } from "../types/generator";
import error_handling from "../utils/error-handling.js";
import read_template_file from "../utils/read-template-file.js";
import new_index_text from "../new-index-text-ts";
import { fs_read_source_directory, fs_write_a_file_to_destination } from "../utils/handlers";
import type { ApiSourceItemInterface, ConfigInterface } from "../types/index";

class IndexAJAXGenerator implements BasicGenerator
{
    config: ConfigInterface = generate_default_config();
    api_source: ApiSourceItemInterface[] = [];
    template = "";
    /**
     * @returns {Array} - Remanting API items
     */
    get api_remanting()
    {
        const items = (item: ApiSourceItemInterface): { id: string | number; title: string; } => ({
            id: item.id,
            title: item.title
        });
        return this.api_source.length > 0 ? this.api_source.map( items ) : [];
    }
    get write_file_params()
    {
        return {
            path: this.config.destination_directory,
            data: this.parsed_htmls,
        };
    }
    /**
     * @returns HTML texts with parsed Markdown HTML
     */
    get parsed_htmls()
    {
        if( this.api_remanting.length > 0 && this.config.replaced_text )
        {
            const new_api_dom = new_index_text( this.api_remanting );
            return this.template.replace( this.config.replaced_text, new_api_dom );
        }
        return "";
    }
    async read_api()
    {
        try
        {
            const a = await fs_read_source_directory( this.config.source_directory );
            if( Array.isArray(a) ) {
                this.api_source = a;
            }
        }
        catch ( err )
        {
            return error_handling( err );
        }
    }
    async set_template()
    {
        const res = await read_template_file(this.config.template_file);
        if( typeof(res) === "string" ) this.template = res;
    }
    async write_files()
    {
        fs_write_a_file_to_destination(this.write_file_params);
    }
    async main( config: ConfigInterface )
    {
        this.config = config;
        await this.read_api();
        await this.set_template();
        await this.write_files();
    }
}

export default IndexAJAXGenerator;
