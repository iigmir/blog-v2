class TagsData
{
    articles = [];
    tags = [];
    store_articles( value = [])
    {
        this.articles = value;
    }
    store_tags( value = [])
    {
        this.tags = value;
    }
}

class DOMRenderUtilities
{
    _tag_template( input_tag = { tag_name: "", id: 0 })
    {
        return `<a href="javascript: void(0)" class="button" data-i-btn-id="${ input_tag.id }">
            ${ input_tag.tag_name }
        </a>`;
    }
    _tags( input = [])
    {
        if ( input.length < 1 )
        {
            return "";
        }
        return input.map( item => this._tag_template( item )).join( "" );
    }
    tags_to({ the_dom_target = "#whatever", with_datas = [] })
    {
        document.querySelector( the_dom_target ).innerHTML = this._tags( with_datas ); 
    }
    MODAL_DOM = {};
    _bind_modal_event()
    {
        // this.MODAL_DOM.class
        // TODO: Add a modal closing event.
        // So that the user can close the modal.
        console.log( this.MODAL_DOM );
    }
    modal_to( the_dom_target = "#modal" )
    {
        this.MODAL_DOM = document.querySelector( the_dom_target );
        this._bind_modal_event();
    }
    tags_to_the_modal( tags_dom_target = "#doms" )
    {
        const func = ( item = []) =>
        {
            item.addEventListener( "click", dom =>
            {
                console.log( dom, this );
            });
        };
        [ ...document.querySelectorAll( tags_dom_target ) ].forEach( item => func( item ));
    }
}

$( document ).ready(() =>
{
    let tags_data = new TagsData();
    const init_tags = async( tags_data = TagsData ) =>
    {
        let articles = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/new-category-ids.json"
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
        render.modal_to();
        render.tags_to({
            the_dom_target: "#tags-app",
            with_datas: tags_data.tags
        });
        render.tags_to_the_modal( "a[data-i-btn-id]" );
    };
    // show
    init_tags( tags_data ).then( data => render_act({ data, tags_data }));
});
