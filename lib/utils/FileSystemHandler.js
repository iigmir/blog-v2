const FileSystemModule = require( "./FileSystemModule.js" );

/**
 * The FileSystemHandler class is responsed for any methods
 * that need to deal with file system.
 */
class FileSystemHandler
{
    fs_module = new FileSystemModule()
    file_can_parse({ destination_directory, directory_files, parsed_htmls })
    {
        const result = Array.isArray( directory_files ) &&
            destination_directory &&
            directory_files.length > 0 &&
            parsed_htmls.length > 0
        ;
        if( !result )
        {
            console.warn({
                message: "The app cannot parse files because certain files failed to meet conditions.",
                source: { destination_directory, directory_files, parsed_htmls },
                result,
            });
        }
        return result;
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
    read_config_file( file_path = "" )
    {
        return this.fs_module.read_json( file_path );
    }
    read_template_file( file_path = "" )
    {
        return this.fs_module.read_file( file_path );
    }
    async read_source_markdowns({ source_directory = "", directory_files = [] })
    {
        // https://flaviocopes.com/javascript-async-await-array-map
        // https://stackoverflow.com/questions/40140149
        // https://stackoverflow.com/questions/33879401
        if( directory_files.length < 1 )
        {
            return;
        }
        const { read_file } = this.fs_module;
        const x = await Promise.all(
            directory_files.map(
                source_file => read_file( `${ source_directory }/${ source_file }` )
            )
        );
        return x;
    }
    read_source_directory( source_directory = "" )
    {
        if( source_directory )
        {
            return this.fs_module.read_directory( source_directory );
        }
    }
    write_files_to_destination({
        dest_dir = "",
        dir_files = [],
        parsed_htmls = "",
        mode = "local"
    })
    {
        const fcp_payload = {
            destination_directory: dest_dir,
            directory_files: dir_files,
            parsed_htmls
        };
        if( this.file_can_parse( fcp_payload ))
        {
            dir_files.forEach(( md_name, md_index ) =>
            {
                this.fs_module.write_file({
                    path: dest_dir + "/" + this.md_file_name( md_name, mode ),
                    data: parsed_htmls[md_index]
                });
            });
        }
    }
    write_a_file_to_destination({ dest_dir = "", parsed_htmls = "", })
    {
        this.fs_module.write_file({
            path: dest_dir,
            data: parsed_htmls
        });
    }
}

module.exports = FileSystemHandler;
