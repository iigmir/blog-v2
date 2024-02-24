import fs from "fs";

class FileSystemModule
{
    /**
     * @param {String} path - Directory path
     * @returns {Promise} - If directory vaild, the Promise will contain directory file names array, else contain Error object.
     */
    static read_directory( path = "" )
    {
        return new Promise(( resolve, reject ) =>
        {
            fs.readdir( path, ( error, files ) =>
            {
                if ( error ) reject( error );
                resolve( files );
            });
        });
    }
    /**
     * @param {String} file.path - Written file path and name
     * @param {String} file.data - Written file content
     * @returns {void} Throw error if fs encounter one, else return nothing.
     */
    static write_file({ path = "", data = "" })
    {
        fs.writeFile( path, data, "utf8", ( err ) => 
        {
            if ( err ) throw err;
        });
    }
}

export default FileSystemModule;
