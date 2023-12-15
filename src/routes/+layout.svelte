<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Button from "$elements/Button.svelte";
	import RadioButtonsGroup from "$elements/RadioButtonsGroup.svelte";
	import SlideOver from "$shells/SlideOver.svelte";
	import { scrollTo } from "$utils/scroll";
	import { i, language, languages, loadResource, switchLanguage } from "@inlang/sdk-js";
	import { ArrowUp, Bars3 } from "@inqling/svelte-icons/heroicon-24-solid";
	import { Github } from "@inqling/svelte-icons/simple-icons";
	import { fade } from "svelte/transition";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";
	import "../app.css";

	// Breadcrumb
	let currentRoute: string[] = [];
	$: if ($page.route.id) {
		currentRoute = $page.route.id.split("/").filter(Boolean);
	}
	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindXsScreen = Number(fullTailwindConfig.theme.screens.xs.replace("px", ""));

	// Config
	let navbarItems: { name: string; href: string }[] = [];
	let footerItems: { name: string; items: { name: string; href: string }[] }[] = [];
	$: if (language) {
		navbarItems = [
			{ name: i("common.pages.process"), href: "#process" },
			{ name: i("common.pages.solutions"), href: "#solutions" }, // Dropdown: 5/6 solutions
			{ name: i("common.pages.technologies"), href: "#technologies" },
			{ name: i("common.pages.company"), href: "#about-us" } // Dropdown: Values, Who we are
		];
		footerItems = [
			{
				name: i("common.pages.solutions"),
				items: [
					{ name: i("common.solutions.comprehensive"), href: "." },
					{ name: i("common.solutions.web-app"), href: "." },
					{ name: i("common.solutions.landing"), href: "." },
					{ name: i("common.solutions.ecommerce"), href: "." },
					{ name: i("common.solutions.rewrite"), href: "." },
					{ name: i("common.solutions.custom"), href: "/contact" }
				]
			},
			{
				name: i("common.pages.title"),
				items: [
					{ name: i("common.pages.home"), href: "/" },
					{ name: i("common.pages.process"), href: "." },
					{ name: i("common.pages.solutions"), href: "." },
					{ name: i("common.pages.technologies"), href: "." }
				]
			},
			{
				name: i("common.pages.company"),
				items: [
					{ name: i("common.company.about"), href: "." },
					{ name: i("common.contact"), href: "/contact" },
					{ name: i("common.company.team"), href: "." },
					{ name: i("common.company.env"), href: "." },
					{ name: i("common.company.oss"), href: "https://github.com/EmeraldHQ" }
				]
			}
		];
	}

	// Bindings & variables
	let innerWidth = 0;
	let innerHeight = 0;
	let scrollY = 0;

	let scrollDistanceContactButton = 0;
	$: scrollDistanceContactButton = innerHeight * 0.7;
	let scrollDistanceLogoSwitch = 0;
	$: scrollDistanceLogoSwitch = innerHeight * 0.95;

	$: showButton = scrollY >= scrollDistanceContactButton;
	let showSlideOver = false;
	let slideOverCloseCallback: () => void = () => {};

	let shrinkNavBar = false;

	$: if (scrollY) {
		const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
		if (scrollY < scrollDistanceLogoSwitch - rem) {
			shrinkNavBar = false;
		}

		if (scrollY >= scrollDistanceLogoSwitch) {
			shrinkNavBar = true;
		}
	}
</script>

<!-- Binding for scroll-dependent elements -->
<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

