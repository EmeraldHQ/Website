<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Button from "$elements/Button.svelte";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";
	import { CodeBracket, Sparkles } from "@inqling/svelte-icons/heroicon-24-solid";
	import { ExclamationCircle, XMark } from "@inqling/svelte-icons/heroicon-24-outline";
</script>

<svelte:head>
	<title>Error {$page.status} | Emerald Studio</title>
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
			{$page.status}
		</h1>
		<h2 class="text-5xl font-medium xs:text-7xl md:text-[6rem]">
			{$page.error?.message.toLowerCase()}
		</h2>
	</div>

	<!-- Absolute icons -->
	<div class="absolute -z-10 h-full w-full">
		<Mouse3DTilting initialX={20} initialY={13} intensity={0.05} class="h-24 w-24">
			<div
				class="h-full w-full text-gray-200/75 translate-x-72 translate-y-32
					before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']"
			>
				<Sparkles class="h-full w-full" />
			</div>
		</Mouse3DTilting>
		<Mouse3DTilting initialX={20} initialY={-15} intensity={0.05} class="h-24 w-24">
			<div
				class="h-full w-full text-gray-200/75 translate-x-96 translate-y-72
					before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']"
			>
				<ExclamationCircle class="h-full w-full" />
			</div>
		</Mouse3DTilting>
		<div class="flex justify-end">
			<Mouse3DTilting initialX={-20} initialY={20} intensity={0.05} class="h-24 w-24">
				<div
					class="h-full w-full text-gray-200/75 -translate-x-96
						before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']"
				>
					<XMark class="h-full w-full" />
				</div>
			</Mouse3DTilting>
			<Mouse3DTilting initialX={-40} initialY={-13} intensity={0.05} class="h-24 w-24">
				<div
					class="h-full w-full text-gray-200/75 -translate-x-96 translate-y-96
						before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:opacity-30 before:blur-lg before:content-['']"
				>
					<CodeBracket class="h-full w-full" />
				</div>
			</Mouse3DTilting>
		</div>
	</div>

	<!-- Bottom button -->
	<Button
		type="secondary"
		on:click={() => {
			goto("/", { replaceState: true });
		}}
	>
		Go back to a safe place
	</Button>
</div>
