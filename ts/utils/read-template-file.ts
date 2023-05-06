import error_handling from "./error-handling";
import FileSystemModule from "./FileSystemModule";

// fs_handler
export default async ( template_path: string ) =>
{
    if( template_path )
    {
        try
        {
            const res = await FileSystemModule.read_file( template_path );
            return res;
        }
        catch ( err )
        {
            error_handling( err );
        }
    }
};
