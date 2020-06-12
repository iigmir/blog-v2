class StaticSiteGenerator {
    config = {
        source_directory: "",
        template_file: "",
    };
    directory_files = [];
    constructor( config_path = "src/config.json" )
    {
        this.load_config( config_path );
    }
    load_config( config_path = "src/config.json" )
    {
        const json_factory = new Promise( config_path =>
        {
            debugger
            fs.readFile( config_path, "utf8", (error, conf) =>
            {
                if( error ) Promise.reject( error );
                try {
                    const config = JSON.parse( conf );
                    Promise.resolve( config );
                } catch ( json_error ) {
                    Promise.reject( json_error );
                }
            })
        });
        debugger;
    }
    read_directory()
    {
        const { config } = this;
        if( config.source_directory )
        {
            fs.readdir( config.source_directory, ( error, files ) =>
            {
                if( error ) throw new Error( error );
                this.directory_files = files;
            });
        }
    }
    read_markdown_files()
    {
        if( this.directory_files.length > 0 )
        {
            const { config } = this;
            const fir = fname.map( async fname_item => {
                fs.readFile( `${src_dir}/${fname_item}`, "utf8", (error, md_file) =>
                {
                    return error ? error : md_file;
                    // if( error ) return( error ); return md_file;
                })
            });
            Promise.all(fir).then( (results) =>
            {
                console.log(results)
            });
        }
    }
};