import { main as StaticSiteGenerator } from "./ts/static-site-generator";

const main = async() =>
{
    StaticSiteGenerator( "config.json" );
};

main();
