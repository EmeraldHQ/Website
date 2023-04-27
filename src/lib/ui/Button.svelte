<script lang="ts">
	export let type: "primary" | "secondary" = "primary";
</script>

{#if type === "primary"}
	<button
		class="font-medium text-lg text-inverted border-[1px] border-transparent bg-dominant rounded-xl py-1 px-3 transition-colors duration-300 hover:bg-inherit hover:border-dominant hover:text-dominant"
	>
		<slot />
	</button>
{:else if type === "secondary"}
	<button
		class="font-medium text-lg border-dominant border-[1px] text-dominant rounded-xl py-1 px-3 transition-colors duration-300 hover:border-primary hover:text-primary"
	>
		<slot />
	</button>
{/if}
