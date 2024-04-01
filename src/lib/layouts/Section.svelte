<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { c } from "$utils/inlang";

	export let title: string | undefined = undefined;

	export let id: string | undefined = undefined;

	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<section
	{id}
	class={twMerge(
		"scroll-mt-10 py-16 *:mx-16 sm:scroll-mt-16 md:scroll-mt-24 md:*:mx-32 xxl:*:!mx-auto xxl:*:max-w-screen-xl",
		className
	)}
	{...$$restProps}
>
	{#if title}
		<h2 class="pb-10 text-4xl font-medium drop-shadow-lg">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html c(title)}
		</h2>
	{/if}
	<slot />
</section>
