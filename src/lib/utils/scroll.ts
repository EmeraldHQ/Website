/**
 * Scrolls to the specified element with a smooth behavior.
 *
 * @param {string} selector - The CSS selector of the element to scroll to.
 */
export function scrollTo(selector: string) {
	document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}
