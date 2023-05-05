import FileSystemModule from "./FileSystemModule";

export const read_source_markdowns = async ({ source_directory = "", directory_files = [""] }) =>
{
    // https://flaviocopes.com/javascript-async-await-array-map
    // https://stackoverflow.com/questions/40140149
    // https://stackoverflow.com/questions/33879401
    if( directory_files.length < 1 )
    {
        return;
    }
    const read_files = source_file => FileSystemModule.read_file(`${ source_directory }/${ source_file }`);
    const result = await Promise.all( directory_files.map( read_files ) );
    return result;
}

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
