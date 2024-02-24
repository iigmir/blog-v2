import fs from "fs";

class FileSystemModule
{
    /**
     * [TODO] Once we know how to extract `fs.writeFile` properly, this object will meet its end.
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
