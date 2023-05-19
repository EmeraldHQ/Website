<script lang="ts">
	import "../app.css";
	import { onDestroy } from "svelte";
	import { page } from "$app/stores";
	import { fade } from "svelte/transition";
	import { ArrowUp, Bars3 } from "@inqling/svelte-icons/heroicon-24-solid";
	import { Github } from "@inqling/svelte-icons/simple-icons";
	import Button from "$elements/Button.svelte";
	// import RadioButtonsGroup from "$elements/RadioButtonsGroup.svelte";
	import SlideOver from "$shells/SlideOver.svelte";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";
	import { scrollTo } from "$ts/scroll";

	// Breadcrumb
	let currentRoute: string[] = [];
	const unsubscribe = page.subscribe((value) => {
		currentRoute = value?.route.id?.split("/").filter(Boolean) ?? [];
	});

	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindXsScreen = Number(fullTailwindConfig.theme.screens.xs.replace("px", ""));
	const tailwindXlScreen = Number(fullTailwindConfig.theme.screens.xl.replace("px", ""));

	// Config
	const navbarItems = [
		{ name: "Solutions", href: "#" }, // Dropdown: 5/6 solutions
		{ name: "Method", href: "#method" },
		{ name: "Technologies", href: "#technologies" },
		{ name: "Company", href: "#" }, // Dropdown: Values, Who we are
		{ name: "Contact Us", href: "." }
	];
	const footerItems = [
		{
			name: "Solutions",
			items: [
				{ name: "Showcase website", href: "/" },
				{ name: "Comprehensive web app", href: "/" },
				{ name: "E-commerce", href: "/" },
				{ name: "Legacy website rework", href: "/" }
			]
		},
		{
			name: "Pages",
			items: [
				{ name: "Home", href: "/" },
				{ name: "Process", href: "/" },
				{ name: "Solutions", href: "/" },
				{ name: "Technologies", href: "/" }
			]
		},
		{
			name: "Company",
			items: [
				{ name: "About", href: "/" },
				{ name: "Contact", href: "/" },
				{ name: "Team", href: "/" },
				{ name: "Environment", href: "/" },
				{ name: "Open Source", href: "https://github.com/RenewHQ" }
			]
		},
		{
			name: "Legal",
			items: [
				{ name: "Privacy Policy", href: "/" },
				{ name: "Terms of Service", href: "/" }
			]
		}
	];
	const scrollDistanceContactButton = 800;
	const scrollDistanceLogoSwitch = 900;

	// Bindings & variables
	let innerWidth = 0;
	let scrollY = 0;
	$: showButton = scrollY >= scrollDistanceContactButton;
	let showSlideOver = false;

	// Lifecycle
	onDestroy(unsubscribe);
</script>

<!-- Binding for scroll-dependent elements -->
<svelte:window bind:innerWidth bind:scrollY />

