// Components
class ArticlePreviewItem extends HTMLElement {
    set_link(template) {
        const aid = String( this.getAttribute("aid") );
        const link = template.querySelector("*[data-app='link']");
        const title = template.querySelector("*[data-app='title']");
        link.href = `./articles/${aid.padStart(3, "0")}.html`;
        title.textContent = this.getAttribute("title");
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
        function get_tags_api(input = "[]") {
            try {
                return JSON.parse(input);
            } catch (error) {
                return [{ "id": 0, "tag_name": "unknown" }];
            }
        }
        const tags = get_tags(this.getAttribute("tags"));
        const tags_api = get_tags_api(this.getAttribute("tags-api"));
        const dom = template.querySelector("*[data-app='tags']");
        tags.forEach( (tag) => {
            const item = tags_api.find( (its) => its.id === tag );
            const span = document.createElement("span");
            span.classList.add("item");
            span.dataset.app = "tag-id";
            span.dataset.iBtnId = String(item.id);
            span.textContent = item.tag_name;
            dom.appendChild(span);
        });
        // <span class="item" data-app="tag-id" data-i-btn-id={TAG-ID}>{TAG-TITLE}</span>
    }
    constructor() {
        super();
        const template = document.getElementById("article-preview-item").content;

        // Append DOMs
        this.set_link(template);
        this.set_date(template);
        this.set_tags(template);

        // Append shadow root
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
const deft = [{ "id": 0, "tag_name": "unknown" }];
const render_articles = (latest_articles = defa, tags = deft) => {
    // console.log(latest_articles, tags);
};

// Actions
const main = () => {
    get_article_apis().then( ([articles, tags]) => {
        const article_amount = -6;
        const latest_articles = articles.slice( 1 ).slice( article_amount ).reverse();
        render_articles(latest_articles, tags);
    }).catch( (e) => {
        alert(e);
    });
};
main();
