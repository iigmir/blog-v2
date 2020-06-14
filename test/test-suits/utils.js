const fs = require( "fs" );
const read_file = ( file_path = "" ) => new Promise(( resolve, reject ) =>
    fs.readFile( file_path, "utf8", ( error, md_file ) =>
    {
        if( error ) reject( new Error( error ));
        resolve( md_file );
    }
    )
);
const read_array_file = ( input = []) => Promise.all( input ).then( x => x );

module.exports = { read_file, read_array_file };
