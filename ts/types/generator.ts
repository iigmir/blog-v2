import type { ConfigInterface } from "./index";
import { ConfigModeEnum } from "./index";

class BasicGenerator {
    config: ConfigInterface = {
        mode: ConfigModeEnum.Unknown,
        source_directory: "",
        template_file: "",
        destination_directory: "",
        replaced_text: "",
    };
    // fs_handler: any;
    // ajax_handler: any;
    main( config: ConfigInterface ): void | Promise<void> {}
}

const generate_default_config = (): ConfigInterface => ({
    mode: ConfigModeEnum.Unknown,
    source_directory: "",
    template_file: "",
    destination_directory: "",
    replaced_text: "",
});

export { BasicGenerator, generate_default_config };
