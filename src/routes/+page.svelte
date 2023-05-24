<script lang="ts">
	import { PUBLIC_ROOT_URL as ROOT_URL } from "$env/static/public";
	import MagneticElement from "$shells/MagneticElement.svelte";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";
	import Section from "$layouts/Section.svelte";
	import { scrollTo } from "$ts/scroll";
	import Button from "$elements/Button.svelte";
	import { Cloud, PaintBrush, Sparkles, Window } from "@inqling/svelte-icons/heroicon-24-outline";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import {
		ArrowDown,
		ChevronRight,
		CodeBracket,
		DevicePhoneMobile
	} from "@inqling/svelte-icons/heroicon-24-solid";
	import { i } from "@inlang/sdk-js";
	import { c } from "$ts/inlang-color";

	const processSections = [
		{
			title: i("common.process.design"),
			icon: PaintBrush,
			description: i("home.process.design-desc")
		},
		{
			title: i("common.process.development"),
			icon: CodeBracket,
			description: i("home.process.development-desc")
		},
		{
			title: i("common.process.hosting"),
			icon: Cloud,
			description: i("home.process.hosting-desc")
		}
	];
</script>

<!-- Meta tags -->
<MetaTags
	title="Home"
	titleTemplate="%s | Renew"
	description="Your web apps. Modern and fast."
	canonical={ROOT_URL}
	languageAlternates={[
		{
			hrefLang: "fr",
			href: ROOT_URL
		}
	]}
	openGraph={{
		images: [
			{
				url: `${ROOT_URL}/og-banner.png`,
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
		image: `${ROOT_URL}/og-banner.png`,
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
			url: ROOT_URL,
			logo: `${ROOT_URL}/favicon.svg`
		} /*,
		{
			"@type": "WebSite",
			url: ROOT_URL,
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: `${ROOT_URL}/search?q={search_term_string}`
				},
				"query-input": "required name=search_term_string"
			}
		}*/
	]}
/>

<!-- Body -->
<!-- Hero -->
<div id="hero" class="flex h-[calc(100dvh_-_7.5rem)] flex-col items-center justify-center">
	<div
		class="m-auto grid h-fit grid-cols-1 items-center px-10 before:absolute before:inset-0
			before:-z-10 before:max-w-full before:bg-gradient-to-l before:from-dominant before:to-transparent before:opacity-20 before:content-[''] md:px-32 xl:grid-cols-2"
	>
		<!-- Left part -->
		<div
			class="flex flex-col justify-center text-4xl font-medium sm:mx-auto sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl xxl:text-7xl"
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<h1>{@html c(i("home.hero.title.first"))}<br />{@html c(i("home.hero.title.second"))}</h1>
			<h2 class="pt-10 text-xl font-normal text-gray-400">
				{i("home.hero.subtitle.first")}<br />{i("home.hero.subtitle.second")}
			</h2>
			<div
				class="flex origin-bottom-left flex-col gap-5 pt-10 scale-110 child:max-w-fit xs:flex-row"
			>
				<Button>{i("common.contact")}</Button>
				<Button type="minimal" class="hover-child:translate-x-1">
					{i("home.hero.cta-secondary")}
					<ChevronRight class="h-4 w-4 transition-transform duration-500" />
				</Button>
			</div>
		</div>
		<!-- Right part -->
		<Mouse3DTilting
			initialX={-32}
			initialY={-13}
			intensity={0.05}
			scope={"#hero"}
			class="relative hidden aspect-square max-h-full items-center justify-center child:absolute lg:ml-20 xl:flex"
		>
			<Window class="h-full w-full text-dominant" />
			<div
				class="bottom-10 left-10 w-36 perspective-[312rem] transform-style-3d translate-z-28
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-[0.35] before:blur-lg before:content-[''] before:-translate-z-28"
			>
				<CodeBracket class="h-full w-full" />
			</div>
			<div
				class="left-1/2 top-0 w-36 perspective-[312rem] transform-style-3d translate-z-20
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-50 before:blur-lg before:content-[''] before:-translate-z-20"
			>
				<Sparkles class="h-full w-full" />
			</div>
			<div
				class="-right-10 bottom-0 w-36 perspective-[312rem] transform-style-3d translate-z-16
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-[0.55] before:blur-lg before:content-[''] before:-translate-z-16"
			>
				<DevicePhoneMobile class="h-full w-full" />
			</div>
		</Mouse3DTilting>
	</div>
	<!-- Bottom arrow -->
	<MagneticElement
		class="pb-10 transition-transform duration-500"
		on:in_zone={e => {
			const element = e.detail.element;
			element.style.transitionDuration = "500ms";
			setTimeout(() => {
				element.style.removeProperty("transition-duration");
			}, 500);
			element.parentElement.style.transform = "scale(1.2)";
		}}
		on:out_zone={e => {
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
			on:keypress={() => scrollTo("#process")}
			on:click={() => scrollTo("#process")}
		>
			<ArrowDown
				class="h-8 w-8 cursor-pointer rounded-full border-[1px] border-transparent bg-dominant p-1.5 text-inverted
				hover:border-dominant hover:bg-inherit hover:text-dominant"
			/>
		</div>
	</MagneticElement>
</div>

<!-- Process -->
<Section id="process">
	<div
		class="scrolling-touch flex-no-wrap flex snap-x snap-mandatory items-start gap-16 overflow-x-auto py-8 child:snap-start md:justify-center md:child:h-min"
	>
		{#each processSections as { title, icon, description }, index}
			<div class="relative max-md:min-w-full md:w-1/4 lg:pb-4">
				<span
					class="absolute -z-10 flex h-full w-full items-center justify-center text-9xl font-medium text-gray-700/75"
				>
					{index + 1}
				</span>
				<div class="flex w-fit flex-row items-center gap-4">
					<svelte:component this={icon} class="h-10 w-10 text-dominant" />
					<h3 class="text-2xl font-medium">{title}</h3>
				</div>
				<p class="w-full pt-4 text-lg font-normal text-gray-200">
					{description}
				</p>
			</div>
		{/each}
	</div>
</Section>
