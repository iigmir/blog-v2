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
{ "message": "", "id": "", "data": { "id": 1, "title": "", "category_id": [1], "language": "", "created_at": "", "updated_at": "" } }
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

export { ArticleTagsApp };
