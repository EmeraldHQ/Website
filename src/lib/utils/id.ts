// From https://github.com/rgossiaux/svelte-headlessui/blob/master/src/lib/hooks/use-id.ts
let id = 0;

export function useId() {
	return ++id;
}
