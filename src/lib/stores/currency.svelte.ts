import type { CurrencyCode } from '$lib/types';
import { CURRENCIES } from '$lib/config/currencies';

const CURRENCY_KEY = 'fg-currency';

function createCurrencyStore() {
	const getInitialCurrency = (): CurrencyCode => {
		if ( typeof window === 'undefined' ) return 'CLP';
		const stored = localStorage.getItem( CURRENCY_KEY );
		if ( stored && CURRENCIES.some( ( c ) => c.code === stored ) ) {
			return stored as CurrencyCode;
		}
		return 'CLP';
	};

	let activeCurrency = $state<CurrencyCode>( 'CLP' );

	const init = () => {
		activeCurrency = getInitialCurrency();
	};

	const setCurrency = ( code: CurrencyCode ) => {
		activeCurrency = code;
		if ( typeof window !== 'undefined' ) {
			localStorage.setItem( CURRENCY_KEY, code );
		}
	};

	return {
		get active()  { return activeCurrency; },
		get config()  { return CURRENCIES.find( ( c ) => c.code === activeCurrency )!; },
		init,
		setCurrency,
		currencies : CURRENCIES,
	};
}

export const currencyStore = createCurrencyStore();
