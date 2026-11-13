<script lang="ts">
	import { AlertCircle } from '@lucide/svelte';
	import type { ProductVariant } from '$lib/types';

	interface Props {
		variants  : ProductVariant[];
		selected  : string | null;
		onSelect  : ( size: string ) => void;
		class?    : string;
	}

	let {
		variants,
		selected,
		onSelect,
		class : className = '',
	}: Props = $props();

	// Sorted by sizeOrder
	const sortedVariants = $derived(
		[ ...variants ].sort( ( a, b ) => a.sizeOrder - b.sizeOrder ),
	);

	const selectedVariant = $derived(
		sortedVariants.find( ( v ) => v.size === selected ),
	);
</script>

<div class="flex flex-col gap-2.5 { className }">
	<div class="flex items-center justify-between text-xs">
		<span class="font-semibold text-secondary uppercase tracking-wider text-[11px]">
			Talla:
		</span>
		{#if ( selectedVariant )}
			<span class="text-xs font-mono text-muted-text">
				SKU: { selectedVariant.sku }
			</span>
		{/if}
	</div>

	<!-- Size Chips -->
	<div class="flex flex-wrap gap-2">
		{#each sortedVariants as v}
			{@const isSelected = selected === v.size}
			{@const isAvailable = v.stock > 0}
			<button
				type="button"
				disabled={ !isAvailable }
				onclick={ () => onSelect( v.size ) }
				class="min-w-12 h-11 px-3.5 rounded-2xl border text-sm font-mono transition-all duration-150 flex items-center justify-center cursor-pointer select-none { !isAvailable ? 'opacity-40 line-through border-border bg-elevated/40 cursor-not-allowed text-muted-text' : isSelected ? 'bg-rose-500 border-rose-500 text-white font-bold shadow-md shadow-rose-500/25 glow-rose scale-102' : 'bg-subtle border-border text-primary hover:border-rose-400 hover:text-rose-500' }"
				title={ isAvailable ? `${ v.stock } unidades disponibles` : 'Sin stock' }
			>
				{ v.size }
			</button>
		{/each}
	</div>

	<!-- Low stock alert -->
	{#if ( selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 3 )}
		<div class="inline-flex items-center gap-1.5 text-xs text-gold-600 dark:text-gold-400 font-medium">
			<AlertCircle class="w-3.5 h-3.5" />
			<span>¡Solo quedan { selectedVariant.stock } unidades en esta talla!</span>
		</div>
	{:else if ( selectedVariant && selectedVariant.stock === 0 )}
		<div class="inline-flex items-center gap-1.5 text-xs text-rose-500 font-medium">
			<AlertCircle class="w-3.5 h-3.5" />
			<span>Esta talla está agotada temporalmente</span>
		</div>
	{/if}
</div>

