<script lang="ts">
	import { ArrowRightIcon } from "@rgossiaux/svelte-heroicons/solid";
	import Button from "$ui/Button.svelte";
	import Section from "$components/Section.svelte";
</script>

<svelte:head>
	<title>Home | Renew</title>
</svelte:head>

<main class="h-[80vh] flex items-center justify-center">
	<div
		class="max-md:flex max-md:flex-col max-md:px-10 md:grid md:grid-cols-2 h-fit m-auto child:sm:px-10 child:py-10"
	>
		<div
			class="text-4xl sm:text-5xl lg:text-[5rem] font-medium flex flex-col justify-center sm:mx-auto"
		>
			<div>When your ideas</div>
			<div>become <span class="text-dominant">reality</span>.</div>
			<div class="text-xl font-normal pt-10 text-gray-400">
				From a fast and modern website to a cross-platform<br />mobile app, let's bring your project
				to life.
			</div>
			<div class="pt-10 scale-110 origin-bottom-left">
				<Button class="hover-child:translate-x-1">
					Contact Us
					<ArrowRightIcon class="w-6 h-6 transition-transform duration-700" />
				</Button>
				<Button type="secondary">See our work</Button>
			</div>
		</div>
		<div class="">
			<!-- Upcoming -->
		</div>
	</div>
</main>

<Section id="">
	<svelte:fragment slot="title" />
</Section>
