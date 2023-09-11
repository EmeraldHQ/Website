<script lang="ts">
	import { ROOT_URL } from "$config";
	import { onMount, type SvelteComponent } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	import { goto } from "$app/navigation";
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
		ChevronLeft,
		CodeBracket,
		DevicePhoneMobile
	} from "@inqling/svelte-icons/heroicon-24-solid";
	import { Postgresql, Svelte, Vercel } from "@inqling/svelte-icons/simple-icons";
	import { i, language } from "@inlang/sdk-js";
	import { c } from "$utils/inlang-color";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";

	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindSmScreen = Number(fullTailwindConfig.theme.screens.sm.replace("px", ""));
	const tailwindLgScreen = Number(fullTailwindConfig.theme.screens.lg.replace("px", ""));

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
	let technologiesSections: typeof processSections & { brandColor: string }[] = [];
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
		technologiesSections = [
			{
				title: c(i("home.technologies.framework.title")),
				icon: Svelte,
				brandColor: "#FF3E00",
				description: i("home.technologies.framework.desc")
			},
			{
				title: c(i("home.technologies.database.title")),
				icon: Postgresql,
				brandColor: "#4169E1",
				description: i("home.technologies.database.desc")
			},
			{
				title: c(i("home.technologies.infrastructure.title")),
				icon: Vercel,
				brandColor: "#FFFFFF",
				description: i("home.technologies.infrastructure.desc")
			}
		];
	}

	// Process cards
	let processCards: HTMLElement;
	let processButtonLeft: Button;
	let processButtonRight: Button;

	// TODO: create ScrollTo (params = element, index); use it here and in technologies cards
	function scrollToProcessCard(button: 'left' | 'right') {
		console.log('scrollLeft', processCards.scrollLeft);
		const processCardwidth = processCards.clientWidth;
		const index = button === 'left' ? Math.floor(processCards.scrollLeft / processCardwidth) - 1 : Math.floor(processCards.scrollLeft / processCardwidth) + 1;
		const cards = processCards?.children;
		if (!cards || cards.length < index) return;
		const card = cards[index];
		if (!card) return;
		processCards.scrollTo({
			left: card.clientWidth * index,
			behavior: "smooth"
		});
	}



	onMount(() => {
		
	});

	// Technologies cards
	let technoCards: HTMLElement;
	let technoIcons: HTMLElement;

	function getOffset(
		totalPoints: number,
		pointNumber: number,
		radius: number = 60,
		clockwise: boolean = true
	) {
		if (pointNumber > totalPoints) {
			throw new Error("Point number cannot exceed total number of points.");
		}

		const baseAngle = ((2 * Math.PI) / totalPoints) * pointNumber;

		const angle = clockwise ? baseAngle : 2 * Math.PI - baseAngle;

		return {
			x: radius * Math.cos(angle),
			y: radius * Math.sin(angle)
		};
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

	// Auto-scroll technologies cards
	const DELAY = 5000;
	let currentCard = 0;

	function hoverIcon(index: number) {
		const icons = technoIcons.children;
		if (!icons || icons.length < index) return;
		const icon = icons[index];
		if (!icon) return;

		icon.classList.add("is-selected");
		for (let i = 0; i < icons.length; i++) {
			if (i === index) continue;
			icons[i]?.classList.remove("is-selected");
		}
	}

	function scrollToCard(index: number) {
		const cards = technoCards?.children;
		if (!cards || cards.length < index) return;
		const card = cards[index];
		if (!card) return;

		technoCards.scrollTo({
			left: card.clientWidth * index,
			behavior: "smooth"
		});
	}

	onMount(() => {
		// === Auto-scroll technologies cards ===
		// Initial checks
		const cards = technoCards?.children;
		if (!cards || cards.length < 2) return;

		// Hover the first icon on load, otherwise
		// no icon is hovered until the first scroll
		hoverIcon(currentCard);

		// Auto-scroll function
		const autoScroll = () => {
			if (currentCard === cards.length - 1) {
				currentCard = 0;
			} else {
				currentCard++;
			}
			scrollToCard(currentCard);
		};

		// Initial interval definition, start auto-scrolling
		let interval = setInterval(autoScroll, DELAY);

		// Stop the interval on hover of the cards
		technoCards.addEventListener("mouseenter", () => {
			clearInterval(interval);
		});

		// Restart the interval on mouse leave
		technoCards.addEventListener("mouseleave", () => {
			interval = setInterval(autoScroll, DELAY);
		});

		// Add listeners to the icons to start/stop the interval on hover
		[...technoIcons.children].forEach(icon => {
			icon.addEventListener("mouseenter", () => {
				clearInterval(interval);
			});

			icon.addEventListener("mouseleave", () => {
				interval = setInterval(autoScroll, DELAY);
			});
		});

		// Scroll handler to update the hovered icon depending on
		// the card we scrolled to
		technoCards.addEventListener("scrollend", () => {
			if (!technoCards) return; // fix "scrollLeft not found on undefined"?
			const scrollDistance = technoCards.scrollLeft;
			const containerWidth = technoCards.clientWidth;
			currentCard = Math.round(scrollDistance / containerWidth);
			hoverIcon(currentCard);
		});

		// On destroy, clear the interval
		return () => clearInterval(interval);
	});
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
				width: 512,
				height: 256,
				alt: i("a11y.alt.og-banner")
			}
		],
		siteName: "Emerald Studio"
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
	additionalRobotsProps={{
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
		// Add FAQ?
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
		class="m-auto grid h-fit grid-cols-1 items-center px-10
		before:absolute before:inset-0 before:-z-10 before:max-w-full before:bg-gradient-to-l before:from-dominant before:to-transparent before:opacity-20 before:content-[''] md:px-32 xl:grid-cols-2"
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
				<Button on:click={() => goto("/contact")}>{i("common.contact")}</Button>
				<!--				<Button styleType="minimal" class="hover-child:translate-x-1">-->
				<!--					{i("home.hero.cta-secondary")}-->
				<!--					<ChevronRight class="h-4 w-4 transition-transform duration-500" />-->
				<!--				</Button>-->
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
			type="button"
			style="
					transition-property: transform;
					transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				"
			on:keypress={() => scrollTo("#process")}
			on:click={() => scrollTo("#process")}
		>
			<ArrowDown
				class="h-8 w-8 cursor-pointer rounded-full border border-transparent bg-dominant p-1.5 text-inverted
				hover:border-dominant hover:bg-inherit hover:text-dominant"
			/>
		</button>
	</MagneticElement>
</div>

<!-- Process -->
<Section id="process" class="relative">
	<div bind:this={processCards}
		class="flex snap-x snap-mandatory gap-16 overflow-x-auto overflow-y-hidden py-8 child:snap-start md:justify-center"
	>
		{#if innerWidth > 0 && innerWidth < tailwindLgScreen}
		<Button bind:this={processButtonLeft}
				styleType="minimal"
				class="gap-2 text-end text-lg hover-child:translate-x-1 absolute top-1/2 left-4"
				id="process-btn-left"
				on:click={() => scrollToProcessCard('left')}
			>
				<ChevronLeft class="h-10  w-10 text-dominant"/>
		</Button>
		{/if}
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
		{#if innerWidth > 0 && innerWidth < tailwindLgScreen}
		<Button bind:this={processButtonRight}
				styleType="minimal"
				class="gap-2 text-end text-lg hover-child:translate-x-1 absolute top-1/2 right-4"
				id="process-btn-right"
				on:click={() => scrollToProcessCard('right')}
			>
				<ChevronRight class="h-10  w-10 text-dominant"/>
		</Button>
		{/if}
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
				<!--				<Button styleType="minimal">{i("home.solutions.more.link")}</Button>-->
				{i("home.solutions.more.link")}
				{i("home.solutions.more.after-link")}
			</em>
			<div class="flex items-end justify-end">
				<Button
					styleType="minimal"
					class="gap-2 text-end text-lg hover-child:translate-x-1"
					on:click={() => goto("/contact")}
				>
					{solutions.slice(-1)[0]?.description ?? ""}
					<ChevronRight class="h-4 w-4 transition-transform duration-500" />
				</Button>
			</div>
		</div>
	</div>
</Section>

<!-- Values -->
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

<!-- Technologies -->
<Section id="technologies">
	<svelte:fragment slot="title">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html c(i("home.technologies.title"))}
	</svelte:fragment>
	<div class="flex flex-col items-center gap-8 max-sm:!mx-8 sm:flex-row">
		<!-- Left part -->
		<div
			bind:this={technoCards}
			class="flex max-w-full snap-x snap-mandatory gap-8 overflow-x-auto py-4 child:snap-start sm:max-w-none"
		>
			{#each technologiesSections as techno}
				<div
					class="flex min-w-full flex-col gap-4 rounded-3xl border border-white border-opacity-25 bg-glass p-8 backdrop-blur backdrop-filter"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<h3 class="text-xl font-medium">{@html techno.title}</h3>
					<p class="text-lg text-gray-200">
						{techno.description}
					</p>
				</div>
			{/each}
		</div>

		<!-- Right part -->
		<div class="aspect-square h-56 lg:h-48">
			<div
				bind:this={technoIcons}
				class="relative flex h-full w-full items-center justify-center -rotate-45"
			>
				{#each technologiesSections as techno, index}
					{@const { x, y } = getOffset(technologiesSections.length, index, 50, false)}
					<button
						style="transform: translate({x}%, {y}%);"
						class="group absolute flex aspect-square h-1/2 items-center justify-center rounded-full bg-gray-400/75 transition-all duration-700
						hover:bg-gray-500 hover:scale-110
						[&.is-selected]:z-10 [&.is-selected]:bg-gray-600 [&.is-selected]:scale-110"
						on:click={() => scrollToCard(index)}
					>
						<svelte:component
							this={techno.icon}
							style="--brand-color: {techno.brandColor}"
							class="w-1/2 drop-shadow-md transition-all duration-700 rotate-45
							group-hover:fill-[var(--brand-color)] group-hover:scale-110
							group-[.is-selected]:fill-[var(--brand-color)] group-[.is-selected]:scale-110"
						/>
					</button>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- About us -->
<Section id="about-us">
	<svelte:fragment slot="title">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html c(i("home.about-us.title"))}
	</svelte:fragment>
	<div class="flex items-center justify-center pb-10">
		<div
			class="flex min-w-full flex-col gap-4 rounded-3xl border border-white border-opacity-25 bg-glass p-8 backdrop-blur backdrop-filter max-sm:!-mx-8"
		>
			<p class="text-lg text-gray-200">
				{i("home.about-us.desc")}
			</p>
		</div>
	</div>
	<!-- <div class="flex items-center justify-end">
		<Button type="minimal" class="gap-2 text-end text-lg hover-child:translate-x-1">
			{i("home.about-us.more")}
			<ChevronRight class="h-4 w-4 min-w-max transition-transform duration-500" />
		</Button>
	</div> -->
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
		<Button class="scale-110" on:click={() => goto("/contact")}>{i("common.contact")}</Button>
	</div>
</Section>
