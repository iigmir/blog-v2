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
        if( directory_files.length < 1 )
        {
            return;
        }
        const main = directory_files.map(
            source_file => this.fs_module.read_file(
                `${ source_directory }/${ source_file }`
            )
        );
        const x = await Promise.all( main );
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
        if( this.file_can_parse({ dest_dir, dir_files, parsed_htmls }))
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
}

module.exports = FileSystemHandler;
