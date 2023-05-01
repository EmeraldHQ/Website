<script lang="ts">
	import {
		ArrowDownIcon,
		ArrowRightIcon,
		CodeBracketIcon,
		DevicePhoneMobileIcon
	} from "@babeard/svelte-heroicons/solid";
	import { SparklesIcon, WindowIcon } from "@babeard/svelte-heroicons/outline";
	import Button from "$ui/Button.svelte";
	import Section from "$components/Section.svelte";
	import MagneticElement from "$components/MagneticElement.svelte";
	import Mouse3DTilting from "$components/Mouse3DTilting.svelte";

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

<main class="h-[90dvh] flex flex-col items-center justify-center overflow-x-hidden">
	<div
		class="max-md:flex max-md:flex-col max-md:px-10 md:grid max-md:gap-10 md:items-center md:grid-cols-2 h-fit m-auto px-32"
	>
		<!-- Left part -->
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
		<!-- Right part -->
		<Mouse3DTilting
			defaultX={13}
			defaultY={-30}
			intensity={0.05}
			class="lg:ml-20 aspect-square flex justify-center items-center relative child:absolute
			before:content-[''] before:absolute before:-inset-10 before:bg-gradient-to-l before:from-dominant before:to-transparent before:-z-10 before:rounded-full before:-translate-z-40 before:blur-lg before:opacity-20"
		>
			<WindowIcon class="text-dominant" />
			<div
				class="w-36 left-10 bottom-10 translate-z-28 transform-style-3d perspective-[5000px]
				before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:-translate-z-28 before:blur-lg before:opacity-30"
			>
				<CodeBracketIcon />
			</div>
			<div
				class="w-36 top-0 left-1/2 translate-z-20 transform-style-3d perspective-[5000px]
				before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:-translate-z-20 before:blur-lg before:opacity-30"
			>
				<SparklesIcon />
			</div>
			<div
				class="w-36 -right-10 bottom-0 translate-z-16 transform-style-3d perspective-[5000px]
				before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:-translate-z-16 before:blur-lg before:opacity-30"
			>
				<DevicePhoneMobileIcon />
			</div>
		</Mouse3DTilting>
	</div>
	<!-- Bottom arrow -->
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
