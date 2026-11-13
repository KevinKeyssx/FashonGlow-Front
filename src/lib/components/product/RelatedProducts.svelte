<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import type { ProductWithRelations } from '$lib/types';
	import ProductCard from '$lib/components/catalog/ProductCard.svelte';

	interface Props {
		currentProductId : string;
		categorySlug     : string;
		allProducts      : ProductWithRelations[];
		class?           : string;
	}

	let {
		currentProductId,
		categorySlug,
		allProducts,
		class : className = '',
	}: Props = $props();

	const related = $derived(
		allProducts
			.filter( ( p ) => p.id !== currentProductId && p.category.slug === categorySlug )
			.slice( 0, 4 ),
	);
</script>

{#if ( related.length > 0 )}
	<section class="flex flex-col gap-6 pt-12 border-t border-border { className }">
		<div class="flex items-center gap-2">
			<Sparkles class="w-4 h-4 text-rose-500" />
			<h3 class="font-display font-bold text-xl sm:text-2xl text-primary">
				También te podría gustar
			</h3>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{#each related as product ( product.id )}
				<ProductCard { product } />
			{/each}
		</div>
	</section>
{/if}

