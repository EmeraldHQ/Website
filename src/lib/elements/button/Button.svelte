<script lang="ts">
	import type { Snippet } from "svelte";
	import type { Props as BtnProps } from "./types";
	import { twMerge } from "tailwind-merge";

	type Props = {
		href?: BtnProps["href"];
		type?: BtnProps["type"];
		el?: BtnProps["el"];
		/**
		 * Defines the style of the button. Defaults to `"primary"`.
		 */
		variant?: BtnProps["variant"];
		class?: BtnProps["class"];
		children?: Snippet;
		[key: string]: unknown;
	};

	let {
		href = undefined,
		type = "button",
		el = $bindable(undefined),
		variant = "primary",
		class: className = undefined,
		children,
		...rest
	}: Props = $props();
</script>

{#if variant === "primary"}
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={el}
		type={href ? undefined : type}
		{href}
		class={twMerge(
			"inline-flex items-center gap-2 rounded-xl border border-transparent bg-dominant px-3 py-1 text-lg font-medium text-inverted shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-dominant hover:bg-inherit hover:text-dominant",
			className
		)}
		tabindex="0"
		{...rest}
	>
		{@render children?.()}
	</svelte:element>
{:else if variant === "secondary"}
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={el}
		type={href ? undefined : type}
		{href}
		class={twMerge(
			"inline-flex items-center gap-2 rounded-xl border border-dominant px-3 py-1 text-lg font-medium text-dominant shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-primary hover:text-primary",
			className
		)}
		tabindex="0"
		{...rest}
	>
		{@render children?.()}
	</svelte:element>
{:else if variant === "link"}
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={el}
		type={href ? undefined : type}
		{href}
		class={twMerge(
			"inline-flex items-center gap-1 text-base font-normal text-dominant underline-offset-4 hover:underline",
			className
		)}
		tabindex="0"
		{...rest}
	>
		{@render children?.()}
	</svelte:element>
{/if}
