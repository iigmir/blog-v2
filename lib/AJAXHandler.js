const axios = require( "axios" );

class AJAXHandler
{
    source_markdowns = [];
    set_source_markdowns( directory_files = [])
    {
        this.source_markdowns = this.read_source_markdowns( directory_files );
    }
    read_source_directory( source_directory = "", condition = () => true )
    {
        return new Promise(( resolve, reject ) =>
        {
            return axios( source_directory )
                .then( data => resolve(
                    data.data.filter( item => condition( item )).map( item => item.download_url )
                ))
                .catch( error => reject( error ));
        });
    }
    async read_source_markdowns( directory_files = [])
    {
        const ajax = async( url = "" ) =>
        {
            try
            {
                const response = await axios.get( url );
                return response.data;
            }
            catch ( error )
            {
                return error;
            }
        };
        const main = directory_files.map(
            url => ajax( url )
        );
        const x = await Promise.all( main );
        return x;
    }
}

module.exports = AJAXHandler;
