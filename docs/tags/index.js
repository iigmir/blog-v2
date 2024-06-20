class TagsData
{
    articles = [];
    tags = [];
    number = null;
    store_articles( value = [])
    {
        this.articles = value;
    }
    store_tags( value = [])
    {
        this.tags = value;
    }
    store_number( value = null )
    {
        this.number = parseInt(value, 10);
    }
    get articles_with_number()
    {
        return this.articles.filter( article =>
            article.category_id.some( id => id === this.number )
        );
    }
}

/**
 * Show and close buttons
 */
function assign_tag_app_actions()
{
    const dialog = document.querySelector("#tag-app dialog");
    // "Close" button closes the dialog
    const close_button = document.querySelector("#tag-app *[data-iapp-action='close']");
    close_button.addEventListener("click", () => {
        dialog.close();
    });
}

function render_tag_app( tags_data = new TagsData )
{
    // Render new tags and assign their action
    const tags = tags_data.tags;
    document.querySelector("#tags-app").innerHTML += tags.map( (tag = { "id": 0, "tag_name": "Unknown" }) =>
        `<a href="javascript: void(0)" class="button" data-iapp-action="open" data-iapp-id="${tag.id}">${tag.tag_name}</button>`
    ).join( "" );
    // "Show the dialog" button opens the dialog modally
    const render2 = (event) => {
        tags_data.store_number(event.target.dataset.iappId);
        // console.log( tags_data.articles_with_number );
        // #tag-app *[data-iapp-render='tags-list']
        document.querySelector("#tag-app dialog").showModal();
    };
    [...document.querySelectorAll("#tags-app *[data-iapp-action='open']")].forEach( (shown_buttons) => {
        shown_buttons.addEventListener("click", render2 );
    });
    // Dialog action
    assign_tag_app_actions();
}


/**
 * Renders:
 * ```html
 * <li> <a href="../articles/007.html">SPY FAMILY</a> </li>
```
 * @param {Object} item Blog item
 * @returns 
 */
const set_item_component = (item = { id: 1, title: "" }) => `<li>
    <a href="../articles/${String(item.id).padStart( 3, "0" )}.html">${item.title}</a>
</li>`;

$( document ).ready(() =>
{
    let tags_data = new TagsData();
    const init_tags = async( tags_data = TagsData ) =>
    {
        try
        {
            let articles = await $.ajax({
                url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/articles.json"
            });
            let tags = await $.ajax({
                url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/categories.json"
            });
            // Store value to TagsData object
            tags_data.store_articles( JSON.parse( articles ));
            tags_data.store_tags( JSON.parse( tags ));
            // Return value
            return {
                articles: JSON.parse( articles ),
                tags: JSON.parse( tags ),
            };
        }
        catch( error )
        {
            return { articles, tags };
        }
    };
    const render_act = ({ tags_data = TagsData }) =>
    {
        render_tag_app( tags_data );
    };
    // show
    init_tags( tags_data ).then( data => render_act({ data, tags_data }));
});
