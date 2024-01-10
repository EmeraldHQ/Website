<script lang="ts">
	import type { PageData, Snapshot } from "./$types";
	import { ROOT_URL } from "$config";
	import { page } from "$app/stores";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import { Check, PaperAirplane, Phone, XMark } from "@inqling/svelte-icons/heroicon-24-outline";
	import { i } from "@inlang/sdk-js";
	import { c } from "$lib/utils/inlang-color";
	import Section from "$layouts/Section.svelte";
	import Button from "$elements/button";

	export let data: PageData;

	export const snapshot: Snapshot<typeof formValues> = {
		capture: () => formValues,
		restore: value => (formValues = value)
	};

	let formValues = {
		name: "",
		email: "",
		company: "",
		budget: "",
		description: ""
	};

	// Form handling
	let mailStatus: "idle" | "sending" | "sent" | "error" = "idle";
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
					value = i(`contact.fields.budget.${value}`);
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

<!-- Meta tags -->
<MetaTags
	title={i("contact.pageTitle")}
	titleTemplate="%s | Emerald Studio"
	description={i("contact.description")}
	canonical="{ROOT_URL}{$page.route.id}"
	languageAlternates={[
		{
			hrefLang: "fr",
			href: `${ROOT_URL}${$page.route.id}`
		}
	]}
	openGraph={{
		images: [
			{
				url: `${ROOT_URL}/${i("home.og-banner")}`,
				width: 512,
				height: 256,
				alt: i("a11y.alt.og-banner")
			}
		],
		siteName: "Emerald Studio"
	}}
	twitter={{
		cardType: "summary_large_image",
		title: `${i("contact.pageTitle")} | Emerald Studio`,
		description: i("contact.description"),
		image: `${ROOT_URL}/${i("home.og-banner")}`,
		imageAlt: i("a11y.alt.og-banner")
	}}
	additionalRobotsProps={{
		noarchive: true
	}}
/>

<JsonLd
	schema={[
		{
			"@type": "Organization",
			url: ROOT_URL,
			logo: `${ROOT_URL}/favicon.svg`
		},
		// Add type WebSite from home once done
		{
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: i("common.pages.home"),
					item: ROOT_URL
				},
				{
					"@type": "ListItem",
					position: 2,
					name: i("contact.pageTitle"),
					item: `${ROOT_URL}${$page.route.id}`
				}
			]
		}
	]}
/>

<!-- Page -->
<div
	class="relative -mt-28 justify-center pt-28 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-l before:from-dominant before:to-transparent before:opacity-20 before:content-[''] md:-mt-40 md:pt-40"
>
	<Section>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<svelte:fragment slot="title">{@html c(i("contact.title"))}</svelte:fragment>
		<form action="https://api.staticforms.xyz/submit" method="post" use:mailHandler>
			<input type="hidden" name="accessKey" value="eb32604f-b688-458e-b3d9-eeabb48ad9d1" />
			<input type="text" name="honeypot" class="hidden" />
			<div class="mb-4 grid gap-8 sm:grid-cols-2">
				<div class="flex flex-col gap-6 *:flex *:flex-col *:gap-1">
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{i("contact.labels.name")}
						</span>
						<input
							type="text"
							name="name"
							bind:value={formValues.name}
							autocomplete="family-name"
							class="peer rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							placeholder={i("contact.fields.name")}
							required
						/>
						<p
							class="hidden text-sm text-red-500 peer-placeholder-shown:!hidden peer-invalid:mt-2 peer-invalid:block"
						>
							{i("contact.fields.nameError")}
						</p>
					</label>
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{i("contact.labels.email")}
						</span>
						<input
							type="email"
							name="email"
							bind:value={formValues.email}
							autocomplete="email"
							class="peer rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							placeholder={i("contact.fields.email")}
							required
						/>
						<p
							class="hidden text-sm text-red-500 peer-placeholder-shown:!hidden peer-invalid:mt-2 peer-invalid:block"
						>
							{i("contact.fields.emailError")}
						</p>
					</label>
					<label>
						{i("contact.labels.company")}
						<input
							type="text"
							name="$company"
							bind:value={formValues.company}
							autocomplete="organization"
							class="rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							placeholder={i("contact.fields.company")}
						/>
					</label>
				</div>
				<div class="flex flex-col gap-6 *:flex *:flex-col *:gap-1">
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{i("contact.labels.budget")}
						</span>
						<select
							name="$budget"
							bind:value={formValues.budget}
							class="w-full rounded-full border border-r-8 border-transparent bg-black/25 px-2 py-1 shadow-md outline outline-1 ring-1 focus:outline-dominant"
							required
						>
							<option value="" disabled hidden>
								{i("contact.fields.budget.choose")}
							</option>
							<option class="bg-black/50" value="none">
								{i("contact.fields.budget.none")}
							</option>
							<hr />
							<option class="bg-black/50" value="less">
								{i("contact.fields.budget.less")}
							</option>
							<option class="bg-black/50" value="1k">{i("contact.fields.budget.1k")}</option>
							<option class="bg-black/50" value="5k">{i("contact.fields.budget.5k")}</option>
							<option class="bg-black/50" value="10k">{i("contact.fields.budget.10k")}</option>
						</select>
					</label>
					<label>
						<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
							{i("contact.labels.description")}
						</span>
						<textarea
							name="message"
							bind:value={formValues.description}
							placeholder={i("contact.fields.description")}
							rows="4"
							class="resize-none rounded-2xl border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
							required
						/>
					</label>
				</div>
			</div>
			<div class="flex justify-end">
				<Button type="submit">
					{#if mailStatus === "sending"}
						<!-- TODO: Replace with a library icon -->
						<img src="/assets/spinner.svg" alt="Spinner" class="mr-3 size-5 animate-spin" />
						{i("contact.sendButton.loading")}
					{:else if mailStatus === "sent"}
						<Check class="size-6" />
						{i("contact.sendButton.success")}
					{:else if mailStatus === "error"}
						<XMark class="size-6" />
						{i("contact.sendButton.error")}
					{:else}
						<PaperAirplane class="size-6" />
						{i("contact.sendButton.default")}
					{/if}
				</Button>
			</div>
		</form>
		<div class="my-8 flex items-center justify-center">
			<div class="w-full border-b border-dominant"></div>
			<div class="mx-4 font-medium uppercase">{i("contact.orLabel")}</div>
			<div class="w-full border-b border-dominant"></div>
		</div>
		<div>
			<h2 class="mb-10 text-3xl font-medium drop-shadow-lg">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html c(i("contact.callSection.title"))}
			</h2>
			<div
				class="flex w-fit flex-col gap-4 rounded-3xl border-[0.5px] border-opacity-50 bg-black/75 p-6 shadow-2xl"
			>
				<div class="flex flex-col">
					<span class="text-xl font-medium text-dominant">{data.contact.name}</span>
					<span class="font-light opacity-50">
						{i("contact.callSection.job")} - Emerald Studio
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
