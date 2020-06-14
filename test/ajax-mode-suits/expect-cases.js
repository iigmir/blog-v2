const config = require( "./config.json" );
const { read_file, read_array_file } = require( "../test-suits/utils.js" );

const directory_files = [
    "https://raw.githubusercontent.com/iigmir/blog-source/master/README.md"
];
const source_markdowns = [
    `# Blog source
Articles from my old blog. May be my new blog site?

## Scripts
### How to use
Except shell script \`./scripts/generate.sh\` should use following command:
\`\`\`
$ chmod 777 ./scripts/generate.sh
$ ./scripts/generate.sh
\`\`\`
Other scripts are written in JavaScript files, should use following command:
\`\`\`
$ node ./scripts/***.sh
\`\`\`

About what those scripts for, refer each script files.`
];
const template = read_file( "test/ajax-mode-suits/template.spec.html" );
const parsed_htmls = read_array_file([ read_file( "test/ajax-mode-suits/expected.html" ) ]);

module.exports = {
    config,
    directory_files,
    source_markdowns,
    template,
    parsed_htmls
};
