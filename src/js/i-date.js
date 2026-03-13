class DateStore {
    /**
     * Timezone, see [Time zones and offsets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime#time_zones_and_offsets)
     */
    current_timezone = ""
    /**
     * A Temporal object
     */
    source_date = null
    /**
     * A Temporal object. The date after applying `current_timezone`
     */
    timezone_date = null
    /**
     * @see: Info about [Etc/UTC](https://en.wikipedia.org/wiki/UTC%2B00:00)
     */
    detect_timezone(input) {
        return input ?? "Etc/UTC";
    }
    /**
     * Init date store by given date and timezone
     * @param {String} date Set the date
     * @param {String} timezone Set the current timezone
     */
    constructor(date = "2020-06-13T00:05:11+08:00[Asia/Taipei]", timezone = "Etc/UTC") {
        this.current_timezone = this.detect_timezone(timezone);
        this.source_date = Temporal.Instant.from( date ?? new Date() );
    }
    /**
     * @see These sources:
     * [toZonedDateTimeISO method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/toZonedDateTimeISO),
     * [toLocaleString method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
     */
    get result() {
        const result = this.source_date.toZonedDateTimeISO( this.current_timezone );
        return result.toLocaleString( navigator.language, { hour12: false });
    }
}

/**
 * ```html
 * <i-date
 *     data-title="Created: "
 *     data-date="2014-06-01T12:00:00.000Z"
 *     data-classes="date -updated"
 *     data-timezone="America/New_York"
 * />
 * ```
 * can be:
 * ```html
 * <span class="i-date-component">
 *     Created: <time class="date -updated" datetime="2014-06-01T12:00:00.000Z">2014-06-01T12:00:00</time>
 * </span>
 * ```
 */
export class IDateComponentElement extends HTMLElement {
    constructor() {
        super();
    }
    get title() {
        return this.hasAttribute("data-title") ? this.getAttribute("data-title") : "Date: ";
    }
    get date() {
        return this.hasAttribute("data-date") ? this.getAttribute("data-date") : "Unknown date";
    }

    // Date modules. See also `DateStore` class.
    date_store = null;
    get classes() {
        return this.hasAttribute("data-classes") ? this.getAttribute("data-classes") : "date";
    }
    connectedCallback() {
        this.date_store = new DateStore( this.date, this.hasAttribute("data-timezone") );
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild( this.wrapper_element() );
    }
    wrapper_element() {
        const wrapper = document.createElement("small");
        wrapper.setAttribute("title", `Source date: ${this.date}`);
        wrapper.classList.add("date-component");
        wrapper.textContent = this.title;
        wrapper.appendChild( this.time_element( this.classes, this.date ) );
        return wrapper;
    }
    time_element() {
        const time = document.createElement("time");
        time.setAttribute("class", this.classes);
        time.setAttribute("datetime", this.date);
        time.textContent = this.date_store.result;
        return time;
    }
}
