<script lang="ts">
	import { ROOT_URL } from "$config";
	import type { SvelteComponent } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	import MagneticElement from "$shells/MagneticElement.svelte";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";
	import Section from "$layouts/Section.svelte";
	import { scrollTo } from "$utils/scroll";
	import Button from "$elements/Button.svelte";
	import {
		Cloud,
		Heart,
		PaintBrush,
		RocketLaunch,
		Sparkles,
		Trophy,
		Window,
		WrenchScrewdriver
	} from "@inqling/svelte-icons/heroicon-24-outline";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import {
		ArrowDown,
		ChevronRight,
		CodeBracket,
		DevicePhoneMobile
	} from "@inqling/svelte-icons/heroicon-24-solid";
	import { i, language } from "@inlang/sdk-js";
	import { c } from "$utils/inlang-color";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";

	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindSmScreen = Number(fullTailwindConfig.theme.screens.sm.replace("px", ""));

	// Sections
	let processSections: {
		title: string;
		icon: typeof SvelteComponent<SvelteHTMLElements["svg"]>;
		description: string;
	}[] = [];
	let solutionsSections: { title: string; description: string }[] = [];
	let solutions: typeof solutionsSections = [];
	let valuesSections: {
		icon: typeof SvelteComponent<SvelteHTMLElements["svg"]>;
		title: string;
		description: string;
	}[] = [];
	$: if (language) {
		processSections = [
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
		solutionsSections = [
			{
				title: i("common.solutions.comprehensive"),
				description: i("home.solutions.comprehensive-desc")
			},
			{
				title: i("common.solutions.web-app"),
				description: i("home.solutions.web-app-desc")
			},
			{
				title: i("common.solutions.landing"),
				description: i("home.solutions.landing-desc")
			},
			{
				title: i("common.solutions.ecommerce"),
				description: i("home.solutions.ecommerce-desc")
			},
			{
				title: i("common.solutions.rewrite"),
				description: i("home.solutions.rewrite-desc")
			},
			{
				title: i("common.solutions.custom"),
				description: i("home.solutions.custom-desc")
			}
		];
		solutions = solutionsSections;
		valuesSections = [
			{
				icon: Trophy,
				title: i("home.values.quality.title"),
				description: i("home.values.quality.desc")
			},
			{
				icon: Heart,
				title: i("home.values.passion.title"),
				description: i("home.values.passion.desc")
			},
			{
				icon: WrenchScrewdriver,
				title: i("home.values.automation.title"),
				description: i("home.values.automation.desc")
			},
			{
				icon: RocketLaunch,
				title: i("home.values.performance.title"),
				description: i("home.values.performance.desc")
			}
		];
	}

	// Keep only 3 solutions sections if screen is too small
	let innerWidth = 0;
	$: if (innerWidth > 0) {
		if (tailwindSmScreen > innerWidth) {
			solutions = solutionsSections.slice(0, 3).concat(solutionsSections.slice(-1));
		} else {
			solutions = solutionsSections;
		}
	}
</script>

<!-- Window bindings -->
<svelte:window bind:innerWidth />

<!-- Meta tags -->
<MetaTags
	title={i("common.pages.home")}
	titleTemplate="%s | Emerald Studio"
	description={i("home.description")}
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
				url: `${ROOT_URL}/${i("home.og-banner")}`,
				width: 1536,
				height: 768,
				alt: i("a11y.alt.og-banner")
			}
		],
		site_name: "Emerald Studio"
	}}
	twitter={{
		cardType: "summary_large_image",
		/*
		site: "@EmeraldStudio", // Someday
		handle: "@EmeraldStudio"
		*/
		title: `${i("common.pages.home")} | Emerald Studio`,
		description: i("home.description"),
		image: `${ROOT_URL}/${i("home.og-banner")}`,
		imageAlt: i("a11y.alt.og-banner")
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
<div
	id="hero"
	class="-mt-28 flex h-[100svh] flex-col items-center justify-center pt-28 md:-mt-32 md:pt-28"
>
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
			if (element.parentElement) element.parentElement.style.transform = "scale(1.2)";
		}}
		on:out_zone={e => {
			const element = e.detail.element;
			element.style.transitionDuration = "500ms";
			if (element.parentElement) element.parentElement.style.transform = "scale(1)";
		}}
	>
		<button
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
		</button>
	</MagneticElement>
