<script lang="ts">
	import type { Snippet } from "svelte";
	import { writable } from "svelte/store";
	import * as m from "$paraglide/messages";
	import XMark from "@inqling/svelte-icons/heroicon-24-outline/x-mark.svelte";
	import { Drawer } from "vaul-svelte";

	type Props = {
		/**
		 * Whether the slide over is shown or not.
		 */
		show?: boolean;
		/**
		 * The optional title of the slide over, displayed in the header.
		 */
		title?: string | undefined;
		children?: Snippet<[{ onClose: typeof onCloseStore }]>;
		footer?: Snippet;
	};

	let { show = $bindable(false), title = undefined, children, footer }: Props = $props();

	/**
	 * This bit of logic is there because vaul-svelte has no animation when controlled programmatically:
	 * https://github.com/huntabyte/vaul-svelte/issues/52
	 *
	 * To work around this, we create a proxy around the `show` prop to trigger a close animation when
	 * the prop is set to `false`.
	 */
	let open = $state(show);
	let closer = $state<HTMLSpanElement>();

	$effect(() => {
		if (show) {
			open = true;
		} else {
			closer?.click();
		}
	});

	/**
	 * A store containing a callback function to call when the slide-over closed.
	 */
	const onCloseStore = writable(() => {});
</script>

<Drawer.Root
	direction="right"
	bind:open
	onOpenChange={isOpen => {
		if (isOpen) return; // this seems unnecessary because it seems to never be called with `true`
		setTimeout(() => {
			show = false;
			$onCloseStore();
			onCloseStore.set(() => {});
		}, 200); // required delay to fully close, otherwise the scroll lock is still active
	}}
>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Drawer.Content
			class="fixed inset-y-0 right-0 z-50 flex h-auto w-screen max-w-md flex-col bg-bg-secondary"
		>
			<Drawer.Close
				class="mt-5 mr-5 ml-auto cursor-pointer p-2 transition-opacity hover:opacity-75"
			>
				<span class="sr-only" bind:this={closer}>{m.a11yAriaPanelClose()}</span>
				<XMark class="size-6" aria-hidden="true" />
			</Drawer.Close>
			{#if title}
				<Drawer.Title class="text-lg font-medium">
					{title}
				</Drawer.Title>
			{/if}
			{@render children?.({ onClose: onCloseStore })}
			{#if footer}
				<div class="border-t border-border-primary px-4 py-6 sm:px-6">
					{@render footer?.()}
				</div>
			{/if}
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
