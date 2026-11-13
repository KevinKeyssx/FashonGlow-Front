<script lang="ts">
	import { Sparkles, RotateCcw } from '@lucide/svelte';
	import type { CatalogFilters, FacetedResponse, Gender } from '$lib/types';
	import FilterSection from './FilterSection.svelte';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Checkbox from '$lib/components/ui/Checkbox.svelte';
	import { countActiveFilters } from '$lib/utils/filters';

	interface Props {
		filters   : CatalogFilters;
		facets    : FacetedResponse['facets'];
		onchange  : ( updated: Partial<CatalogFilters> ) => void;
		onReset   : () => void;
		class?    : string;
	}

	let {
		filters,
		facets,
		onchange,
		onReset,
		class : className = '',
	}: Props = $props();

	const activeTotal = $derived( countActiveFilters( filters ) );

	// Toggles
	const toggleGender = ( gender: Gender ): void => {
		const current = filters.genders;
		const next    = current.includes( gender )
			? current.filter( ( g ) => g !== gender )
			: [ ...current, gender ];
		onchange({ genders: next, page: 1 });
	};

	const toggleBrand = ( slug: string ): void => {
		const current = filters.brandSlugs;
		const next    = current.includes( slug )
			? current.filter( ( s ) => s !== slug )
			: [ ...current, slug ];
		onchange({ brandSlugs: next, page: 1 });
	};

	const toggleColor = ( family: string ): void => {
		const current = filters.colorFamilies;
		const next    = current.includes( family )
			? current.filter( ( f ) => f !== family )
			: [ ...current, family ];
		onchange({ colorFamilies: next, page: 1 });
	};

	const toggleSize = ( size: string ): void => {
		const current = filters.sizes;
		const next    = current.includes( size )
			? current.filter( ( s ) => s !== size )
			: [ ...current, size ];
		onchange({ sizes: next, page: 1 });
	};

	const selectCategory = ( slug: string | null ): void => {
		onchange({
			categorySlug    : slug,
			subcategorySlug : null,
			page            : 1,
		});
	};

	const selectSubcategory = ( slug: string | null ): void => {
		onchange({
			subcategorySlug : slug,
			page            : 1,
		});
	};

	const toggleAttribute = ( attrSlug: string, optionSlug: string ): void => {
		const currentAttrs = { ...filters.attributes };
		const currentVals  = currentAttrs[ attrSlug ] ?? [];
		const nextVals     = currentVals.includes( optionSlug )
			? currentVals.filter( ( v ) => v !== optionSlug )
			: [ ...currentVals, optionSlug ];

		if ( nextVals.length === 0 ) {
			delete currentAttrs[ attrSlug ];
		} else {
			currentAttrs[ attrSlug ] = nextVals;
		}

		onchange({ attributes: currentAttrs, page: 1 });
	};

	// Local price min/max inputs
	let localMin = $state( '' );
	let localMax = $state( '' );

	$effect( () => {
		localMin = filters.priceMin?.toString() ?? '';
		localMax = filters.priceMax?.toString() ?? '';
	} );

	const applyPrice = (): void => {
		const min = localMin ? Number( localMin ) : null;
		const max = localMax ? Number( localMax ) : null;
		onchange({ priceMin: min, priceMax: max, page: 1 });
	};
</script>

