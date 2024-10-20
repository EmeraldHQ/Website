<script lang="ts">
	import type { Snippet } from "svelte";
	import { writable } from "svelte/store";
	import * as m from "$paraglide/messages";
	import XMark from "@inqling/svelte-icons/heroicon-24-outline/x-mark.svelte";
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from "@rgossiaux/svelte-headlessui";

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
	 * A store containing a callback function to call when the slideover closed.
	 */
	const onCloseStore = writable(() => {});
</script>

<Transition {show}>
	<Dialog class="relative z-10" on:close={() => (show = false)}>
		<TransitionChild
			enter="ease-in-out duration-500"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in-out duration-500"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
		</TransitionChild>

		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
				<TransitionChild
					enter="ease-in-out duration-500 sm:duration-700"
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="ease-in-out duration-500 sm:duration-700"
					leaveFrom="translate-x-0"
					leaveTo="translate-x-full"
					on:outroend={$onCloseStore}
				>
					<div class="pointer-events-auto h-full w-screen max-w-md">
						<div class="flex h-full flex-col overflow-y-scroll bg-secondary shadow-xl">
							<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
								<div class="flex items-start justify-between">
									<DialogTitle class="text-lg font-medium">
										{#if title}
											{title}
										{/if}
									</DialogTitle>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											class="-m-2 p-2 hover:opacity-75"
											onclick={() => (show = false)}
										>
											<span class="sr-only">{m.a11yAriaPanelClose()}</span>
											<XMark class="size-6" aria-hidden="true" />
										</button>
									</div>
								</div>

								<div class="-my-6 h-full">
									{@render children?.({ onClose: onCloseStore })}
								</div>
							</div>

							{#if footer}
								<div class="border-t border-primary px-4 py-6 sm:px-6">
									{@render footer?.()}
								</div>
							{/if}
						</div>
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
