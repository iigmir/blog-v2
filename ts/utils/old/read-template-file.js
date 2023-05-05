const error_handling = require( "./error-handling.js" );

module.exports = async( template_file, fs_handler ) =>
{
    if( template_file )
    {
        try
        {
            const res = await fs_handler.read_template_file( template_file );
            return res;
        }
        catch ( err )
        {
            return error_handling( err );
        }
    }
};