<aside class="flex flex-col gap-2 w-full { className }">
	<!-- Top Bar: Title & Reset -->
	<div class="flex items-center justify-between pb-3 border-b border-border">
		<div class="flex items-center gap-2">
			<Sparkles class="w-4 h-4 text-rose-500" />
			<h3 class="text-sm font-bold uppercase tracking-wider text-primary">
				Filtros
			</h3>
			{#if ( activeTotal > 0 )}
				<span class="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
					{ activeTotal }
				</span>
			{/if}
		</div>

		{#if ( activeTotal > 0 )}
			<button
				type="button"
				onclick={ onReset }
				class="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer"
			>
				<RotateCcw class="w-3 h-3" />
				<span>Limpiar</span>
			</button>
		{/if}
	</div>

	<!-- Toggles: Ofertas & Stock -->
	<div class="py-3 flex flex-col gap-3 border-b border-border/70">
		<Switch
			checked={ filters.onlyOnSale }
			label="Solo en oferta"
			onchange={ ( val ) => onchange({ onlyOnSale: val, page: 1 }) }
		/>
		<Switch
			checked={ filters.onlyInStock }
			label="Solo con stock"
			onchange={ ( val ) => onchange({ onlyInStock: val, page: 1 }) }
		/>
	</div>

	<!-- Categorías -->
	<FilterSection
		title="Categoría"
		activeCount={ filters.categorySlug ? 1 : 0 }
	>
		<div class="flex flex-col gap-1.5 text-xs">
			<button
				type="button"
				onclick={ () => selectCategory( null ) }
				class="text-left py-1 px-2 rounded-lg transition-colors cursor-pointer { !filters.categorySlug ? 'font-bold text-rose-500 bg-rose-500/10' : 'text-secondary hover:text-primary hover:bg-elevated' }"
			>
				Todas las categorías
			</button>

			{#each facets.categories as cat}
				<div class="flex flex-col">
					<button
						type="button"
						onclick={ () => selectCategory( cat.value ) }
						class="text-left py-1 px-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer { filters.categorySlug === cat.value ? 'font-bold text-rose-500 bg-rose-500/10' : 'text-secondary hover:text-primary hover:bg-elevated' }"
					>
						<span>{ cat.label }</span>
						<span class="text-[10px] text-muted-text">({ cat.count })</span>
					</button>

					<!-- Subcategorías cascada -->
					{#if ( filters.categorySlug === cat.value && facets.subcategories.length > 0 )}
						<div class="pl-4 py-1 flex flex-col gap-1 border-l-2 border-rose-400/30 my-1">
							{#each facets.subcategories as sub}
								<button
									type="button"
									onclick={ () => selectSubcategory( filters.subcategorySlug === sub.value ? null : sub.value ) }
									class="text-left py-1 px-2 rounded-md text-[11px] flex items-center justify-between transition-colors cursor-pointer { filters.subcategorySlug === sub.value ? 'font-bold text-rose-500 bg-rose-500/15' : 'text-secondary hover:text-primary hover:bg-elevated' }"
								>
									<span>{ sub.label }</span>
									<span class="text-[9px] text-muted-text">({ sub.count })</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</FilterSection>

	<!-- Género -->
	<FilterSection
		title="Género"
		activeCount={ filters.genders.length }
	>
		<div class="flex flex-col gap-2">
			{#each facets.genders as gen}
				<Checkbox
					checked={ filters.genders.includes( gen.value as Gender ) }
					label={ gen.label }
					count={ gen.count }
					onchange={ () => toggleGender( gen.value as Gender ) }
				/>
			{/each}
		</div>
	</FilterSection>

	<!-- Rango de Precio -->
	<FilterSection
		title="Precio (CLP)"
		activeCount={ ( filters.priceMin !== null || filters.priceMax !== null ) ? 1 : 0 }
	>
		<div class="flex flex-col gap-2.5">
			<div class="flex items-center gap-2">
				<input
					type="number"
					bind:value={ localMin }
					placeholder="Mín"
					class="w-full px-3 py-1.5 text-xs bg-subtle border border-border rounded-xl text-primary placeholder:text-muted-text focus:outline-none focus:border-rose-400 font-mono"
				/>
				<span class="text-xs text-muted-text">-</span>
				<input
					type="number"
					bind:value={ localMax }
					placeholder="Máx"
					class="w-full px-3 py-1.5 text-xs bg-subtle border border-border rounded-xl text-primary placeholder:text-muted-text focus:outline-none focus:border-rose-400 font-mono"
				/>
			</div>

			<button
				type="button"
				onclick={ applyPrice }
				class="w-full py-1.5 text-xs font-semibold rounded-full bg-elevated hover:bg-rose-500 hover:text-white border border-border transition-colors cursor-pointer"
			>
				Aplicar rango
			</button>
		</div>
	</FilterSection>

	<!-- Color (visual circles) -->
	<FilterSection
		title="Color"
		activeCount={ filters.colorFamilies.length }
	>
		<div class="grid grid-cols-5 gap-2">
			{#each facets.colors as col}
				{@const isSelected = filters.colorFamilies.includes( col.value )}
				<button
					type="button"
					onclick={ () => toggleColor( col.value ) }
					title="{ col.label } ({ col.count })"
					class="group relative flex flex-col items-center gap-1 p-1 rounded-xl transition-all cursor-pointer { isSelected ? 'bg-rose-500/10' : 'hover:bg-elevated' }"
				>
					<span
						class="w-6 h-6 rounded-full border border-border transition-transform { isSelected ? 'ring-2 ring-rose-500 ring-offset-2 scale-110' : 'group-hover:scale-105' }"
						style="background-color: { col.hex };"
					></span>
					<span class="text-[9px] text-muted-text truncate max-w-full text-center { isSelected ? 'font-bold text-rose-500' : '' }">
						{ col.label }
					</span>
				</button>
			{/each}
		</div>
	</FilterSection>

	<!-- Tallas -->
	<FilterSection
		title="Talla"
		activeCount={ filters.sizes.length }
	>
		<div class="flex flex-wrap gap-1.5">
			{#each facets.sizes as sz}
				{@const isSelected = filters.sizes.includes( sz.value )}
				<button
					type="button"
					onclick={ () => toggleSize( sz.value ) }
					class="px-3 py-1.5 text-xs font-mono rounded-xl border transition-all cursor-pointer { isSelected ? 'bg-rose-500 border-rose-500 text-white font-bold shadow-sm' : 'bg-subtle border-border text-secondary hover:border-rose-400 hover:text-primary' }"
				>
					{ sz.label }
				</button>
			{/each}
		</div>
	</FilterSection>

	<!-- Marcas -->
	<FilterSection
		title="Marca"
		activeCount={ filters.brandSlugs.length }
	>
		<div class="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
			{#each facets.brands as br}
				<Checkbox
					checked={ filters.brandSlugs.includes( br.value ) }
					label={ br.label }
					count={ br.count }
					onchange={ () => toggleBrand( br.value ) }
				/>
			{/each}
		</div>
	</FilterSection>

	<!-- Atributos Dinámicos (Material, Calce/Fit, Temporada, Estilo) -->
	{#each Object.entries( facets.attributes ) as [ attrSlug, options ]}
		{#if ( options.length > 0 )}
			{@const activeInAttr = filters.attributes[ attrSlug ]?.length ?? 0}
			<FilterSection
				title={ attrSlug === 'fit' ? 'Calce / Fit' : attrSlug === 'material' ? 'Material' : attrSlug === 'temporada' ? 'Temporada' : 'Estilo' }
				activeCount={ activeInAttr }
				defaultOpen={ false }
			>
				<div class="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
					{#each options as opt}
						{@const isChecked = filters.attributes[ attrSlug ]?.includes( opt.value ) ?? false}
						<Checkbox
							checked={ isChecked }
							label={ opt.label }
							count={ opt.count }
							onchange={ () => toggleAttribute( attrSlug, opt.value ) }
						/>
					{/each}
				</div>
			</FilterSection>
		{/if}
	{/each}
</aside>
