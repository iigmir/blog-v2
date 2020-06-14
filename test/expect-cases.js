const config_source = require( "./test-suits/config.json" );
const config =  config_source;
const directory_files = [ "test.spec.md", ];
const source_markdowns = [ `# Test\n\nHello\n`, ];
const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
    <main>
        <!-- THE MD PARSER PARSES HERE -->
    </main>
</body>
</html>
`;
const parsed_htmls = [
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
    <main>
        <h1>Test</h1>
<p>Hello</p>

    </main>
</body>
</html>
`
];

module.exports = {
    config,
    directory_files,
    source_markdowns,
    template,
    parsed_htmls
};
