import { IDateComponentElement } from "./i-date.min.js";
import { ArticleTagsAppELement } from "./article-dom.min.js";

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
    customElements.define("i-date", IDateComponentElement);
}

main();
