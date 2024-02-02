<script lang="ts">
	import type { Props, Events } from "./types";

	type $$Props = Props;
	type $$Events = Events;
	export let href: $$Props["href"] = undefined;
	export let type: $$Props["type"] = "button";
	export let el: $$Props["el"] = undefined;
	/**
	 * Defines the style of the button. Defaults to `"primary"`.
	 */
	export let variant: $$Props["variant"] = "primary";
	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

{#if variant === "primary"}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={el}
		type={href ? undefined : type}
		{href}
		class="inline-flex items-center gap-2 rounded-xl border border-transparent bg-dominant px-3 py-1 text-lg font-medium text-inverted shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-dominant hover:bg-inherit hover:text-dominant{className
			? ` ${className}`
			: ''}"
		on:click
		on:change
		on:keydown
		on:keyup
		on:mouseenter
		on:mouseleave
		tabindex="0"
		{...$$restProps}
	>
		<slot />
	</svelte:element>
{:else if variant === "secondary"}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={el}
		type={href ? undefined : type}
		{href}
		class="inline-flex items-center gap-2 rounded-xl border border-dominant px-3 py-1 text-lg font-medium text-dominant shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-primary hover:text-primary{className
			? ` ${className}`
			: ''}"
		on:click
		on:change
		on:keydown
		on:keyup
		on:mouseenter
		on:mouseleave
		tabindex="0"
		{...$$restProps}
	>
		<slot />
	</svelte:element>
{:else if variant === "link"}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svelte:element
		this={href ? "a" : "button"}
		bind:this={el}
		type={href ? undefined : type}
		{href}
		class="inline-flex items-center gap-1 text-base font-normal text-dominant underline-offset-4 hover:underline{className
			? ` ${className}`
			: ''}"
		on:click
		on:change
		on:keydown
		on:keyup
		on:mouseenter
		on:mouseleave
		tabindex="0"
		{...$$restProps}
	>
		<slot />
	</svelte:element>
{/if}
