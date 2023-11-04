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
        const domain = "https://iigmir.serv00.net";
        const api = "/api/blog-metadata.php";
        const param = `?id=${this.id}`;
        return domain + api + param;
    }
    set_data_test() {
        this.responsed_source_data = {
            "message": "Success",
            "id": "1",
            "data": {
                "id": 1,
                "title": "Test",
                "category_id": [1, 2, 3],
                "language": "zh-Hant-TW",
                "created_at": "2000-01-01T10:11:12Z",
                "updated_at": "2000-01-01T10:11:12Z"
            }
        }
        this.tags_data = [
            { "id": 1, "tag_name": "Example 1" },
            { "id": 2, "tag_name": "Example 2" },
        ];
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
            if( this.id ) {
                // this.set_data_test();
                // resolve( this.responsed_source_data );
                // return;
                // Main program
                const requests = Promise.all([
                    fetch( this.tags_api_path ).then( r => r.json() ),
                    fetch( this.data_api_path ).then( r => r.json() )
                ]);
                const success_callback = ([tags, metadata]) => {
                    this.tags_data = tags;
                    this.responsed_source_data = metadata;
                    resolve( this.responsed_source_data );
                };
                requests.then( success_callback );
            } else {
                reject( "No ID given" );
            }
        });
    }
}

/**
 * The `<article-tags-app>` component.
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
            this.render_element();
        }).catch( (error) => {
            console.error(error);
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
    render_element() {
        // Data layer
        const article_metadata = this.tags_object;
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
        css.setAttribute("href", "../css/new-framework.css");

        // Add gap
        const gap = document.createElement("span");
        gap.textContent = " ";

        // Now put it all togeter
        shadow.appendChild(css);
        shadow.appendChild(wrapper);

        // Set date: Created
        wrapper.appendChild(
            this.generate_date_component( "Created: ", "date -created", article_metadata.ajax_data.created_at )
        );

        wrapper.appendChild(gap);

        // Set dates: Updated
        wrapper.appendChild(
            this.generate_date_component( "Updated: ", "date -updated", article_metadata.ajax_data.updated_at )
        );
        wrapper.appendChild(tag_help);
        wrapper.appendChild(tag_list);
    }
    new_time_element(classes = "", datetime = "") {
        const time = document.createElement("time");
        time.setAttribute("class", classes);
        time.setAttribute("datetime", datetime);
        time.textContent = datetime;
        return time;
    }
    /**
     * Get something like this:
     * `<span><time class="date -updated" datetime="1234-55-66T77:88:99Z">1234-55-66T77:88:99Z</time></span>`
     * @param {String} update_text 
     * @returns 
     */
    generate_date_component(update_text = "", class_text = "", given_date = "") {
        const main_component = document.createElement("span");
        main_component.classList.add("date-component");
        main_component.textContent = update_text;
        main_component.appendChild( this.new_time_element( class_text, given_date ) );
        return main_component;
    }
}

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
}

main();
