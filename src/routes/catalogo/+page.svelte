<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

    import { SlidersHorizontal, Sparkles } from '@lucide/svelte';

	import {
        parseFilters,
        serializeFilters,
        countActiveFilters
    }                               from '$lib/utils/filters';
    import type {
        CatalogFilters,
        SortOption,
        Gender
    }                               from '$lib/types';
	import { createCatalogQuery }   from '$lib/queries/catalog.queries';
	import SearchBar                from '$lib/components/catalog/SearchBar.svelte';
	import SortSelector             from '$lib/components/catalog/SortSelector.svelte';
	import FilterSidebar            from '$lib/components/catalog/FilterSidebar.svelte';
	import FilterDrawer             from '$lib/components/catalog/FilterDrawer.svelte';
	import ActiveFilters            from '$lib/components/catalog/ActiveFilters.svelte';
	import ProductGrid              from '$lib/components/catalog/ProductGrid.svelte';

	// Filters derived directly from current URL searchParams (single source of truth)
	const currentFilters = $derived( parseFilters( new URLSearchParams( page.url.search ) ) );

	// Reactive TanStack query based on URL filters
	const catalogQuery = createCatalogQuery( () => currentFilters );

	// Mobile filter drawer state
	let isDrawerOpen = $state( false );

	// Update filters by navigating to updated URL searchParams
	const updateFilters = ( changes: Partial<CatalogFilters> ): void => {
		const nextFilters = {
			...currentFilters,
			...changes,
		};

		const searchParams = serializeFilters( nextFilters );
		const queryStr     = searchParams.toString();
		const targetUrl    = queryStr ? `/catalogo?${ queryStr }` : '/catalogo';

		goto( targetUrl, {
			replaceState : true,
		} );
	};

	const resetAllFilters = (): void => {
		goto( '/catalogo', {
			replaceState : true,
		} );
	};

	const activeCount = $derived( countActiveFilters( currentFilters ) );
</script>

<svelte:head>
	<title>Catálogo Completo — Fashion Glow</title>
	<meta
		name="description"
		content="Explora el catálogo de moda, calzado y accesorios de Fashion Glow. Filtra por categoría, género, talla, color, precio y atributos inteligentes."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
	<!-- Page Header & Search Bar -->
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<div class="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold">
				<Sparkles class="w-3.5 h-3.5" />
				<span>Catálogo Fashion Glow</span>
			</div>
			<h1 class="font-display font-bold text-3xl sm:text-4xl text-primary">
				Todas las Colecciones
			</h1>
		</div>

		<!-- Search Bar with real-time sync -->
		<SearchBar
			value={ currentFilters.query }
			onSearch={ ( q ) => updateFilters({ query: q, page: 1 }) }
			class="max-w-2xl"
		/>
	</div>

	<!-- Active Filters Chips -->
	<ActiveFilters
		filters={ currentFilters }
		onRemoveQuery={ () => updateFilters({ query: '', page: 1 }) }
		onRemoveCategory={ () => updateFilters({ categorySlug: null, subcategorySlug: null, page: 1 }) }
		onRemoveSubcategory={ () => updateFilters({ subcategorySlug: null, page: 1 }) }
		onRemoveGender={ ( gen: Gender ) =>
			updateFilters({ genders: currentFilters.genders.filter( ( g ) => g !== gen ), page: 1 })
		}
		onRemoveBrand={ ( b: string ) =>
			updateFilters({ brandSlugs: currentFilters.brandSlugs.filter( ( s ) => s !== b ), page: 1 })
		}
		onRemoveColor={ ( c: string ) =>
			updateFilters({ colorFamilies: currentFilters.colorFamilies.filter( ( f ) => f !== c ), page: 1 })
		}
		onRemoveSize={ ( s: string ) =>
			updateFilters({ sizes: currentFilters.sizes.filter( ( sz ) => sz !== s ), page: 1 })
		}
		onRemovePriceRange={ () => updateFilters({ priceMin: null, priceMax: null, page: 1 }) }
		onRemoveAttributeOption={ ( slug: string, val: string ) => {
			const attrs = { ...currentFilters.attributes };
			const nextVals = ( attrs[ slug ] ?? [] ).filter( ( v ) => v !== val );
			if ( nextVals.length === 0 ) {
				delete attrs[ slug ];
			} else {
				attrs[ slug ] = nextVals;
			}
			updateFilters({ attributes: attrs, page: 1 });
		} }
		onRemoveOnlyOnSale={ () => updateFilters({ onlyOnSale: false, page: 1 }) }
		onRemoveOnlyInStock={ () => updateFilters({ onlyInStock: false, page: 1 }) }
		onResetAll={ resetAllFilters }
	/>

	<!-- Controls Toolbar (Mobile Filter Button + Results Count + Sort Selector) -->
	<div class="flex items-center justify-between gap-4 py-3 border-y border-border">
		<!-- Mobile filter toggle button -->
		<button
			type="button"
			onclick={ () => ( isDrawerOpen = true ) }
			class="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-subtle border border-border hover:border-rose-400 text-xs font-semibold text-primary transition-all cursor-pointer shadow-xs active:scale-95"
		>
			<SlidersHorizontal class="w-4 h-4 text-rose-500" />
			<span>Filtros</span>
			{#if ( activeCount > 0 )}
				<span class="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
					{ activeCount }
				</span>
			{/if}
		</button>

		<!-- Results Count -->
		<div class="text-xs text-secondary">
			{#if ( catalogQuery.isPending )}
				<span>Cargando productos...</span>
			{:else if ( catalogQuery.data )}
				<span class="font-medium text-primary font-mono">{ catalogQuery.data.totalCount }</span> productos encontrados
			{/if}
		</div>

		<!-- Sort Selector -->
		<SortSelector
			value={ currentFilters.sort }
			onchange={ ( sort: SortOption ) => updateFilters({ sort, page: 1 }) }
		/>
	</div>

	<!-- Main Catalog Layout (Desktop Sidebar + Product Grid) -->
	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
		<!-- Desktop Sticky Sidebar -->
		<div class="hidden lg:block lg:col-span-1 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3">
			{#if ( catalogQuery.data )}
				<FilterSidebar
					filters={ currentFilters }
					facets={ catalogQuery.data.facets }
					onchange={ updateFilters }
					onReset={ resetAllFilters }
				/>
			{:else}
				<div class="p-4 rounded-3xl bg-subtle border border-border text-xs text-muted-text">
					Cargando opciones de filtros...
				</div>
			{/if}
		</div>

		<!-- Products Area -->
		<div class="lg:col-span-3 w-full">
			<ProductGrid
				products={ catalogQuery.data?.products ?? [] }
				isLoading={ catalogQuery.isPending }
				page={ currentFilters.page }
				totalPages={ catalogQuery.data?.totalPages ?? 1 }
				onPageChange={ ( newPage ) => updateFilters({ page: newPage }) }
				onReset={ resetAllFilters }
			/>
		</div>
	</div>
</div>

<!-- Mobile Filter Drawer -->
{#if ( catalogQuery.data )}
	<FilterDrawer
		isOpen={ isDrawerOpen }
		filters={ currentFilters }
		facets={ catalogQuery.data.facets }
		totalCount={ catalogQuery.data.totalCount }
		onchange={ updateFilters }
		onReset={ resetAllFilters }
		onClose={ () => ( isDrawerOpen = false ) }
	/>
{/if}
