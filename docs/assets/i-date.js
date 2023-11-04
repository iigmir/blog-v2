import "https://cdn.jsdelivr.net/npm/temporal-polyfill/dist/global.js";

class DateStore {
    date = ""
    current_timezone = ""
    temporal_obj = null
    constructor(date = "2020-06-13T00:05:11+08:00[Asia/Taipei]", timezone = "Etc/UTC") {
        this.date = date;
        this.current_timezone = timezone;
        this.set_temporal_obj();
    }
    set_temporal_obj() {
        this.temporal_obj = Temporal.Instant.from( this.date );
    }
}

/**
 * ```html
 * <i-date
 *     data-title="Created: "
 *     data-date="2014-06-01T12:00:00.000Z"
 *     data-classes="date -updated"
 *     data-timezone="America/New_York"
 *     data-format="YYYY-MM-DDTHH:mm:ss"
 * />
 * ```
 * can be:
 * ```html
 * <span class="i-date-component">
 *     Created: <time class="date -updated" datetime="2014-06-01T12:00:00.000Z">2014-06-01T12:00:00</time>
 * </span>
 * ```
 * @todo Can we use [dayjs](https://day.js.org)?
 */
export class IDateComponentElement extends HTMLElement {
    constructor() {
        super();
    }
    get title() { return this.hasAttribute("data-title") ? this.getAttribute("data-title") : "Date: "; }
    get date() { return this.hasAttribute("data-date") ? this.getAttribute("data-date") : "Unknown date"; }

    // Date modules. See also `DateStore` class.
    date_store = null;
    get classes() { return this.hasAttribute("data-classes") ? this.getAttribute("data-classes") : "date"; }
    /**
     * @see: Info about [Etc/UTC](https://en.wikipedia.org/wiki/UTC%2B00:00)
     */
    get timezone() { return this.hasAttribute("data-timezone") ? this.getAttribute("data-timezone") : "Etc/UTC"; }
    get format() { return this.hasAttribute("data-format") ? this.getAttribute("data-format") : "YYYY-MM-DDTHH:mm:ssZ"; }
    connectedCallback() {
        this.date_store = new DateStore( this.date, this.timezone );
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild( this.wrapper_element() );
    }
    wrapper_element() {
        const wrapper = document.createElement( "span" );
        wrapper.classList.add("date-component");
        wrapper.textContent = this.title;
        wrapper.appendChild( this.time_element( this.classes, this.date ) );
        return wrapper;
    }
    time_element() {
        const time = document.createElement("time");
        time.setAttribute("class", this.classes);
        time.setAttribute("datetime", this.date);
        time.textContent = this.date;
        return time;
    }
}
