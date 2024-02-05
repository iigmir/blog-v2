import { IDateComponentElement } from "./i-date.min.js";

/**
 * To request and store the article's metadata.
 */
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
    // AJAX module: Metadata
    /**
     * ```json
{
    "message": "",
    "id": "",
    "data": {
        "id": 1,
        "title": "",
        "category_id": [
            1
        ],
        "language": "",
        "created_at": "",
        "updated_at": ""
    }
}
```
     */
    responsed_source_data = {}
    get data_api_path() {
        return `https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/articles.json`;
    }
    /**
     * Datas from AJAX result. See `responsed_source_data` for details.
     */
    get ajax_data() {
        return this.responsed_source_data.data;
    }
    // AJAX module: Tags
    tags_data = []
    get tags_api_path() {
        const in_development = location.host.includes( "127.0.0.1" );
        if( in_development ) {
            return "/docs/api/tags.json";
        }
        return "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/categories.json";
    }
    get matched_tags() {
        const data = this.responsed_source_data.data ?? { category_id: [] };
        const tag_matched = (id) => this.tags_data.find( tag => tag.id === id )?.tag_name ?? null;
        return [...data.category_id].map( tag_matched ).filter( tag => tag );
    }
    // AJAX module: Main
    request_api() {
        return new Promise( (resolve, reject) => {
            // Reject the request if no ID given
            if( !this.id ) {
                reject( "No ID given" );
            }

            // Main program
            const requests = Promise.all([
                fetch( this.tags_api_path ).then( r => r.json() ),
                fetch( this.data_api_path ).then( r => r.json() )
            ]);
            const success_callback = ([tags, metadata]) => {
                this.tags_data = tags;
                this.responsed_source_data = {
                    data: metadata.filter( ({ id }) => id == this.id )[0]
                };
                resolve( this.responsed_source_data );
            };
            const unsuccess_callback = (error) => {
                reject( error );
            };
            requests.then( success_callback ).catch( unsuccess_callback );
        });
    }
}

/**
 * The `<article-tags-app>` component.
 * @todo Extract the `<show-date />` component.
 */
class ArticleTagsAppELement extends HTMLElement {
    tags_object = null
    constructor() {
        super();
    }
    connectedCallback() {
        this.tags_object = new ArticleTagsApp();
        this.tagsapp_action();
    }
    tagsapp_action() {
        this.tags_object.set_id();
        this.tags_object.request_api().then( (data) => {
            this.render_resolved_element();
        }).catch( (error) => {
            console.error(error);
            this.render_rejected_element( error );
        });
    }
    /*
    add_loading_reminder() {
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement( "div" );
        wrapper.setAttribute( "class", "tags loading container" );
        const loading = document.createElement("p");
        loading.textContent = "Loading...";
        shadow.appendChild(wrapper);
        wrapper.appendChild(loading);
    }
    remove_loading_reminder() {
        const shadow = this.attachShadow({ mode: "open" });
        if( shadow.querySelector("footer.loading") ) {
            shadow.querySelector("footer.loading").remove();
        }
    }
    */
    // Render module
    render_resolved_element() {
        // Data layer
        const article_metadata = this.tags_object;
        const ajax_data = article_metadata.ajax_data ?? {};
        // Create a shadow root and wrapper
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement( "footer" );
        wrapper.setAttribute( "class", "tags container" );

        // Add tags: Help
        const tag_help = document.createElement("p");
        tag_help.textContent = "Tags: ";

        // Add tags: List
        const tag_list = document.createElement("ul");
        tag_list.classList.add("badges");
        tag_list.classList.add("-round");
        const list_items = article_metadata.matched_tags.map( (item) => {
            const li = document.createElement("li");
            li.classList.add("item");
            li.classList.add("click-icon");
            li.textContent = item;
            return li;
        });
        list_items.forEach( element => tag_list.appendChild( element ) );

        // Add CSS
        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "../css/new-framework.min.css");

        // Add gap
        const gap = document.createElement("span");
        gap.textContent = " ";

        // Now put it all togeter
        shadow.appendChild(css);
        shadow.appendChild(wrapper);

        // Set date: Created
        wrapper.appendChild(
            this.generate_date_component( "Created: ", "date -created", ajax_data.created_at )
        );

        wrapper.appendChild(gap);

        // Set dates: Updated
        wrapper.appendChild(
            this.generate_date_component( "Updated: ", "date -updated", ajax_data.updated_at )
        );
        wrapper.appendChild(tag_help);
        wrapper.appendChild(tag_list);
    }
    render_rejected_element(error_message = "") {
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement( "footer" );
        wrapper.setAttribute( "class", "tags container" );

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "../css/new-framework.min.css");

        const error_reminder = document.createElement("span");
        error_reminder.textContent = "Oh-oh. Something's up. :-(";
        error_reminder.dataset.errorMessage = error_message;

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
        wrapper.appendChild(error_reminder);
    }
    /**
     * See `IDateComponentElement` class for details.
     * @param {String} update_text 
     * @param {String} class_text 
     * @param {String} given_date 
     * @returns An <i-date /> element instance.
     */
    generate_date_component(update_text = "", class_text = "", given_date = "") {
        const main_component = document.createElement("i-date");
        main_component.dataset.title = update_text;
        main_component.dataset.date = given_date;
        main_component.dataset.classes = class_text;
        main_component.dataset.timezone = "Asia/Taipei";
        return main_component;
    }
}

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
    customElements.define("i-date", IDateComponentElement);
}

main();
