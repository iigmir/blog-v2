// Generators
import { BasicGenerator, generate_default_config } from "../types/generator";
// Utils
import { RenderMarkdown } from "../utils/helpers";
import { write_files_to_destination, read_file, read_directory } from "../utils/fs";
import read_template_file from "../utils/read-template-file";
import error_handling from "../utils/error-handling";
// Types
import type { ConfigInterface } from "../types/index";

class LocalFileGenerator implements BasicGenerator
{
    config = generate_default_config();
    directory_files: string[] = [];
    template = "";
    fs_handler = null;
    new_parsed_htmls: string[] = [];
    async get_new_parsed_htmls()
    {
        async function get_source_markdowns(source_directory = "", directory_files = [""]) {
            try {
                if( directory_files.length < 1 ) {
                    return [];
                }
                const result = await Promise.all(
                    directory_files.map( (filename: string) => read_file(`${ source_directory }/${ filename }`) )
                );
                return result;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        const check_type = (markdowns: unknown, replaced_text: string) => {
            if( Array.isArray( markdowns ) ) {
                if( markdowns.length > 0 && replaced_text ) {
                    return markdowns;
                }
            }
            return [];
        };
        const source_markdowns = await get_source_markdowns(this.config.source_directory, this.directory_files);
        this.new_parsed_htmls = check_type(source_markdowns, this.config.replaced_text).map( md_text =>
            this.template.replace( this.config.replaced_text, RenderMarkdown( md_text ) )
        );
    }
    async read_directory()
    {
        try
        {
            const res = await read_directory(this.config.source_directory);
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
        this.get_new_parsed_htmls().then( () => {
            write_files_to_destination({
                dest_dir: this.config.destination_directory,
                dir_files: this.directory_files,
                mode: this.config.mode,
                parsed_htmls: this.new_parsed_htmls,
            });
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
