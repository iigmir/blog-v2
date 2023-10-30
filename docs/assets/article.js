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
    responsed_data = {}
    get api_path() {
        const domain = "https://iigmir.serv00.net";
        const api = "/api/blog-metadata.php";
        const param = `?id=${this.id}`;
        return domain + api + param;
    }
    set_data_test() {
        this.responsed_data = {
            "message": "Success",
            "id": "1",
            "data": {
                "id": 1,
                "title": "Test",
                "category_id": [1, 2, 3],
                "language": "zh-Hant-TW",
                "created_at": "2023-04-27T17:11:36Z",
                "updated_at": "2023-04-27T17:11:36Z"
            }
        }
    }
    request_api() {
        return new Promise( (resolve, reject) => {
            if( this.id ) {
                this.set_data_test();
                resolve( this.responsed_data );
                return;
                const response = fetch( this.api_path ).then( r => r.json() );
                response.then( (response) => {
                    this.responsed_data = response;
                    resolve( this.responsed_data );
                }).catch( error => reject( error ) );
            } else {
                reject( "No ID given" );
            }
        });
    }
    // Main method
    main() {
        this.set_id();
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
            console.log(data);
        }).catch( error => {
            console.error(error);
        });
    }
    // Render module
    render_element() {
        // 
    }
}

function main() {
    customElements.define("article-tags-app", ArticleTagsAppELement);
}

main();
