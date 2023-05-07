<script lang="ts">
	import {
		ArrowDown,
		ChevronRight,
		CodeBracket,
		DevicePhoneMobile
	} from "@inqling/svelte-icons/heroicon-24-solid";
	import { Sparkles, Window } from "@inqling/svelte-icons/heroicon-24-outline";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import Button from "$elements/Button.svelte";
	import Section from "$layouts/Section.svelte";
	import MagneticElement from "$shells/MagneticElement.svelte";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";

	function scrollTo(selector: string) {
		const element = document.querySelector(selector);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}
</script>

<MetaTags
	title="Home"
	titleTemplate="%s | Renew"
	description="Your web apps. Modern and fast."
	canonical="https://renewhq.studio"
	languageAlternates={[
		{
			hrefLang: "fr",
			href: "https://renewhq.studio"
		}
	]}
	openGraph={{
		images: [
			{
				url: "https://renewhq.studio/og-banner.png",
				width: 1536,
				height: 768,
				alt: "Og Banner"
			}
		],
		site_name: "Renew"
	}}
	twitter={{
		cardType: "summary_large_image",
		/*
		site: "@RenewHQ", // Someday
		handle: "@RenewHQ"
		*/
		title: "Home | Renew",
		description: "Your web apps. Modern and fast.",
		image: "https://renewhq.studio/og-banner.png",
		imageAlt: "Og Banner"
	}}
	robotsProps={{
		noarchive: true
	}}
/>

<JsonLd
	schema={[
		{
			"@type": "Organization",
			url: "https://renewhq.studio",
			logo: "https://renewhq.studio/favicon.svg"
		} /*,
		{
			"@type": "WebSite",
			url: "https://renewhq.studio",
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: "https://renewhq.studio/search?q={search_term_string}"
				},
				"query-input": "required name=search_term_string"
			}
		}*/
	]}
/>

<main id="hero" class="h-[calc(100dvh_-_7.5rem)] flex flex-col items-center justify-center">
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
			<div
				class="flex flex-col xs:flex-row gap-5 child:max-w-fit pt-10 scale-110 origin-bottom-left"
			>
				<Button>Contact Us</Button>
				<Button type="minimal" class="hover-child:translate-x-1">
					See our work
					<ChevronRight class="w-4 h-4 transition-transform duration-500" />
				</Button>
			</div>
		</div>
		<!-- Right part -->
		<Mouse3DTilting
			initialX={13}
			initialY={-30}
			intensity={0.05}
			scope={"#hero"}
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
			on:keypress={() => scrollTo("" /* TODO: Add section selector */)}
			on:click={() => scrollTo("" /* TODO: Add section selector */)}
		>
			<ArrowDown
				class="w-8 h-8 p-1.5 bg-dominant border-[1px] border-transparent text-inverted rounded-full cursor-pointer
				hover:text-dominant hover:bg-inherit hover:border-dominant"
			/>
		</div>
	</MagneticElement>
</main>

<Section id="">
	<svelte:fragment slot="title" />
</Section>
