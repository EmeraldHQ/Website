const scrollMargin = 40;

export function scrollTo(selector: string) {
	const element = document.querySelector(selector);
	if (element) {
		const navbar = document.getElementById("navbar");
		if (navbar && selector.startsWith("#")) {
			// Minus height of navbar to scroll position to top of element and 40px for padding
			const scrollPosition =
				element.getBoundingClientRect().top + window.scrollY - navbar.clientHeight - scrollMargin;
			window.scrollTo({ top: scrollPosition, behavior: "smooth" });
		} else {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}
}
