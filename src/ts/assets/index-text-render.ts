import { BlogArticleInfoInterface } from "../types/index";

// See: https://stackoverflow.com/a/5251552
const escape_html = (str = "") => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * render_date(new Date("2020-04-01T11:22:33Z")) // returns "2019-04-08" 
 * @param date Input date
 * @returns A date string. Currently YMD format.
 */
const render_date = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

const action = (item: BlogArticleInfoInterface): string => `<li title="${escape_html(item.title)}, created at ${item.created_at}">
    <span class="number">#${item.id}</span>
    (<time datetime="${item.created_at}">${render_date(new Date(item.created_at ?? ""))}</time>):
    <a href="${String(item.id).padStart(3, "0")}.html">${ escape_html(item.title) }</a>
</li>
`;

const main = (array: BlogArticleInfoInterface[]) => (`<ul>
${array.map(action).join("")}</ul>`);

export default main;

