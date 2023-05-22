<section id={$$props.id} class="py-10 child:mx-10 md:child:mx-20 {$$props.class}">
	{#if $$slots.title}
		<h2 class="!md:ml-24 pb-10 text-4xl font-medium drop-shadow-lg">
			<slot name="title" />
		</h2>
	{/if}
	<slot />
</section>
