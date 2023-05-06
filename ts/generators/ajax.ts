// Generators
import { BasicGenerator, generate_default_config } from "../types/generator";
// Utils
import error_handling from "../utils/error-handling";
import read_template_file from "../utils/read-template-file";
import { AJAXDatas } from "../utils/ajax";
import { write_files_to_destination } from "../utils/fs";
import { RenderMarkdown, RequestSourceByURL } from "../utils/helpers";
// Types
import type { ConfigInterface, BlogArticleInfoInterface } from "../types/index";

class BlogAJAXGenerator implements BasicGenerator
{
    config = generate_default_config();
    directory_files: string[] = [];
    template: string = "";
    ajax_handler = new AJAXDatas();
    /**
     * @returns {Array} - Markdown texts by file
     */
    get source_markdowns(): string[]
    {
        return this.ajax_handler.source_markdowns;
    }
    /**
     * @returns {Array} - HTML texts with parsed Markdown HTML
     */
    get parsed_htmls()
    {
        const source_markdowns = this.source_markdowns;
        if( source_markdowns.length > 0 && this.config.replaced_text )
        {
            return source_markdowns.map( md_text =>
                this.template.replace( this.config.replaced_text, RenderMarkdown( md_text ) )
            );
        }
        return [];
    }
    async read_directory()
    {
        try
        {
            const get_files = async (source_directory: string | BlogArticleInfoInterface[]) => {
                if( typeof(source_directory) === "string" )
                {
                    const { data } = await RequestSourceByURL(this.config.source_directory);
                    return data as BlogArticleInfoInterface[];
                }
                else
                {
                    return Promise.resolve( source_directory );
                }
            }
            const files = await get_files( this.config.source_directory );
            const is_markdown = (item = { name: "" }) => item.name.match(/.md$/g);
            const get_array = (files: unknown) => {
                if( Array.isArray(files) ) {
                    return files.filter(is_markdown).map(item => item.download_url)
                }
                return [];
            };
            this.directory_files = get_array(files);
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
        write_files_to_destination({
            dest_dir: this.config.destination_directory,
            dir_files: this.directory_files,
            mode: this.config.mode,
            parsed_htmls: this.parsed_htmls,
        });
    }
    async main(config: ConfigInterface)
    {
        this.config = config;
        await this.read_directory();
        await this.ajax_handler.set_source_markdowns( this.directory_files );
        await this.set_template();
        await this.write_files();
    }
}

export default BlogAJAXGenerator;
