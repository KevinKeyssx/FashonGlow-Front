export const KEY_STORAGE = {
	FAVORITES : 'fashion_glow_favorites'
} as const;

export type StorageKey = typeof KEY_STORAGE[ keyof typeof KEY_STORAGE ];

