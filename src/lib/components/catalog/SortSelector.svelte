<script lang="ts">
	import { ArrowUpDown, ChevronDown } from '@lucide/svelte';
	import type { SortOption } from '$lib/types';

	interface Props {
		value    : SortOption;
		onchange : ( sort: SortOption ) => void;
		class?   : string;
	}

	let {
		value,
		onchange,
		class : className = '',
	}: Props = $props();

	let isOpen = $state( false );

	const options: Array<{ value: SortOption; label: string }> = [
		{ value: 'relevancia',  label: 'Relevancia' },
		{ value: 'precio-asc',  label: 'Precio: menor a mayor' },
		{ value: 'precio-desc', label: 'Precio: mayor a menor' },
		{ value: 'nombre-asc',  label: 'Nombre: A - Z' },
		{ value: 'nombre-desc', label: 'Nombre: Z - A' },
		{ value: 'recientes',   label: 'Más recientes' },
	];

	const activeLabel = $derived(
		options.find( ( o ) => o.value === value )?.label ?? 'Ordenar',
	);

	const select = ( option: SortOption ): void => {
		onchange( option );
		isOpen = false;
	};

	const handleClickOutside = ( event: MouseEvent ): void => {
		const target = event.target as HTMLElement;
		if ( !target.closest( '.sort-selector-container' ) ) {
			isOpen = false;
		}
	};
</script>

<svelte:window onclick={ handleClickOutside } />

<div class="relative sort-selector-container { className }">
	<button
		type="button"
		onclick={ () => ( isOpen = !isOpen ) }
		aria-expanded={ isOpen }
		class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-subtle border border-border hover:border-rose-400 text-xs font-medium text-secondary hover:text-primary transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-xs"
	>
		<ArrowUpDown class="w-3.5 h-3.5 text-rose-500" />
		<span>{ activeLabel }</span>
		<ChevronDown class="w-3.5 h-3.5 text-muted-text transition-transform duration-200 { isOpen ? 'rotate-180 text-rose-500' : '' }" />
	</button>

	{#if ( isOpen )}
		<div class="absolute right-0 mt-2 w-52 py-1.5 bg-base/95 backdrop-blur-md border border-border rounded-2xl shadow-xl shadow-black/10 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
			{#each options as opt}
				<button
					type="button"
					onclick={ () => select( opt.value ) }
					class="w-full px-4 py-2 text-left text-xs flex items-center justify-between hover:bg-elevated transition-colors cursor-pointer { value === opt.value ? 'text-rose-500 font-semibold bg-rose-500/5' : 'text-secondary' }"
				>
					<span>{ opt.label }</span>
					{#if ( value === opt.value )}
						<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

