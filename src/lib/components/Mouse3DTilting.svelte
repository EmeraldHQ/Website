<!-- Created from https://codepen.io/kevinpowell/pen/GRBdLEv -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useId } from "$lib/ts/id";

	const elementId = `svelte-mouse-tilt-${useId()}`;
	let firstFire = true;
	let isWorking = false;

	// Svelte Props
	export let defaultX = 0;
	export let defaultY = 0;
	export let intensity = 0.5;

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
			await new Promise<void>((resolve) =>
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

	onMount(() => {
		const element = document.querySelector(`.${elementId}`);
		const listener = (e: MouseEvent) => rotateElement(e, <HTMLElement>element);
		document.addEventListener("mousemove", listener);

		return () => {
			document.removeEventListener("mousemove", listener);
		};
	});
</script>

<div
	class="{elementId} transition-transform duration-500 {$$props.class}"
	style="
				--rotateX: 0deg;
				--rotateY: 0deg;
				transform: perspective(5000px)
									rotateX(calc({defaultX}deg + var(--rotateY)))
									rotateY(calc({defaultY}deg + var(--rotateX)));
				transform-style: preserve-3d;
	"
>
	<slot />
</div>
