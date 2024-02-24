import { readFile, readdir, writeFile } from "fs";

export const write_file = ({ path = "", data = "" }) =>
{
    writeFile( path, data, "utf8", ( err ) => 
    {
        if ( err ) throw err;
    });
}

export const write_files_to_destination = ({ dest_dir = "", dir_files = [""], parsed_htmls = [""], mode = "local" }) =>
{
    const file_can_parse = (dest_dir: string, dir_files: string[], parsed_htmls: string[]) =>
    {
        const result = [
            Array.isArray( dir_files ),
            dest_dir,
            dir_files.length > 0,
            parsed_htmls.length > 0
        ].some( condition => condition === false );
        if( result === true )
        {
            console.warn({
                message: "The app cannot parse files because certain files failed to meet conditions.",
                source: { destination_directory: dest_dir, directory_files: dir_files, parsed_htmls },
                result,
            });
        }
        return result === false;
    };
    if( file_can_parse(dest_dir, dir_files, parsed_htmls) )
    {
        const get_html_file_name = ( md_name = "", mode = "local" ) =>
        {
            const altered_html_name = md_name.replace( /.md$/g, ".html" );
            switch ( mode )
            {
                case "local": return altered_html_name;
                case "ajax":
                    const matches = altered_html_name.match( /[^/]+(?=$)/g );
                    return matches ? matches[0] : "";
                default: return md_name;
            }
        };
        const write_to_file = ( md_name = "", md_index = -1 ) =>
        {
            const path = `${dest_dir}/${get_html_file_name(md_name, mode)}`;
            const data = parsed_htmls[md_index];
            write_file({ path, data });
        };
        dir_files.forEach( write_to_file );
    }
}

/**
 * @param file_path File path.
 * @returns The content.
 */
export const read_file = ( file_path = "" ) =>
{
    return new Promise(( resolve, reject ) =>
        readFile( file_path, "utf8", ( fs_error, file ) => 
        {
            if ( fs_error ) {
                reject( fs_error );
            }
            resolve( file );
        })
    );
};

/**
* @param path JSON file path
* @returns If JSON file vaild, the Promise will contain JSON, else contain Error object.
*/
export const read_json = ( file_path = "" ) =>
{
    const get_json = (input: string) =>
    {
        try { return JSON.parse( input ); }
        catch (error) {
            console.warn("Input text is not a JSON file.", error);
            return false;
        }
    };
    return new Promise(( resolve, reject ) =>
    {
        read_file(file_path).then( content =>
        {
            if( get_json(content as string) ) {
                resolve(get_json(content as string));
            }
            reject( content );
        }).catch( e => reject(e) );
    });
};

export const read_config_file = ( file_path = "" ) =>
{
    return new Promise( (resolve, reject) =>
    {
        read_json( file_path ).then( c => resolve(c) ).catch( e => reject(e) );
    });
};

export const read_directory = ( path = "" ) =>
{
    return new Promise(( resolve, reject ) =>
    {
        readdir( path, ( error, files ) =>
        {
            if ( error ) {
                reject( error );
            }
            resolve( files );
        });
    });
}
