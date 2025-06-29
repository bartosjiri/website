import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { CatalogListT } from './catalog.types';

export const catalog: Writable<CatalogListT> = writable([]);
export const catalogItemIndex: Writable<number | null> = writable(null);
export const catalogItemMediaIndex = writable(0);

export const mediaContainerRef: Writable<HTMLElement | null> = writable(null);
