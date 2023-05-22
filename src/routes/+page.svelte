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

	const processSections = [
		{
			title: "Design",
			icon: PaintBrush,
			description:
				"We design the graphical interface of your project in accordance with your visual identity, to ensure an optimal user experience. "
		},
		{
			title: "Development",
			icon: CodeBracket,
			description:
				"Our company specializes in transforming your concepts into functional code, utilizing the latest and most advanced technologies in the market."
		},
		{
			title: "Hosting",
			icon: Cloud,
			description:
				"We handle all aspects of hosting options for your project, freeing you to focus on your business. We offer both at-Vercel hosting and on-premise hosting."
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
<div id="hero" class="flex h-[calc(100dvh_-_7.5rem)] flex-col items-center justify-center">
	<div
		class="m-auto grid h-fit grid-cols-1 items-center px-10 before:absolute before:inset-0
			before:-z-10 before:max-w-full before:bg-gradient-to-l before:from-dominant before:to-transparent before:opacity-20 before:content-[''] md:px-32 xl:grid-cols-2"
	>
		<!-- Left part -->
		<div
			class="flex flex-col justify-center text-4xl font-medium sm:mx-auto sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl xxl:text-7xl"
		>
			<h1>Your <span class="text-dominant">super-fast</span><br />digital project</h1>
			<h2 class="pt-10 text-xl font-normal text-gray-400">
				Powered by cutting-edge technologies, let's build<br />the web application you've been
				dreaming of.
			</h2>
			<div
				class="flex origin-bottom-left flex-col gap-5 pt-10 scale-110 child:max-w-fit xs:flex-row"
			>
				<Button>Contact Us</Button>
				<Button type="minimal" class="hover-child:translate-x-1">
					See our work
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

<Section id="process">
	<div
		class="scrolling-touch flex-no-wrap flex snap-x snap-mandatory items-start gap-16 overflow-x-auto py-8 child:snap-start md:justify-center md:child:h-min"
	>
		{#each processSections as { title, icon, description }, i}
			<div class="relative max-md:min-w-full md:w-1/4 lg:pb-4">
				<span
					class="absolute -z-10 flex h-full w-full items-center justify-center text-9xl font-medium text-gray-700/75"
				>
					{i + 1}
				</span>
				<div class="flex w-fit flex-row items-center gap-4">
					<svelte:component this={icon} class="h-10 w-10 text-dominant" />
					<span class="text-2xl font-medium">{title}</span>
				</div>
				<p class="w-full pt-4 text-lg font-normal text-gray-200">
					{description}
				</p>
			</div>
		{/each}
	</div>
</Section>
