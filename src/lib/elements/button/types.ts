import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

type AnchorElement = HTMLAnchorAttributes & {
	href?: HTMLAnchorAttributes["href"];
	type?: never;
} & Expand<{
		el?: HTMLAnchorElement;
	}>;

type ButtonElement = HTMLButtonAttributes & {
	type?: HTMLButtonAttributes["type"];
	href?: never;
} & Expand<{
		el?: HTMLButtonElement;
	}>;

type Props = (AnchorElement | ButtonElement) & {
	variant?: "primary" | "secondary" | "link";
};

type ButtonEventHandler<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLButtonElement;
};

type Events = {
	click: ButtonEventHandler<MouseEvent>;
	keydown: ButtonEventHandler<KeyboardEvent>;
	change: ButtonEventHandler<Event>;
	keyup: ButtonEventHandler<KeyboardEvent>;
	mouseenter: ButtonEventHandler<MouseEvent>;
	mouseleave: ButtonEventHandler<MouseEvent>;
};

export type {
	Props,
	//
	Events,
	//
	ButtonEventHandler
};
