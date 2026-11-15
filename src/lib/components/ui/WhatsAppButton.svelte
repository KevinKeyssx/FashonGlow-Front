<script lang="ts">
	import { MessageCircle } from '@lucide/svelte';
	import type { ProductWithRelations } from '$lib/types';
	import { clientEnv } from '$lib/config/client-env';
	import { currencyStore } from '$lib/stores/currency.svelte';
	import { convertAmount, formatMoney } from '$lib/utils/currency';
	import { getEffectivePrice } from '$lib/utils/price';

	interface Props {
		product        : ProductWithRelations;
		selectedColor? : string | null;
		selectedSize?  : string | null;
		variant?       : 'icon' | 'pill' | 'full';
		size?          : 'sm' | 'md' | 'lg';
		label?         : string;
		class?         : string;
	}

	let {
		product,
		selectedColor = null,
		selectedSize = null,
		variant = 'full',
		size = 'md',
		label = 'Encargar por WhatsApp',
		class : className = '',
	}: Props = $props();

	const buildWhatsAppUrl = (): string => {
		const cleanPhone = clientEnv.PUBLIC_WHATSAPP_NUMBER.replace( /\D/g, '' );
		const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fashionglow.cl';
		const productUrl = `${ origin }/producto/${ product.slug }`;

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

		const message = lines.join( '\n' );
		const encodedText = encodeURIComponent( message );

		// Prioritize WhatsApp Web on desktop, wa.me on mobile
		return `https://web.whatsapp.com/send?phone=${ cleanPhone }&text=${ encodedText }`;
	};

	const handleClick = ( e: MouseEvent ): void => {
		e.preventDefault();
		e.stopPropagation();

		const url = buildWhatsAppUrl();
		if ( typeof window !== 'undefined' ) {
			window.open( url, '_blank', 'noopener,noreferrer' );
		}
	};

	const iconSizes = {
		sm : 'w-4 h-4',
		md : 'w-4.5 h-4.5',
		lg : 'w-5 h-5',
	};

	const iconButtonSizes = {
		sm : 'p-2.5',
		md : 'p-3',
		lg : 'p-4',
	};
</script>

{#if ( variant === 'icon' )}
	<button
		type="button"
		onclick={ handleClick }
		aria-label="Encargar por WhatsApp"
		title="Encargar por WhatsApp"
		class="rounded-full border border-emerald-500/40 hover:border-emerald-500 bg-base/85 backdrop-blur-md text-emerald-500 hover:text-white hover:bg-emerald-500 transition-all duration-200 cursor-pointer shadow-xs active:scale-90 flex items-center justify-center { iconButtonSizes[ size ] } { className }"
	>
		<MessageCircle class="{ iconSizes[ size ] } transition-transform duration-200 hover:scale-110" />
	</button>
{:else if ( variant === 'pill' )}
	<button
		type="button"
		onclick={ handleClick }
		class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-500/25 transition-all duration-200 cursor-pointer active:scale-95 { className }"
	>
		<MessageCircle class={ iconSizes[ size ] } />
		<span>{ label }</span>
	</button>
{:else}
	<button
		type="button"
		onclick={ handleClick }
		class="w-full py-4 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 { className }"
	>
		<MessageCircle class={ iconSizes[ size ] } />
		<span>{ label }</span>
	</button>
{/if}
