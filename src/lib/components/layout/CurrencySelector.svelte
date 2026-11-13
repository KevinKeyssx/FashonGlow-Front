<script lang="ts">
	import { ChevronDown, Coins } from '@lucide/svelte';
	import { currencyStore } from '$lib/stores/currency.svelte';
	import type { CurrencyCode } from '$lib/types';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();

	let isOpen = $state( false );

	const toggle = (): void => {
		isOpen = !isOpen;
	};

	const selectCurrency = ( code: CurrencyCode ): void => {
		currencyStore.setCurrency( code );
		isOpen = false;
	};

	const handleClickOutside = ( event: MouseEvent ): void => {
		const target = event.target as HTMLElement;
		if ( !target.closest( '.currency-selector-container' ) ) {
			isOpen = false;
		}
	};
</script>

<svelte:window onclick={ handleClickOutside } />

<div class="relative currency-selector-container { className }">
	<button
		type="button"
		onclick={ toggle }
		aria-expanded={ isOpen }
		class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-subtle border border-border hover:border-rose-400 text-xs font-medium text-secondary hover:text-primary transition-all duration-200 cursor-pointer select-none active:scale-95"
	>
		<span class="text-sm">{ currencyStore.config.flag }</span>
		<span class="font-semibold text-primary">{ currencyStore.active }</span>
		<ChevronDown class="w-3.5 h-3.5 text-muted-text transition-transform duration-200 { isOpen ? 'rotate-180 text-rose-500' : '' }" />
	</button>

	{#if ( isOpen )}
		<div class="absolute right-0 mt-2 w-52 py-2 bg-base/95 backdrop-blur-md border border-border rounded-2xl shadow-xl shadow-black/10 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
			<div class="px-3.5 py-1.5 border-b border-border/50 text-[10px] font-bold uppercase tracking-wider text-muted-text flex items-center gap-1.5">
				<Coins class="w-3 h-3 text-gold-500" />
				Seleccionar Moneda
			</div>

			<div class="max-h-60 overflow-y-auto py-1">
				{#each currencyStore.currencies as c}
					<button
						type="button"
						onclick={ () => selectCurrency( c.code ) }
						class="w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-elevated transition-colors cursor-pointer { currencyStore.active === c.code ? 'text-rose-500 font-semibold bg-rose-500/5' : 'text-secondary' }"
					>
						<span class="flex items-center gap-2">
							<span class="text-sm">{ c.flag }</span>
							<span>{ c.name }</span>
						</span>
						<span class="text-muted-text font-mono text-[11px]">{ c.code } ({ c.symbol })</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

