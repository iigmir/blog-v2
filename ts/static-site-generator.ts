import error_handling from "./utils/error-handling";
import { read_config_file } from "./utils/fs";

enum ConfigModeEnum {
    Local = "local",
    Ajax = "ajax",
    Unknown = ""
}

interface ConfigInterface {
    mode: ConfigModeEnum,
    source_directory: string,
    template_file: string,
    destination_directory: string,
    replaced_text: string,
}

class StaticSiteData
{
    config: ConfigInterface[] = []
    async get_config (config_path: string): Promise<ConfigInterface[]>
    {
        try
        {
            const check_int = (input: any): input is ConfigInterface[] => Array.isArray(input) ? "source_directory" in input[0] : false;
            const config = await read_config_file( config_path );
            return check_int( config ) ? config : [];
        }
        catch (error)
        {
            console.error(error);
            return [];
        }
    }
    async set_config( config_path = "src/config.json" )
    {
        try {
            const config = await this.get_config( config_path );
            this.config = config;
        } catch (error) {
            error_handling( error );
        }
    }
}

export const main = (config_path = "src/config.json") =>
{
    const site_data = new StaticSiteData();
    site_data.set_config( config_path );
    // exexute( site_data );
};
