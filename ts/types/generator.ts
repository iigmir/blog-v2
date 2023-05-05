import type { ConfigInterface } from "./index";

class BasicGenerator {
    config: ConfigInterface;
    fs_handler: any;
    ajax_handler: any;
    main( config: ConfigInterface ): void | Promise<void> {}
}

export { BasicGenerator };
