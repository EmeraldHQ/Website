<!-- Inspired by https://www.skeleton.dev/components/radio-groups -->
<script lang="ts">
	import { createEventDispatcher } from "svelte";

	/**
	 * The content of each toggle. Likely a string or an icon. Mandatory.
	 */
	export let values: unknown[];
	/**
	 * The content of each toggle when hovered. Likely a string or an icon.
	 */
	export let hoverValues: unknown[] = [];
	/**
	 * The index of the default toggle. Defaults to 0, set to 0 if the value is out of bounds of `values`.
	 */
	export let defaultIndex = 0;
	let currentIndex: number;
	$: currentIndex = defaultIndex < values.length && defaultIndex >= 0 ? defaultIndex : 0;
	/**
	 * The description of the radio buttons group. Used for accessibility. Mandatory.
	 */
	export let description: string;

	const dispatch = createEventDispatcher<{
		change: { index: number };
		hover: { index: number };
	}>();
</script>

<div
	role="radiogroup"
	aria-label={description}
	class="inline-flex space-x-1 rounded-full border-[1px] border-gray-400 p-1 text-primary shadow-2xl shadow-black
	{$$props.class ?? ''}"
>
	{#each values as toggle, index}
		<button
			role="radio"
			aria-checked={index === currentIndex}
			tabindex="0"
			class="grid overflow-hidden rounded-full px-4 py-1 text-center child:col-start-1 child:col-end-1 child:row-start-1 child:row-end-1"
			class:group={hoverValues.length > index}
			class:bg-slate-500={index === currentIndex}
			class:hover:bg-slate-600={index === currentIndex}
			class:hover:bg-slate-800={index !== currentIndex}
			on:focus={() => {
				if (index === currentIndex) return;
				dispatch("hover", { index });
			}}
			on:mouseover={() => {
				if (index === currentIndex) return;
				dispatch("hover", { index });
			}}
			on:click={() => {
				if (index === currentIndex) return;
				currentIndex = index;
				dispatch("change", { index });
			}}
		>
			<span class="transition-opacity duration-300 group-hover:opacity-0">{toggle}</span>
			{#if hoverValues.length > index}
				<span class="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					{hoverValues[index]}
				</span>
			{/if}
		</button>
	{/each}
</div>
