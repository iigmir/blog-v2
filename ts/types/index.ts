export enum ConfigModeEnum {
    Local = "local",
    Ajax = "ajax",
    AjaxIndex = "ajax-index",
    Template = "template",
    Unknown = "unknown"
}

export interface ConfigInterface {
    mode: ConfigModeEnum,
    source_directory: string,
    template_file: string,
    destination_directory: string,
    replaced_text: string,
}