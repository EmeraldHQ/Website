<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let id: string | undefined = undefined;
	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<section
	{id}
	class={twMerge(
		"scroll-mt-10 py-16 *:mx-16 sm:scroll-mt-16 md:scroll-mt-24 md:*:mx-32 xxl:*:!mx-auto xxl:*:max-w-screen-2xl",
		className
	)}
	{...$$restProps}
>
	{#if $$slots.title}
		<h2 class="pb-10 text-4xl font-medium drop-shadow-lg">
			<slot name="title" />
		</h2>
	{/if}
	<slot />
</section>
