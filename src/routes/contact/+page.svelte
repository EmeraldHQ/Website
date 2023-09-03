<script lang="ts">
	import { ROOT_URL } from "$config";
	import { page } from "$app/stores";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import { Check, PaperAirplane, XMark } from "@inqling/svelte-icons/heroicon-24-outline";
	import { i } from "@inlang/sdk-js";
	import { c } from "$lib/utils/inlang-color";
	import Section from "$layouts/Section.svelte";
	import Button from "$elements/Button.svelte";

	let mailStatus: "idle" | "sending" | "sent" | "error" = "idle";
	function mailHandler(node: HTMLFormElement) {
		// A modified version of https://svelte.dev/repl/167e7c7a05844e3dab686b4257641d73
		let submitting = false;
		const submitButton = node.querySelector("button[type='submit'], button:not([type])");

		function handle_submit(event: Event) {
			event.preventDefault();

			if (submitting) return;
			submitting = true;
			submitButton?.setAttribute("disabled", "disabled");

			const entries = [...new FormData(node).entries()].map(([key, value]) => {
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

			fetch(node.action, {
				method: node.method,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					if (res.ok) {
						mailStatus = "sent";
						node.reset();
						setTimeout(() => {
							mailStatus = "idle";
						}, 5000);
					} else {
						mailStatus = "error";
					}
				})
				.catch(e => {
					mailStatus = "error";
					console.error("Error while sending mail: ", e);
				})
				.finally(() => {
					submitting = false;
					setTimeout(() => {
						submitButton?.removeAttribute("disabled");
					}, 5000);
				});
		}

		node.addEventListener("submit", handle_submit);

		return {
			destroy() {
				node.removeEventListener("submit", handle_submit);
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
<div class="relative -mt-28 justify-center pt-28 md:-mt-40 md:pt-40">
	<div
		class="before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-l before:from-dominant before:to-transparent before:opacity-20 before:content-['']"
	>
		<Section>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<svelte:fragment slot="title">{@html c(i("contact.title"))}</svelte:fragment>
			<form action="https://api.staticforms.xyz/submit" method="post" use:mailHandler>
				<input type="hidden" name="accessKey" value="eb32604f-b688-458e-b3d9-eeabb48ad9d1" />
				<input type="text" name="honeypot" class="hidden" />
				<div class="mb-4 grid gap-8 sm:grid-cols-2">
					<div class="flex flex-col gap-6 child:flex child:flex-col child:gap-1">
						<label>
							<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
								{i("contact.labels.name")}
							</span>
							<input
								type="text"
								name="name"
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
								class="rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
								placeholder={i("contact.fields.company")}
							/>
						</label>
					</div>
					<div class="flex flex-col gap-6 child:flex child:flex-col child:gap-1">
						<label>
							<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
								{i("contact.labels.budget")}
							</span>
							<div
								class="relative after:absolute after:right-3.5 after:top-1.5 after:content-['▼']"
							>
								<select
									name="$budget"
									class="w-full appearance-none rounded-full border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
									required
								>
									<option value="" selected disabled hidden>
										{i("contact.fields.budget.choose")}
									</option>
									<option value="none">{i("contact.fields.budget.none")}</option>
									<option value="less">{i("contact.fields.budget.less")}</option>
									<option value="1k">{i("contact.fields.budget.1k")}</option>
									<option value="5k">{i("contact.fields.budget.5k")}</option>
									<option value="10k">{i("contact.fields.budget.10k")}</option>
								</select>
							</div>
						</label>
						<label>
							<span class="after:ml-0.5 after:text-red-500 after:content-['*']">
								{i("contact.labels.description")}
							</span>
							<textarea
								name="message"
								placeholder={i("contact.fields.description")}
								rows="4"
								class="resize-none rounded-2xl border bg-black/25 px-4 py-1 shadow-md focus:border-dominant focus:outline-0"
								required
							/>
						</label>
					</div>
				</div>
				<div class="float-right">
					<Button submit>
						{#if mailStatus === "sending"}
							<img src="/assets/spinner.svg" alt="Spinner" class="mr-3 h-5 w-5 animate-spin" />
							{i("contact.sendButton.loading")}
						{:else if mailStatus === "sent"}
							<Check class="h-6 w-6" />
							{i("contact.sendButton.success")}
						{:else if mailStatus === "error"}
							<XMark class="h-6 w-6" />
							{i("contact.sendButton.error")}
						{:else}
							<PaperAirplane class="h-6 w-6" />
							{i("contact.sendButton.default")}
						{/if}
					</Button>
				</div>
			</form>
		</Section>
	</div>
</div>
