<script lang="ts">
	import { type SvelteComponent } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	import MagneticElement from "$shells/MagneticElement.svelte";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";
	import Section from "$layouts/Section.svelte";
	import Button from "$elements/button";
	import Cloud from "@inqling/svelte-icons/heroicon-24-outline/cloud.svelte";
	import Heart from "@inqling/svelte-icons/heroicon-24-outline/heart.svelte";
	import PaintBrush from "@inqling/svelte-icons/heroicon-24-outline/paint-brush.svelte";
	import RocketLaunch from "@inqling/svelte-icons/heroicon-24-outline/rocket-launch.svelte";
	import Sparkles from "@inqling/svelte-icons/heroicon-24-outline/sparkles.svelte";
	import Trophy from "@inqling/svelte-icons/heroicon-24-outline/trophy.svelte";
	import Window from "@inqling/svelte-icons/heroicon-24-outline/window.svelte";
	import WrenchScrewdriver from "@inqling/svelte-icons/heroicon-24-outline/wrench-screwdriver.svelte";
	import ArrowDown from "@inqling/svelte-icons/heroicon-24-solid/arrow-down.svelte";
	import ChevronRight from "@inqling/svelte-icons/heroicon-24-solid/chevron-right.svelte";
	import ChevronLeft from "@inqling/svelte-icons/heroicon-24-solid/chevron-left.svelte";
	import CodeBracket from "@inqling/svelte-icons/heroicon-24-solid/code-bracket.svelte";
	import DevicePhoneMobile from "@inqling/svelte-icons/heroicon-24-solid/device-phone-mobile.svelte";
	import Postgresql from "@inqling/svelte-icons/simple-icons/postgresql.svelte";
	import Svelte from "@inqling/svelte-icons/simple-icons/svelte.svelte";
	import Vercel from "@inqling/svelte-icons/simple-icons/vercel.svelte";
	import * as m from "$paraglide/messages";
	import { languageTag } from "$paraglide/runtime";
	import { c } from "$utils/inlang";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";

	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindSmScreen = Number(fullTailwindConfig.theme.screens.sm.replace("px", ""));

	// Keep only 3 solutions sections if the screen is too small
	let innerWidth = $state(0);

	// Sections
	let processSections = $derived.by<
		{
			title: string;
			icon: typeof SvelteComponent<SvelteHTMLElements["svg"]>;
			description: string;
		}[]
	>(() => {
		if (languageTag()) {
			return [
				{
					title: m.commonProcessDesign(),
					icon: PaintBrush,
					description: m.homeProcessDesignDesc()
				},
				{
					title: m.commonProcessDevelopment(),
					icon: CodeBracket,
					description: m.homeProcessDevelopmentDesc()
				},
				{
					title: m.commonProcessHosting(),
					icon: Cloud,
					description: m.homeProcessHostingDesc()
				}
			];
		}
		return [];
	});
	let solutionsSections = $derived.by<{ title: string; description: string }[]>(() => {
		if (languageTag()) {
			return [
				{
					title: m.commonSolutionsComprehensive(),
					description: m.homeSolutionsComprehensiveDesc()
				},
				{
					title: m.commonSolutionsWebApp(),
					description: m.homeSolutionsWebAppDesc()
				},
				{
					title: m.commonSolutionsLanding(),
					description: m.homeSolutionsLandingDesc()
				},
				{
					title: m.commonSolutionsEcommerce(),
					description: m.homeSolutionsEcommerceDesc()
				},
				{
					title: m.commonSolutionsRewrite(),
					description: m.homeSolutionsRewriteDesc()
				},
				{
					title: m.commonSolutionsCustom(),
					description: m.homeSolutionsCustomDesc()
				}
			];
		}
		return [];
	});
	let solutions = $derived.by<typeof solutionsSections>(() => {
		const initial = solutionsSections;
		if (innerWidth > 0 && tailwindSmScreen > innerWidth) {
			return initial.slice(0, 3).concat(initial.slice(-1));
		}
		return initial;
	});
	let valuesSections = $derived.by<
		{
			icon: typeof SvelteComponent<SvelteHTMLElements["svg"]>;
			title: string;
			description: string;
		}[]
	>(() => {
		if (languageTag()) {
			return [
				{
					icon: Trophy,
					title: m.homeValuesQualityTitle(),
					description: m.homeValuesQualityDesc()
				},
				{
					icon: Heart,
					title: m.homeValuesPassionTitle(),
					description: m.homeValuesPassionDesc()
				},
				{
					icon: WrenchScrewdriver,
					title: m.homeValuesAutomationTitle(),
					description: m.homeValuesAutomationDesc()
				},
				{
					icon: RocketLaunch,
					title: m.homeValuesPerformanceTitle(),
					description: m.homeValuesPerformanceDesc()
				}
			];
		}
		return [];
	});
	let technologiesSections = $derived.by<typeof processSections & { brandColor: string }[]>(() => {
		if (languageTag()) {
			return [
				{
					title: c(m.homeTechnologiesFrameworkTitle()),
					icon: Svelte,
					brandColor: "#FF3E00",
					description: m.homeTechnologiesFrameworkDesc()
				},
				{
					title: c(m.homeTechnologiesDatabaseTitle()),
					icon: Postgresql,
					brandColor: "#4169E1",
					description: m.homeTechnologiesDatabaseDesc()
				},
				{
					title: c(m.homeTechnologiesInfrastructureTitle()),
					icon: Vercel,
					brandColor: "#FFFFFF",
					description: m.homeTechnologiesInfrastructureDesc()
				}
			];
		}
		return [];
	});

	// Process cards
	let processCards = $state<HTMLElement>();
	let leftButton = $state<HTMLButtonElement>();
	let rightButton = $state<HTMLButtonElement>();

	function scrollToProcessCard(button: "left" | "right") {
		if (!processCards) return;
		const leftScroll = processCards.scrollLeft - processCards.offsetWidth;
		const rightScroll = processCards.scrollLeft + processCards.offsetWidth;
		processCards.scrollTo({
			left: button === "left" ? leftScroll : rightScroll
		});
	}

	function hideProcessButton() {
		if (!processCards || !leftButton || !rightButton) return;

		const processCardWidth = processCards.clientWidth;
		// Hide the left button if we are at the beginning
		if (processCards.scrollLeft < processCardWidth) {
			leftButton.style.opacity = "0";
			leftButton.disabled = true;
		} else {
			leftButton.style.opacity = "1";
			leftButton.disabled = false;
		}

		// Hide the right button if we are at the end
		if (processCards.scrollLeft > processCards.scrollWidth - processCardWidth * 2) {
			rightButton.style.opacity = "0";
			rightButton.disabled = true;
		} else {
			rightButton.style.opacity = "1";
			rightButton.disabled = false;
		}
	}

	// Technologies cards
	let technoCards = $state<HTMLElement>();
	let technoIcons = $state<HTMLElement>();

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

	// Auto-scroll technologies cards
	const TECHNO_AUTO_SCROLL_DELAY = 5000;
	let currentTechnoCard = 0;
	let shouldResetTechnoScrollTimer = $state(false);

	function hoverTechnoIcon(index: number) {
		if (!technoIcons) return;
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

	function scrollToTechnoCard(index: number) {
		const cards = technoCards?.children;
		if (!cards || cards.length < index) return;
		const card = cards[index];
		if (!card) return;

		technoCards?.scrollTo({
			left: card.clientWidth * index
		});
	}

	$effect(() => {
		// === Process section ===
		hideProcessButton();
		processCards?.addEventListener("scroll", hideProcessButton);

		// === Auto-scroll technologies cards ===
		// Initial checks
		const cards = technoCards?.children;
		if (!cards || cards.length < 2) return;

		// Hover the first icon on load, otherwise
		// no icon is hovered until the first scroll
		hoverTechnoIcon(currentTechnoCard);

		// Auto-scroll function
		function autoScroll() {
			if (cards && currentTechnoCard === cards.length - 1) {
				currentTechnoCard = 0;
			} else {
				currentTechnoCard++;
			}
			scrollToTechnoCard(currentTechnoCard);
		}

		// Initial interval definition, start auto-scrolling
		let interval = setInterval(autoScroll, TECHNO_AUTO_SCROLL_DELAY);

		// Stop the interval on hover of the cards
		technoCards?.addEventListener("mouseenter", () => {
			clearInterval(interval);
		});

		// Restart the interval on mouse leave
		technoCards?.addEventListener("mouseleave", () => {
			interval = setInterval(autoScroll, TECHNO_AUTO_SCROLL_DELAY);
		});

		// Scroll handler to update the hovered icon depending on
		// the card we scrolled to
		function onTechnoCardsScrollEnd() {
			if (shouldResetTechnoScrollTimer) {
				clearInterval(interval);
				interval = setInterval(autoScroll, TECHNO_AUTO_SCROLL_DELAY);
				shouldResetTechnoScrollTimer = false;
			}
			if (!technoCards) return; // fix "scrollLeft not found on undefined"
			const scrollDistance = technoCards.scrollLeft;
			const containerWidth = technoCards.clientWidth;
			currentTechnoCard = Math.round(scrollDistance / containerWidth);
			hoverTechnoIcon(currentTechnoCard);
		}

		if ("onscrollend" in window) {
			technoCards?.addEventListener("scrollend", onTechnoCardsScrollEnd);
		} else {
			// Safari fallback
			let timeout: ReturnType<typeof setTimeout>;
			technoCards?.addEventListener("scroll", () => {
				clearTimeout(timeout);
				timeout = setTimeout(onTechnoCardsScrollEnd, 100);
			});
		}

		// On destroy, clear the interval
		return () => clearInterval(interval);
	});
</script>

<!-- Window bindings -->
<svelte:window bind:innerWidth />

<!-- Body -->
<!-- Hero -->
<div
	class="absolute inset-0 -z-10 max-w-full bg-gradient-to-l from-dominant to-transparent opacity-20 content-[''] lg:max-h-[90svh] xl:max-h-none xxl:max-h-[90svh]"
></div>
<div id="hero" class="relative flex h-[85svh] flex-col items-center justify-center lg:h-[80svh]">
	<div class="m-auto grid h-fit w-2/3 max-w-screen-lg grid-cols-1 items-center xl:grid-cols-2">
		<!-- Left part -->
		<div class="flex flex-col gap-10 sm:mx-auto">
			<h1
				class="text-pretty text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl xxl:text-7xl"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html c(m.homeHeroTitle())}
			</h1>
			<h2 class="text-pretty text-xl text-gray-400">
				{m.homeHeroSubtitle()}
			</h2>
			<div
				class="flex flex-col gap-5 *:max-w-fit *:origin-bottom-left *:scale-110 xs:flex-row xs:gap-12"
			>
				<Button href="/contact">{m.commonContact()}</Button>
				<!-- <Button variant="link" class="group">
					{m.homeHeroSecondaryCta()}
					<ChevronRight
						class="size-4 transition-transform duration-500 group-hover:translate-x-1"
					/>
				</Button> -->
			</div>
		</div>
		<!-- Right part -->
		<Mouse3DTilting
			initialX={-32}
			initialY={-13}
			intensity={0.05}
			scope="#hero"
			class="relative hidden aspect-square max-h-full items-center justify-center *:absolute lg:ml-20 xl:flex"
		>
			<Window class="size-full text-dominant" />
			<div
				class="bottom-10 left-0 w-36 perspective-[312rem] transform-style-3d translate-z-24
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-[0.35] before:blur-lg before:content-[''] before:-translate-z-28"
			>
				<CodeBracket class="size-full" />
			</div>
			<div
				class="left-1/2 top-0 w-36 perspective-[312rem] transform-style-3d translate-z-20
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-50 before:blur-lg before:content-[''] before:-translate-z-20"
			>
				<Sparkles class="size-full" />
			</div>
			<div
				class="-right-10 bottom-0 w-36 perspective-[312rem] transform-style-3d translate-z-16
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-[0.55] before:blur-lg before:content-[''] before:-translate-z-16"
			>
				<DevicePhoneMobile class="size-full" />
			</div>
		</Mouse3DTilting>
	</div>
	<!-- Bottom arrow -->
	<MagneticElement
		class="absolute bottom-0 mb-10 transition-transform duration-500"
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
			onclick={() => document.querySelector("#process")?.scrollIntoView()}
		>
			<ArrowDown
				class="size-8 cursor-pointer rounded-full border border-transparent bg-dominant p-1.5 text-inverted
				hover:border-dominant hover:bg-inherit hover:text-dominant"
			/>
		</button>
	</MagneticElement>
