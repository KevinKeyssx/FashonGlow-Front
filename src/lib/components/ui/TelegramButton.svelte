<script lang="ts">
	import type { ProductWithRelations }    from '$lib/types';
	import { clientEnv }                    from '$lib/config/client-env';
	import { currencyStore }                from '$lib/stores/currency.svelte';
	import { convertAmount, formatMoney }   from '$lib/utils/currency';
	import { getEffectivePrice }            from '$lib/utils/price';


    interface Props {
		product			: ProductWithRelations;
		selectedColor?	: string | null;
		selectedSize?	: string | null;
		variant?		: 'icon' | 'pill' | 'full';
		size?			: 'sm' | 'md' | 'lg';
		label?			: string;
		class?			: string;
	}


    let {
		product,
		selectedColor = null,
		selectedSize = null,
		variant = 'full',
		size = 'md',
		label = 'Encargar por Telegram',
		class : className = '',
	}: Props = $props();


    const buildTelegramUrl = (): string => {
		const username      = clientEnv.PUBLIC_TELEGRAM_USERNAME;
		const origin        = typeof window !== 'undefined' ? window.location.origin : 'https://fashionglow.cl';
		const productUrl    = `${ origin }/producto/${ product.slug }`;

		const effectivePrice = getEffectivePrice( product );
		const priceFormatted = formatMoney(
			convertAmount( effectivePrice, 'CLP', currencyStore.active ),
			currencyStore.active,
		);

		const lines: string[] = [
			'✨ *¡Hola Fashion Glow!* Me encantó este producto y quisiera coordinar mi pedido: ✨',
			'',
			`👗 *Prenda:* ${ product.name }`,
			selectedColor ? `🎨 *Color seleccionado:* ${ selectedColor }` : '',
			selectedSize ? `📏 *Talla seleccionada:* ${ selectedSize }` : '',
			`💰 *Precio:* ${ priceFormatted }`,
			`🏷️ *Marca:* ${ product.brand.name }`,
			'',
			`🔗 *Link:* ${ productUrl }`,
			'',
			'¿Tienen disponibilidad para coordinar la entrega? ¡Muchas gracias! 💕🛍️',
		].filter( ( line: string ): boolean => line.length > 0 || line === '' );

		const message       = lines.join( '\n' );
		const encodedText   = encodeURIComponent( message );

		return `https://t.me/${ username }?text=${ encodedText }`;
	};

	const handleClick = ( e: MouseEvent ): void => {
		e.preventDefault();
		e.stopPropagation();

		const url = buildTelegramUrl();
		if ( typeof window !== 'undefined' ) {
			window.open( url, '_blank', 'noopener,noreferrer' );
		}
	};

	interface IconSizeMap {
		sm : string;
		md : string;
		lg : string;
	}

	const iconSizes: IconSizeMap = {
		sm : 'w-4 h-4',
		md : 'w-4.5 h-4.5',
		lg : 'w-5 h-5',
	};

	const iconButtonSizes: IconSizeMap = {
		sm : 'p-2.5',
		md : 'p-3',
		lg : 'p-4',
	};
</script>

{#if ( variant === 'icon' )}
	<button
		type="button"
		onclick={ handleClick }
		aria-label="Encargar por Telegram"
		title="Encargar por Telegram"
		class="rounded-full border border-sky-500/40 hover:border-sky-500 bg-base/85 backdrop-blur-md text-sky-500 hover:text-white hover:bg-sky-500 transition-all duration-200 cursor-pointer shadow-xs active:scale-90 flex items-center justify-center { iconButtonSizes[ size ] } { className }"
	>
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			class="{ iconSizes[ size ] } transition-transform duration-200 hover:scale-110"
			aria-hidden="true"
		>
			<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
		</svg>
	</button>
{:else if ( variant === 'pill' )}
	<button
		type="button"
		onclick={ handleClick }
		class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/25 transition-all duration-200 cursor-pointer active:scale-95 { className }"
	>
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			class={ iconSizes[ size ] }
			aria-hidden="true"
		>
			<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
		</svg>
		<span>{ label }</span>
	</button>
{:else}
	<button
		type="button"
		onclick={ handleClick }
		class="w-full py-4 px-6 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 { className }"
	>
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			class={ iconSizes[ size ] }
			aria-hidden="true"
		>
			<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
		</svg>
		<span>{ label }</span>
	</button>
{/if}