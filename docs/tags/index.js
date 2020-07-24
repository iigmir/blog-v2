// eslint-disable-next-line no-undef
$( document ).ready(() =>
{
    const init_tags = async() =>
    {
        let articles = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/new-category-ids.json"
        });
        let tags = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/categories.json"
        });
        try
        {
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
    init_tags().then( data =>
    {
        const tag_template = ( input_tag = { tag_name: "", id: 0 }) =>
            `<a href="javascript: void(0)" class="button" data-i-btn-id="${ input_tag.id }">
                ${ input_tag.tag_name }
            </a>`
        ;
        const tag_templates = 
    });
});
