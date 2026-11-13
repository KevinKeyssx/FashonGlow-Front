<script lang="ts">
	import { page } from '$app/state';
	import { Sparkles, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ChevronRight } from '@lucide/svelte';
	import toast from 'svelte-5-french-toast';
	import { createProductQuery, createCatalogQuery } from '$lib/queries/catalog.queries';
	import { DEFAULT_FILTERS } from '$lib/types';
	import { groupByColorFamily } from '$lib/utils/colors';
	import ProductGallery from '$lib/components/product/ProductGallery.svelte';
	import ProductPrice from '$lib/components/product/ProductPrice.svelte';
	import ProductColorPicker from '$lib/components/product/ProductColorPicker.svelte';
	import ProductSizePicker from '$lib/components/product/ProductSizePicker.svelte';
	import ProductAttributes from '$lib/components/product/ProductAttributes.svelte';
	import RelatedProducts from '$lib/components/product/RelatedProducts.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';

	const slug = $derived( page.params.slug! );
	const productQuery = createProductQuery( () => slug );
	const catalogQuery = createCatalogQuery( () => DEFAULT_FILTERS );

	const product = $derived( productQuery.data );

	// Color groups
	const colorGroups = $derived( product ? groupByColorFamily( product.variants ) : [] );

	// Active selected color family
	let selectedColorFamily = $state<string | null>( null );

	// Active selected size
	let selectedSize = $state<string | null>( null );

	// Auto-select first color when product loads
	$effect( () => {
		if ( colorGroups.length > 0 && !selectedColorFamily ) {
			selectedColorFamily = colorGroups[ 0 ].colorFamily;
		}
	} );

	// Active variants for currently selected color
	const activeVariants = $derived(
		product
			? product.variants.filter( ( v ) =>
				selectedColorFamily ? v.colorFamily === selectedColorFamily : true,
			)
			: [],
	);

	// Auto-select first available size
	$effect( () => {
		if ( activeVariants.length > 0 ) {
			const firstInStock = activeVariants.find( ( v ) => v.stock > 0 );
			selectedSize = firstInStock?.size ?? activeVariants[ 0 ].size;
		}
	} );

	// Active variant selected (size + color)
	const selectedVariant = $derived(
		activeVariants.find( ( v ) => v.size === selectedSize ),
	);

	// Effective price of active variant or base price
	const effectivePrice = $derived(
		selectedVariant?.price ?? product?.discountPrice ?? product?.basePrice ?? 0,
	);

	const originalPrice = $derived(
		selectedVariant?.price ?? product?.basePrice ?? 0,
	);

	// Wishlist
	let isFavorited = $state( false );

	const toggleFavorite = (): void => {
		isFavorited = !isFavorited;
		if ( product ) {
			if ( isFavorited ) {
				toast.success( `Guardado en tus favoritos: ${ product.name }` );
			} else {
				toast( `Eliminado de favoritos: ${ product.name }` );
			}
		}
	};

	// Add to cart placeholder
	const handleAddToCart = (): void => {
		if ( !selectedSize ) {
			toast.error( 'Por favor selecciona una talla' );
			return;
		}
		if ( selectedVariant && selectedVariant.stock === 0 ) {
			toast.error( 'Esta talla se encuentra agotada' );
			return;
		}
		toast.success(
			`¡Agregado al carrito! ${ product?.name } (Talla ${ selectedSize })`,
			{ icon: '🛍️' },
		);
	};
</script>

