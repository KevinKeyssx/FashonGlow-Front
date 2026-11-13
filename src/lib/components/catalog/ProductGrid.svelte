<script lang="ts">
	import { Sparkles, Frown, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import type { ProductWithRelations } from '$lib/types';
	import ProductCard from './ProductCard.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';

	interface Props {
		products     : ProductWithRelations[];
		isLoading?   : boolean;
		page?        : number;
		totalPages?  : number;
		onPageChange?: ( page: number ) => void;
		onReset?     : () => void;
		class?       : string;
	}

	let {
		products,
		isLoading    = false,
		page         = 1,
		totalPages   = 1,
		onPageChange,
		onReset,
		class        : className = '',
	}: Props = $props();
</script>

<div class="flex flex-col gap-8 w-full { className }">
	{#if ( isLoading )}
		<!-- Loading Skeletons -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each Array( 8 ) as _}
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
	{:else if ( products.length === 0 )}
		<!-- Empty State -->
		<div class="py-16 px-4 rounded-3xl bg-subtle border border-border/80 flex flex-col items-center justify-center text-center gap-4">
			<div class="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
				<Frown class="w-8 h-8 stroke-[1.5]" />
			</div>

			<div class="flex flex-col gap-1 max-w-sm">
				<h3 class="font-display font-bold text-lg text-primary">
					No encontramos coincidencias
				</h3>
				<p class="text-xs text-secondary">
					Intenta ajustar tus filtros de búsqueda, cambiar el término ingresado o restablecer los parámetros.
				</p>
			</div>

			{#if ( onReset )}
				<button
					type="button"
					onclick={ onReset }
					class="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-500/25 transition-all cursor-pointer"
				>
					<Sparkles class="w-3.5 h-3.5" />
					<span>Restablecer todos los filtros</span>
				</button>
			{/if}
		</div>
	{:else}
		<!-- Products Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each products as product ( product.id )}
				<ProductCard { product } />
			{/each}
		</div>

		<!-- Pagination -->
		{#if ( totalPages > 1 )}
			<div class="flex items-center justify-center gap-2 pt-6 border-t border-border">
				<button
					type="button"
					disabled={ page <= 1 }
					onclick={ () => onPageChange?.( page - 1 ) }
					class="p-2.5 rounded-full border border-border hover:border-rose-400 text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
					aria-label="Página anterior"
				>
					<ChevronLeft class="w-4 h-4" />
				</button>

				<div class="flex items-center gap-1">
					{#each Array.from( { length: totalPages }, ( _, i ) => i + 1 ) as p}
						<button
							type="button"
							onclick={ () => onPageChange?.( p ) }
							class="w-8 h-8 rounded-full text-xs font-semibold font-mono transition-all cursor-pointer { page === p ? 'bg-rose-500 text-white shadow-sm glow-rose' : 'text-secondary hover:bg-elevated' }"
						>
							{ p }
						</button>
					{/each}
				</div>

				<button
					type="button"
					disabled={ page >= totalPages }
					onclick={ () => onPageChange?.( page + 1 ) }
					class="p-2.5 rounded-full border border-border hover:border-rose-400 text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
					aria-label="Página siguiente"
				>
					<ChevronRight class="w-4 h-4" />
				</button>
			</div>
		{/if}
	{/if}
</div>

