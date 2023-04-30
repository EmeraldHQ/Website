<script lang="ts">
	import { ArrowDownIcon, ArrowRightIcon } from "@rgossiaux/svelte-heroicons/solid";
	import Button from "$ui/Button.svelte";
	import Section from "$components/Section.svelte";
	import MagneticElement from "$components/MagneticElement.svelte";

	function scrollTo(selector: string) {
		const element = document.querySelector(selector);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}
</script>

<svelte:head>
	<title>Home | Renew</title>
</svelte:head>

<main class="h-[90dvh] flex flex-col items-center justify-center">
	<div
		class="max-md:flex max-md:flex-col max-md:px-10 md:grid md:grid-cols-2 h-fit m-auto child:sm:px-10 child:py-10"
	>
		<div
			class="text-4xl sm:text-5xl lg:text-[5rem] font-medium flex flex-col justify-center sm:mx-auto"
		>
			<div>When your ideas</div>
			<div>become <span class="text-dominant">reality</span>.</div>
			<div class="text-xl font-normal pt-10 text-gray-400">
				From a fast and modern website to a cross-platform<br />mobile app, let's bring your project
				to life.
			</div>
			<div class="pt-10 scale-110 origin-bottom-left">
				<Button class="hover-child:translate-x-1">
					Contact Us
					<ArrowRightIcon class="w-6 h-6 transition-transform duration-700" />
				</Button>
				<Button type="secondary">See our work</Button>
			</div>
		</div>
		<div class="">
			<!-- Upcoming -->
		</div>
	</div>
	<MagneticElement
		class="pb-10 transition-transform duration-500"
		on:in_zone={(e) => {
			const element = e.detail.element;
			element.style.transitionDuration = "500ms";
			setTimeout(() => {
				element.style.removeProperty("transition-duration");
			}, 500);
			element.parentElement.style.transform = "scale(1.2)";
		}}
		on:out_zone={(e) => {
			const element = e.detail.element;
			element.style.transitionDuration = "500ms";
			element.parentElement.style.transform = "scale(1)";
		}}
	>
		<ArrowDownIcon
			class="w-10 h-10 p-1.5 bg-dominant border-[1px] border-transparent text-black rounded-full cursor-pointer
			hover:text-dominant hover:bg-inherit hover:border-dominant"
			style="
				transition-property: transform;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			"
			on:click={() => scrollTo("" /* TODO: Add section selector */)}
		/>
	</MagneticElement>
</main>

<Section id="">
	<svelte:fragment slot="title" />
</Section>
