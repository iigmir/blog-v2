import FileSystemModule from "./FileSystemModule";

export const fs_write_a_file_to_destination = ({ path = "", data = "", }) =>
{
    return FileSystemModule.write_file({ path, data });
}

export const fs_read_source_directory = ( source_directory = "" ) =>
{
    if( source_directory )
    {
        return FileSystemModule.read_directory( source_directory );
    }
    return [];
};
