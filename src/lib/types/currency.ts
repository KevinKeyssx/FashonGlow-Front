export type CurrencyCode = 'CLP' | 'USD' | 'EUR' | 'VES' | 'ARS' | 'COP' | 'MXN' | 'BRL';

export interface CurrencyConfig {
	code     : CurrencyCode;
	name     : string;
	symbol   : string;
	locale   : string;
	decimals : number;
	rate     : number;
	flag     : string;
}
