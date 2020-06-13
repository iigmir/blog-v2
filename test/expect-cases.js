const config =  {
    source_directory: "test/articles",
    template_file: "test/test-suits/template.spec.html",
    destination_directory: "test/docs"
};
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

module.exports = {
    config,
    directory_files,
    source_markdowns,
    template
};
