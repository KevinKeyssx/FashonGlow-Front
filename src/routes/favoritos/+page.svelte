<script lang="ts">
	import { Heart, Sparkles, ArrowRight, Trash2 } from '@lucide/svelte';

    import { createCatalogQuery }   from '$lib/queries/catalog.queries';
	import { DEFAULT_FILTERS }      from '$lib/types';
	import { favoritesStore }       from '$lib/stores/favorites.svelte';
	import ProductCard              from '$lib/components/catalog/ProductCard.svelte';
	import Skeleton                 from '$lib/components/ui/Skeleton.svelte';

	// Query all products to filter by favorited IDs
	const catalogQuery = createCatalogQuery( () => ({
		...DEFAULT_FILTERS,
		limit : 100,
	}) );

	const favoriteProducts = $derived(
		( catalogQuery.data?.products ?? [] ).filter( ( p ) => favoritesStore.has( p.id ) ),
	);

	const clearAllFavorites = (): void => {
		for ( const id of [ ...favoritesStore.items ] ) {
			favoritesStore.remove( id );
		}
	};
</script>

<svelte:head>
	<title>Mis Favoritos ({ favoritesStore.count }) | Fashion Glow</title>
	<meta name="description" content="Tus prendas y accesorios favoritos guardados en Fashion Glow." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500">
				<Sparkles class="w-3.5 h-3.5" />

                <span>Lista de Deseos</span>
			</div>

            <div class="flex items-center gap-3">
				<h1 class="text-3xl sm:text-4xl font-display font-bold text-primary">
					Mis Favoritos
				</h1>

                {#if ( favoritesStore.count > 0 )}
					<span class="px-3 py-1 rounded-full text-sm font-bold bg-rose-500 text-white font-mono shadow-xs">
						{ favoritesStore.count }
					</span>
				{/if}
			</div>

            <p class="text-xs sm:text-sm text-secondary max-w-xl">
				Tus prendas guardadas. Puedes seleccionarlas y encargarlas directamente por Telegram con tu talla y color preferidos.
			</p>
		</div>

		{#if ( favoritesStore.count > 0 )}
			<button
				type="button"
				onclick={ clearAllFavorites }
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-rose-400 text-xs text-muted-text hover:text-rose-500 transition-colors cursor-pointer w-fit"
			>
				<Trash2 class="w-3.5 h-3.5" />
				<span>Vaciar favoritos</span>
			</button>
		{/if}
	</div>

	<!-- Content -->
	{#if ( catalogQuery.isPending )}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
			{#each Array( 4 ) as _}
				<div class="space-y-3">
					<Skeleton class="aspect-3/4 w-full rounded-3xl" />
					<Skeleton class="h-4 w-3/4 rounded-md" />
					<Skeleton class="h-4 w-1/2 rounded-md" />
				</div>
			{/each}
		</div>
	{:else if ( favoriteProducts.length === 0 )}
		<!-- Empty State -->
		<div class="py-16 sm:py-24 text-center max-w-md mx-auto space-y-6">
			<div class="w-20 h-20 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/10">
				<Heart class="w-10 h-10" />
			</div>

			<div class="space-y-2">
				<h2 class="text-2xl font-bold font-display text-primary">
					Tu lista de favoritos está vacía
				</h2>

                <p class="text-xs sm:text-sm text-secondary leading-relaxed">
					Explora nuestro catálogo y pincha en el corazón de las prendas que más te gusten para guardarlas aquí y encargarlas por Telegram cuando quieras.
				</p>
			</div>

			<a
				href="/catalogo"
				class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-500/25 glow-rose transition-all cursor-pointer active:scale-95"
			>
				<span>Explorar Catálogo</span>
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>
	{:else}
		<!-- Products Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
			{#each favoriteProducts as product ( product.id )}
				<ProductCard { product } />
			{/each}
		</div>
	{/if}
</div>
