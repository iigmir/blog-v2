const fs = require( "fs" );
const read_file = ( file_path = "" ) => new Promise( ( resolve, reject ) =>
    fs.readFile( file_path, "utf8", ( error, md_file ) =>
    {
        if( error ) reject( new Error( error ) );
        resolve( md_file );
    }
    )
);
const read_array_file = ( input = [] ) => Promise.all( input ).then( x => x );

const config_source = require( "./test-suits/config.json" );
const config =  config_source;
const directory_files = [ "test.spec.md", ];
const source_markdowns = [ `# Test\n\nHello\n`, ];
const template = read_file( "test/test-suits/template.spec.html" );
const parsed_htmls = read_array_file( [
    read_file( "test/test-suits/expected.html" )
] );

module.exports = {
    config,
    directory_files,
    source_markdowns,
    template,
    parsed_htmls
};