</div>

<!-- Process -->
<Section id="process">
	<div class="!mx-6 flex gap-2">
		<button
			bind:this={leftButton}
			class="transition-opacity duration-300 ease-in-out lg:hidden"
			onclick={() => scrollToProcessCard("left")}
		>
			<ChevronLeft class="size-10 text-dominant" />
		</button>
		<div
			bind:this={processCards}
			class="flex snap-x snap-mandatory gap-16 overflow-x-auto overflow-y-hidden py-8 *:snap-start motion-safe:scroll-smooth lg:justify-center"
		>
			{#each processSections as { title, icon: IconComp, description }, index}
				<div class="relative max-lg:min-w-full lg:w-1/4 lg:pb-4">
					<span
						class="absolute -z-10 flex size-full items-center justify-center text-9xl font-medium text-gray-700/75"
					>
						{index + 1}
					</span>
					<div class="flex w-fit flex-row items-center gap-4">
						<IconComp class="size-10 text-dominant" />
						<h3 class="text-2xl font-medium">{title}</h3>
					</div>
					<p class="size-full text-pretty pt-4 text-lg font-normal text-gray-200">
						{description}
					</p>
				</div>
			{/each}
		</div>
		<button
			bind:this={rightButton}
			class="transition-opacity duration-300 ease-in-out lg:hidden"
			onclick={() => scrollToProcessCard("right")}
		>
			<ChevronRight class="size-10 text-dominant" />
		</button>
	</div>
</Section>

<!-- Solutions -->
<Section id="solutions" title={m.homeSolutionsTitle()} class="relative py-20">
	<div
		class="absolute inset-0 -z-10 !mx-0 w-screen !max-w-full bg-left content-[''] bg-grid-slate-500/20
			before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:via-transparent before:via-80% before:to-black before:content-['']
			after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-80% after:to-black after:content-['']"
	></div>
	<div class="flex items-center justify-between">
		<div class="grid gap-x-16 gap-y-12 pb-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each solutions.slice(0, -1) as solution}
				<div>
					<h3 class="text-xl font-medium text-dominant">{solution.title}</h3>
					<p class="text-pretty text-lg text-gray-200">
						{solution.description}
					</p>
				</div>
			{/each}
			<em class="text-center sm:hidden">
				{m.homeSolutionsMoreBeforeLink()}
				<!--				<Button variant="minimal">{m.homeSolutionsMoreLink()}</Button>-->
				{m.homeSolutionsMoreLink()}
				{m.homeSolutionsMoreAfterLink()}
			</em>
			<div class="flex items-end justify-end">
				<Button variant="link" href="/contact" class="gap-2 text-end text-lg hover:*:translate-x-1">
					{solutions.slice(-1)[0]?.description ?? ""}
					<ChevronRight class="size-4 transition-transform duration-500" />
				</Button>
			</div>
		</div>
	</div>
</Section>

<!-- Values -->
<Section id="values" title={m.homeValuesTitle()} class="relative mx-auto py-20">
	<div class="flex items-center justify-between">
		<div class="grid gap-x-16 gap-y-12 pb-8 pt-4 sm:grid-cols-2">
			{#each valuesSections as value}
				<div class="grid grid-flow-col items-start justify-start gap-x-4">
					<value.icon class="size-10 text-dominant" />
					<div>
						<h3 class="text-xl font-medium text-dominant">{value.title}</h3>
						<p class="text-pretty text-lg text-gray-200">
							{value.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Technologies -->
<Section id="technologies" title={m.homeTechnologiesTitle()}>
	<div class="flex flex-col items-center gap-8 max-sm:!mx-8 sm:flex-row">
		<!-- Left part -->
		<div
			bind:this={technoCards}
			class="flex max-w-full snap-x snap-mandatory gap-8 overflow-x-auto py-4 *:snap-start motion-safe:scroll-smooth sm:max-w-none"
		>
			{#each technologiesSections as techno}
				<div
					class="flex min-w-full flex-col gap-4 rounded-3xl border border-white border-opacity-25 bg-glass p-8 backdrop-blur backdrop-filter"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<h3 class="text-xl font-medium">{@html techno.title}</h3>
					<p class="text-pretty text-lg text-gray-200">
						{techno.description}
					</p>
				</div>
			{/each}
		</div>

		<!-- Right part -->
		<div class="aspect-square h-56 lg:h-64 xl:h-72">
			<div
				bind:this={technoIcons}
				class="relative flex size-full items-center justify-center -rotate-45"
			>
				{#each technologiesSections as techno, index}
					{@const { x, y } = getOffset(technologiesSections.length, index, 50, false)}
					<button
						style="transform: translate({x}%, {y}%);"
						class="group absolute flex aspect-square h-1/2 items-center justify-center rounded-full bg-gray-400/75 transition-all duration-700
						hover:bg-gray-500 hover:scale-110
						[&.is-selected]:z-10 [&.is-selected]:bg-gray-600 [&.is-selected]:scale-110"
						onclick={() => {
							scrollToTechnoCard(index);
							shouldResetTechnoScrollTimer = true;
						}}
					>
						<techno.icon
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
<Section id="about-us" title={m.homeAboutUsTitle()}>
	<div class="flex items-center justify-center pb-10">
		<div
			class="flex min-w-full flex-col gap-4 rounded-3xl border border-white border-opacity-25 bg-glass p-8 backdrop-blur backdrop-filter max-sm:!-mx-8"
		>
			<p class="text-pretty text-lg text-gray-200">
				{m.homeAboutUsDesc()}
			</p>
		</div>
	</div>
	<!-- <div class="flex items-center justify-end">
		<Button type="link" class="gap-2 text-end text-lg hover:*:translate-x-1">
			{m.homeAboutUsMore()}
			<ChevronRight class="size-4 min-w-max transition-transform duration-500" />
		</Button>
	</div> -->
</Section>

<!-- Bottom CTA -->
<Section>
	<div class="my-32 flex flex-col items-center justify-center">
		<p class="text-lg text-gray-400 xs:text-2xl">
			{m.homeBottomCtaSubtitle()}
		</p>
		<h3 class="mx-10 mb-16 mt-4 max-w-screen-xs text-center text-3xl font-medium xs:text-5xl">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html c(m.homeBottomCtaTitle())}
		</h3>
		<Button href="/contact" class="scale-110">{m.commonContact()}</Button>
	</div>
</Section>
