<script lang="ts">
	import "../app.css";
	import type { LayoutData } from "./$types";
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import ArrowUp from "@inqling/svelte-icons/heroicon-24-solid/arrow-up.svelte";
	import Bars3 from "@inqling/svelte-icons/heroicon-24-solid/bars-3.svelte";
	import Github from "@inqling/svelte-icons/simple-icons/github.svelte";
	import { JsonLd, MetaTags, type JsonLdProps, type MetaTagsProps } from "svelte-meta-tags";
	import extend from "just-extend";
	import { ParaglideJS } from "@inlang/paraglide-js-adapter-sveltekit";
	import { i18n } from "$utils/inlang";
	import { availableLanguageTags, languageTag, onSetLanguageTag } from "$paraglide/runtime";
	import * as m from "$paraglide/messages";
	import Button from "$elements/button";
	import SlideOver from "$shells/SlideOver.svelte";

	// Breadcrumb
	let currentRoute: string[] = [];
	$: if ($page.route.id) {
		currentRoute = $page.route.id.split("/").filter(Boolean);
	}

	// Meta tags
	export let data: LayoutData;
	let metadata: MetaTagsProps;
	$: metadata = extend(true, {}, data.baseMetaTags, {
		title: $page.data.pageTitle,
		twitter: {
			title:
				data.baseMetaTags?.titleTemplate.replace(/%s/g, $page.data.pageTitle) ??
				$page.data.pageTitle
		}
	});
	let schemas: JsonLdProps["schema"] = [];
	$: schemas = [...(data.baseSchemas ?? []), ...($page.data.pageSchemas ?? [])].filter(Boolean);

	// Inlang
	onSetLanguageTag(() => {
		navbarItems = [
			{ name: m.commonPagesProcess(), href: "#process" },
			{ name: m.commonPagesSolutions(), href: "#solutions" }, // Dropdown: 5/6 solutions
			{ name: m.commonPagesTechnologies(), href: "#technologies" },
			{ name: m.commonPagesCompany(), href: "#about-us" } // Dropdown: Values, Who we are
		];
		footerItems = [
			{
				name: m.commonPagesSolutions(),
				items: [
					{ name: m.commonSolutionsComprehensive(), href: "." },
					{ name: m.commonSolutionsWebApp(), href: "." },
					{ name: m.commonSolutionsLanding(), href: "." },
					{ name: m.commonSolutionsEcommerce(), href: "." },
					{ name: m.commonSolutionsRewrite(), href: "." },
					{ name: m.commonSolutionsCustom(), href: "/contact" }
				]
			},
			{
				name: m.commonPagesTitle(),
				items: [
					{ name: m.commonPagesHome(), href: "/" },
					{ name: m.commonPagesProcess(), href: "." },
					{ name: m.commonPagesSolutions(), href: "." },
					{ name: m.commonPagesTechnologies(), href: "." }
				]
			},
			{
				name: m.commonPagesCompany(),
				items: [
					{ name: m.commonCompanyAbout(), href: "." },
					{ name: m.commonContact(), href: "/contact" },
					{ name: m.commonCompanyTeam(), href: "." },
					{ name: m.commonCompanyEnv(), href: "." },
					{ name: m.commonCompanyOss(), href: "https://github.com/EmeraldHQ" }
				]
			}
		];
	});

	beforeNavigate(({ to, type }) => {
		document.documentElement.classList.remove("motion-safe:scroll-smooth");
		if (!to || !to.route.id) return; // to === null -> external link, to.route.id === null -> 404
		if (type === "link" && to.route.id === $page.route.id) {
			const lang = i18n.getLanguageFromUrl(to.url);
			localStorage.setItem("language", lang);
		}
	});

	afterNavigate(async ({ complete }) => {
		await complete;
		document.documentElement.classList.add("motion-safe:scroll-smooth");
	});

	// Config
	let navbarItems: { name: string; href: string }[] = [];
	let footerItems: { name: string; items: { name: string; href: string }[] }[] = [];

	// Bindings & variables
	let innerHeight = 0;
	let scrollY = 0;

	let scrollDistanceContactButton = 0;
	$: scrollDistanceContactButton = innerHeight * 0.7;
	let scrollDistanceLogoSwitch = 0;
	$: scrollDistanceLogoSwitch = innerHeight * 0.95;

	$: showButton = !!scrollY && scrollY >= scrollDistanceContactButton;

	let showSlideOver = false;

	let isPastLogoScrollDistance = false;
	$: if (scrollY) {
		const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
		if (scrollY < scrollDistanceLogoSwitch - rem) {
			isPastLogoScrollDistance = false;
		} else if (scrollY >= scrollDistanceLogoSwitch) {
			isPastLogoScrollDistance = true;
		}
	}
</script>

<!-- Binding for scroll-dependent elements -->
<svelte:window bind:innerHeight bind:scrollY />