<svelte:head>
	{#if ( product )}
		<title>{ product.name } — Fashion Glow</title>
		<meta name="description" content={ product.description } />
	{:else}
		<title>Cargando producto — Fashion Glow</title>
	{/if}
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
	{#if ( productQuery.isPending )}
		<!-- Loading state -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
			<div class="lg:col-span-7">
				<Skeleton rounded="3xl" class="aspect-3/4 w-full" />
			</div>
			<div class="lg:col-span-5 flex flex-col gap-4">
				<Skeleton rounded="full" class="h-4 w-1/4" />
				<Skeleton rounded="full" class="h-8 w-3/4" />
				<Skeleton rounded="full" class="h-6 w-1/3" />
				<Skeleton rounded="2xl" class="h-24 w-full" />
				<Skeleton rounded="full" class="h-12 w-full" />
			</div>
		</div>
	{:else if ( !product )}
		<!-- Not found -->
		<div class="py-20 text-center flex flex-col items-center gap-4">
			<h2 class="font-display font-bold text-2xl text-primary">
				Producto no encontrado
			</h2>
			<p class="text-xs text-secondary max-w-sm">
				El producto que buscas ya no está disponible o la dirección es incorrecta.
			</p>
			<a
				href="/catalogo"
				class="px-6 py-2.5 rounded-full bg-rose-500 text-white text-xs font-semibold"
			>
				Volver al catálogo
			</a>
		</div>
	{:else}
		<!-- Breadcrumbs -->
		<nav class="flex items-center gap-1.5 text-xs text-muted-text">
			<a href="/" class="hover:text-primary transition-colors">Inicio</a>
			<ChevronRight class="w-3.5 h-3.5" />
			<a href="/catalogo" class="hover:text-primary transition-colors">Catálogo</a>
			<ChevronRight class="w-3.5 h-3.5" />
			<a href="/catalogo?cat={ product.category.slug }" class="hover:text-primary transition-colors">
				{ product.category.name }
			</a>
			<ChevronRight class="w-3.5 h-3.5" />
			<span class="text-primary font-medium truncate max-w-xs">{ product.name }</span>
		</nav>

		<!-- Main Product Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
			<!-- Gallery Section -->
			<div class="lg:col-span-7">
				<ProductGallery
					images={ product.images }
					colorFamily={ selectedColorFamily }
					productName={ product.name }
				/>
			</div>

			<!-- Product Details & Buy Box -->
			<div class="lg:col-span-5 flex flex-col gap-6">
				<!-- Brand & Title -->
				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold uppercase tracking-wider text-rose-500">
							{ product.brand.name }
						</span>

						<div class="flex items-center gap-1.5">
							<span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-elevated text-secondary uppercase">
								{ product.gender }
							</span>
							{#if ( product.isFeatured )}
								<span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500 text-white glow-rose flex items-center gap-1">
									<Sparkles class="w-2.5 h-2.5" />
									Glow
								</span>
							{/if}
						</div>
					</div>

					<h1 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight">
						{ product.name }
					</h1>
				</div>

				<!-- Price -->
				<div class="py-2 border-y border-border">
					<ProductPrice
						{ effectivePrice }
						{ originalPrice }
						size="xl"
					/>
				</div>

				<!-- Description -->
				<p class="text-xs sm:text-sm text-secondary leading-relaxed">
					{ product.description }
				</p>

				<!-- Color Picker -->
				{#if ( colorGroups.length > 0 )}
					<ProductColorPicker
						{ colorGroups }
						selected={ selectedColorFamily ?? colorGroups[ 0 ].colorFamily }
						onSelect={ ( fam ) => ( selectedColorFamily = fam ) }
					/>
				{/if}

				<!-- Size Picker -->
				{#if ( activeVariants.length > 0 )}
					<ProductSizePicker
						variants={ activeVariants }
						selected={ selectedSize }
						onSelect={ ( s ) => ( selectedSize = s ) }
					/>
				{/if}

				<!-- Add to Cart & Wishlist Actions -->
				<div class="flex items-center gap-3 pt-2">
					<button
						type="button"
						onclick={ handleAddToCart }
						class="flex-1 py-4 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-500/30 glow-rose transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
					>
						<ShoppingBag class="w-4 h-4" />
						<span>Agregar a la Bolsa</span>
					</button>

					<button
						type="button"
						onclick={ toggleFavorite }
						aria-label="Agregar a favoritos"
						class="p-4 rounded-full border border-border hover:border-rose-400 bg-subtle text-secondary hover:text-rose-500 transition-all cursor-pointer shadow-xs active:scale-90"
					>
						<Heart class="w-5 h-5 { isFavorited ? 'text-rose-500 fill-rose-500' : '' }" />
					</button>
				</div>

				<!-- Guarantees Pills -->
				<div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-subtle border border-border text-center text-[11px] text-secondary">
					<div class="flex flex-col items-center gap-1">
						<Truck class="w-4 h-4 text-rose-500" />
						<span>Despacho 24/48h</span>
					</div>
					<div class="flex flex-col items-center gap-1">
						<RefreshCw class="w-4 h-4 text-gold-500" />
						<span>Cambios 30 días</span>
					</div>
					<div class="flex flex-col items-center gap-1">
						<ShieldCheck class="w-4 h-4 text-emerald-500" />
						<span>Garantía Oficial</span>
					</div>
				</div>

				<!-- Ficha Técnica -->
				<ProductAttributes { product } />
			</div>
		</div>

		<!-- Related Products -->
		{#if ( catalogQuery.data )}
			<RelatedProducts
				currentProductId={ product.id }
				categorySlug={ product.category.slug }
				allProducts={ catalogQuery.data.products }
			/>
		{/if}
	{/if}
</div>

