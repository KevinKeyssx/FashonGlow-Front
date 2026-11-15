<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import { currencyStore } from '$lib/stores/currency.svelte';
	import { convertAmount, formatMoney } from '$lib/utils/currency';
	import { calcDiscountPercent } from '$lib/utils/price';

	interface Props {
		effectivePrice : number; // CLP base
		originalPrice  : number; // CLP base
		size?          : 'md' | 'lg' | 'xl';
		class?         : string;
	}

	let {
		effectivePrice,
		originalPrice,
		size  = 'lg',
		class : className = '',
	}: Props = $props();

	const hasDiscount = $derived( effectivePrice < originalPrice );

	const convertedEffective = $derived(
		convertAmount( effectivePrice, 'CLP', currencyStore.active ),
	);

	const convertedOriginal = $derived(
		convertAmount( originalPrice, 'CLP', currencyStore.active ),
	);

	const formattedEffective = $derived(
		formatMoney( convertedEffective, currencyStore.active ),
	);

	const formattedOriginal = $derived(
		formatMoney( convertedOriginal, currencyStore.active ),
	);

	const discountPercent = $derived(
		hasDiscount ? calcDiscountPercent( originalPrice, effectivePrice ) : 0,
	);

	const sizeClasses: Record<'md' | 'lg' | 'xl', { text: string; orig: string }> = {
		md : { text: 'text-xl', orig: 'text-sm' },
		lg : { text: 'text-2xl sm:text-3xl', orig: 'text-base' },
		xl : { text: 'text-3xl sm:text-4xl', orig: 'text-lg' },
	};
</script>

<div class="flex flex-wrap items-center gap-3 { className }">
	<!-- Effective price -->
	<span class="font-bold font-mono text-primary { sizeClasses[ size ].text } { hasDiscount ? 'text-rose-500' : '' }">
		{ formattedEffective }
	</span>

	<!-- Original price strikethrough -->
	{#if ( hasDiscount )}
		<span class="font-mono text-muted-text line-through { sizeClasses[ size ].orig }">
			{ formattedOriginal }
		</span>

		<!-- Badge % OFF -->
		<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gold-500 text-white shadow-md shadow-gold-500/25 glow-gold">
			<Sparkles class="w-3 h-3" />
			<span>-{ discountPercent }% OFF</span>
		</span>
	{/if}

	<!-- Currency note -->
	<span class="text-[11px] text-muted-text font-medium self-end pb-1">
		({ currencyStore.active })
	</span>
</div>

