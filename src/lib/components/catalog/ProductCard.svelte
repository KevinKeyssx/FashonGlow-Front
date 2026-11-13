<script lang="ts">
	import { Heart, Sparkles } from '@lucide/svelte';
	import toast from 'svelte-5-french-toast';
	import type { ProductWithRelations, ProductVariant } from '$lib/types';
	import { currencyStore } from '$lib/stores/currency.svelte';
	import { convertAmount, formatMoney } from '$lib/utils/currency';
	import { getEffectivePrice, calcDiscountPercent, hasDiscount } from '$lib/utils/price';
	import { groupByColorFamily, getImagesByColor } from '$lib/utils/colors';

	interface Props {
		product : ProductWithRelations;
		class?  : string;
	}

	interface DragScrollAction {
		destroy : () => void;
	}

	let {
		product,
		class : className = '',
	}: Props = $props();

	// Color groups derived from variants
	const colorGroups = $derived( groupByColorFamily( product.variants ) );

	// Selected or hovered color family
	let activeColorFamily = $state<string | null>( null );

	// Initialize active color to first available
	$effect( () => {
		if ( !activeColorFamily && colorGroups.length > 0 ) {
			activeColorFamily = colorGroups[ 0 ].colorFamily;
		}
	} );

	// Get images for active color
	const currentImages = $derived( getImagesByColor( product.images, activeColorFamily ) );
	const primaryImage  = $derived( currentImages[ 0 ]?.url ?? product.images[ 0 ]?.url );

	// Available sizes for the active color
	const activeVariants = $derived(
		product.variants.filter( ( v: ProductVariant ): boolean =>
			activeColorFamily ? v.colorFamily === activeColorFamily : true,
		),
	);

	// Prices converted to active currency
	const effectiveClpPrice = $derived( getEffectivePrice( product ) );
	const baseClpPrice      = $derived( product.basePrice );

	const displayPrice = $derived(
		formatMoney(
			convertAmount( effectiveClpPrice, 'CLP', currencyStore.active ),
			currencyStore.active,
		),
	);

	const displayBasePrice = $derived(
		hasDiscount( product )
			? formatMoney(
				convertAmount( baseClpPrice, 'CLP', currencyStore.active ),
				currencyStore.active,
			)
			: null,
	);

	const discountPercent = $derived(
		hasDiscount( product )
			? calcDiscountPercent( product.basePrice, product.discountPrice! )
			: 0,
	);

	// Wishlist toast
	let isFavorited = $state( false );

	const toggleFavorite = ( e: MouseEvent ): void => {
		e.preventDefault();
		e.stopPropagation();
		isFavorited = !isFavorited;
		if ( isFavorited ) {
			toast.success( `Guardado en favoritos: ${ product.name }` );
		} else {
			toast( `Eliminado de favoritos: ${ product.name }` );
		}
	};

	// Drag-to-scroll action for size chips & scrollable containers
	const dragScroll = ( node: HTMLElement ): DragScrollAction => {
		let isDown = false;
		let startX = 0;
		let startScrollLeft = 0;
		let hasMoved = false;

		const onMouseDown = ( e: MouseEvent ): void => {
			if ( e.button !== 0 ) {
				return;
			}
			isDown = true;
			hasMoved = false;
			startX = e.pageX;
			startScrollLeft = node.scrollLeft;
			node.classList.add( 'cursor-grabbing' );
			node.classList.remove( 'cursor-grab' );
			e.preventDefault();
			e.stopPropagation();
		};

		const onMouseMove = ( e: MouseEvent ): void => {
			if ( !isDown ) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			const x = e.pageX;
			const walk = ( ( x - startX ) * 1.5 );
			if ( Math.abs( walk ) > 4 ) {
				hasMoved = true;
			}
			node.scrollLeft = ( startScrollLeft - walk );
		};

		const onMouseUp = ( e: MouseEvent ): void => {
			if ( !isDown ) {
				return;
			}
			isDown = false;
			node.classList.remove( 'cursor-grabbing' );
			node.classList.add( 'cursor-grab' );
			if ( hasMoved ) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		const onWheel = ( e: WheelEvent ): void => {
			if ( e.deltaY !== 0 ) {
				e.preventDefault();
				e.stopPropagation();
				node.scrollLeft += e.deltaY;
			}
		};

		const onClick = ( e: MouseEvent ): void => {
			e.preventDefault();
			e.stopPropagation();
		};

		const onDragStart = ( e: DragEvent ): void => {
			e.preventDefault();
		};

		node.addEventListener( 'mousedown', onMouseDown );
		window.addEventListener( 'mousemove', onMouseMove );
		window.addEventListener( 'mouseup', onMouseUp );
		node.addEventListener( 'wheel', onWheel, ({ passive: false }) );
		node.addEventListener( 'click', onClick, true );
		node.addEventListener( 'dragstart', onDragStart );

		return {
			destroy : (): void => {
				node.removeEventListener( 'mousedown', onMouseDown );
				window.removeEventListener( 'mousemove', onMouseMove );
				window.removeEventListener( 'mouseup', onMouseUp );
				node.removeEventListener( 'wheel', onWheel );
				node.removeEventListener( 'click', onClick, true );
				node.removeEventListener( 'dragstart', onDragStart );
			}
		};
	};
</script>

<article
	class="group relative flex flex-col bg-subtle border border-border/80 hover:border-rose-400/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 { className }"
>
	<!-- Card Image Section -->
	<a
		href="/producto/{ product.slug }"
		class="relative aspect-3/4 w-full overflow-hidden bg-elevated block"
	>
		{#if ( primaryImage )}
			<img
				src={ primaryImage }
				alt={ product.name }
				loading="lazy"
				class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
			/>
		{:else}
			<div class="w-full h-full flex items-center justify-center text-muted-text text-xs">
				Sin imagen
			</div>
		{/if}

		<!-- Floating Badges Top Left -->
		<div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
			{#if ( hasDiscount( product ) )}
				<span
					class="px-2.5 py-1 text-[11px] font-bold tracking-tight rounded-full bg-gold-500 text-white shadow-md shadow-gold-500/30 glow-gold"
				>
					-{ discountPercent }% OFF
				</span>
			{/if}

			{#if ( product.isFeatured )}
				<span
					class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-rose-500 text-white shadow-md shadow-rose-500/30 glow-rose flex items-center gap-1"
				>
					<Sparkles class="w-2.5 h-2.5" />
					Glow
				</span>
			{/if}
		</div>

		<!-- Favorite Button Top Right -->
		<button
			type="button"
			onclick={ toggleFavorite }
			aria-label="Agregar a favoritos"
			class="absolute top-3 right-3 p-2.5 rounded-full bg-base/80 backdrop-blur-md border border-border/60 text-secondary hover:text-rose-500 hover:bg-base transition-all duration-200 cursor-pointer shadow-sm z-10 active:scale-90"
		>
			<Heart
				class="w-4 h-4 transition-colors { isFavorited ? 'text-rose-500 fill-rose-500' : '' }"
			/>
		</button>

		<!-- Size chips overlay on bottom hover (no border, no container background, hidden scrollbar, mouse drag-to-scroll) -->
		{#if ( activeVariants.length > 0 )}
			<div
				use:dragScroll
				class="absolute bottom-3 inset-x-2 z-10 overflow-x-auto no-scrollbar opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:flex cursor-grab select-none py-1"
			>
				<div
					class="flex items-center gap-1.5 px-2 { activeVariants.length > 5 ? 'justify-start' : 'justify-center' } min-w-full w-max"
				>
					{#each activeVariants as v ( v.id )}
						<span
							class="w-7 h-7 min-w-7 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 select-none shadow-md backdrop-blur-sm transition-transform duration-150 { v.stock > 0 ? 'bg-black/85 text-white hover:scale-110 hover:bg-black' : 'bg-black/35 text-white/30 line-through cursor-not-allowed' }"
							title={ v.stock > 0 ? `${ v.stock } unidades disponibles` : 'Agotada' }
						>
							{ v.size }
						</span>
					{/each}
				</div>
			</div>
		{/if}
	</a>

	<!-- Card Body -->
	<div class="p-5 flex flex-col flex-1 justify-between gap-3">
		<div class="flex flex-col gap-1.5">
			<div class="flex items-center justify-between text-xs text-muted-text">
				<span class="font-semibold uppercase tracking-wider text-[10px] text-rose-500">
					{ product.brand.name }
				</span>
				<span class="text-[11px] capitalize">
					{ product.subcategory.name }
				</span>
			</div>

			<a
				href="/producto/{ product.slug }"
				class="font-display font-medium text-sm text-primary group-hover:text-rose-500 transition-colors line-clamp-1"
				title={ product.name }
			>
				{ product.name }
			</a>
		</div>

		<!-- Color Swatches & Price Footer -->
		<div class="flex items-center justify-between pt-2 border-t border-border/50 gap-2">
			<!-- Color circles (with sufficient padding and no-scrollbar so rings are never clipped) -->
			<div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1.5">
				{#each colorGroups as group ( group.colorFamily )}
					<button
						type="button"
						onclick={ () => ( activeColorFamily = group.colorFamily ) }
						onmouseenter={ () => ( activeColorFamily = group.colorFamily ) }
						aria-label={ group.colorName }
						title={ group.colorName }
						class="w-4 h-4 rounded-full border shrink-0 transition-all duration-150 cursor-pointer { activeColorFamily === group.colorFamily ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-subtle scale-110' : 'border-border/80 hover:scale-110' }"
						style="background-color: { group.colorHex };"
					></button>
				{/each}
			</div>

			<!-- Price -->
			<div class="flex items-baseline gap-1.5 text-right shrink-0">
				{#if ( displayBasePrice )}
					<span class="text-xs text-muted-text line-through">
						{ displayBasePrice }
					</span>
				{/if}
				<span class="text-sm font-bold text-primary font-mono { hasDiscount( product ) ? 'text-rose-500' : '' }">
					{ displayPrice }
				</span>
			</div>
		</div>
	</div>
</article>
