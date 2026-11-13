<script lang="ts">
	import { Sparkles, ArrowRight } from '@lucide/svelte';
	import { createFeaturedQuery } from '$lib/queries/catalog.queries';
	import ProductCard from '$lib/components/catalog/ProductCard.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();

	const query = createFeaturedQuery();
</script>

<section class="py-16 bg-base { className }">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
			<div class="flex flex-col gap-1 text-center sm:text-left">
				<div class="inline-flex items-center gap-1.5 self-center sm:self-start px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold glow-rose">
					<Sparkles class="w-3.5 h-3.5" />
					<span>Selección Exclusiva</span>
				</div>
				<h2 class="font-display font-bold text-2xl sm:text-3xl text-primary">
					Productos Destacados Glow
				</h2>
			</div>

			<a
				href="/catalogo"
				class="inline-flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
			>
				<span>Ver todos los productos</span>
				<ArrowRight class="w-3.5 h-3.5" />
			</a>
		</div>

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

