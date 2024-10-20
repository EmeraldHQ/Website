<script lang="ts">
	import type { ButtonRootProps as ButtonProps } from "bits-ui";
	import { twMerge } from "tailwind-merge";

	type Props = {
		/**
		 * Defines the style of the button. Defaults to `"primary"`.
		 */
		variant?: "primary" | "secondary" | "link";
		class?: ButtonProps["class"];
	} & ButtonProps;

	let {
		href = undefined,
		type = "button",
		variant = "primary",
		class: className = undefined,
		children,
		ref,
		...rest
	}: Props = $props();
</script>

{#snippet buttonCore(mainClasses: string)}
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={ref}
		type={href ? undefined : type}
		{href}
		class={twMerge(mainClasses, className)}
		tabindex="0"
		{...rest}
	>
		{@render children?.()}
	</svelte:element>
{/snippet}

{#if variant === "primary"}
	{@render buttonCore(
		"inline-flex items-center gap-2 rounded-xl border border-transparent bg-dominant px-3 py-1 text-lg font-medium text-inverted shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-dominant hover:bg-inherit hover:text-dominant"
	)}
{:else if variant === "secondary"}
	{@render buttonCore(
		"inline-flex items-center gap-2 rounded-xl border border-dominant px-3 py-1 text-lg font-medium text-dominant shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-primary hover:text-primary"
	)}
{:else if variant === "link"}
	{@render buttonCore(
		"inline-flex items-center gap-1 text-base font-normal text-dominant underline-offset-4 hover:underline"
	)}
{/if}