<!-- Navbar -->
<div class="sticky top-0 z-10 flex w-full justify-center pt-10">
	<div class="w-full max-w-large-screen child:backdrop-blur-sm child:backdrop-saturate-150">
		<nav
			class="mx-2 flex h-20 items-center justify-center rounded-full bg-black/60 px-10 py-5 sm:mx-5 md:mx-10 md:px-20"
		>
			<div class="mr-auto flex items-center gap-5">
				<a
					href="/"
					class="grid overflow-hidden child:col-start-1 child:col-end-1 child:row-start-1 child:row-end-1"
				>
					{#if scrollY >= scrollDistanceLogoSwitch || (innerWidth && innerWidth < tailwindXsScreen)}
						<img
							in:fade={{ delay: 250 }}
							out:fade
							src="/favicon.svg"
							alt="Renew logo - small"
							width="32"
							height="32"
							class="h-8 transition-opacity duration-300 hover:opacity-70"
						/>
					{:else}
						<img
							in:fade={{ delay: 250 }}
							out:fade
							src="/logo-dark.svg"
							alt="Renew logo"
							width="174"
							height="32"
							class="h-8 transition-opacity duration-300 hover:opacity-70"
						/>
					{/if}
				</a>
			</div>
			<div class="flex items-center gap-5 sm:gap-10">
				<div
					class="nav-items-container hidden items-center gap-10 lg:flex"
					class:-mr-40={!showButton}
				>
					{#each navbarItems.filter((item) => item.href.startsWith("#")) as item}
						<button on:click={() => scrollTo(item.href)}>
							{item.name}
						</button>
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
					<Button type="secondary">Contact Us</Button>
				</span>
				<button class="lg:hidden" aria-label="Menu" on:click={() => (showSlideOver = true)}>
					<Bars3 class="h-8 w-8" />
				</button>
			</div>
		</nav>
		{#if currentRoute.length > 0}
			<div
				class="mx-12 rounded-b-3xl bg-black/70 px-6 py-1 text-lg sm:mx-16 sm:px-8 md:mx-20 md:px-12"
			>
				<div class="flex flex-row-reverse overflow-x-auto whitespace-nowrap">
					<div class="mr-auto flex flex-row gap-1.5">
						{#each currentRoute as route, i}
							<span>/</span>
							<span>
								{#if i < currentRoute.length - 1}
									<a
										href="/{currentRoute.slice(0, i + 1).join('/')}"
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
	<svelte:fragment slot="content">
		<div
			class="nav-items-container flex h-full flex-col items-center justify-center gap-20 text-6xl font-medium child:after:!-bottom-3 child:after:!h-2"
		>
			{#each navbarItems.filter((_item, index) => !(index === navbarItems.length - 1 && innerWidth >= tailwindXsScreen)) as item}
				<button
					class:text-dominant={!item.href.startsWith("#")}
					on:click={() => {
						showSlideOver = false;
						setTimeout(() => scrollTo(item.href), 300);
					}}
				>
					{item.name}
				</button>
			{/each}
		</div>
	</svelte:fragment>
</SlideOver>

<main>
	<slot />
</main>

<footer class="border-t border-gray-500 p-24 text-gray-400">
	<!-- Main grid -->
	{#if innerWidth < tailwindXlScreen}
		<a href="/" class="h-8 transition-opacity duration-300 hover:opacity-70">
			<img src="/logo-dark.svg" alt="Renew logo" width="174" height="32" />
		</a>
	{/if}
	<div class="my-14 flex flex-wrap gap-x-20 gap-y-16 md:justify-center lg:justify-between xl:my-0">
		{#if innerWidth >= tailwindXlScreen}
			<a href="/" class="h-8 transition-opacity duration-300 hover:opacity-70">
				<img src="/logo-dark.svg" alt="Renew logo" width="174" height="32" />
			</a>
		{/if}
		{#each footerItems as column}
			<div class="min-w-fit">
				<h3 class="mb-5 text-primary">{column.name}</h3>
				<div
					class="flex flex-col gap-2 child:w-fit child:underline-offset-4 child-hover:text-dominant child-hover:underline"
				>
					{#each column.items as item}
						<a href={item.href}>{item.name}</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<!-- Bottom links & settings -->
	<div class="mt-10 flex items-end justify-between child:h-min">
		<!-- Left -->
		<div>
			<div
				class="mb-5 divide-x divide-gray-400 text-primary child:transition-opacity child:duration-300 child-hover:opacity-70"
			>
				<a
					href="https://github.com/RenewHQ/Website"
					aria-label="Take a look at the source code of this website"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github class="h-8 w-8" />
				</a>
			</div>
			© {new Date().getFullYear()} Renew
		</div>
		<!-- Middle -->
		{#if innerWidth >= tailwindXsScreen}
			<div
				on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				on:keypress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				<ArrowUp
					class="h-8 w-8 cursor-pointer rounded-full border-[1px] border-dominant p-1.5 text-dominant transition-colors duration-300 hover:border-transparent hover:bg-dominant hover:text-inverted"
				/>
			</div>
		{/if}
		<!-- Right -->
		<div class="flex flex-col items-end gap-2">
			{#if innerWidth < tailwindXsScreen}
				<div
					on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					on:keypress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<ArrowUp
						class="h-8 w-8 cursor-pointer rounded-full border-[1px] border-dominant p-1.5 text-dominant transition-colors duration-300 hover:border-transparent hover:bg-dominant hover:text-inverted"
					/>
				</div>
			{/if}
			<!-- TODO: Actually make it work -->
			<!--
			<RadioButtonsGroup
				values={["FR", "EN"]}
				defaultIndex={1}
				description="Language selection"
				class="scale-75 origin-bottom-right xs:scale-90 sm:scale-100"
				on:change={(e) => {
					const selectionIndex = e.detail.index;
					console.log(selectionIndex);
				}}
			/>
			-->
		</div>
	</div>
</footer>

<style lang="postcss">
	:global(::selection) {
		@apply bg-dominant/75 text-primary;
	}

	:global(body) {
		@apply bg-primary text-primary;
	}

	.nav-items-container > * {
		@apply relative;
	}

	.nav-items-container > *::after {
		@apply absolute -bottom-1.5 left-0 h-1 w-0 bg-dominant duration-300 content-[""];
	}

	.nav-items-container > *:hover::after {
		@apply w-full;
	}
</style>