<!-- Navbar -->
<div class="sticky top-0 z-10 flex w-full justify-center pt-5 md:pt-10">
	<div class="w-full max-w-large-screen child:backdrop-blur-sm child:backdrop-saturate-150">
		<nav
			class="delay-250 mx-2 flex h-20 items-center justify-center rounded-full bg-black/60 px-10 py-5 transition-[height] duration-300 ease-in-out sm:mx-5 md:mx-10 md:px-20"
			class:!h-16={shrinkNavBar || (innerWidth > 0 && innerWidth < tailwindXsScreen)}
		>
			<!-- Left logo -->
			<div class="mr-auto flex items-center gap-5">
				<button
					type="button"
					class="grid origin-left overflow-hidden scale-110 child:col-start-1 child:row-start-1 child:row-end-1"
					on:click={() => {
						$page.route.id === "/"
							? window.scrollTo({
									top: 0,
									behavior: "smooth"
								})
							: goto("/");
					}}
				>
					{#if scrollY >= scrollDistanceLogoSwitch || (innerWidth > 0 && innerWidth < tailwindXsScreen)}
						<img
							in:fade={{ delay: 250 }}
							out:fade
							src="/logo-small.svg"
							alt={i("a11y.alt.logo-small")}
							width="28"
							height="32"
							class="h-8 transition-opacity duration-300 hover:opacity-70"
						/>
					{:else}
						<img
							in:fade={{ delay: 250 }}
							out:fade
							src="/logo-title.svg"
							alt={i("a11y.alt.logo")}
							width="100"
							height="32"
							class="h-8 transition-opacity duration-300 hover:opacity-70"
						/>
					{/if}
				</button>
			</div>
			<!-- Right navigation -->
			<div class="flex items-center gap-5 sm:gap-10">
				<div
					class="hidden items-center gap-10 duration-700 ease-out lg:flex"
					class:-mr-40={!showButton}
				>
					{#each navbarItems as item}
						{#if item.href === $page.route.id}
							<span
								class="relative text-dominant after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-full after:bg-dominant after:content-['']"
							>
								{item.name}
							</span>
						{:else}
							<button
								type="button"
								class="relative after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:bg-dominant after:duration-300 after:content-[''] hover:after:w-full"
								on:click={async () => {
									if (item.href.startsWith("/")) {
										await goto(item.href);
									} else {
										if ($page.route.id !== "/") {
											await goto("/");
										}
										scrollTo(item.href);
									}
								}}
							>
								{item.name}
							</button>
						{/if}
					{/each}
				</div>
				<span
					id="contact-us"
					class="transition-opacity max-xs:hidden"
					class:opacity-0={!showButton}
					class:duration-200={!showButton}
					class:duration-1000={showButton}
					class:pointer-events-none={!showButton}
				>
					<Button styleType="secondary" on:click={() => goto("/contact")}>
						{i("common.contact")}
					</Button>
				</span>
				<button
					type="button"
					class="lg:hidden"
					aria-label={i("a11y.aria.menu")}
					on:click={() => (showSlideOver = true)}
				>
					<Bars3 class="h-8 w-8" />
				</button>
			</div>
		</nav>
		<!-- Breadcrumb -->
		{#if currentRoute.length > 0}
			<div
				class="mx-12 rounded-b-3xl bg-black/70 px-6 py-1 text-lg sm:mx-16 sm:px-8 md:mx-20 md:px-12"
			>
				<div class="flex flex-row-reverse overflow-x-auto whitespace-nowrap">
					<div class="mr-auto flex flex-row gap-1.5">
						{#each currentRoute as route, index}
							<span>/</span>
							<span>
								{#if index < currentRoute.length - 1}
									<a
										href="/{currentRoute.slice(0, index + 1).join('/')}"
										class="text-dominant underline-offset-4 hover:underline"
									>
										{route}
									</a>
								{:else}
									{route}
								{/if}
							</span>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Responsive slide-over -->
<SlideOver
	bind:show={showSlideOver}
	afterClose={() => {
		slideOverCloseCallback();
		slideOverCloseCallback = () => {};
	}}
>
	<svelte:fragment slot="content">
		<div
			class="flex h-full flex-col items-center justify-center gap-20 text-4xl font-medium child:after:!-bottom-3 child:after:!h-2"
		>
			{#each navbarItems as item}
				<button
					type="button"
					class="relative after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:bg-dominant after:duration-300 after:content-[''] hover:after:w-full"
					on:click={() => {
						showSlideOver = false;
						slideOverCloseCallback = async () => {
							if ($page.route.id !== "/") {
								await goto("/");
							}
							scrollTo(item.href);
						};
					}}
				>
					{item.name}
				</button>
			{/each}
			<button
				type="button"
				class="relative text-dominant after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:bg-dominant after:duration-300 after:content-[''] hover:after:w-full"
				on:click={() => {
					showSlideOver = false;
					slideOverCloseCallback = () => goto("/contact");
				}}
			>
				{i("common.contact")}
			</button>
		</div>
	</svelte:fragment>
</SlideOver>

<main>
	<slot />
</main>

<footer class="border-t border-gray-500 p-16 text-gray-400 xs:p-24">
	<!-- Main grid -->
	<div class="flex flex-col gap-20 xl:flex-row xl:gap-0">
		<a href="/" class="h-8 transition-opacity duration-300 hover:opacity-70">
			<img src="/logo-title.svg" alt={i("a11y.alt.logo")} width="174" height="56" />
		</a>
		<div class="flex flex-wrap gap-x-20 gap-y-16 md:justify-evenly xl:w-full">
			{#each footerItems as column}
				<div class="min-w-fit">
					<h3 class="mb-5 text-primary">{column.name}</h3>
					<div class="flex flex-col gap-2 child:w-fit">
						{#each column.items as item}
							{@const isExternal = item.href.startsWith("http")}
							<!-- TODO: remove this condition once all links are "made" -->
							{#if item.href === "."}
								<span>{item.name}</span>
							{:else}
								<span
									data-external={isExternal}
									class="after:opacity-70 data-[external='true']:after:content-['↗']"
								>
									<a
										href={item.href}
										class="underline-offset-4 hover:text-dominant hover:underline"
										target={isExternal ? "_blank" : "_self"}
										rel={isExternal ? "noopener noreferrer" : undefined}
									>
										{item.name}
									</a>
								</span>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- Bottom links & settings -->
	<div class="relative mt-10 flex items-end justify-between child:h-min">
		<!-- Left -->
		<div>
			<div class="mb-5 divide-x divide-gray-400 text-primary">
				<div class="inline-flex h-8 items-center gap-1">
					<a
						href="https://github.com/EmeraldHQ/Website"
						class="peer z-10 transition-opacity duration-300 hover:opacity-70"
						aria-label={i("a11y.aria.source")}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github class="h-8 w-8" />
					</a>
					<span
						class="select-none opacity-0 duration-300 -translate-x-4 scale-75 peer-hover:opacity-70 peer-hover:translate-x-0 peer-hover:scale-100"
					>
						↗
					</span>
				</div>
			</div>
			© {new Date().getFullYear()} Emerald Studio
		</div>
		<!-- Middle -->
		<button
			type="button"
			class="absolute bottom-0 left-0 right-0 mx-auto hidden w-fit text-center sm:block"
			on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			on:keypress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			<ArrowUp
				class="h-8 w-8 cursor-pointer rounded-full border-[1px] border-dominant p-1.5 text-dominant transition-colors duration-300 hover:border-transparent hover:bg-dominant hover:text-inverted"
			/>
		</button>
		<!-- Right -->
		<div class="flex flex-col items-end gap-2">
			<button
				type="button"
				class="sm:hidden"
				on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				on:keypress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				<ArrowUp
					class="h-8 w-8 cursor-pointer rounded-full border border-dominant p-1.5 text-dominant transition-colors duration-300 hover:border-transparent hover:bg-dominant hover:text-inverted"
				/>
			</button>
			<RadioButtonsGroup
				values={languages.map(language => language.toUpperCase())}
				defaultIndex={languages.indexOf(language)}
				description={i("a11y.aria.radio-language")}
				class="origin-bottom-right scale-75 xs:scale-90 sm:scale-100"
				on:hover={async e => {
					const lang = languages[e.detail.index];
					lang ? await loadResource(lang) : console.warn(`Language ${lang} not found`);
				}}
				on:change={e => {
					const lang = languages[e.detail.index];
					lang ? switchLanguage(lang) : console.error(`Language ${lang} not found`);
				}}
			/>
		</div>
	</div>
</footer>
