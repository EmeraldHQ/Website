<section
	id={$$props.id}
	class="py-16 *:mx-16 md:*:mx-32 xxl:*:!mx-auto xxl:*:max-w-screen-2xl
	{$$props.class ?? ''}"
>
	{#if $$slots.title}
		<h2 class="pb-10 text-4xl font-medium drop-shadow-lg">
			<slot name="title" />
		</h2>
	{/if}
	<slot />
</section>
