import { BasicGenerator } from "../types/generator";
import type { ConfigInterface } from "../types/index";

import error_handling from "../utils/error-handling";
import { AJAXDatas, read_source_directory, read_source_markdowns } from "../utils/ajax";
import { RenderMarkdown, RequestSource } from "../utils/helpers";
import read_template_file from "../utils/read-template-file";

// const FileSystemHandler = require( "./utils/FileSystemHandler.js" );
// const AJAXHandler = require( "./utils/AJAXHandler.js" );
// const error_handling = require( "./utils/error-handling.js" );
// const read_template_file = require( "./utils/read-template-file.js" );
// const MarkdownIt = require( "markdown-it" );

class BlogAJAXGenerator implements BasicGenerator
{
    config: ConfigInterface;
    directory_files: string[] = [];
    template: string = "";
    // new FileSystemHandler()
    fs_handler = {};
    // new AJAXHandler()
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
            const files = await RequestSource( this.config.source_directory );
            const is_markdown = item => item.name.match(/.md$/g);
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
        const parsed_htmls = await this.parsed_htmls;
        /*
        this.fs_handler.
        write_files_to_destination({
            dest_dir: this.config.destination_directory,
            dir_files: this.directory_files,
            mode: this.config.mode,
            parsed_htmls,
        });
        */
    }
    async main( config: ConfigInterface )
    {
        this.config = config;
        await this.read_directory();
        await this.ajax_handler.set_source_markdowns( this.directory_files );
        await this.set_template();
        await this.write_files();
    }
}

module.exports = BlogAJAXGenerator;
