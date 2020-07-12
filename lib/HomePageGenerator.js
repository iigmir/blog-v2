const AJAXHandler = require( "./utils/AJAXHandler.js" );

class HomePageGenerator
{
    ajax_handler = new AJAXHandler();
    /**
     * @returns {Array} - Markdown texts by file
     */
    async source_files( url )
    {
        const x = await this.ajax_handler.read_source_directory( url );
        return x;
    }
}

module.exports = HomePageGenerator;
