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
        this.number = value;
    }
    get articles_with_number()
    {
        return this.articles.filter( article =>
            article.category_id.some( id => id === this.number )
        );
    }
}

class DOMRenderUtilities
{
    MODAL_DOM = {};
    _bind_modal_event()
    {
        this.MODAL_DOM.addEventListener( "click", ( event ) =>
        {
            if( event.target === event.currentTarget )
            {
                event.target.classList.toggle( "show" );
            }
        });
    }
    _tags( input = [])
    {
        if ( input.length < 1 )
        {
            return "";
        }
        return input.map( item => this._tag_template( item )).join( "" );
    }
    _tag_template( input_tag = { tag_name: "", id: 0 })
    {
        return `<a href="javascript: void(0)" class="button" data-i-btn-id="${ input_tag.id }">
            ${ input_tag.tag_name }
        </a>`;
    }
    tags_to({ the_dom_target = "#whatever", with_datas = [] })
    {
        document.querySelector( the_dom_target ).innerHTML = this._tags( with_datas ); 
    }
    modal_to( the_dom_target = "#modal" )
    {
        this.MODAL_DOM = document.querySelector( the_dom_target );
        this._bind_modal_event();
    }
    // eslint-disable-next-line brace-style
    tags_to_the_modal( tags_dom_target = "#doms", callback = () => {})
    {
        const func = (item = []) =>
        {
            item.addEventListener( "click", dom =>
            {
                callback( dom, this );
            });
        };
        [ ...document.querySelectorAll( tags_dom_target ) ].forEach( item => func( item ));
    }
    close_modal( target = "#modal .close", modal_target = "#modal" )
    {
        document.querySelector( target ).addEventListener( "click", () =>
        {
            document.querySelector( modal_target ).classList.remove( "show" );
        });
    }
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
        let articles = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/articles.json"
        });
        let tags = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/categories.json"
        });
        try
        {
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
        const render = new DOMRenderUtilities();
        const callback = ( dom, the ) =>
        {
            tags_data.store_number( parseInt( dom.target.dataset.iBtnId, 10 ));
            document.querySelector( "#modal ul" ).innerHTML = tags_data.articles_with_number.map(
                item => set_item_component(item)
            ).join( "" );
            the.MODAL_DOM.classList.add( "show" );
        };
        render.modal_to();
        render.tags_to({
            the_dom_target: "#tags-app",
            with_datas: tags_data.tags
        });
        render.tags_to_the_modal( "a[data-i-btn-id]", callback );
        render.close_modal( "#modal .close", "#modal" );
    };
    // show
    init_tags( tags_data ).then( data => render_act({ data, tags_data }));
});
