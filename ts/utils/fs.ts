import { readFile } from "fs";

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
