<!-- Created from https://github.com/andrewwoan/magnetic-button-effect-tutorial-01 -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { useId } from "$utils/id";

	// Constants
	const id = `svelte-magnetic-element-${useId()}`;

	type Props = {
		/**
		 * The class of the magnetic element.
		 */
		class?: string | null | undefined;
		/**
		 * The trigger area for the magnetic effect. Defaults to 200.
		 */
		triggerArea?: number;
		/**
		 * The interpolation factor for the magnetic effect. Often a value between 0 and 1. Defaults to 0.8.
		 */
		interpolationFactor?: number;
		in_zone?: (event: { element: HTMLElement }) => void;
		out_zone?: (event: { element: HTMLElement }) => void;
		children?: Snippet;
	};
	let {
		class: className = undefined,
		triggerArea = 200,
		interpolationFactor = 0.8,
		in_zone = () => {},
		out_zone = () => {},
		children
	}: Props = $props();

	// Magnetic Object
	class MagneticObject {
		mousePosition: { x: number; y: number };
		domElement: HTMLElement;
		boundingClientRect: DOMRect;
		inArea: boolean;
		lerpingData: {
			x: { current: number; target: number };
			y: { current: number; target: number };
		};

		constructor(domElement: HTMLElement) {
			this.domElement = domElement;
			this.boundingClientRect = this.domElement.getBoundingClientRect();

			this.mousePosition = { x: 0, y: 0 };
			this.inArea = false;

			this.lerpingData = {
				x: { current: 0, target: 0 },
				y: { current: 0, target: 0 }
			};

			this.render();
			window.addEventListener("resize", () => {
				this.boundingClientRect = this.domElement.getBoundingClientRect();
			});
			document.addEventListener("mousemove", e => {
				this.mousePosition.x = e.pageX;
				this.mousePosition.y = e.pageY;
				this.render();
			});
		}

		render() {
			const distanceFromMouseToCenter = this.calculateDistance(
				this.mousePosition.x,
				this.mousePosition.y,
				this.boundingClientRect.left + this.boundingClientRect.width / 2,
				this.boundingClientRect.top + this.boundingClientRect.height / 2
			);

			let targetHolder = { x: 0, y: 0 };

			if (distanceFromMouseToCenter < triggerArea) {
				if (!this.inArea) {
					this.inArea = true;
					this.domElement.classList.add("in-zone");
					in_zone({ element: this.domElement });
				}
				targetHolder.x =
					(this.mousePosition.x -
						(this.boundingClientRect.left + this.boundingClientRect.width / 2)) *
					0.2;
				targetHolder.y =
					(this.mousePosition.y -
						(this.boundingClientRect.top + this.boundingClientRect.height / 2)) *
					0.2;
			} else if (this.inArea) {
				this.inArea = false;
				this.domElement.classList.remove("in-zone");
				out_zone({ element: this.domElement });
			}
			this.lerpingData["x"].target = targetHolder.x;
			this.lerpingData["y"].target = targetHolder.y;

			for (const item of Object.values(this.lerpingData)) {
				const lerp = this.lerp(item.current, item.target, interpolationFactor);
				item.current = Math.abs(lerp) < 0.1 ? 0 : lerp;
			}

			this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;
		}

		private calculateDistance(x1: number, y1: number, x2: number, y2: number) {
			return Math.hypot(x1 - x2, y1 - y2);
		}

		private lerp(current: number, target: number, factor: number) {
			return current * (1 - factor) + target * factor;
		}
	}

	$effect(() => {
		const button = document.querySelector(`#${id} > *`) as HTMLElement;
		new MagneticObject(button);
	});
</script>

<div {id} class={className}>
	{@render children?.()}
</div>
