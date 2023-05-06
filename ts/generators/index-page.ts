import { BasicGenerator, generate_default_config } from "../types/generator";
import { ajax_url } from "../utils/ajax";
import { read_file } from "../utils/fs";
import type { ConfigInterface } from "../types/index";

class IndexPageGenerator implements BasicGenerator {
    config = generate_default_config();
    template: string = "";
    content = {};
    async get_api()
    {
        const get_json = (input: string) => {
            try {
                return JSON.parse( input );
            } catch (error) {
                console.warn("Input text is not a JSON file.", error);
                return {};
            }
        };
        const res = await ajax_url( this.config.source_directory );
        this.content = get_json( res.data );
        console.log( this.content );
    }
    async get_template()
    {
        const template = String( await read_file(this.config.template_file) );
        this.template = template;
        console.log( this.template );
    }
    async main(config: ConfigInterface)
    {
        this.config = config;
        await this.get_api();
    }
}

export default IndexPageGenerator;