</div>

<!-- Process -->
<Section id="process">
	<div
		class="flex snap-x snap-mandatory gap-16 overflow-x-auto overflow-y-hidden py-8 child:snap-start md:justify-center"
	>
		{#each processSections as { title, icon, description }, index}
			<div class="relative max-lg:min-w-full lg:w-1/4 lg:pb-4">
				<span
					class="absolute -z-10 flex h-full w-full items-center justify-center text-9xl font-medium text-gray-700/75"
				>
					{index + 1}
				</span>
				<div class="flex w-fit flex-row items-center gap-4">
					<svelte:component this={icon} class="h-10 w-10 text-dominant" />
					<h3 class="text-2xl font-medium">{title}</h3>
				</div>
				<p
					class="h-full w-full pt-4 text-lg font-normal text-gray-200 max-lg:max-w-[95%] max-md:max-w-[90%]"
				>
					{description}
				</p>
			</div>
		{/each}
	</div>
</Section>

<!-- Solutions -->
<Section id="solutions" class="relative py-20">
	<div
		class="absolute inset-0 -z-10 !mx-0 w-screen !max-w-full bg-left content-[''] bg-grid-slate-500/[0.2]
			before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:via-transparent before:via-80% before:to-black before:content-['']
			after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-80% after:to-black after:content-['']"
	/>
	<svelte:fragment slot="title">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html c(i("home.solutions.title"))}
	</svelte:fragment>
	<div class="flex items-center justify-between">
		<div class="grid gap-x-16 gap-y-12 pb-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each solutions.slice(0, -1) as solution}
				<div>
					<h3 class="text-xl font-medium text-dominant">{solution.title}</h3>
					<p class="text-lg text-gray-200">
						{solution.description}
					</p>
				</div>
			{/each}
			<em class="text-center sm:hidden">
				{i("home.solutions.more.before-link")}
				<Button type="minimal">{i("home.solutions.more.link")}</Button>
				{i("home.solutions.more.after-link")}
			</em>
			<div class="flex items-end justify-end">
				<Button type="minimal" class="gap-2 text-end text-lg hover-child:translate-x-1">
					{solutions.slice(-1)[0]?.description ?? ""}
					<ChevronRight class="h-4 w-4 transition-transform duration-500" />
				</Button>
			</div>
		</div>
	</div>
</Section>

<!-- Our Values -->
<Section id="values" class="relative py-20">
	<svelte:fragment slot="title">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html c(i("home.values.title"))}
	</svelte:fragment>
	<div class="flex items-center justify-between">
		<div class="grid gap-x-16 gap-y-12 pb-8 pt-4 sm:grid-cols-2">
			{#each valuesSections as value}
				<div class="grid grid-flow-col items-start justify-start gap-x-4">
					<svelte:component this={value.icon} class="h-10 w-10 text-dominant" />
					<div>
						<h3 class="text-xl font-medium text-dominant">{value.title}</h3>
						<p class="text-lg text-gray-200">
							{value.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Bottom CTA -->
<Section>
	<div class="my-32 flex flex-col items-center justify-center">
		<p class="text-lg text-gray-400 xs:text-2xl">
			{i("home.cta-bottom.subtitle")}
		</p>
		<h3 class="mx-10 mb-16 mt-4 text-center text-3xl font-medium xs:text-5xl">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html c(i("home.cta-bottom.title"))}
		</h3>
		<Button class="scale-110">{i("common.contact")}</Button>
	</div>
</Section>
