<script lang="ts">
	/**
	 * Defines the style of the button. Defaults to `"primary"`.
	 */
	export let type: "primary" | "secondary" | "minimal" = "primary";
</script>

{#if type === "primary"}
	<button
		class="font-medium text-lg text-inverted
		bg-dominant
		border-transparent border-[1px]
		py-1 px-3
		inline-flex items-center gap-2
		rounded-xl shadow-lg shadow-primary/25 transition-colors duration-300
		hover:bg-inherit hover:border-dominant hover:text-dominant
	  {$$props.class}"
	>
		<slot />
	</button>
{:else if type === "secondary"}
	<button
		class="font-medium text-lg text-dominant
		border-dominant border-[1px]
		py-1 px-3
		inline-flex items-center gap-2
		rounded-xl shadow-lg shadow-primary/25 transition-colors duration-300
		hover:border-primary hover:text-primary
	  {$$props.class}"
	>
		<slot />
	</button>
{:else if type === "minimal"}
	<button
		class="font-normal text-base text-dominant
		flex justify-center items-center gap-1
		hover:text-primary
	  {$$props.class}"
	>
		<slot />
	</button>
{/if}
