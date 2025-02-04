<script lang="ts">
	import "../app.css";
	import { innerHeight, scrollY } from "svelte/reactivity/window";
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/state";
	import ArrowUp from "@inqling/svelte-icons/heroicon-24-solid/arrow-up.svelte";
	import Bars3 from "@inqling/svelte-icons/heroicon-24-solid/bars-3.svelte";
	import Github from "@inqling/svelte-icons/simple-icons/github.svelte";
	import { JsonLd, MetaTags, type JsonLdProps, type MetaTagsProps } from "svelte-meta-tags";
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import { i18n } from "$utils/inlang";
	import { availableLanguageTags, languageTag, onSetLanguageTag } from "$paraglide/runtime";
	import * as m from "$paraglide/messages";
	import Button from "$elements/button";
	import SlideOver from "$shells/SlideOver.svelte";

	// Breadcrumb
	let currentRoute = $derived(page.route.id?.split("/").filter(Boolean) ?? []);

	// Meta tags
	let { data, children } = $props();
	let metadata = $derived<MetaTagsProps>({
		...data.baseMetaTags,
		...{
			title: page.data.pageTitle,
			twitter: {
				title:
					data.baseMetaTags?.titleTemplate.replace(/%s/g, page.data.pageTitle) ??
					page.data.pageTitle
			}
		}
	});

	let schema = $derived<JsonLdProps["schema"]>([
		...data.baseSchemas,
		...(page.data.pageSchemas ?? [])
	]);

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
		if (type === "link" && to.route.id === page.route.id) {
			const lang = i18n.getLanguageFromUrl(to.url);
			localStorage.setItem("language", lang);
		}
	});

	afterNavigate(async ({ complete }) => {
		await complete;
		document.documentElement.classList.add("motion-safe:scroll-smooth");
	});

	// Config
	let navbarItems = $state<{ name: string; href: string }[]>([]);
	let footerItems = $state<{ name: string; items: { name: string; href: string }[] }[]>([]);

	// Bindings & variables
	let scrollDistanceContactButton = $derived((innerHeight.current ?? 0) * 0.7);
	let scrollDistanceLogoSwitch = $derived((innerHeight.current ?? 0) * 0.95);

	let showButton = $derived(!!scrollY.current && scrollY.current >= scrollDistanceContactButton);

	let showSlideOver = $state(false);

	let isPastLogoScrollDistance = $derived.by(() => {
		if (!scrollY.current) return false;
		const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
		if (scrollY.current < scrollDistanceLogoSwitch - rem) {
			return false;
		} else if (scrollY.current >= scrollDistanceLogoSwitch + rem) {
			return true;
		}
	});
</script>

