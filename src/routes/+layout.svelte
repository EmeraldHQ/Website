<script lang="ts">
	import "../app.css";
	import { fade } from "svelte/transition";
	import { Bars3 } from "@inqling/svelte-icons/heroicon-24-solid";
	import Button from "$ui/Button.svelte";
	import SlideOver from "$components/SlideOver.svelte";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";
	import { Github } from "@inqling/svelte-icons/simple-icons";

	// Tailwind
	const fullTailwindConfig = resolveConfig(tailwindConfig);
	const tailwindXSScreen = Number(fullTailwindConfig.theme.screens.xs.replace("px", ""));

	// Config
	const navbarItems = [
		{ name: "About Us", href: "#abc" },
		{ name: "Our Work", href: "#def" },
		{ name: "Who we are", href: "#abc" },
		{ name: "Contact Us", href: "." }
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
			{#if scrollY >= scrollDistanceLogoSwitch || (innerWidth && innerWidth < tailwindXSScreen)}
				<img
					in:fade={{ delay: 250 }}
					out:fade
					src="/favicon.svg"
					alt="Renew logo - small"
					class="h-8 duration-300 hover:opacity-70"
				/>
			{:else}
				<img
					in:fade={{ delay: 250 }}
					out:fade
					src="/logo-dark.svg"
					alt="Renew logo"
					class="h-8 duration-300 hover:opacity-70"
				/>
			{/if}
		</a>
		<div class="flex items-center gap-5 sm:gap-10">
			<div
				class="flex items-center gap-10 ease-out duration-700 max-lg:hidden nav-items-container"
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
			{#each navbarItems.filter((_item, index) => !(index === navbarItems.length - 1 && innerWidth >= tailwindXSScreen)) as item}
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
	<div class="grid grid-cols-5">
		<a href="/" class="h-8 transition-opacity duration-300 hover:opacity-70">
			<img src="/logo-dark.svg" alt="Renew logo" width="174" height="32" />
		</a>
		<div>
			<h4 class="text-primary mb-5">Solutions</h4>
			<div class="flex flex-col gap-2">
				<a href="/">Showcase website</a>
				<a href="/">Comprehensive web app</a>
				<a href="/">E-commerce</a>
				<a href="/">Legacy website rework</a>
			</div>
		</div>
		<div>
			<h4 class="text-primary mb-5">Pages</h4>
			<div class="flex flex-col gap-2">
				<a href="/">Process</a>
				<a href="/">Solutions</a>
				<a href="/">Technologies</a>
			</div>
		</div>
		<div>
			<h4 class="text-primary mb-5">Company</h4>
			<div class="flex flex-col gap-2">
				<a href="/">About</a>
				<a href="/">Contact</a>
				<a href="/">Team</a>
				<a href="/">Environment</a>
				<a href="/">Open Source</a>
			</div>
		</div>
		<div>
			<h4 class="text-primary mb-5">Legal</h4>
			<div class="flex flex-col gap-2">
				<a href="/">Privacy Policy</a>
				<a href="/">Terms of Service</a>
			</div>
		</div>
	</div>
	<!-- Bottom links & settings -->
	<div class="mt-10 flex items-end">
		<!-- Left -->
		<div>
			© {new Date().getFullYear()} Renew
			<div
				class="mt-5 divide-x divide-gray-400 child:transition-opacity child:duration-300 child-hover:opacity-70"
			>
				<a href="https://github.com/RenewHQ/Website">
					<Github class="w-8 h-8" />
				</a>
			</div>
		</div>
		<!-- Right -->
		<div class="ml-auto">Language • Dark mode • Scroll to top?</div>
	</div>
</footer>

<style lang="postcss">
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
