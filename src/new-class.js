const util = require("util");
const fs = require("fs");

class StaticSiteGenerator {
    config = {};
    directory_files = [];
    async load_config( config_path = "src/config.json" )
    {
        return new Promise((resolve, reject) =>
            fs.readFile( config_path, "utf8", (error, file) =>
            {
                if( error ) reject( new Error( error ) );
                resolve( file );
            })
        ).then( res => this.config = JSON.parse( res ) )
        .catch( e =>
        {
            console.error( e );
            throw e;
        });
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

module.exports = StaticSiteGenerator;
