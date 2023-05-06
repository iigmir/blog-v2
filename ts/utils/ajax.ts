import axios from "axios";

export const ajax_url = (source_directory: string) => axios(source_directory);

/**
 * AJAX request.
 * @param source_directory Requesting API.
 * @returns AJAX instance
 */
export const read_source_directory = ( source_directory: string ) =>
{
    return new Promise( (resolve, reject) => {
        const res = (data = { data: {} }) => resolve(data.data);
        const rej: ((reason: any) => void | PromiseLike<void>) | null | undefined = error => reject(error);
        axios(source_directory).then( res ).catch( rej )
    });
}

/**
 * 
 * @param directory_files Group of URLs
 * @returns AJAX instance
 */
export const read_source_markdowns = async(directory_files: string[]) =>
{
    // : Promise<string[]>
    return new Promise( (resolve, reject) => {
        const fn = directory_files.map( url => axios.get( url ) );
        Promise.all( fn ).then( results => resolve(results) ).catch( error => reject( error ) );
    });
}

export class AJAXDatas {
    source_markdowns: string[] = [];
    /**
     * @param directory_files Requesting directories
     * @returns 
     */
    async set_source_markdowns( directory_files: string[] )
    {
        return new Promise( (resolve, reject) => {
            read_source_markdowns( directory_files ).then( (contents) => {
                if( Array.isArray(contents) ) {
                    this.source_markdowns = contents;
                    resolve( contents );
                }
                reject( contents );
            }).catch( contents => reject( contents ) );
        });
    }
}
