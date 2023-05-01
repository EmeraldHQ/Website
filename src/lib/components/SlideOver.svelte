<script lang="ts">
	import { XMarkIcon } from "@babeard/svelte-heroicons/outline";
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from "@rgossiaux/svelte-headlessui";

	export let show = false;
	export let title: string | undefined = undefined;

	function close() {
		show = false;
	}
</script>

<Transition {show}>
	<Dialog class="relative z-10" on:close={close}>
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
						enter="transform transition ease-in-out duration-500 sm:duration-700"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transform transition ease-in-out duration-500 sm:duration-700"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<!-- FIXME: close on click not working for some reason (lib bug or height/placement issue?) -->
						<div class="pointer-events-auto w-screen max-w-md h-full">
							<div class="flex h-full flex-col overflow-y-scroll bg-secondary shadow-xl">
								<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div class="flex items-start justify-between">
										<DialogTitle class="text-lg font-medium {title ? '' : 'invisible'}">
											{title}
										</DialogTitle>
										<div class="ml-3 flex h-7 items-center">
											<button type="button" class="-m-2 p-2 hover:opacity-75" on:click={close}>
												<span class="sr-only">Close panel</span>
												<XMarkIcon class="h-6 w-6" aria-hidden="true" />
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
