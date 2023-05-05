import { read_source_directory, read_source_markdowns } from "../utils/ajax";
import MarkdownIt from "markdown-it";

const RenderMarkdown = (md_text = "") => 
{
    const MDParser = new MarkdownIt();
    try 
    {
        return MDParser.render( md_text );
    }
    catch (error) 
    {
        console.warn(error);
        return "";
    }
};

const RequestSourceByURL = (source_directory: string) => read_source_directory(source_directory);

const RequestSource = async(source_directory: string | object) =>
{
    const is_ajax = typeof( source_directory ) === "string";
    const directly_import = typeof( source_directory ) === "object";
    const action = (resolve: (value: unknown) => void, reject: (reason?: any) => void): void =>
    {
        if (is_ajax) {
            RequestSourceByURL(source_directory).then(r => resolve(r)).catch(e => reject(e));
            return;
        } else if (directly_import) {
            resolve(source_directory);
            return;
        }
        reject(new Error("Unspecified type"));
    };
    return new Promise( action );
};

export { RenderMarkdown, RequestSource };
