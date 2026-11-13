<script lang="ts">
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import GenderAccess from '$lib/components/home/GenderAccess.svelte';
	import FeaturedCategories from '$lib/components/home/FeaturedCategories.svelte';
	import FeaturedProducts from '$lib/components/home/FeaturedProducts.svelte';
	import OffersSection from '$lib/components/home/OffersSection.svelte';
</script>

<svelte:head>
	<title>Fashion Glow — Tienda Online de Moda, Calzado & Accesorios</title>
	<meta
		name="description"
		content="Descubre las últimas tendencias en moda masculina, femenina y unisex. Ropa, zapatillas, sandalias y accesorios exclusivos en Fashion Glow."
	/>
</svelte:head>

<div class="flex flex-col w-full">
	<HeroSection />
	<GenderAccess />
	<FeaturedCategories />
	<FeaturedProducts />
	<OffersSection />
</div>
