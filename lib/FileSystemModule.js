const fs = require( "fs" );

class FileSystemModule
{
    /**
     * @param {String} path - File path
     * @returns {Promise} - If file vaild, the Promise will contain file content, else contain Error object.
     */
    read_file( file_path = "" )
    {
        return new Promise(( resolve, reject ) =>
            fs.readFile( file_path, "utf8", ( error, files ) =>
            {
                if ( error ) reject( new Error( error ));
                resolve( files );
            })
        );
    }
    /**
     * @param {String} path - Directory path
     * @returns {Promise} - If directory vaild, the Promise will contain directory file names array, else contain Error object.
     */
    read_directory( path = "" )
    {
        return new Promise(( resolve, reject ) =>
        {
            fs.readdir( path, ( error, files ) =>
            {
                if ( error ) reject( new Error( error ));
                resolve( files );
            });
        });
    }
    /**
     * @param {String} path - JSON file path
     * @returns {Promise} - If JSON file vaild, the Promise will contain JSON, else contain Error object.
     */
    read_json( file_path = "" )
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
    /**
     * @param {String} file.path - Written file path and name
     * @param {String} file.data - Written file content
     * @returns {void} Throw error if fs encounter one, else return nothing.
     */
    write_file({ path = "", data = "" })
    {
        fs.writeFile( path, data, "utf8", ( err ) => 
        {
            if ( err ) throw err;
        });
    }
}

module.exports = FileSystemModule;

