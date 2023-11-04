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
class IDateComponentElement extends HTMLElement {}
