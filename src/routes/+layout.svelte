<script lang="ts">
	import "../app.css";
	import { MenuIcon } from "@rgossiaux/svelte-heroicons/solid";
	import Button from "$ui/Button.svelte";
	import SlideOver from "$components/SlideOver.svelte";

	const navbarItems = [
		{ name: "About Us", href: "#abc" },
		{ name: "Our Work", href: "#def" },
		{ name: "Who we are", href: "#abc" },
		{ name: "Contact Us", href: "." }
	];

	function scrollTo(selector: string) {
		const el = document.querySelector(selector);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	}

	let innerWidth = 0;
	let scrollY = 0;
	$: showButton = scrollY >= 150;
	let showSlideOver = false;
</script>

<!-- Binding for scroll-dependent elements -->
<svelte:window bind:innerWidth bind:scrollY />

<!-- Navbar -->
<nav
	class="flex items-center justify-center px-5 sm:px-10 md:px-20 py-5 sticky top-0 w-full h-20 z-10 backdrop-blur-sm backdrop-saturate-150 transition-shadow duration-500"
	class:shadow-navbar-bottom={scrollY > 0}
>
	<a href="/" class="mr-auto">
		<img
			loading="lazy"
			src="/logo-dark.svg"
			alt="Renew logo"
			class="h-8 duration-300 hover:opacity-70"
		/>
	</a>
	<div class="flex items-center gap-5 sm:gap-10">
		<div
			class="flex items-center gap-10 ease-out duration-700 max-lg:hidden nav-items-container"
			class:-mr-40={!showButton}
		>
			{#each navbarItems.filter((item) => item.href.startsWith("#")) as item}
				<button
					on:click={() => {
						scrollTo(item.href);
					}}
				>
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
			<MenuIcon class="w-8 h-8" />
		</button>
	</div>
</nav>

<!-- Responsive slide-over -->
<SlideOver bind:show={showSlideOver}>
	<svelte:fragment slot="content">
		<div
			class="h-full flex flex-col justify-center items-center gap-20 text-5xl font-medium nav-items-container child:after:!h-2 child:after:!-bottom-3"
		>
			{#each navbarItems.filter((_item, index) => !(index === navbarItems.length - 1 && innerWidth >= 475)) as item}
				<button
					class:text-dominant={!item.href.startsWith("#")}
					on:click={() => {
						showSlideOver = false;
						setTimeout(() => {
							scrollTo(item.href);
						}, 300);
					}}
				>
					{item.name}
				</button>
			{/each}
		</div>
	</svelte:fragment>
</SlideOver>

<slot />

<style>
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
