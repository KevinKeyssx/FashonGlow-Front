<script lang="ts">
	import { Sparkles, ArrowRight, Tag } from '@lucide/svelte';
	import { createOffersQuery } from '$lib/queries/catalog.queries';
	import ProductCard from '$lib/components/catalog/ProductCard.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();

	const query = createOffersQuery();
</script>

<section class="py-16 bg-gradient-to-b from-subtle to-base { className }">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Banner Glow Header -->
		<div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-500/10 via-gold-500/10 to-rose-500/10 border border-gold-500/30 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 glow-gold">
			<div class="flex flex-col gap-2 text-center sm:text-left">
				<div class="inline-flex items-center gap-1.5 self-center sm:self-start px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-bold shadow-md shadow-gold-500/25">
					<Tag class="w-3.5 h-3.5" />
					<span>Precios Especiales de Temporada</span>
				</div>
				<h2 class="font-display font-bold text-2xl sm:text-3xl text-primary">
					Sección de Ofertas Glow
				</h2>
				<p class="text-xs sm:text-sm text-secondary max-w-lg">
					Descuentos de hasta un 30% en prendas seleccionadas. Unidades limitadas con despacho express a todo el país.
				</p>
			</div>

			<a
				href="/catalogo?oferta=1"
				class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs shadow-md shadow-gold-500/30 transition-all shrink-0 active:scale-95"
			>
				<Sparkles class="w-3.5 h-3.5" />
				<span>Ver todas las ofertas</span>
				<ArrowRight class="w-3.5 h-3.5" />
			</a>
		</div>

		<!-- Products list -->
		{#if ( query.isPending )}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{#each Array( 4 ) as _}
					<div class="flex flex-col gap-3 rounded-3xl p-4 bg-subtle border border-border">
						<Skeleton rounded="2xl" class="aspect-3/4 w-full" />
						<Skeleton rounded="full" class="h-4 w-1/3" />
						<Skeleton rounded="full" class="h-5 w-3/4" />
						<div class="flex items-center justify-between pt-2">
							<Skeleton rounded="full" class="h-4 w-16" />
							<Skeleton rounded="full" class="h-5 w-20" />
						</div>
					</div>
				{/each}
			</div>
		{:else if ( query.data && query.data.length > 0 )}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{#each query.data.slice( 0, 8 ) as product ( product.id )}
					<ProductCard { product } />
				{/each}
			</div>
		{/if}
	</div>
</section>

