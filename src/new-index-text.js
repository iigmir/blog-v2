const render_list_items = ( url = "index.html", title = "Foobar" ) => (
    `<li><a href="${ url }">${ title }</a></li>\n`
);

const main = ( array = []) => (
    `<ul>
        ${
    array
        .map( item => render_list_items( item.id + ".html", item.title ))
        .join( "" )
    }
    </ul>`
);

module.exports = main;