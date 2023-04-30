<!-- Created from https://github.com/andrewwoan/magnetic-button-effect-tutorial-01 -->
<script lang="ts">
	import { useId } from "$lib/ts/id";
	import { createEventDispatcher, onMount } from "svelte";

	const elementId = `magnetic-element-${useId()}`;
	const dispatch = createEventDispatcher();

	class MagneticObject {
		mousePosition: { x: number; y: number };
		domElement: HTMLElement;
		boundingClientRect: DOMRect;
		triggerArea: number;
		inArea: boolean;
		interpolationFactor: number;
		lerpingData: {
			x: { current: number; target: number };
			y: { current: number; target: number };
		};

		constructor(domElement: HTMLElement) {
			this.domElement = domElement;
			this.boundingClientRect = this.domElement.getBoundingClientRect();
			this.triggerArea = 200;
			this.interpolationFactor = 0.8;

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
			window.addEventListener("mousemove", (e) => {
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

			if (distanceFromMouseToCenter < this.triggerArea) {
				if (!this.inArea) {
					this.inArea = true;
					this.domElement.classList.add("in-zone");
					dispatch("in_zone", { element: this.domElement });
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
				dispatch("out_zone", { element: this.domElement });
			}
			this.lerpingData["x"].target = targetHolder.x;
			this.lerpingData["y"].target = targetHolder.y;

			for (const item of Object.values(this.lerpingData)) {
				const lerp = this.lerp(item.current, item.target, this.interpolationFactor);
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

	onMount(() => {
		const button = document.querySelector(`.${elementId} > *`);
		new MagneticObject(<HTMLElement>button);
	});
</script>

<div class="{elementId} {$$props.class}">
	<slot />
</div>
