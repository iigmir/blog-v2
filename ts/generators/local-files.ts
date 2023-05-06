import { BasicGenerator, generate_default_config } from "../types/generator";
import { RenderMarkdown } from "../utils/helpers.js";
import { fs_read_source_directory, read_source_markdowns } from "../utils/handlers";
import { write_files_to_destination } from "../utils/fs";
import error_handling from "../utils/error-handling.js";
import read_template_file from "../utils/read-template-file.js";
import type { ConfigInterface } from "../types/index";

class LocalFileGenerator implements BasicGenerator
{
    config = generate_default_config();
    directory_files: string[] = [];
    template = "";
    fs_handler = null;
    // ajax_handler = new AJAXDatas();
    /**
     * @returns {Array} - Markdown texts by file
     */
    get source_markdowns()
    {
        return read_source_markdowns({
            source_directory: this.config.source_directory,
            directory_files: this.directory_files
        });
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
            const check_type = (markdowns: unknown, replaced_text: string) => {
                if( Array.isArray( markdowns ) ) {
                    if( markdowns.length > 0 && replaced_text ) {
                        return markdowns;
                    }
                }
                return [];
            };
            const a = check_type(source_markdowns, config.replaced_text);
            return a.map( md_text =>
                template.replace( config.replaced_text, RenderMarkdown( md_text ) )
            );
        })();
    }
    async read_directory()
    {
        try
        {
            const res = await fs_read_source_directory(this.config.source_directory);
            if( Array.isArray(res) ) {
                this.directory_files = res;
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
        const parsed_htmls = await this.parsed_htmls;
        write_files_to_destination({
            dest_dir: this.config.destination_directory,
            dir_files: this.directory_files,
            mode: this.config.mode,
            parsed_htmls,
        });
    }
    async main( config: ConfigInterface )
    {
        this.config = config;
        await this.read_directory();
        await this.set_template();
        await this.write_files();
    }
}

export default LocalFileGenerator;
