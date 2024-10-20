<!-- Created from https://codepen.io/kevinpowell/pen/GRBdLEv -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { useId } from "$utils/id";
	import { twMerge } from "tailwind-merge";

	const id = `svelte-mouse-tilt-${useId()}`;
	let firstFire = true;
	let isWorking = false;

	type Props = {
		/**
		 * The initial X rotation of the element. Defaults to 0.
		 */
		initialX?: number;
		/**
		 * The initial Y rotation of the element. Defaults to 0.
		 */
		initialY?: number;
		/**
		 * The intensity of the mouse tilting effect. Often a value between 0 and 1. Defaults to 0.5.
		 */
		intensity?: number;
		/**
		 * The scope of the mouse tilting effect. Defines a selector for the element to be actively tilting in.
		 * Defaults to the whole body.
		 */
		scope?: string;
		class?: string | null | undefined;
		children?: Snippet;
	};
	let {
		initialX = 0,
		initialY = 0,
		intensity = 0.5,
		scope = "body",
		class: className = undefined,
		children
	}: Props = $props();

	// Rotate Element
	async function rotateElement(event: MouseEvent, element: HTMLElement) {
		if (isWorking) return;
		function setProperties() {
			element.style.setProperty("--rotateX", offsetX + "deg");
			element.style.setProperty("--rotateY", -1 * offsetY + "deg");
		}

		// Get mouse position
		const x = event.clientX;
		const y = event.clientY;

		// Find the middle
		const middleX = window.innerWidth / 2;
		const middleY = window.innerHeight / 2;

		// Get offset from middle as a percentage
		// and tone it down a little
		const offsetX = ((x - middleX) / middleX) * (intensity * 100);
		const offsetY = ((y - middleY) / middleY) * (intensity * 100);

		// Set rotation
		if (firstFire) {
			setProperties();
			isWorking = true;
			// Caveat: Doesn't solve the problem if you move too much during the x ms
			await new Promise<void>(resolve =>
				setTimeout(() => {
					element.classList.remove("transition-transform", "duration-500");
					resolve();
				}, 500)
			);
			isWorking = false;
			firstFire = false;
		} else {
			setProperties();
		}
	}

	$effect(() => {
		const element = document.querySelector(`#${id}`);
		const listener = (e: Event) => rotateElement(e as MouseEvent, element as HTMLElement);
		const scopeElement = document.querySelector(scope) || document.body;
		scopeElement.addEventListener("mousemove", listener);

		return () => {
			scopeElement.removeEventListener("mousemove", listener);
		};
	});
</script>

<div
	{id}
	class={twMerge("transition-transform duration-500", className)}
	style="
				--rotateX: 0deg;
				--rotateY: 0deg;
				transform: perspective(312rem)
									rotateX(calc({-initialY}deg + var(--rotateY)))
									rotateY(calc({initialX}deg + var(--rotateX)));
				transform-style: preserve-3d;
	"
>
	{@render children?.()}
</div>
