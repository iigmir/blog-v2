const axios = require( "axios" );

class AJAXHandler
{
    source_markdowns = [];
    set_source_markdowns( directory_files = [])
    {
        this.source_markdowns = this.read_source_markdowns( directory_files );
    }
    /**
     * AJAX request.
     * @param {String} source_directory Requesting API.
     * @param {Function} condition 給定的過濾條件。
     */
    read_source_directory( source_directory = "" )
    {
        return new Promise(( resolve, reject ) =>
        {
            return axios( source_directory )
                .then( data => resolve( data.data ))
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
