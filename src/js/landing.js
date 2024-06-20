// Tag
const GlobalTags = {
    src: [{ "id": 0, "tag_name": "unknown" }],
    get tags() { return this.src; },
    set tags(input = []) { this.src = input; },
};

// Component
class ArticlePreviewItem extends HTMLElement {
    set_link(template) {
        const aid = String( this.getAttribute("aid") );
        const link = template.querySelector("*[data-app='link']");
        const title = template.querySelector("*[data-app='title']");
        link.href = `./articles/${aid.padStart(3, "0")}.html`;
        title.textContent = this.getAttribute("title");
        if( link.href === "#" ) {
            throw new Error("Component corrupted");
        }
    }
    set_date(template) {
        const date = template.querySelector("*[data-app='date']");
        date.datetime = this.getAttribute("created");
        date.textContent = (new Date(this.getAttribute("created"))).toLocaleString();
    }
    set_tags(template) {
        function get_tags(input = "[]") {
            try {
                return JSON.parse(input);
            } catch (error) {
                return [];
            }
        }
        const tags = get_tags(this.getAttribute("tags"));
        const tags_api = GlobalTags.tags;
        const dom = template.querySelector("*[data-app='tags']");
        dom.innerHTML = "";
        tags.map( (tag) => {
            const item = tags_api.find( (its) => its.id === tag ) ?? { "id": 0, "tag_name": "unknown" };
            return `<span class="item" data-app="tag-id" data-i-btn-id="${String(item.id)}">${item.tag_name}</span>`;
        }).forEach( (tag) => {
            dom.innerHTML += tag;
        });
    }
    set_lang(template) {
        template.lang = this.getAttribute("language");
    }
    constructor() {
        super();
        const template = document.getElementById("article-preview-item").content;

        // Render attributes
        this.set_link(template);
        this.set_date(template);
        this.set_tags(template);
        this.set_lang(template);

        // Other
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));
    }
};
customElements.define("article-preview-item", ArticlePreviewItem);

// APIs
const get_article_apis = () => {
    const ajax = (api = "") => fetch( api ).then( r => r.json() );
    return Promise.all([
        // Articles
        ajax("https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/articles.json"),
        // Categories
        ajax("https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/categories.json")
    ]);
};

// Rendering
const defa = [{ "id": 0, "title": "", "category_id": [0], "language": "en", "created_at": "1970-01-01T00:00:00Z", "updated_at": "1970-01-01T00:00:00Z" }];
/**
 * 
 * @param {*} latest_articles 
 * @param {*} tags 
 */
const render_articles = (latest_articles = defa) => {
    latest_articles.map( (its) => `<article-preview-item aid="${its.id}" title="${its.title}" tags="${JSON.stringify(its.category_id)}" language="${its.language}" created="${its.created_at}"></article-preview-item>` ).forEach( (component) => {
        document.querySelector("#loading-appapp").innerHTML += component;
    });
};

// Actions
const main = () => {
    get_article_apis().then( ([articles, tags]) => {
        const article_amount = -6;
        const latest_articles = articles.slice( 1 ).slice(article_amount).reverse();
        GlobalTags.tags = tags;
        render_articles(latest_articles);
    }).catch( (e) => {
        alert(e);
    });
};
main();
