import { BlogArticleInfoInterface } from "../types/index";

// See: https://stackoverflow.com/a/5251552
const escape_html = (str = "") => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const render_list_items = (url = "index.html", title = "Foobar") => `<li><a href="${ url }">${ escape_html(title) }</a></li>\n`;

const get_name = (id: number) => String(id).padStart(3, "0");

const action = (item: BlogArticleInfoInterface): string => render_list_items(`${get_name(item.id)}.html`, item.title);

const main = (array: BlogArticleInfoInterface[]) => (`<ul>
${array.map(action).join("")}
</ul>`);

export default main;

