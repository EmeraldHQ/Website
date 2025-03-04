<script lang="ts">
	import type { Snapshot } from "./$types";
	import Check from "@inqling/svelte-icons/heroicon-24-outline/check.svelte";
	import PaperAirplane from "@inqling/svelte-icons/heroicon-24-outline/paper-airplane.svelte";
	import Phone from "@inqling/svelte-icons/heroicon-24-outline/phone.svelte";
	import XMark from "@inqling/svelte-icons/heroicon-24-outline/x-mark.svelte";
	import * as m from "$paraglide/messages";
	import Section from "$layouts/Section.svelte";
	import Button from "$elements/button";

	let { data } = $props();

	export const snapshot: Snapshot<typeof formValues> = {
		capture: () => formValues,
		restore: value => (formValues = value)
	};

	let formValues = $state({
		name: "",
		email: "",
		company: "",
		budget: "",
		description: ""
	});

	// Form handling
	let mailStatus = $state<"idle" | "sending" | "sent" | "error">("idle");
	function mailHandler(form: HTMLFormElement) {
		// A modified version of https://svelte.dev/repl/167e7c7a05844e3dab686b4257641d73
		let submitting = false;
		const submitButton = form.querySelector("button[type='submit'], button:not([type])");

		function handle_submit(event: Event) {
			event.preventDefault();

			if (submitting) return;
			submitting = true;
			submitButton?.setAttribute("disabled", "disabled");

			const entries = [...new FormData(form).entries()].map(([key, value]) => {
				if (key === "$budget") {
					// @ts-expect-error - Calling a function with a string
					value = m[`contactFieldBudget${value}`]();
				}
				return [key, value];
			});
			entries.push([
				"subject",
				`${entries.find(e => e[0] === "name")?.[1]} - ${entries.find(e => e[0] === "$budget")?.[1]}`
			]);
			const data = Object.fromEntries(entries);

			mailStatus = "sending";

			fetch(form.action, {
				method: form.method,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					if (res.ok) {
						mailStatus = "sent";
						form.reset();
					} else {
						mailStatus = "error";
						console.error("Error while sending mail: ", res);
					}
				})
				.catch(e => {
					mailStatus = "error";
					console.error("Error while sending mail: ", e);
				})
				.finally(() => {
					submitting = false;
					setTimeout(() => {
						mailStatus = "idle";
						submitButton?.removeAttribute("disabled");
					}, 5000);
				});
		}

		form.addEventListener("submit", handle_submit);

		return {
			destroy() {
				form.removeEventListener("submit", handle_submit);
			}
		};
	}
</script>

<!-- Page -->
<div
	class="relative -mt-28 justify-center pt-28 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-l before:from-dominant before:to-transparent before:opacity-20 before:content-[''] md:-mt-40 md:pt-40"
>
	<Section id="contact" title={m.contactTitle()}>
		<form action="https://api.staticforms.xyz/submit" method="post" use:mailHandler>
			<input type="hidden" name="accessKey" value="eb32604f-b688-458e-b3d9-eeabb48ad9d1" />
			<input type="text" name="honeypot" class="hidden" />
			<div class="mb-4 grid gap-8 sm:grid-cols-2">
				<div class="flex flex-col gap-6 *:flex *:flex-col *:gap-1">
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{m.contactLabelName()}
						</span>
						<input
							type="text"
							name="name"
							bind:value={formValues.name}
							autocomplete="family-name"
							class="peer rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							placeholder={m.contactFieldName()}
							required
						/>
						<p
							class="hidden text-sm text-red-500 peer-placeholder-shown:!hidden peer-invalid:mt-2 peer-invalid:block"
						>
							{m.contactFieldNameError()}
						</p>
					</label>
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{m.contactLabelEmail()}
						</span>
						<input
							type="email"
							name="email"
							bind:value={formValues.email}
							autocomplete="email"
							class="peer rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							placeholder={m.contactFieldEmail()}
							required
						/>
						<p
							class="hidden text-sm text-red-500 peer-placeholder-shown:!hidden peer-invalid:mt-2 peer-invalid:block"
						>
							{m.contactFieldEmailError()}
						</p>
					</label>
					<label>
						{m.contactLabelCompany()}
						<input
							type="text"
							name="$company"
							bind:value={formValues.company}
							autocomplete="organization"
							class="rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							placeholder={m.contactFieldCompany()}
						/>
					</label>
				</div>
				<div class="flex flex-col gap-6 *:flex *:flex-col *:gap-1">
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{m.contactLabelBudget()}
						</span>
						<select
							name="$budget"
							bind:value={formValues.budget}
							class="w-full rounded-full border border-r-8 border-transparent bg-black/25 px-2 py-1 shadow-md ring-1 outline outline-1 focus:outline-dominant"
							required
						>
							<option value="" disabled hidden>
								{m.contactFieldBudgetChoose()}
							</option>
							<option class="bg-black/50" value="none">
								{m.contactFieldBudgetNone()}
							</option>
							<hr />
							<option class="bg-black/50" value="less">
								{m.contactFieldBudgetLess()}
							</option>
							<option class="bg-black/50" value="1k">{m.contactFieldBudget1k()}</option>
							<option class="bg-black/50" value="5k">{m.contactFieldBudget5k()}</option>
							<option class="bg-black/50" value="10k">{m.contactFieldBudget10k()}</option>
						</select>
					</label>
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{m.contactLabelDescription()}
						</span>
						<textarea
							name="message"
							bind:value={formValues.description}
							placeholder={m.contactFieldDescription()}
							rows="4"
							class="resize-none rounded-2xl border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							required
						></textarea>
					</label>
				</div>
			</div>
			<div class="flex justify-end">
				<Button type="submit">
					{#if mailStatus === "sending"}
						<!-- TODO: Replace with a library icon -->
						<img src="/assets/spinner.svg" alt="Spinner" class="mr-3 size-5 animate-spin" />
						{m.contactSendButtonLoading()}
					{:else if mailStatus === "sent"}
						<Check class="size-6" />
						{m.contactSendButtonSuccess()}
					{:else if mailStatus === "error"}
						<XMark class="size-6" />
						{m.contactSendButtonError()}
					{:else}
						<PaperAirplane class="size-6" />
						{m.contactSendButtonDefault()}
					{/if}
				</Button>
			</div>
		</form>
	</Section>
	<div class="mx-16 flex items-center justify-center xxl:mx-auto xxl:max-w-screen-2xl md:mx-32">
		<div class="w-full border-b border-dominant"></div>
		<div class="mx-4 font-medium uppercase">{m.contactOrLabel()}</div>
		<div class="w-full border-b border-dominant"></div>
	</div>
	<Section id="sales" title={m.contactCallSectionTitle()}>
		<div class="xxl:w-full">
			<div class="flex w-fit flex-col gap-4 rounded-3xl border-[0.5px] bg-black/75 p-6 shadow-2xl">
				<div class="flex flex-col">
					<span class="text-xl font-medium text-dominant">{data.contact.name}</span>
					<span class="font-light opacity-50">
						{m.contactCallSectionJob()} - Emerald Studio
					</span>
				</div>
				<a href="tel:{data.contact.phone.replace(/ /g, '')}" class="flex w-fit gap-2">
					<Phone class="inline-block size-6" />
					<span
						class="underline decoration-dominant decoration-from-font underline-offset-4 hover:decoration-auto"
					>
						{data.contact.phone}
					</span>
				</a>
			</div>
		</div>
	</Section>
</div>
