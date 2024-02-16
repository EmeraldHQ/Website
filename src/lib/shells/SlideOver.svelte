<script lang="ts">
	import * as m from "$paraglide/messages";
	import XMark from "@inqling/svelte-icons/heroicon-24-outline/x-mark.svelte";
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from "@rgossiaux/svelte-headlessui";

	/**
	 * Whether the slide over is shown or not.
	 */
	export let show = false;
	/**
	 * The optional title of the slide over, displayed in the header.
	 */
	export let title: string | undefined = undefined;
	/**
	 * The callback function to call when the slideover opened.
	 */
	export let afterOpen: () => void = () => {};
	/**
	 * The callback function to call when the slideover closed.
	 */
	export let afterClose: () => void = () => {};
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

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
					<TransitionChild
						enter="ease-in-out duration-500 sm:duration-700"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="ease-in-out duration-500 sm:duration-700"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
						on:introend={afterOpen}
						on:outroend={afterClose}
					>
						<!-- FIXME: close on click not working for some reason (lib bug or height/placement issue?) -->
						<div class="pointer-events-auto h-full w-screen max-w-md">
							<div class="flex h-full flex-col overflow-y-scroll bg-secondary shadow-xl">
								<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div class="flex items-start justify-between">
										<DialogTitle class="text-lg font-medium {title ? '' : 'invisible'}">
											{title}
										</DialogTitle>
										<div class="ml-3 flex h-7 items-center">
											<button
												type="button"
												class="-m-2 p-2 hover:opacity-75"
												on:click={() => (show = false)}
											>
												<span class="sr-only">{m.a11yAriaPanelClose()}</span>
												<XMark class="size-6" aria-hidden="true" />
											</button>
										</div>
									</div>

									<div class="-my-6 h-full">
										<slot name="content" />
									</div>
								</div>

								{#if $$slots.footer}
									<div class="border-t border-primary px-4 py-6 sm:px-6">
										<slot name="footer" />
									</div>
								{/if}
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</div>
	</Dialog>
</Transition>
