import { read_directory } from "./fs";

export const fs_read_source_directory = ( source_directory = "" ) =>
{
    if( source_directory )
    {
        return read_directory( source_directory );
    }
    return [];
};
