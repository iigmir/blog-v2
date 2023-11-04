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
    get classes() { return this.hasAttribute("data-classes") ? this.getAttribute("data-classes") : "date"; }
    /**
     * @see: Info about [Etc/UTC](https://en.wikipedia.org/wiki/UTC%2B00:00)
     */
    get timezone() { return this.hasAttribute("data-timezone") ? this.getAttribute("data-timezone") : "Etc/UTC"; }
    get format() { return this.hasAttribute("data-format") ? this.getAttribute("data-format") : "YYYY-MM-DDTHH:mm:ssZ"; }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement( "span" );
        wrapper.classList.add("date-component");
        wrapper.textContent = this.title;
        wrapper.appendChild( this.new_time_element( this.classes, this.date ) );
        shadow.appendChild(wrapper);
    }
    new_time_element() {
        const time = document.createElement("time");
        time.setAttribute("class", this.classes);
        time.setAttribute("datetime", this.date);
        time.textContent = this.date;
        return time;
    }
}
