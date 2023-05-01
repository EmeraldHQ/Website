<script lang="ts">
	import "../app.css";
	import { fade } from "svelte/transition";
	import { Bars3Icon } from "@babeard/svelte-heroicons/solid";
	import Button from "$ui/Button.svelte";
	import SlideOver from "$components/SlideOver.svelte";
	import resolveConfig from "tailwindcss/resolveConfig";
	import tailwindConfig from "../../tailwind.config";

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
				<Bars3Icon class="w-8 h-8" />
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
