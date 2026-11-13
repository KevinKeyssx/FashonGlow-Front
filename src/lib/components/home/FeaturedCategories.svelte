<script lang="ts">
	import { ArrowRight, Sparkles, Shirt, Footprints, Watch, Dumbbell } from '@lucide/svelte';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();

	const categories = [
		{
			title : 'Ropa',
			slug  : 'ropa',
			desc  : 'Poleras, vestidos, jeans y chaquetas',
			icon  : Shirt,
			count : '12 productos',
			image : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
		},
		{
			title : 'Calzado',
			slug  : 'calzado',
			desc  : 'Zapatillas urbanas, chalas y botas',
			icon  : Footprints,
			count : '8 productos',
			image : 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80',
		},
		{
			title : 'Accesorios',
			slug  : 'accesorios',
			desc  : 'Beanies, gorras, bolsos y cinturones',
			icon  : Watch,
			count : '5 productos',
			image : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80',
		},
		{
			title : 'Línea Deportiva',
			slug  : 'deportivo',
			desc  : 'Conjuntos sport y zapatillas trail',
			icon  : Dumbbell,
			count : '2 productos',
			image : 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80',
		},
	];
</script>

<section class="py-16 bg-subtle { className }">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
			<div class="flex flex-col gap-1 text-center sm:text-left">
				<div class="inline-flex items-center gap-1.5 self-center sm:self-start px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold">
					<Sparkles class="w-3.5 h-3.5" />
					<span>Explora el Catálogo</span>
				</div>
				<h2 class="font-display font-bold text-2xl sm:text-3xl text-primary">
					Categorías Principales
				</h2>
			</div>

			<a
				href="/catalogo"
				class="inline-flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
			>
				<span>Ver todo el catálogo</span>
				<ArrowRight class="w-3.5 h-3.5" />
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each categories as cat}
				{@const Icon = cat.icon}
				<a
					href="/catalogo?cat={ cat.slug }"
					class="group relative h-80 rounded-3xl overflow-hidden border border-border/80 hover:border-rose-400 bg-base transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 block"
				>
					<img
						src={ cat.image }
						alt={ cat.title }
						loading="lazy"
						class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
					/>

					<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

					<div class="absolute inset-0 p-5 flex flex-col justify-between text-white">
						<div class="self-end p-2.5 rounded-full bg-white/20 backdrop-blur-md">
							<Icon class="w-4 h-4 text-white" />
						</div>

						<div class="flex flex-col gap-1">
							<span class="text-[10px] tracking-wider uppercase font-semibold text-rose-300">
								{ cat.count }
							</span>
							<h3 class="font-display font-bold text-xl">
								{ cat.title }
							</h3>
							<p class="text-xs text-zinc-300 line-clamp-1">
								{ cat.desc }
							</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

