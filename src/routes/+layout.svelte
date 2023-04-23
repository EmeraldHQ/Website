<script>
	import "../app.css";

	let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<nav
	class="flex items-center justify-center px-20 py-5 sticky top-0 w-full z-10 backdrop-blur-sm backdrop-saturate-150"
	class:shadow-navbar-bottom={scrollY > 0}
>
	<a href="/" class="mr-auto">
		<img loading="lazy" src="/logo-dark.svg" alt="Renew logo" class="h-8 duration-300 hover:opacity-70">
	</a>
	<div class="flex items-center gap-10 child:duration-200 child-hover:opacity-50">
		<a href=".">About Us</a>
		<a href=".">Our Work</a>
		<a href=".">Who we are</a>
		<a href="/contact" class="font-medium border-primary border-2 text-primary rounded-lg py-1 px-3">Contact</a>
	</div>
</nav>

<slot />
