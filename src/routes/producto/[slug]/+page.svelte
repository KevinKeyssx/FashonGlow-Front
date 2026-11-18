<script lang="ts">
	import { page } from '$app/state';

    import { Sparkles, Truck, ChevronRight } from '@lucide/svelte';
	import {
        createProductQuery,
        createCatalogQuery
    }                               from '$lib/queries/catalog.queries';
	import { DEFAULT_FILTERS }      from '$lib/types';
	import { groupByColorFamily }   from '$lib/utils/colors';
	import ProductGallery           from '$lib/components/product/ProductGallery.svelte';
	import ProductPrice             from '$lib/components/product/ProductPrice.svelte';
	import ProductColorPicker       from '$lib/components/product/ProductColorPicker.svelte';
	import ProductSizePicker        from '$lib/components/product/ProductSizePicker.svelte';
	import ProductAttributes        from '$lib/components/product/ProductAttributes.svelte';
	import RelatedProducts          from '$lib/components/product/RelatedProducts.svelte';
	import Skeleton                 from '$lib/components/ui/Skeleton.svelte';
	import FavoriteButton           from '$lib/components/ui/FavoriteButton.svelte';
	import TelegramButton           from '$lib/components/ui/TelegramButton.svelte';
	// import WhatsAppButton        from '$lib/components/ui/WhatsAppButton.svelte';


    const slug          = $derived( page.params.slug! );
    const productQuery  = createProductQuery( () => slug );
	const product       = $derived( productQuery.data );
	const catalogQuery  = createCatalogQuery( () => DEFAULT_FILTERS );


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
	});

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

	const selectedColorGroup = $derived(
		colorGroups.find( ( g ) => g.colorFamily === ( selectedColorFamily ?? colorGroups[ 0 ]?.colorFamily ) ),
	);
	const selectedColorName = $derived( selectedColorGroup?.colorName ?? selectedColorFamily );

	// Effective price of active variant or base price
	const effectivePrice = $derived(
		selectedVariant?.price ?? product?.discountPrice ?? product?.basePrice ?? 0,
	);

	const originalPrice = $derived(
		selectedVariant?.price ?? product?.basePrice ?? 0,
	);
</script>

<svelte:head>
	{#if ( product )}
		<title>{ product.name } | Fashion Glow</title>
		<meta name="description" content={ product.description } />
	{:else}
		<title>Cargando producto | Fashion Glow</title>
	{/if}
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
	<!-- Breadcrumbs -->
	<nav class="flex items-center gap-2 text-xs text-muted-text">
		<a href="/" class="hover:text-primary transition-colors">Inicio</a>

        <ChevronRight class="w-3.5 h-3.5" />

        <a href="/catalogo" class="hover:text-primary transition-colors">Catálogo</a>

        <ChevronRight class="w-3.5 h-3.5" />

        {#if ( product )}
			<a
				href="/catalogo?categoria={ product.category.slug }"
				class="hover:text-primary transition-colors capitalize"
			>
				{ product.category.name }
			</a>

            <ChevronRight class="w-3.5 h-3.5" />

            <span class="text-primary font-medium truncate max-w-xs">{ product.name }</span>
		{:else}
			<Skeleton class="h-3 w-24 rounded-sm" />
		{/if}
	</nav>

	<!-- Main Product Section -->
	{#if ( productQuery.isPending )}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
			<Skeleton class="aspect-3/4 w-full rounded-3xl" />
			<div class="space-y-6">
				<Skeleton class="h-6 w-32 rounded-full" />
				<Skeleton class="h-10 w-3/4 rounded-xl" />
				<Skeleton class="h-8 w-40 rounded-xl" />
				<Skeleton class="h-24 w-full rounded-2xl" />
				<Skeleton class="h-14 w-full rounded-full" />
			</div>
		</div>
	{:else if ( productQuery.isError || !product )}
		<div class="py-20 text-center space-y-4">
			<h2 class="text-2xl font-bold font-display text-primary">Producto no encontrado</h2>
			<p class="text-muted-text text-sm max-w-md mx-auto">
				El producto que buscas ya no está disponible o el enlace no es válido.
			</p>
			<a
				href="/catalogo"
				class="inline-block px-6 py-3 rounded-full bg-rose-500 text-white font-medium text-xs shadow-md glow-rose"
			>
				Volver al catálogo
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
			<!-- Left: Gallery -->
			<div class="w-full">
				<ProductGallery
					images={ product.images }
					colorFamily={ selectedColorFamily }
					productName={ product.name }
				/>
			</div>

			<!-- Right: Product Info & Actions -->
			<div class="space-y-6">
				<!-- Brand & Tags -->
				<div class="space-y-2">
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

				<!-- Actions: WhatsApp Order & Favorite (Agregar a la bolsa comentado) -->
				<div class="flex items-center gap-3 pt-2">
					<!--
					<button
						type="button"
						onclick={ handleAddToCart }
						class="flex-1 py-4 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-500/30 glow-rose transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
					>
						<ShoppingBag class="w-4 h-4" />
						<span>Agregar a la Bolsa</span>
					</button>
					-->

					<div class="flex-1">
						<!-- WhatsAppButton guardado para uso futuro
						<WhatsAppButton
							{ product }
							selectedColor={ selectedColorName }
							{ selectedSize }
							variant="full"
							size="lg"
							label="Encargar por WhatsApp"
						/>
						-->
						<TelegramButton
							{ product }
							selectedColor={ selectedColorName }
							{ selectedSize }
							variant="full"
							size="lg"
							label="Encargar por Telegram"
						/>
					</div>

					<FavoriteButton
						productId={ product.id }
						productName={ product.name }
						size="lg"
					/>
				</div>

				<!-- Guarantees Pills (Atención boutique & entregas coordinadas) -->
				<div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-subtle border border-border text-center text-[11px] text-secondary">
					<div class="flex flex-col items-center gap-1">
						<svg
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-4 h-4 text-sky-500"
							aria-hidden="true"
						>
							<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
						</svg>
						<span>Atención Telegram</span>
					</div>
					<div class="flex flex-col items-center gap-1">
						<Truck class="w-4 h-4 text-rose-500" />
						<span>Envíos a todo Chile</span>
					</div>
					<div class="flex flex-col items-center gap-1">
						<Sparkles class="w-4 h-4 text-gold-500" />
						<span>Prendas Exclusivas</span>
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
