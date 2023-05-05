<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let values = [];
	export let defaultIndex = 0;
	let currentIndex: number = defaultIndex;
	export let description: string;

	const dispatch = createEventDispatcher();
</script>

<div
	role="radiogroup"
	aria-label={description}
	class="inline-flex p-1 space-x-1 border-[1px] border-gray-400 text-primary shadow-2xl shadow-black rounded-full"
>
	{#each values as btn, index}
		<button
			class="text-center px-4 py-1 rounded-full"
			class:bg-slate-500={index === currentIndex}
			class:hover:bg-slate-600={index === currentIndex}
			class:hover:bg-slate-800={index !== currentIndex}
			on:click={() => {
        if (index === currentIndex) return;
				currentIndex = index;
				dispatch("change", { index });
			}}
		>
			{btn}
		</button>
	{/each}
</div>
