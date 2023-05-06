import error_handling from "./utils/error-handling";
import { read_config_file } from "./utils/fs";
import { ConfigModeEnum, IsConfigApi } from "./types/index";
import type { ConfigInterface } from "./types/index";
import { IndexAJAXGenerator, BlogAJAXGenerator, LocalFileGenerator, TemplateGenerator } from "./generators/index";

class StaticSiteData
{
    config: ConfigInterface[] = []
    async get_config (config_path: string): Promise<ConfigInterface[]>
    {
        try
        {
            const config = await read_config_file( config_path );
            return IsConfigApi( config ) ? config : [];
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
        class Errr { main(err: any) { console.warn( "No such type:", err ); } }
        switch (mode) {
            case ConfigModeEnum.Local: return LocalFileGenerator;
            case ConfigModeEnum.Ajax: return BlogAJAXGenerator;
            // FIXME: The `IndexAJAXGenerator` class is known for error: `Error: ENOENT: no such file or directory, scandir directory/api`
            // case ConfigModeEnum.AjaxIndex: return IndexAJAXGenerator;
            case ConfigModeEnum.Template: return TemplateGenerator;
            default: return Errr;
        }
    };
    const App = get_instance( config.mode );
    const action = new App();
    action.main( config );
}

const exexute = (site_data: StaticSiteData) =>
{
    const fn = (config: ConfigInterface) => { exexute_module( config ); };
    site_data.config.forEach( fn );
}

export const main = async (config_path = "src/config.json") =>
{
    const site_data = new StaticSiteData();
    await site_data.set_config( config_path );
    exexute( site_data );
};
