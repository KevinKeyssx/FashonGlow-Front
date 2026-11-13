import type { CurrencyCode, CurrencyConfig } from '$lib/types';
import { CURRENCIES } from '$lib/config/currencies';

export const getCurrencyConfig = ( code: CurrencyCode ): CurrencyConfig => {
	const config = CURRENCIES.find( ( c ) => c.code === code );
	if ( !config ) throw new Error( `Currency not found: ${ code }` );
	return config;
};

export const formatMoney = ( amount: number, currencyCode: CurrencyCode ): string => {
	const config = getCurrencyConfig( currencyCode );
	return new Intl.NumberFormat( config.locale, {
		style                 : 'currency',
		currency              : currencyCode,
		minimumFractionDigits : config.decimals,
		maximumFractionDigits : config.decimals,
	} ).format( amount );
};

export const convertAmount = (
	amount       : number,
	fromCurrency : CurrencyCode,
	toCurrency   : CurrencyCode,
): number => {
	if ( fromCurrency === toCurrency ) return amount;
	const fromConfig = getCurrencyConfig( fromCurrency );
	const toConfig   = getCurrencyConfig( toCurrency );
	const inCLP      = amount / fromConfig.rate;
	return inCLP * toConfig.rate;
};
