class ArticleTagsApp {
    constructor() {}
    // ID module
    id = ""
    set_id() {
        const current_article_path = location.pathname.split("articles/")[1];
        if( current_article_path ) {
            this.id = current_article_path.split(".")[0];
        }
    }
    // AJAX module
    get api_path() {
        const domain = "https://iigmir.serv00.net";
        const api = "/api/blog-metadata.php";
        const param = `?id=${this.id}`;
        return domain + api + param;
    }
    request_api() {
        console.log( this.api_path );
    }
    // Render module
    render_element() {
        // 
    }
    main() {
        this.set_id();
        if( this.id ) {
            this.request_api();
            this.render_element();
        }
    }
}

class ArticleTagsAppELement extends HTMLElement {
    tags_object = null
    constructor() {
        super();
        this.tags_object = new ArticleTagsApp();
        this.tags_object.main();
    }
}

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
}

main();
