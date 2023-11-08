export enum ConfigModeEnum {
    /**
     * `ts/generators/local-files`
     */
    Local = "local",
    /**
     * `ts/generators/ajax`
     */
    Ajax = "ajax",
    AjaxIndex = "ajax-index",
    /**
     * `ts/generators/template`
     */
    Template = "template",
    /**
     * Unknown generator.
     */
    Unknown = "unknown",
}

export interface ConfigInterface {
    /**
     * Generator mode. The property specifies which generator in `ts/generators` should use.
     */
    mode: ConfigModeEnum,
    /**
     * A source API for a HTTP request in the generator.
     */
    source_directory: string,
    /**
     * Template file. The property specifies which template file in `ts/assets` should render.
     */
    template_file: string,
    /**
     * Output path. Currently the property starts with `docs/`.
     */
    destination_directory: string,
    /**
     * A keyword for the content to replace with.
     */
    replaced_text: string,
}

export interface ApiSourceItemInterface {
    id: string | number
    title: string
}

export interface BlogArticleInfoInterface {
    "id": number,
    "title": string,
    "created_at"?: string,
    "updated_at"?: string,
    "category_id": number[],
    "language": string,
}

export const IsConfigApi = (input: unknown): input is ConfigInterface[] => Array.isArray(input) ? "source_directory" in input[0] : false;
