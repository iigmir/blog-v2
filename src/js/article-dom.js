import { ArticleTagsApp } from "./tags-app.min.js";

/**
 * `Resolved` is `resolved` in [`Promimse.resolved`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve).
 */
class ResolvedElements {
    constructor(article_metadata = { matched_tags: [], ajax_data: {} }) {
        this.ajax_data = article_metadata.ajax_data;
        this.matched_tags = article_metadata.matched_tags;
    }
    /**
     * THE CSS
     */
    get css_loader() {
        const path = "../css/new-framework.min.css";
        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", path);
        return css;
    }
    /**
     * Tags list element
     * @param {Array} article_metadata 
     * @returns {Element}
     */
    get tags_list_dom() {
        const list_item_dom = (item) => {
            const li = document.createElement("li");
            li.classList.add("item");
            li.classList.add("click-icon");
            li.textContent = item;
            return li;
        };
        const tag_list = document.createElement("ul");
        tag_list.classList.add("badges");
        tag_list.classList.add("-round");
        this.matched_tags.map( list_item_dom ).forEach( element => tag_list.appendChild(element) );
        return tag_list;
    }
    /**
     * `<p>Tags: </p>`
     */
    get help_dom() {
        const dom = document.createElement("p");
        dom.textContent = "Tags: ";
        return dom;
    }
    /**
     * See `IDateComponentElement` class for details.
     * @param {String} update_text 
     * @param {String} class_text 
     * @param {String} given_date 
     * @returns An <i-date /> element instance.
     */
    generate_date_component(update_text = "", class_text = "", given_date = "") {
        const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
        const main_component = document.createElement("i-date");
        main_component.dataset.title = update_text;
        main_component.dataset.date = given_date;
        main_component.dataset.classes = class_text;
        main_component.dataset.timezone = tz;
        return main_component;
    }
    /**
     * We have: created and updated
     */
    get date_doms() {
        return {
            created: this.generate_date_component( "Created: ", "date -created", this.ajax_data.created_at ),
            updated: this.generate_date_component( "Updated: ", "date -updated", this.ajax_data.updated_at ),
        };
    }
    get date_components() {
        const component = document.createElement("div");
        component.classList.add("i-date-component");
        component.appendChild( this.date_doms.created );
        component.appendChild( this.gap_dom );
        component.appendChild( this.date_doms.updated );
        return component;
    }
    /**
     * Mind the gap
     */
    get gap_dom() {
        const gap = document.createElement("span");
        gap.textContent = "; ";
        return gap;
    }
    get lisence_dom() {
        function cc_license_link(cc_license = "BY", version = "4.0") {
            const link = document.createElement("a");
            link.target = "_blank";
            link.href = `https://creativecommons.org/licenses/${cc_license.toLocaleLowerCase()}/${version}/deed.en`;
            link.textContent = `${cc_license.toUpperCase()} ${version}`;
            return link;
        }
        function small_dom() {
            const small = document.createElement("small");
            small.style = "display: block; margin-top: 8px;";
            small.insertAdjacentText( "beforeend", "Works are licenced under " );
            small.insertAdjacentElement( "beforeend", cc_license_link("BY-ND", "4.0") );
            small.insertAdjacentText( "beforeend", " unless other licences like " );
            small.insertAdjacentElement( "beforeend", cc_license_link("BY-SA", "4.0") );
            small.insertAdjacentText( "beforeend", " applies over CC-BY-ND." );
            return small;
        }
        function img_dom() {
            const img = document.createElement("img");
            img.src = "../api/cc-by-nd-icon.svg";
            img.alt = "CC-BY-ND 4.0";
            return img;
        }
        function img_link_dom() {
            const a = cc_license_link("BY-ND", "4.0");
            a.textContent = "";
            a.appendChild( img_dom() );
            return a;
        }
        const div = document.createElement( "div" );
        const small = small_dom();
        const image_link = img_link_dom();
        div.setAttribute( "class", "lisence" );
        div.appendChild( image_link );
        div.appendChild( small );
        return div;
    }
    get hr_gap_dom() {
        const gap = document.createElement("hr");
        return gap;
    }
    /**
     * THE wrapper
     */
    get wrapper() {
        const wrapper = document.createElement( "footer" );
        wrapper.setAttribute( "class", "tags container" );
        wrapper.appendChild( this.hr_gap_dom );
        wrapper.appendChild( this.date_components );
        wrapper.appendChild( this.help_dom );
        wrapper.appendChild( this.tags_list_dom );
        wrapper.appendChild( this.lisence_dom );
        return wrapper;
    }
}

/**
 * `Rejected` is `reject` in [`Promimse.rejected`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject).
 */
class RejectedElements {
    constructor(error_message) {
        console.error(error_message);
        this.error_message = error_message;
    }
    get css_loader() {
        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "../css/new-framework.min.css");
        return css;
    }
    get error_reminder() {
        const error_reminder = document.createElement("span");
        error_reminder.textContent = "Oh-oh. Something's up. :-(";
        error_reminder.dataset.errorMessage = this.error_message;
        return error_reminder;
    }
    get wrapper() {
        const wrapper = document.createElement( "footer" );
        wrapper.setAttribute( "class", "tags container" );
        wrapper.appendChild(this.error_reminder);
        return wrapper;
    }
}

/**
 * The `<article-tags-app>` component.
 * @todo Extract the `<show-date />` component.
 */
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
            this.render_given_element( ResolvedElements, this.tags_object );
        }).catch( (error) => {
            this.render_given_element( RejectedElements, error );
        });
    }
    render_given_element(element_instance, input) {
        const shadow = this.attachShadow({ mode: "open" });
        const doms = new element_instance( input );
        shadow.appendChild( doms.css_loader );
        shadow.appendChild( doms.wrapper );
    }
}

export { ArticleTagsAppELement };
