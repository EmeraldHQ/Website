// From https://github.com/rgossiaux/svelte-headlessui/blob/master/src/lib/hooks/use-id.ts
let id = 0;

function generateId() {
	return ++id;
}

export function useId() {
	return generateId();
}
