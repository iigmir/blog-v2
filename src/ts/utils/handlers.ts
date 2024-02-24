import FileSystemModule from "./FileSystemModule";

/**
 * Read source markdown files.
 * @param input Source directory and their files.
 * @param input.source_directory Usually, it's `source_directory` in config.json.
 * @param input.directory_files The files under the `source_directory` in config.json.
 * @returns Source files' content.
 */
export const read_source_markdowns = async ({ source_directory = "", directory_files = [""] }) =>
{
    // https://flaviocopes.com/javascript-async-await-array-map
    // https://stackoverflow.com/questions/40140149
    // https://stackoverflow.com/questions/33879401
    if( directory_files.length < 1 )
    {
        return;
    }
    const result = await Promise.all(
        directory_files.map(
            (filename: string) => FileSystemModule.read_file(`${ source_directory }/${ filename }`)
        )
    );
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
