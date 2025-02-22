<script lang="ts">
	import { page } from "$app/state";
	import Button from "$elements/button";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";
	import CodeBracket from "@inqling/svelte-icons/heroicon-24-solid/code-bracket.svelte";
	import Sparkles from "@inqling/svelte-icons/heroicon-24-solid/sparkles.svelte";
	import ExclamationCircle from "@inqling/svelte-icons/heroicon-24-outline/exclamation-circle.svelte";
	import XMark from "@inqling/svelte-icons/heroicon-24-outline/x-mark.svelte";
	import * as m from "$paraglide/messages";
</script>

<svelte:head>
	<title>{m.errorError()} {page.status} | Emerald Studio</title>
</svelte:head>

<div
	class="relative flex flex-col items-center justify-center gap-32 py-44 text-center
        before:absolute before:inset-0 before:-z-10 before:max-w-full before:bg-gradient-to-t before:from-dominant before:to-transparent before:opacity-20 before:content-['']"
>
	<!-- Middle text -->
	<div class="leading-none">
		<h1
			class="text-9xl font-semibold text-dominant xs:text-[12rem] sm:text-[14rem] md:text-[16rem]"
		>
			{page.status}
		</h1>
		<h2 class="text-5xl font-medium xs:text-7xl md:text-8xl">
			{page.error?.message.toLowerCase()}
		</h2>
	</div>

	<!-- Absolute icons -->
	<div class="absolute -z-10 size-full">
		<Mouse3DTilting initialX={20} initialY={13} intensity={0.05} class="size-24">
			<div
				class="size-full translate-x-16 translate-y-20 text-gray-200/75
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']
				sm:translate-x-20 sm:translate-y-32 md:translate-x-36 lg:translate-x-56 xl:translate-x-72"
			>
				<Sparkles class="size-full" />
			</div>
		</Mouse3DTilting>
		<Mouse3DTilting initialX={20} initialY={-15} intensity={0.05} class="size-24">
			<div
				class="size-full translate-x-32 translate-y-64 text-gray-200/75
				before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']
				xs:translate-y-80 sm:translate-x-36 sm:translate-y-96 md:translate-x-56 md:translate-y-72 lg:translate-x-72 xl:translate-x-96"
			>
				<ExclamationCircle class="size-full" />
			</div>
		</Mouse3DTilting>
		<div class="flex justify-end">
			<Mouse3DTilting initialX={-20} initialY={20} intensity={0.05} class="size-24">
				<div
					class="size-full translate-x-20 -translate-y-36 text-gray-200/75
					before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']
					xs:-translate-x-28 sm:-translate-x-40 sm:-translate-y-10 md:translate-y-0 lg:-translate-x-72 xl:-translate-x-96"
				>
					<XMark class="size-full" />
				</div>
			</Mouse3DTilting>
			<Mouse3DTilting initialX={-40} initialY={-13} intensity={0.05} class="size-24">
				<div
					class="size-full -translate-x-40 translate-y-80 text-gray-200/75
					before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']
					xs:translate-y-96 sm:-translate-x-60 sm:translate-y-72 md:translate-y-96 lg:-translate-x-80 xl:-translate-x-96"
				>
					<CodeBracket class="size-full" />
				</div>
			</Mouse3DTilting>
		</div>
	</div>

	<!-- Bottom button -->
	<Button variant="secondary" href="/">
		{m.errorGoHome()}
	</Button>
</div>
