import { readFile } from "fs";
import FileSystemModule from "./FileSystemModule";

export const file_can_parse = ({ destination_directory, directory_files, parsed_htmls }) =>
{
    const result = [
        Array.isArray( directory_files ),
        destination_directory,
        directory_files.length > 0,
        parsed_htmls.length > 0,
    ].some( condition => condition === false );
    if( result === true )
    {
        console.warn({
            message: "The app cannot parse files because certain files failed to meet conditions.",
            source: { destination_directory, directory_files, parsed_htmls },
            result,
        });
    }
    return result === false;
}

export const md_file_name = ( md_name = "", mode = "local" ) =>
{
    const altered_html_name = md_name.replace( /.md$/g, ".html" );
    switch ( mode )
    {
        case "local": return altered_html_name;
        case "ajax":
            const s = altered_html_name.match( /[^/]+(?=$)/g );
            return s ? s[0] : "";
        default: return md_name;
    }
}

export const write_files_to_destination = ({ dest_dir = "", dir_files = [], parsed_htmls = "", mode = "local" }) =>
{
    const fcp_payload = {
        destination_directory: dest_dir,
        directory_files: dir_files,
        parsed_htmls
    };
    if( file_can_parse( fcp_payload ))
    {
        const fn = ( md_name, md_index ) =>
        {
            const path = `${dest_dir}/${md_file_name(md_name, mode)}`;
            const data = parsed_htmls[md_index];
            FileSystemModule.write_file({ path: path, data: data });
        };
        dir_files.forEach( fn );
    }
}

/**
* @param {String} path - JSON file path
* @returns {Promise} - If JSON file vaild, the Promise will contain JSON, else contain Error object.
*/
export const read_json = ( file_path = "" ) =>
{
    return new Promise(( resolve, reject ) =>
        readFile( file_path, "utf8", ( fs_error, file ) => 
        {
            if ( fs_error ) reject( fs_error );
            try
            {
                resolve( JSON.parse( file ) );
            }
            catch ( json_error ) 
            {
                reject( new Error( json_error ) );
            }
        })
    );
};

export const read_config_file = ( file_path = "" ) =>
{
    return new Promise( (resolve, reject) =>
    {
        read_json( file_path ).then( c => resolve(c) ).catch( e => reject(e) );
    });
    // return this.fs_module.read_json( file_path );
};
