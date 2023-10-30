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
    get responsed_data() {
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
                this.set_data_test();
                resolve( this.responsed_source_data );
                return;
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
    new_time_element(classes = "", datetime = "") {
        const time = document.createElement("time");
        time.setAttribute("class", classes);
        time.setAttribute("datetime", datetime);
        time.textContent = datetime;
        return time;
    }
    // Render module
    render_element() {
        // Create a shadow root and wrapper
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement( "footer" );
        wrapper.setAttribute( "class", "tags container" );

        // Set date: Created
        const created_date_container = document.createElement("span");
        created_date_container.textContent = "Created: ";
        created_date_container.appendChild(
            this.new_time_element("date -created", this.tags_object.responsed_data.created_at)
        );

        // Set dates: Updated
        const updated_date_container = document.createElement("span");
        updated_date_container.textContent = "Updated: ";
        updated_date_container.appendChild( 
            this.new_time_element("date -updated", this.tags_object.responsed_data.updated_at)
        );

        // Add tags
        const tag_help = document.createElement("p");
        tag_help.textContent = "Tags: ";
        const tag_list = document.createElement("ul");
        const list_items = this.tags_object.matched_tags.map( (item) => {
            const li = document.createElement("li");
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
        wrapper.appendChild(created_date_container);
        wrapper.appendChild(gap);
        wrapper.appendChild(updated_date_container);
        wrapper.appendChild(tag_help);
        wrapper.appendChild(tag_list);
    }
}

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
}

main();
