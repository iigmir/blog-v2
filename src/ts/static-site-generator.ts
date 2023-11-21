import { IndexAJAXGenerator, BlogAJAXGenerator, LocalFileGenerator, TemplateGenerator } from "./generators/index";
import { ConfigModeEnum, IsConfigApi } from "./types/index";
import type { ConfigInterface } from "./types/index";
import error_handling from "./utils/error-handling";
import { read_config_file } from "./utils/fs";

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

const exexute_generators = (config: ConfigInterface) =>
{
    const get_generator = (mode: ConfigModeEnum) =>
    {
        class Errr { main(err: any) { console.warn( "No such type:", err ); } }
        switch (mode) {
            case ConfigModeEnum.Local: return LocalFileGenerator;
            case ConfigModeEnum.Ajax: return BlogAJAXGenerator;
            case ConfigModeEnum.AjaxIndex: return IndexAJAXGenerator;
            case ConfigModeEnum.Template: return TemplateGenerator;
            default: return Errr;
        }
    };
    const App = get_generator( config.mode );
    const action = new App();
    action.main( config );
}

export const main = async (config_path = "src/config.json") =>
{
    const site_data = new StaticSiteData();
    await site_data.set_config( config_path );
    site_data.config.forEach( (config: ConfigInterface) =>
        { exexute_generators( config ); }
    );
};