<ParaglideJS {i18n}>
	<MetaTags {...metadata} />

	<JsonLd schema={schemas} />

	<!-- Navbar -->
	<div class="sticky top-0 z-10 flex w-full justify-center pt-5 md:pt-10">
		<div class="w-full max-w-large-screen *:backdrop-blur-sm *:backdrop-saturate-150">
			<nav
				class="delay-250 mx-2 flex h-16 items-center justify-center rounded-full bg-black/60 px-10 py-5 transition-[height] duration-300 ease-in-out xs:h-20 sm:mx-5 md:mx-10 md:px-20"
				class:xs:!h-16={!!scrollY && isPastLogoScrollDistance}
			>
				<!-- Left logo -->
				<div class="mr-auto flex items-center gap-5">
					<button
						type="button"
						class="grid origin-left overflow-hidden scale-110 *:col-start-1 *:row-start-1 *:row-end-1"
						on:click={() => {
							$page.route.id === "/" ? window.scrollTo({ top: 0 }) : goto("/");
						}}
					>
						<img
							src="/logo-small.svg"
							alt={m.a11yAltLogoSmall()}
							width="28"
							height="32"
							class="h-8 transition-opacity duration-300 hover:opacity-70"
							class:xs:opacity-0={!scrollY || !isPastLogoScrollDistance}
						/>
						<img
							src="/logo-title.svg"
							alt={m.a11yAltLogo()}
							width="100"
							height="32"
							class="h-8 opacity-0 transition-opacity duration-300 hover:opacity-70"
							class:xs:opacity-100={!scrollY || !isPastLogoScrollDistance}
						/>
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
											document.querySelector(item.href)?.scrollIntoView();
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
						<Button variant="secondary" href="/contact" tabindex={showButton ? 0 : -1}>
							{m.commonContact()}
						</Button>
					</span>
					<button
						type="button"
						class="lg:hidden"
						aria-label={m.a11yAriaMenu()}
						on:click={() => (showSlideOver = true)}
					>
						<Bars3 class="size-8" />
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
	<SlideOver bind:show={showSlideOver} let:onClose>
		<div
			class="flex h-full flex-col items-center justify-center gap-20 text-4xl font-medium *:after:!-bottom-3 *:after:!h-2"
		>
			{#each navbarItems as item}
				<button
					type="button"
					class="relative after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:bg-dominant after:duration-300 after:content-[''] hover:after:w-full"
					on:click={() => {
						onClose.set(async () => {
							if ($page.route.id !== "/") {
								await goto("/");
							}
							document.querySelector(item.href)?.scrollIntoView();
						});
						showSlideOver = false;
					}}
				>
					{item.name}
				</button>
			{/each}
			<button
				type="button"
				class="relative text-dominant after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:bg-dominant after:duration-300 after:content-[''] hover:after:w-full"
				on:click={() => {
					onClose.set(() => goto("/contact"));
					showSlideOver = false;
				}}
			>
				{m.commonContact()}
			</button>
		</div>
	</SlideOver>

	<main>
		<slot />
	</main>

	<footer class="border-t border-gray-500 p-16 text-gray-400 xs:p-24">
		<!-- Main grid -->
		<div class="flex flex-col gap-16 xl:flex-row xl:gap-0">
			<a
				href={i18n.resolveRoute("/")}
				class="w-fit transition-opacity duration-300 hover:opacity-70"
			>
				<img src="/logo-title.svg" alt={m.a11yAltLogo()} width="174" height="56" />
			</a>
			<div class="flex flex-wrap gap-x-20 gap-y-16 md:justify-evenly xl:w-full">
				{#each footerItems as column}
					<div class="min-w-fit">
						<h3 class="mb-5 text-primary">{column.name}</h3>
						<div class="flex flex-col gap-2 *:w-fit">
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
											href={isExternal ? item.href : i18n.resolveRoute(item.href)}
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
		<div class="relative mt-10 flex items-end justify-between *:h-min">
			<!-- Left -->
			<div>
				<div class="mb-5 divide-x divide-gray-400 text-primary">
					<div class="inline-flex h-8 items-center gap-1">
						<a
							href="https://github.com/EmeraldHQ/Website"
							class="peer z-10 transition-opacity duration-300 hover:opacity-70"
							aria-label={m.a11yAriaSource()}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github class="size-8" />
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
				on:click={() => window.scrollTo({ top: 0 })}
				on:keypress={() => window.scrollTo({ top: 0 })}
			>
				<ArrowUp
					class="size-8 cursor-pointer rounded-full border border-dominant p-1.5 text-dominant transition-colors duration-300 hover:border-transparent hover:bg-dominant hover:text-inverted"
				/>
			</button>
			<!-- Right -->
			<div class="flex flex-col items-end gap-2">
				<button
					type="button"
					class="sm:hidden"
					on:click={() => window.scrollTo({ top: 0 })}
					on:keypress={() => window.scrollTo({ top: 0 })}
				>
					<ArrowUp
						class="size-8 cursor-pointer rounded-full border border-dominant p-1.5 text-dominant transition-colors duration-300 hover:border-transparent hover:bg-dominant hover:text-inverted"
					/>
				</button>
				<div
					role="radiogroup"
					aria-label={m.a11yAriaRadioLanguage()}
					class="inline-flex origin-bottom-right space-x-1 rounded-full border border-gray-400 p-1 text-primary shadow-2xl shadow-black scale-75 xs:scale-90 sm:scale-100"
				>
					{#each availableLanguageTags as lang}
						<a
							data-sveltekit-preload-data="off"
							data-sveltekit-preload-code="hover"
							href={i18n.resolveRoute($page.route.id ?? "/", lang)}
							hreflang={lang}
							role="radio"
							aria-current={lang === languageTag() ? "page" : undefined}
							aria-checked={lang === languageTag()}
							class="grid overflow-hidden rounded-full px-4 py-1 text-center uppercase transition-opacity duration-300 *:col-start-1 *:col-end-1 *:row-start-1 *:row-end-1 group-hover:opacity-0"
							class:bg-slate-500={lang === languageTag()}
							class:hover:bg-slate-600={lang === languageTag()}
							class:hover:bg-slate-800={lang !== languageTag()}
						>
							{lang}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</footer>
</ParaglideJS>
