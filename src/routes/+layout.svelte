<script lang="ts">
	import "../app.css";
	import Button from "$ui/Button.svelte";

	let scrollY = 0;
	$: showButton = scrollY >= 150;
</script>

<svelte:window bind:scrollY />

<nav
	class="flex items-center justify-center px-20 py-5 sticky top-0 w-full h-20 z-10 backdrop-blur-sm backdrop-saturate-150 transition-shadow duration-500"
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
	<div class="flex items-center gap-10">
		<div
			class="flex items-center gap-10 ease-out duration-700
			child:relative
			child:after:absolute child:after:bg-primary child:after:h-1 child:after:w-0 child:after:left-0 child:after:-bottom-1.5 child:after:duration-300
			child-hover:after:w-full"
			class:-mr-40={!showButton}
		>
			<a href=".">About Us</a>
			<a href=".">Our Work</a>
			<a href=".">Who we are</a>
		</div>
		<span
			class="transition-opacity"
			class:opacity-0={!showButton}
			class:duration-200={!showButton}
			class:duration-1000={showButton}
			class:pointer-events-none={!showButton}
		>
			<Button type="secondary">Contact Us</Button>
		</span>
	</div>
</nav>

<slot />
