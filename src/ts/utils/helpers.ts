import { ajax_url, read_source_directory } from "../utils/ajax";
import MarkdownIt from "markdown-it";
import MarkdownItDo from "@digitalocean/do-markdownit";

const RenderMarkdown = (md_text = "") => 
{
    const get_enabled_plugins = (accepted_plugins: string[]) => {
        const all_plugins = [
            "highlight",
            "user_mention",
            "html_comment",
            "image_caption",
            "table_wrapper",
            "callout",
            "rsvp_button",
            "terminal_button",
            "columns",
            "details",
            "glob",
            "dns",
            "asciinema",
            "codepen",
            "glitch",
            "caniuse",
            "youtube",
            "wistia",
            "vimeo",
            "twitter",
            "instagram",
            "slideshow",
            "compare",
            "underline",
            "fence_label",
            "fence_secondary_label",
            "fence_environment",
            "fence_prefix",
            "fence_pre_attrs",
            "fence_classes",
            "heading_id",
            "image_settings",
            "prismjs",
            "limit_tokens"
        ];
        return Object.fromEntries(
            all_plugins.map( (plugin) => ([plugin, accepted_plugins.includes(plugin)]) )
        );
    };
    const options = { ...get_enabled_plugins(["youtube", "codepen"]) };
    const MDParser = new MarkdownIt().use(MarkdownItDo, options);
    try 
    {
        /**
         *.replace(/&lt;the-tag\/?&gt;/g, "<the-tag/>");
         */
        const result = MDParser.render(md_text)
            // HTML replacements
            .replace(/&lt;(\/?small|iframe)&gt;/g, (match, p1) => {
                return `<${p1}>`;
            });
        return result;
    }
    catch (error) 
    {
        console.warn(error);
        return "";
    }
};

const RequestSource = async(source_directory: string | object) =>
{
    const is_ajax = typeof( source_directory ) === "string";
    const directly_import = typeof( source_directory ) === "object";
    const action = (resolve: (value: unknown) => void, reject: (reason?: any) => void): void =>
    {
        if (is_ajax) {
            read_source_directory(source_directory).then(r => resolve(r)).catch(e => reject(e));
            return;
        } else if (directly_import) {
            resolve(source_directory);
            return;
        }
        reject(new Error("Unspecified type"));
    };
    return new Promise( action );
};

const RequestSourceByURL = async(source_directory: string) => ajax_url(source_directory);

export { RenderMarkdown, RequestSourceByURL, RequestSource };
