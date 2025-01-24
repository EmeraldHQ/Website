<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { c } from "$utils/inlang";

	type Props = {
		title?: string | undefined;
		id?: string | undefined;
		class?: string | null | undefined;
		children?: Snippet;
		[key: string]: unknown;
	};

	let {
		title = undefined,
		id = undefined,
		class: className = undefined,
		children,
		...rest
	}: Props = $props();
</script>

<section
	{id}
	class={twMerge(
		"*:xxl:!mx-auto *:xxl:max-w-screen-xl scroll-mt-10 py-16 *:mx-16 sm:scroll-mt-16 md:scroll-mt-24 *:md:mx-32",
		className
	)}
	{...rest}
>
	{#if title}
		<h2 class="pb-10 text-4xl font-medium drop-shadow-lg">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html c(title)}
		</h2>
	{/if}
	{@render children?.()}
</section>
