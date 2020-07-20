// eslint-disable-next-line no-undef
$( document ).ready(() =>
{
    const init_tags = async() =>
    {
        const articles = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/new-category-ids.json"
        });
        const tags = await $.ajax({
            url: "https://raw.githubusercontent.com/iigmir/blog-source/master/info-files/categories.json"
        });
        return { articles, tags };
    };
    const datas = init_tags();
});
