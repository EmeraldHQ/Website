<script lang="ts">
	import {
		ArrowDown,
		ChevronRight,
		CodeBracket,
		DevicePhoneMobile,
		Cloud,
		Swatch
	} from "@inqling/svelte-icons/heroicon-24-solid";
	import { Sparkles, Window } from "@inqling/svelte-icons/heroicon-24-outline";
	import Button from "$ui/Button.svelte";
	import Section from "$components/Section.svelte";
	import MagneticElement from "$components/MagneticElement.svelte";
	import Mouse3DTilting from "$components/Mouse3DTilting.svelte";

	function scrollTo(selector: string) {
		const element = document.querySelector("#" + selector);
		if (element) {
			const navbar = document.getElementsByTagName("nav");

			if (navbar.length > 0) {
				// Minus height of navbar to scroll position to top of element and 40px for padding
				const scrollPosition =
					element.getBoundingClientRect().top + window.scrollY - navbar[0].clientHeight - 40;
				console.log(scrollPosition);
				window.scrollTo({ top: scrollPosition, behavior: "smooth" });
			} else {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}

	const processSections = [
		{
			title: "Design",
			icon: Swatch,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla."
		},
		{
			title: "Development",
			icon: CodeBracket,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla."
		},
		{
			title: "Hosting",
			icon: Cloud,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla."
		}
	];
</script>

<svelte:head>
	<title>Home | Renew</title>
</svelte:head>

<main class="h-[calc(100dvh_-_7.5rem)] flex flex-col items-center justify-center">
	<div
		class="grid items-center grid-cols-1 xl:grid-cols-2 h-fit m-auto px-10 md:px-32
			before:content-[''] before:absolute before:max-w-full before:inset-0 before:bg-gradient-to-l before:from-dominant before:to-transparent before:-z-10 before:opacity-20"
	>
		<!-- Left part -->
		<div
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl xxl:text-7xl font-medium flex flex-col justify-center sm:mx-auto"
		>
			<h1>Your <span class="text-dominant">super-fast</span><br />digital project</h1>
			<h2 class="text-xl font-normal pt-10 text-gray-400">
				Powered by cutting-edge technologies, let's build<br />the web application you've been
				dreaming of.
			</h2>
			<div class="flex flex-col gap-5 child:max-w-fit xs:block pt-10 scale-110 origin-bottom-left">
				<Button class="hover-child:translate-x-1">
					Contact Us
					<ChevronRight class="w-6 h-6 transition-transform duration-500" />
				</Button>
				<Button type="secondary">See our work</Button>
			</div>
		</div>
		<!-- Right part -->
		<Mouse3DTilting
			initialX={13}
			initialY={-30}
			intensity={0.05}
			class="hidden xl:flex lg:ml-20 aspect-square max-h-full justify-center items-center relative child:absolute"
		>
			<Window class="text-dominant w-full h-full" />
			<div
				class="w-36 left-10 bottom-10 translate-z-28 transform-style-3d perspective-[312rem]
				before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:-translate-z-28 before:blur-lg before:opacity-[0.35]"
			>
				<CodeBracket class="w-full h-full" />
			</div>
			<div
				class="w-36 top-0 left-1/2 translate-z-20 transform-style-3d perspective-[312rem]
				before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:-translate-z-20 before:blur-lg before:opacity-50"
			>
				<Sparkles class="w-full h-full" />
			</div>
			<div
				class="w-36 -right-10 bottom-0 translate-z-16 transform-style-3d perspective-[312rem]
				before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:-translate-z-16 before:blur-lg before:opacity-[0.55]"
			>
				<DevicePhoneMobile class="w-full h-full" />
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
		<div
			style="
					transition-property: transform;
					transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				"
			on:keypress={() => scrollTo("process")}
			on:click={() => scrollTo("process")}
		>
			<ArrowDown
				class="w-10 h-10 p-1.5 bg-dominant border-[1px] border-transparent text-inverted rounded-full cursor-pointer
				hover:text-dominant hover:bg-inherit hover:border-dominant"
			/>
		</div>
	</MagneticElement>
</main>

<Section id="process" class="overflow-hidden">
	<svelte:fragment slot="title" />
	<div
		class="flex flex-no-wrap items-start w-[calc(100%-2.6rem)] overflow-x-scroll scrolling-touch mb-8
		md:flex-row md:flex-wrap md:justify-center md:w-full gap-16 md:overflow-hidden"
	>
		{#each processSections as { title, icon, description }}
			<div class="flex-col max-md:min-w-full md:w-2/3 lg:w-1/4 md:pb-4">
				<div class="flex flex-row items-center gap-4">
					<svelte:component this={icon} class="w-10 h-10" />
					<span class="text-2xl font-medium">{title}</span>
				</div>
				<p class="text-lg font-normal pt-4 w-11/12 xs:w-4/5">
					{description}
				</p>
			</div>
		{/each}
	</div>
</Section>
