<section id={$$props.id} class="child:mx-10 md:child:mx-20 py-10">
	{#if $$slots.title}
		<h2 class="drop-shadow-lg pb-10 !ml-24 text-4xl">
			<slot name="title" />
		</h2>
	{/if}
	<slot />
</section>
