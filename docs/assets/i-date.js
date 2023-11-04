/**
 * ```html
 * <i-date date="2014-06-01T12:00:00.000Z" timezone="America/New_York" format="YYYY-MM-DDTHH:mm:ss" />
 * ```
 * can be:
 * ```html
 * <span class="i-date-component">
 *     <time class="date -updated" datetime="2014-06-01T12:00:00.000Z">2014-06-01T12:00:00</time>
 * </span>
 * ```
 * @todo Can we use [dayjs](https://day.js.org)?
 */
export class IDateComponentElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let update_text = "Date: ";
        let class_text = "date -created";
        let given_date = "123456789";
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement( "span" );
        wrapper.classList.add("date-component");
        wrapper.textContent = update_text;
        wrapper.appendChild( this.new_time_element( class_text, given_date ) );
        console.log("Hello. This is a component.");
        shadow.appendChild(wrapper);
    }
    new_time_element(classes = "", datetime = "") {
        const time = document.createElement("time");
        time.setAttribute("class", classes);
        time.setAttribute("datetime", datetime);
        time.textContent = datetime;
        return time;
    }
}
