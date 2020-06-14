const config_source = require( "./config.json" );
const { read_file, read_array_file } = require( "./utils.js" );
const config =  config_source;
const directory_files = [ "test.spec.md", ];
const source_markdowns = [ `# Test\n\nHello\n`, ];
const template = read_file( "test/test-suits/template.spec.html" );
const parsed_htmls = read_array_file([
    read_file( "test/test-suits/expected.html" )
]);

module.exports = {
    config,
    directory_files,
    source_markdowns,
    template,
    parsed_htmls
};
