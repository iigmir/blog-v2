import error_handling from "./utils/error-handling";
import { read_config_file } from "./utils/fs";
import { ConfigModeEnum } from "./types/index";
import type { ConfigInterface } from "./types/index";
// ConfigModeEnum, 

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

const exexute_module = (config: ConfigInterface) =>
{
    const get_instance = (mode: ConfigModeEnum) =>
    {
        switch (mode) {
            case ConfigModeEnum.Local: return 1;
            case ConfigModeEnum.Ajax: return 2;
            case ConfigModeEnum.AjaxIndex: return 3;
            case ConfigModeEnum.Template: return 4;
            default: return ConfigModeEnum.Unknown;
        }
    };
    let app = get_instance( config.mode );
    // app.main( config );
}

const exexute = (site_data: StaticSiteData) =>
{
    const fn = (config: ConfigInterface) => { exexute_module( config ); };
    site_data.config.forEach( fn );
}

export const main = (config_path = "src/config.json") =>
{
    const site_data = new StaticSiteData();
    site_data.set_config( config_path );
    exexute( site_data );
};
