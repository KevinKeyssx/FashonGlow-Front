import LZString from 'lz-string';

export const getFromStorage = <T>( key: string, fallback: T ): T => {
	if ( typeof window === 'undefined' || typeof localStorage === 'undefined' ) {
		return fallback;
	}

	try {
		const raw = localStorage.getItem( key );
		if ( !raw ) {
			return fallback;
		}

		const decompressed = LZString.decompressFromUTF16( raw );
		if ( decompressed ) {
			return JSON.parse( decompressed ) as T;
		}

		return JSON.parse( raw ) as T;
	} catch ( err ) {
		console.warn( `Error al leer de localStorage [${ key }]:`, err );
		return fallback;
	}
};

export const setToStorage = <T>( key: string, value: T ): void => {
	if ( typeof window === 'undefined' || typeof localStorage === 'undefined' ) {
		return;
	}

	try {
		const jsonString = JSON.stringify( value );
		const compressed = LZString.compressToUTF16( jsonString );
		localStorage.setItem( key, compressed );
	} catch ( err ) {
		console.error( `Error al guardar en localStorage [${ key }]:`, err );
	}
};

export const removeFromStorage = ( key: string ): void => {
	if ( typeof window === 'undefined' || typeof localStorage === 'undefined' ) {
		return;
	}

	try {
		localStorage.removeItem( key );
	} catch ( err ) {
		console.error( `Error al eliminar de localStorage [${ key }]:`, err );
	}
};

