<script lang="ts">
	import { X, Sparkles } from '@lucide/svelte';
	import type { CatalogFilters, Gender } from '$lib/types';
	import { countActiveFilters } from '$lib/utils/filters';

	interface Props {
		filters : CatalogFilters;
		onRemoveQuery?           : () => void;
		onRemoveCategory?        : () => void;
		onRemoveSubcategory?     : () => void;
		onRemoveGender?          : ( gender: Gender ) => void;
		onRemoveBrand?           : ( brandSlug: string ) => void;
		onRemoveColor?           : ( colorFamily: string ) => void;
		onRemoveSize?            : ( size: string ) => void;
		onRemovePriceRange?      : () => void;
		onRemoveAttributeOption? : ( slug: string, value: string ) => void;
		onRemoveOnlyOnSale?      : () => void;
		onRemoveOnlyInStock?     : () => void;
		onResetAll?              : () => void;
		class?                   : string;
	}

	let {
		filters,
		onRemoveQuery,
		onRemoveCategory,
		onRemoveSubcategory,
		onRemoveGender,
		onRemoveBrand,
		onRemoveColor,
		onRemoveSize,
		onRemovePriceRange,
		onRemoveAttributeOption,
		onRemoveOnlyOnSale,
		onRemoveOnlyInStock,
		onResetAll,
		class : className = '',
	}: Props = $props();

	const activeCount = $derived( countActiveFilters( filters ) );
</script>

{#if ( activeCount > 0 )}
	<div class="flex flex-wrap items-center gap-2 { className }">
		<span class="text-xs font-semibold text-muted-text flex items-center gap-1 mr-1">
			<Sparkles class="w-3 h-3 text-gold-500" />
			Filtros activos ({ activeCount }):
		</span>

		<!-- Search query chip -->
		{#if ( filters.query )}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/30">
				<span>"{ filters.query }"</span>
				<button
					type="button"
					onclick={ onRemoveQuery }
					aria-label="Quitar filtro de búsqueda"
					class="p-0.5 hover:bg-rose-500/20 rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/if}

		<!-- Category chip -->
		{#if ( filters.categorySlug )}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
				<span>Cat: { filters.categorySlug }</span>
				<button
					type="button"
					onclick={ onRemoveCategory }
					aria-label="Quitar categoría"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/if}

		<!-- Subcategory chip -->
		{#if ( filters.subcategorySlug )}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
				<span>Subcat: { filters.subcategorySlug }</span>
				<button
					type="button"
					onclick={ onRemoveSubcategory }
					aria-label="Quitar subcategoría"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/if}

		<!-- Genders -->
		{#each filters.genders as gen}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
				<span class="capitalize">{ gen.toLowerCase() }</span>
				<button
					type="button"
					onclick={ () => onRemoveGender?.( gen ) }
					aria-label="Quitar filtro de género"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/each}

		<!-- Brands -->
		{#each filters.brandSlugs as b}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
				<span class="capitalize">{ b }</span>
				<button
					type="button"
					onclick={ () => onRemoveBrand?.( b ) }
					aria-label="Quitar marca"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/each}

		<!-- Colors -->
		{#each filters.colorFamilies as c}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
				<span class="capitalize">{ c }</span>
				<button
					type="button"
					onclick={ () => onRemoveColor?.( c ) }
					aria-label="Quitar color"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/each}

		<!-- Sizes -->
		{#each filters.sizes as s}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
				<span>Talla { s }</span>
				<button
					type="button"
					onclick={ () => onRemoveSize?.( s ) }
					aria-label="Quitar talla"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/each}

		<!-- Price range -->
		{#if ( filters.priceMin !== null || filters.priceMax !== null )}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary font-mono">
				<span>${ filters.priceMin ?? 0 } - ${ filters.priceMax ?? '∞' }</span>
				<button
					type="button"
					onclick={ onRemovePriceRange }
					aria-label="Quitar rango de precio"
					class="p-0.5 hover:bg-border rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/if}

		<!-- Dynamic attributes -->
		{#each Object.entries( filters.attributes ) as [ slug, vals ]}
			{#each vals as val}
				<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-elevated border border-border text-primary">
					<span class="capitalize">{ slug }: { val }</span>
					<button
						type="button"
						onclick={ () => onRemoveAttributeOption?.( slug, val ) }
						aria-label="Quitar atributo"
						class="p-0.5 hover:bg-border rounded-full cursor-pointer"
					>
						<X class="w-3 h-3" />
					</button>
				</span>
			{/each}
		{/each}

		<!-- Only on sale -->
		{#if ( filters.onlyOnSale )}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30">
				<span>Solo Ofertas</span>
				<button
					type="button"
					onclick={ onRemoveOnlyOnSale }
					aria-label="Quitar filtro de ofertas"
					class="p-0.5 hover:bg-gold-500/20 rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/if}

		<!-- Only in stock -->
		{#if ( filters.onlyInStock )}
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
				<span>En Stock</span>
				<button
					type="button"
					onclick={ onRemoveOnlyInStock }
					aria-label="Quitar filtro de stock"
					class="p-0.5 hover:bg-emerald-500/20 rounded-full cursor-pointer"
				>
					<X class="w-3 h-3" />
				</button>
			</span>
		{/if}

		<!-- Reset all button -->
		<button
			type="button"
			onclick={ onResetAll }
			class="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline px-2 py-1 cursor-pointer transition-colors ml-1"
		>
			Limpiar todo
		</button>
	</div>
{/if}

