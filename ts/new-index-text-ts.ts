import type { ApiSourceItemInterface } from "./types/index";

const render_list_items = ( url = "index.html", title = "Foobar" ) => (
    `<li><a href="${ url }">${ title }</a></li>\n`
);

const main = (array: ApiSourceItemInterface[]) => (
    `<ul>${ array.map( item => render_list_items( `${ String( item.id ).padStart( 3, "0" ) }.html`, item.title )) .join( "" ) }</ul>`
);

export default main;