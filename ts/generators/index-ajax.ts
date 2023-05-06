import render_list from "../assets/index-text-render";
import error_handling from "../utils/error-handling.js";
import { read_file } from "../utils/fs";
import { ajax_url } from "../utils/ajax";
import { BlogArticleInfoInterface } from "../types/index";
import { BasicGenerator, generate_default_config } from "../types/generator";
import { fs_write_a_file_to_destination } from "../utils/handlers";
import type { ConfigInterface } from "../types/index";

class IndexAJAXGenerator implements BasicGenerator
{
    config = generate_default_config();
    template: string = "";
    list: BlogArticleInfoInterface[] = [];
    get list_template()
    {
        return render_list( this.list );
    }
    /**
     * @returns HTML texts with parsed Markdown HTML
     */
    get parsed_html()
    {
        return this.template.replace( this.config.replaced_text, this.list_template );
    }
    get write_file_params()
    {
        return {
            path: this.config.destination_directory,
            data: this.parsed_html,
        };
    }
    async get_api()
    {
        try {
            const res = await ajax_url( this.config.source_directory );
            this.list = res.data;
        } catch (error) {
            error_handling( error );
        }
    }
    async set_template()
    {
        const template = await read_file(this.config.template_file);
        this.template = String( template );
    }
    async write_file()
    {
        fs_write_a_file_to_destination( this.write_file_params );
    }
    async main(config: ConfigInterface)
    {
        this.config = config;
        await this.get_api();
        await this.set_template();
        await this.write_file();
    }
}

export default IndexAJAXGenerator;
