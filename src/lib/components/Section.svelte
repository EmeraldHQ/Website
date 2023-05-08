<section id={$$props.id} class="{$$props.class} py-10">
	{#if $$slots.title}
		<h2 class="drop-shadow-lg pb-10 !ml-24 text-4xl">
			<slot name="title" />
		</h2>
	{/if}
	<slot />
</section>
