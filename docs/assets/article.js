class ArticleTagsAppELement extends HTMLElement {
    id = ""
    constructor() {
        super();
        this.set_id();
        console.log( this.id );
    }
    set_id() {
        const current_article_path = location.pathname.split("articles/")[1];
        if( current_article_path ) {
            this.id = current_article_path.split(".")[0];
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
}

main();
