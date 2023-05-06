import { main as StaticSiteGenerator } from "./static-site-generator";

const main = async() =>
{
    StaticSiteGenerator( "config.json" );
};

main();
