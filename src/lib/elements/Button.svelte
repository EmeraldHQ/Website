<script lang="ts">
	import { createEventDispatcher } from "svelte";

	/**
	 * Defines the style of the button. Defaults to `"primary"`.
	 */
	export let styleType: "primary" | "secondary" | "minimal" = "primary";
	export let submit = false;

	const dispatch = createEventDispatcher<{
		click: null;
	}>();
</script>

{#if styleType === "primary"}
	<button
		type={submit ? "submit" : "button"}
		class="inline-flex items-center gap-2 rounded-xl border border-transparent bg-dominant px-3 py-1 text-lg font-medium text-inverted shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-dominant hover:bg-inherit hover:text-dominant
		{$$props.class ?? ''}"
		on:click={() => dispatch("click")}
	>
		<slot />
	</button>
{:else if styleType === "secondary"}
	<button
		type={submit ? "submit" : "button"}
		class="inline-flex items-center gap-2 rounded-xl border border-dominant px-3 py-1 text-lg font-medium text-dominant shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-primary hover:text-primary
		{$$props.class ?? ''}"
		on:click={() => dispatch("click")}
	>
		<slot />
	</button>
{:else if styleType === "minimal"}
	<button
		type={submit ? "submit" : "button"}
		class="inline-flex items-center gap-1 text-base font-normal text-dominant underline-offset-4 hover:underline
		{$$props.class ?? ''}"
		on:click={() => dispatch("click")}
	>
		<slot />
	</button>
{/if}
