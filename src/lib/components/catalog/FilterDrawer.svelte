<script lang="ts">
	import { X, SlidersHorizontal, Sparkles } from '@lucide/svelte';
	import type { CatalogFilters, FacetedResponse } from '$lib/types';
	import FilterSidebar from './FilterSidebar.svelte';

	interface Props {
		isOpen     : boolean;
		filters    : CatalogFilters;
		facets     : FacetedResponse['facets'];
		totalCount : number;
		onchange   : ( updated: Partial<CatalogFilters> ) => void;
		onReset    : () => void;
		onClose    : () => void;
	}

	let {
		isOpen = false,
		filters,
		facets,
		totalCount,
		onchange,
		onReset,
		onClose,
	}: Props = $props();
</script>

{#if ( isOpen )}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
		onclick={ onClose }
		aria-label="Cerrar filtros"
	></button>

	<!-- Slide-in Drawer -->
	<div class="fixed top-0 right-0 bottom-0 w-88 max-w-[90vw] bg-base border-l border-border z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
		<!-- Header -->
		<div class="p-4 border-b border-border flex items-center justify-between">
			<div class="flex items-center gap-2">
				<SlidersHorizontal class="w-4 h-4 text-rose-500" />
				<h3 class="font-display font-bold text-base text-primary">
					Filtros de Búsqueda
				</h3>
			</div>

			<button
				type="button"
				onclick={ onClose }
				aria-label="Cerrar filtros"
				class="p-2 rounded-full hover:bg-elevated text-secondary hover:text-primary transition-colors cursor-pointer"
			>
				<X class="w-5 h-5" />
			</button>
		</div>

		<!-- Scrollable Filters Content -->
		<div class="flex-1 overflow-y-auto p-5">
			<FilterSidebar
				{ filters }
				{ facets }
				{ onchange }
				{ onReset }
			/>
		</div>

		<!-- Bottom Action Footer -->
		<div class="p-4 border-t border-border bg-subtle flex items-center gap-3">
			<button
				type="button"
				onclick={ onReset }
				class="flex-1 py-3 text-xs font-semibold text-secondary hover:text-primary rounded-full border border-border hover:bg-elevated transition-colors cursor-pointer"
			>
				Limpiar filtros
			</button>

			<button
				type="button"
				onclick={ onClose }
				class="flex-2 py-3 px-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5"
			>
				<Sparkles class="w-3.5 h-3.5" />
				<span>Ver { totalCount } productos</span>
			</button>
		</div>
	</div>
{/if}

