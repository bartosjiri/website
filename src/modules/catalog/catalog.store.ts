import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';

export const mediaContainerRef: Writable<HTMLElement | null> = writable(null);
export const selectedMediaIndex = writable(0);
