import pkgJson from "../package.json" assert { type: "json" };
import { writeFileSync, readFileSync } from "fs";
import * as url from "node:url";

function updateConfig() {
	console.log("Checking for updates to inlang config...");

	// Get installed version of inlang sdk
	const sdkDependencyVersion = pkgJson.devDependencies["@inlang/sdk-js"].replace(/^[^\d]+/, "");

	// Get manually set version of inlang sdk in config
	const inlangConfig = readFileSync("./inlang.config.js", "utf-8");
	const sdkConfigVersion = inlangConfig
		.split("\n")
		.find(line => line.includes("sdk-js-plugin"))
		.split("sdk-js-plugin")[1]
		.split("@")[1]
		.split("/")[0];

	console.log(
		`Installed inlang sdk version: ${sdkDependencyVersion} - config version: ${sdkConfigVersion}`
	);

	// If versions are different, update config
	if (sdkDependencyVersion !== sdkConfigVersion) {
		console.log("Updating inlang config...");
		const newConfig = inlangConfig.replace(
			/sdk-js-plugin[^@]+@[^/]+/,
			`sdk-js-plugin@${sdkDependencyVersion}`
		);
		writeFileSync("./inlang.config.js", newConfig);
		console.log("Updated inlang config.");
	} else {
		console.log("No updates to inlang config needed.");
	}
}

const self = url.fileURLToPath(import.meta.url);
if (process.argv[1] === self) {
	updateConfig();
}
