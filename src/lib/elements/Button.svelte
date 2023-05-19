<script lang="ts">
	import { createEventDispatcher } from "svelte";

	/**
	 * Defines the style of the button. Defaults to `"primary"`.
	 */
	export let type: "primary" | "secondary" | "minimal" = "primary";

	const dispatch = createEventDispatcher();
</script>

{#if type === "primary"}
	<button
		class="inline-flex items-center gap-2 rounded-xl border-[1px] border-transparent bg-dominant px-3 py-1 text-lg font-medium text-inverted shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-dominant hover:bg-inherit hover:text-dominant {$$props.class}"
		on:click={() => dispatch("click")}
	>
		<slot />
	</button>
{:else if type === "secondary"}
	<button
		class="inline-flex items-center gap-2 rounded-xl border-[1px] border-dominant px-3 py-1 text-lg font-medium text-dominant shadow-lg shadow-primary/25 transition-colors duration-300 hover:border-primary hover:text-primary {$$props.class}"
		on:click={() => dispatch("click")}
	>
		<slot />
	</button>
{:else if type === "minimal"}
	<button
		class="flex items-center justify-center gap-1 text-base font-normal text-dominant hover:text-primary {$$props.class}"
		on:click={() => dispatch("click")}
	>
		<slot />
	</button>
{/if}
