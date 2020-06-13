const fs = require("fs");

const error_handling = up =>
{
    console.error( up );
    throw up;
};

class StaticSiteGenerator {
    config = {};
    directory_files = [];
    get source_markdowns()
    {
        if( this.directory_files.length > 0 )
        {
            const read_file = source_file =>
            {
                const fpath = `${ this.config.source_directory }/${ source_file }`;
                return new Promise( (resolve, reject ) =>
                    fs.readFile( fpath, "utf8", ( error, md_file ) =>
                    {
                        if( error ) reject( new Error( error ) );
                        resolve( md_file );
                    })
                );
            };
            const main = this.directory_files.map(
                source_file => read_file( source_file )
            );
            return Promise.all( main ).then( x => x );
        }
        return [];
    }
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
    async main( config_path = "src/config.json" )
    {
        this.load_config( config_path );
        this.read_directory();
    }
};

module.exports = StaticSiteGenerator;
