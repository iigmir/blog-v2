const fs = require("fs");

const error_handling = up =>
{
    console.error( up );
    throw up;
};

class StaticSiteGenerator {
    config = {};
    directory_files = [];
    async load_config( config_path = "src/config.json" )
    {
        return new Promise( ( resolve, reject ) =>
            fs.readFile( config_path, "utf8", (error, file) =>
            {
                if( error ) reject( new Error( error ) );
                resolve( file );
            })
        ).then( res => this.config = JSON.parse( res ) )
        .catch( error => error_handling( error ) );
    }
    async read_directory()
    {
        const { config } = this;
        if( config.source_directory )
        {
            return new Promise( ( resolve, reject ) =>
                fs.readdir( config.source_directory, ( error, files ) =>
                {
                    if( error ) reject( new Error( error ) );
                    resolve( files );
                })
            ).then( res => this.directory_files = res )
            .catch( error => error_handling( error ) );
        }
    }
};

module.exports = StaticSiteGenerator;