<ParaglideJS {i18n}>
	<MetaTags {...metadata} />

	<JsonLd {schema} />

	<!-- Navbar -->
	<div class="sticky top-0 z-10 flex w-full justify-center pt-5 md:pt-10">
		<div class="max-w-large-screen w-full *:backdrop-blur-xs *:backdrop-saturate-150">
			<nav
				class={[
					"xs:h-20 mx-2 flex h-16 items-center justify-center rounded-full bg-black/60 px-10 py-5 transition-[height] delay-250 duration-300 ease-in-out sm:mx-5 md:mx-10 md:px-20",
					{
						"xs:!h-16": !!scrollY.current && isPastLogoScrollDistance
					}
				]}
			>
				<!-- Left logo -->
				<div class="mr-auto flex items-center gap-5">
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<svelte:element
						this={page.route.id === "/" ? "button" : "a"}
						type={page.route.id === "/" ? "button" : undefined}
						href={page.route.id === "/" ? undefined : "/"}
						class="grid origin-left scale-110 cursor-pointer overflow-hidden *:col-start-1 *:col-end-1 *:row-start-1 *:row-end-1"
						onclick={page.route.id === "/"
							? () =>
									window.scrollTo({
										top: 0
									})
							: undefined}
					>
						<img
							src="/logo-small.svg"
							alt={m.a11yAltLogoSmall()}
							width="28"
							height="32"
							class={[
								"h-8 transition-opacity duration-300 hover:opacity-100",
								{
									"xs:opacity-0": !scrollY.current || !isPastLogoScrollDistance
								}
							]}
						/>
						<img
							src="/logo-title.svg"
							alt={m.a11yAltLogo()}
							width="100"
							height="32"
							class={[
								"h-8 opacity-0 transition-opacity duration-300 hover:opacity-100",
								{
									"xs:opacity-100": !scrollY.current || !isPastLogoScrollDistance
								}
							]}
						/>
					</svelte:element>
				</div>
				<!-- Right navigation -->
				<div class="flex items-center gap-5 sm:gap-10">
					<div
						class={[
							"hidden items-center gap-10 duration-700 ease-out lg:flex",
							{
								"-mr-40": !showButton
							}
						]}
					>
						{#each navbarItems as item}
							{@const linkClasses =
								"relative after:absolute cursor-pointer after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:bg-dominant after:duration-300 after:content-[''] hover:after:w-full"}
							{#if i18n.route(item.href) === page.route.id}
								<span
									class="text-dominant after:bg-dominant relative after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-full after:content-['']"
								>
									{item.name}
								</span>
							{:else if item.href.startsWith("/")}
								<a href={item.href} class={linkClasses}>
									{item.name}
								</a>
							{:else}
								<button
									type="button"
									class={linkClasses}
									onclick={async () => {
										if (page.route.id !== "/") {
											await goto("/");
										}
										document.querySelector(item.href)?.scrollIntoView();
									}}
								>
									{item.name}
								</button>
							{/if}
						{/each}
					</div>
					<span
						id="contact-us"
						class={[
							"max-xs:hidden transition-opacity",
							{
								"pointer-events-none opacity-0 duration-200": !showButton,
								"duration-1000": showButton
							}
						]}
					>
						<Button variant="secondary" href="/contact" tabindex={showButton ? 0 : -1}>
							{m.commonContact()}
						</Button>
					</span>
					<button
						type="button"
						class="cursor-pointer lg:hidden"
						aria-label={m.a11yAriaMenu()}
						onclick={() => (showSlideOver = true)}
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
	<SlideOver bind:show={showSlideOver}>
		{#snippet children({ onClose })}
			<div
				class="flex h-full flex-col items-center justify-center gap-20 text-4xl font-medium *:after:!-bottom-3 *:after:!h-2"
			>
				{#each navbarItems as item}
					<button
						type="button"
						class="after:bg-dominant relative cursor-pointer after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:duration-300 after:content-[''] hover:after:w-full"
						onclick={() => {
							onClose.set(async () => {
								if (page.route.id !== "/") {
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
					class="text-dominant after:bg-dominant relative after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-0 after:duration-300 after:content-[''] hover:after:w-full"
					onclick={() => {
						onClose.set(() => goto("/contact"));
						showSlideOver = false;
					}}
				>
					{m.commonContact()}
				</button>
			</div>
		{/snippet}
	</SlideOver>

	<main>
		{@render children?.()}
	</main>

	<footer class="xs:p-24 border-t border-gray-500 p-16 text-gray-400">
		<!-- Main grid -->
		<div class="flex flex-col gap-16 xl:flex-row xl:gap-0">
			<a
				href={i18n.resolveRoute("/")}
				class="size-fit transition-opacity duration-300 hover:opacity-70"
			>
				<img src="/logo-title.svg" alt={m.a11yAltLogo()} width="174" height="56" />
			</a>
			<div class="flex flex-wrap gap-x-20 gap-y-16 md:justify-evenly xl:w-full">
				{#each footerItems as column}
					<div class="min-w-fit">
						<h3 class="text-text-primary mb-5">{column.name}</h3>
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
											class="hover:text-dominant underline-offset-4 hover:underline"
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
				<div class="text-text-primary mb-5 divide-x divide-gray-400">
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
							class="-translate-x-4 scale-75 opacity-0 duration-300 select-none peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-70"
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
				class="absolute right-0 bottom-0 left-0 mx-auto hidden w-fit text-center sm:block"
				onclick={() => window.scrollTo({ top: 0 })}
			>
				<ArrowUp
					class="border-dominant text-dominant hover:bg-dominant hover:text-text-inverted size-8 cursor-pointer rounded-full border p-1.5 transition-colors duration-300 hover:border-transparent"
				/>
			</button>
			<!-- Right -->
			<div class="flex flex-col items-end gap-2">
				<button type="button" class="sm:hidden" onclick={() => window.scrollTo({ top: 0 })}>
					<ArrowUp
						class="border-dominant text-dominant hover:bg-dominant hover:text-text-inverted size-8 cursor-pointer rounded-full border p-1.5 transition-colors duration-300 hover:border-transparent"
					/>
				</button>
				<div
					role="radiogroup"
					aria-label={m.a11yAriaRadioLanguage()}
					class="text-text-primary xs:scale-90 inline-flex origin-bottom-right scale-75 space-x-1 rounded-full border border-gray-400 p-1 shadow-2xl shadow-black sm:scale-100"
				>
					{#each availableLanguageTags as lang}
						<a
							data-sveltekit-preload-data="off"
							data-sveltekit-preload-code="hover"
							href={i18n.resolveRoute(page.route.id ?? "/", lang)}
							hreflang={lang}
							role="radio"
							aria-current={lang === languageTag() ? "page" : undefined}
							aria-checked={lang === languageTag()}
							class={[
								"grid overflow-hidden rounded-full px-4 py-1 text-center uppercase transition-opacity duration-300 *:col-start-1 *:col-end-1 *:row-start-1 *:row-end-1 group-hover:opacity-0",
								{
									"bg-slate-500 hover:bg-slate-600": lang === languageTag(),
									"hover:bg-slate-800": lang !== languageTag()
								}
							]}
						>
							{lang}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</footer>
</ParaglideJS>
