const fs = require( "fs" );
const axios = require( "axios" );
const MarkdownIt = require( "markdown-it" );
const MDParser = new MarkdownIt();

const error_handling = up =>
{
    console.error( up );
    throw up;
};

class StaticSiteGenerator 
{
    config = {};
    directory_files = [];
    template = "";
    /**
     * @returns {Array} - Markdown texts by file
     */
    get source_markdowns()
    {
        // https://flaviocopes.com/javascript-async-await-array-map
        // https://stackoverflow.com/questions/40140149
        // https://stackoverflow.com/questions/33879401
        if( this.directory_files.length > 0 )
        {
            const read_file = source_file =>
            {
                const fpath = `${ this.config.source_directory }/${ source_file }`;
                return new Promise(( resolve, reject ) =>
                    fs.readFile( fpath, "utf8", ( error, md_file ) =>
                    {
                        if( error ) reject( new Error( error ));
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
    /**
     * @returns {Array} - HTML texts with parsed Markdown HTML
     */
    get parsed_htmls()
    {
        return ( async() =>
        {
            const { config, template } = this;
            const source_markdowns = await this.source_markdowns;
            if( source_markdowns.length > 0 && config.replaced_text )
            {
                return source_markdowns.map( md_text =>
                    template.replace(
                        config.replaced_text,
                        MDParser.render( md_text )
                    )
                );
            }
            return [];
        })();
    }
    async set_config( config_path = "src/config.json" )
    {
        try 
        {
            const config = await new Promise(( resolve, reject ) =>
                fs.readFile( config_path, "utf8", ( fs_error, file ) => 
                {
                    if ( fs_error ) reject( new Error( fs_error ));
                    try 
                    {
                        const result = JSON.parse( file );
                        resolve( result );
                    }
                    catch ( json_error ) 
                    {
                        reject( new Error( json_error ));
                    }
                })
            );
            return this.config = config;
        }
        catch ( error ) 
        {
            return error_handling( error );
        }
    }
    async read_directory()
    {
        const { source_directory, mode } = this.config;
        const by_localfile = ({ source_directory, resolve, reject }) =>
        {
            if( source_directory )
            {
                fs.readdir( source_directory, ( error, files ) =>
                {
                    if ( error ) reject( new Error( error ));
                    resolve( files );
                });
            }
        };
        const by_ajax =  ({ source_directory, resolve, reject }) =>
        {
            return axios( source_directory )
                .then( data =>
                {
                    resolve( data );
                })
                .catch( error => reject( error ));
        };
        try
        {
            const res = await new Promise(( resolve, reject ) =>
            {
                const event_dictionary = {
                    local: by_localfile,
                    localfile: by_localfile,
                    ajax: by_ajax,
                    remote: by_ajax,
                };
                const unknown_type = ({ reject }) => reject( new TypeError( "Unknown type" ));
                const event = event_dictionary[mode] || unknown_type;
                if( mode === "ajax" ) debugger;
                event({ source_directory, resolve, reject });
            });
            return this.directory_files = res;
        }
        catch ( error_1 )
        {
            return error_handling( error_1 );
        }
    }
    async set_template()
    {
        const { template_file } = this.config;
        if( template_file )
        {
            try
            {
                const res = await new Promise(( resolve, reject ) =>
                    fs.readFile( template_file, "utf8", ( error, files ) =>
                    {
                        if ( error ) reject( new Error( error ));
                        resolve( files );
                    })
                );
                return this.template = res;
            }
            catch ( error_1 )
            {
                return error_handling( error_1 );
            }
        }
    }
    async write_files()
    {
        const { config, directory_files } = this;
        const parsed_htmls = await this.parsed_htmls;
        const can_parse = config.destination_directory &&
            directory_files.length > 0 &&
            parsed_htmls.length > 0
        ;
        if( can_parse )
        {
            directory_files.forEach(( md_name, md_index ) =>
            {
                const file_name = config.destination_directory + "/" + md_name.replace( /.md$/g, ".html" );
                const file_data = parsed_htmls[md_index];
                fs.writeFile( file_name, file_data, "utf8", ( err ) => 
                {
                    if ( err ) throw err;
                });
            });
        }
    }
    async main( config_path = "src/config.json" )
    {
        await this.set_config( config_path );
        await this.read_directory();
        await this.set_template();
        await this.write_files();
    }
}

module.exports = StaticSiteGenerator;
