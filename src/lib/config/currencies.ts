import type { CurrencyConfig } from '$lib/types/currency';

export const CURRENCIES: CurrencyConfig[] = [
	{
		code     : 'CLP',
		name     : 'Peso Chileno',
		symbol   : '$',
		locale   : 'es-CL',
		decimals : 0,
		rate     : 1,
		flag     : '🇨🇱',
	},
	{
		code     : 'USD',
		name     : 'Dólar Estadounidense',
		symbol   : '$',
		locale   : 'en-US',
		decimals : 2,
		rate     : 0.00105,
		flag     : '🇺🇸',
	},
	{
		code     : 'EUR',
		name     : 'Euro',
		symbol   : '€',
		locale   : 'es-ES',
		decimals : 2,
		rate     : 0.00097,
		flag     : '🇪🇺',
	},
	{
		code     : 'VES',
		name     : 'Bolívar Venezolano',
		symbol   : 'Bs.',
		locale   : 'es-VE',
		decimals : 2,
		rate     : 38,
		flag     : '🇻🇪',
	},
	{
		code     : 'ARS',
		name     : 'Peso Argentino',
		symbol   : '$',
		locale   : 'es-AR',
		decimals : 0,
		rate     : 0.98,
		flag     : '🇦🇷',
	},
	{
		code     : 'COP',
		name     : 'Peso Colombiano',
		symbol   : '$',
		locale   : 'es-CO',
		decimals : 0,
		rate     : 4.2,
		flag     : '🇨🇴',
	},
	{
		code     : 'MXN',
		name     : 'Peso Mexicano',
		symbol   : '$',
		locale   : 'es-MX',
		decimals : 2,
		rate     : 0.018,
		flag     : '🇲🇽',
	},
	{
		code     : 'BRL',
		name     : 'Real Brasileño',
		symbol   : 'R$',
		locale   : 'pt-BR',
		decimals : 2,
		rate     : 0.0059,
		flag     : '🇧🇷',
	},
];

export const getCurrencyByCode = ( code: string ): CurrencyConfig | undefined =>
	CURRENCIES.find( ( c ) => c.code === code );

