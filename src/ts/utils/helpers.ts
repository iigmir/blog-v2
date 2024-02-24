import { ajax_url, read_source_directory } from "../utils/ajax";
import MarkdownIt from "markdown-it";
const RenderMarkdown = (md_text = "") => 
{
    const MDParser = new MarkdownIt();
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
