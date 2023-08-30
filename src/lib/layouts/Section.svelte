<section
	id={$$props.id}
	class="py-16 child:mx-16 md:child:mx-32 xxl:child:!mx-auto xxl:child:max-w-screen-2xl
	{$$props.class ?? ''}"
>
	{#if $$slots.title}
		<h2 class="pb-10 text-4xl font-medium drop-shadow-lg">
			<slot name="title" />
		</h2>
	{/if}
	<slot />
</section>
