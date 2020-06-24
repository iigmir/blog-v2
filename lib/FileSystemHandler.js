const fs = require( "fs" );

/**
 * The FileSystemHandler class is responsed for any methods
 * that need to deal with file system.
 */
class FileSystemHandler
{
    file_can_parse({ destination_directory, directory_files, parsed_htmls })
    {
        return Array.isArray( directory_files ) &&
        destination_directory &&
        directory_files.length > 0 &&
        parsed_htmls.length > 0;
    }
    md_file_name( md_name = "", mode = "local" )
    {
        switch ( mode )
        {
        case "local":
            return md_name.replace( /.md$/g, ".html" );
        case "ajax":
            return md_name.replace( /.md$/g, ".html" ).match( /[^/]+(?=$)/g )[ 0 ];
        default:
            return md_name;
        }
    }
    /**
     * Read given config file path and return specified file.
     * @param config_path {String} - Given config file path.
     * @return {Promise} - Config object if success.
     */
    read_config_file( file_path = "" )
    {
        return new Promise(( resolve, reject ) =>
            fs.readFile( file_path, "utf8", ( fs_error, file ) => 
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
    }
    read_template_file( file_path = "" )
    {
        return new Promise(( resolve, reject ) =>
            fs.readFile( file_path, "utf8", ( error, files ) =>
            {
                if ( error ) reject( new Error( error ));
                resolve( files );
            })
        );
    }
    async read_source_markdowns({ source_directory = "", directory_files = [] })
    {
        if( directory_files.length < 1 )
        {
            return;
        }
        const fs_module = ( file_path = "" ) =>
            new Promise(( resolve, reject ) =>
                fs.readFile( file_path, "utf8", ( error, md_file ) =>
                {
                    if( error ) reject( new Error( error ));
                    resolve( md_file );
                })
            );
        const main = directory_files.map(
            source_file => fs_module( `${ source_directory }/${ source_file }` )
        );
        const x = await Promise.all( main );
        return x;
    }
    read_source_directory( source_directory = "" )
    {
        if( source_directory )
        {
            return new Promise(( resolve, reject ) =>
            {
                fs.readdir( source_directory, ( error, files ) =>
                {
                    if ( error ) reject( new Error( error ));
                    resolve( files );
                });
            });
        }
    }
    write_files_to_destination({
        dest_dir = "",
        dir_files = [],
        parsed_htmls = "",
        mode = "local"
    })
    {
        if( this.file_can_parse({ dest_dir, dir_files, parsed_htmls }))
        {
            dir_files.forEach(( md_name, md_index ) =>
            {
                const file_name = dest_dir + "/" + this.md_file_name( md_name, mode );
                const file_data = parsed_htmls[md_index];
                fs.writeFile( file_name, file_data, "utf8", ( err ) => 
                {
                    if ( err ) throw err;
                });
            });
        }
    }
}

module.exports = FileSystemHandler;
