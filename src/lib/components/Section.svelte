<section id={$$props.id} class="child:px-20 pb-10">
  {#if $$slots.title}
    <h2 class="drop-shadow-lg pb-10 text-4xl">
      <slot name="title" />
    </h2>
  {/if}
  <slot />
</section>
