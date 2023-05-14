<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Button from "$elements/Button.svelte";
	import Mouse3DTilting from "$shells/Mouse3DTilting.svelte";
	import { CodeBracket, Sparkles } from "@inqling/svelte-icons/heroicon-24-solid";
	import { ExclamationCircle, XMark } from "@inqling/svelte-icons/heroicon-24-outline";
</script>

<svelte:head>
	<title>Error {$page.status} | Renew</title>
</svelte:head>

<div
	class="flex flex-col justify-center items-center gap-32 text-center py-44 relative
        before:content-[''] before:absolute before:max-w-full before:inset-0 before:bg-gradient-to-t before:from-dominant before:to-transparent before:-z-10 before:opacity-20"
>
	<!-- Middle text -->
	<div class="leading-none">
		<h1
			class="font-semibold text-9xl xs:text-[12rem] sm:text-[14rem] md:text-[16rem] text-dominant"
		>
			{$page.status}
		</h1>
		<h2 class="font-medium text-5xl xs:text-7xl md:text-[6rem]">
			{$page.error?.message.toLowerCase()}
		</h2>
	</div>

	<!-- Absolute icons -->
	<div class="absolute w-full h-full -z-10">
		<Mouse3DTilting initialX={20} initialY={13} intensity={0.05} class="w-24 h-24">
			<div
				class="w-full h-full text-gray-200/75 translate-x-72 translate-y-32
					before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:blur-lg before:opacity-30"
			>
				<Sparkles class="w-full h-full" />
			</div>
		</Mouse3DTilting>
		<Mouse3DTilting initialX={20} initialY={-15} intensity={0.05} class="w-24 h-24">
			<div
				class="w-full h-full text-gray-200/75 translate-x-96 translate-y-72
					before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:blur-lg before:opacity-30"
			>
				<ExclamationCircle class="w-full h-full" />
			</div>
		</Mouse3DTilting>
		<div class="flex justify-end">
			<Mouse3DTilting initialX={-20} initialY={20} intensity={0.05} class="w-24 h-24">
				<div
					class="w-full h-full text-gray-200/75 -translate-x-96
						before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:blur-lg before:opacity-30"
				>
					<XMark class="w-full h-full" />
				</div>
			</Mouse3DTilting>
			<Mouse3DTilting initialX={-40} initialY={-13} intensity={0.05} class="w-24 h-24">
				<div
					class="w-full h-full text-gray-200/75 -translate-x-96 translate-y-96
						before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black before:blur-lg before:opacity-30"
				>
					<CodeBracket class="w-full h-full" />
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
