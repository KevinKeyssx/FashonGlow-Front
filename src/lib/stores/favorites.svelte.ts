import { KEY_STORAGE }                  from '$lib/config/key-storage';
import { getFromStorage, setToStorage } from '$lib/utils/localstorage';


class FavoritesStore {
	#favoriteIds = $state<string[]>( [] );
	#initialized = $state( false );

	constructor() {
		if ( typeof window !== 'undefined' ) {
			this.load();
		}
	}

	load(): void {
		this.#favoriteIds = getFromStorage<string[]>( KEY_STORAGE.FAVORITES, [] );
		this.#initialized = true;
	}

	get items(): string[] {
		if ( !this.#initialized && typeof window !== 'undefined' ) {
			this.load();
		}
		return this.#favoriteIds;
	}

	get count(): number {
		return this.items.length;
	}

	has( id: string ): boolean {
		return this.items.includes( id );
	}

	add( id: string ): void {
		if ( !this.has( id ) ) {
			this.#favoriteIds = [ ...this.#favoriteIds, id ];
			setToStorage( KEY_STORAGE.FAVORITES, this.#favoriteIds );
		}
	}

	remove( id: string ): void {
		this.#favoriteIds = this.#favoriteIds.filter( ( item: string ): boolean => item !== id );
		setToStorage( KEY_STORAGE.FAVORITES, this.#favoriteIds );
	}

	toggle( id: string ): boolean {
		if ( this.has( id ) ) {
			this.remove( id );
			return false;
		}
		this.add( id );
		return true;
	}
}

export const favoritesStore = new FavoritesStore();

