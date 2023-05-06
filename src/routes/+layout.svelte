<script lang="ts">
	import "../app.css";
	import { fade } from "svelte/transition";
	import { ArrowUp, Bars3 } from "@inqling/svelte-icons/heroicon-24-solid";
	import { Github } from "@inqling/svelte-icons/simple-icons";
	import Button from "$elements/Button.svelte";
	import RadioButtonsGroup from "$elements/RadioButtonsGroup.svelte";
	import SlideOver from "$shells/SlideOver.svelte";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";

	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindXsScreen = Number(fullTailwindConfig.theme.screens.xs.replace("px", ""));
	const tailwindXlScreen = Number(fullTailwindConfig.theme.screens.xl.replace("px", ""));

	// Config
	const navbarItems = [
		{ name: "About Us", href: "#abc" },
		{ name: "Our Work", href: "#def" },
		{ name: "Who we are", href: "#abc" },
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

	// Functions
	function scrollTo(selector: string) {
		const element = document.querySelector(selector);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}

	// Bindings & variables
	let innerWidth = 0;
	let scrollY = 0;
	$: showButton = scrollY >= scrollDistanceContactButton;
	let showSlideOver = false;
</script>

<!-- Binding for scroll-dependent elements -->
<svelte:window bind:innerWidth bind:scrollY />

<!-- Navbar -->
<div class="top-0 flex justify-center sticky w-full z-10 pt-10">
	<nav
		class="flex items-center justify-center w-full max-w-large-screen px-10 md:px-20 py-5 mx-2 sm:mx-5 md:mx-10 h-20 bg-black/60 rounded-full backdrop-blur-sm backdrop-saturate-150 transition-shadow duration-500"
	>
		<a
			href="/"
			class="mr-auto grid overflow-hidden child:col-start-1 child:col-end-1 child:row-start-1 child:row-end-1"
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
		<div class="flex items-center gap-5 sm:gap-10">
			<div
				class="flex items-center gap-10 max-lg:hidden nav-items-container"
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
			<button class="lg:hidden" on:click={() => (showSlideOver = true)}>
				<Bars3 class="w-8 h-8" />
			</button>
		</div>
	</nav>
</div>

<!-- Responsive slide-over -->
<SlideOver bind:show={showSlideOver}>
	<svelte:fragment slot="content">
		<div
			class="h-full flex flex-col justify-center items-center gap-20 text-6xl font-medium nav-items-container child:after:!h-2 child:after:!-bottom-3"
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

<slot />

<footer class="p-24 border-t border-gray-500 text-gray-400">
	<!-- Main grid -->
	{#if innerWidth < tailwindXlScreen}
		<a href="/" class="h-8 transition-opacity duration-300 hover:opacity-70">
			<img src="/logo-dark.svg" alt="Renew logo" width="174" height="32" />
		</a>
	{/if}
	<div class="flex flex-wrap gap-10 justify-between mt-10 xl:mt-0">
		{#if innerWidth >= tailwindXlScreen}
			<a href="/" class="h-8 transition-opacity duration-300 hover:opacity-70">
				<img src="/logo-dark.svg" alt="Renew logo" width="174" height="32" />
			</a>
		{/if}
		{#each footerItems as column}
			<div class="min-w-fit sm:mx-auto my-5 sm:my-10 xl:my-0">
				<h4 class="text-primary mb-5">{column.name}</h4>
				<div
					class="flex flex-col gap-2 child:w-fit child-hover:underline child:underline-offset-4 child-hover:text-dominant"
				>
					{#each column.items as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<!-- Bottom links & settings -->
	<div class="mt-10 flex items-end child:h-min justify-between">
		<!-- Left -->
		<div>
			<div
				class="mb-5 text-primary divide-x divide-gray-400 child:transition-opacity child:duration-300 child-hover:opacity-70"
			>
				<a href="https://github.com/RenewHQ/Website">
					<Github class="w-8 h-8" />
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
					class="w-8 h-8 p-1.5
					border-[1px] border-dominant text-dominant
					rounded-full cursor-pointer transition-colors duration-300
					hover:text-inverted hover:bg-dominant hover:border-transparent"
				/>
			</div>
		{/if}
		<!-- Right -->
		<div class="flex flex-col gap-2 items-end">
			{#if innerWidth < tailwindXsScreen}
				<div
					on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					on:keypress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<ArrowUp
						class="w-8 h-8 p-1.5
						border-[1px] border-dominant text-dominant
						rounded-full cursor-pointer transition-colors duration-300
						hover:text-inverted hover:bg-dominant hover:border-transparent"
					/>
				</div>
			{/if}
			<!-- TODO: Actually make it work -->
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
		@apply content-[""] absolute bg-dominant h-1 w-0 left-0 -bottom-1.5 duration-300;
	}

	.nav-items-container > *:hover::after {
		@apply w-full;
	}
</style>
