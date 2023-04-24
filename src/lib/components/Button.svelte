<script lang="ts">
	export let type: "primary" | "secondary" = "primary";
</script>

{#if type === "primary"}
	<button
		class="font-medium text-lg text-black border-[1px] border-transparent bg-primary rounded-xl py-1 px-3 transition-colors duration-300 hover:bg-inherit hover:border-primary hover:text-primary"
	>
		<slot />
	</button>
{:else if type === "secondary"}
	<button
		class="font-medium text-lg border-primary border-[1px] text-primary rounded-xl py-1 px-3 transition-colors duration-300 hover:border-white hover:text-white"
	>
		<slot />
	</button>
{/if}
