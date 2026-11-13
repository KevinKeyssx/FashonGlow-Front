<script lang="ts">
	import { ArrowRight, Sparkles } from '@lucide/svelte';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();

	const collections = [
		{
			title    : 'Colección Mujer',
			subtitle : 'Vestidos, poleras, jeans & plataformas',
			href     : '/catalogo?gen=MUJER',
			image    : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80',
			accent   : 'rose',
		},
		{
			title    : 'Colección Hombre',
			subtitle : 'Pantalones cargo, denim & zapatillas skate',
			href     : '/catalogo?gen=HOMBRE',
			image    : 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
			accent   : 'gold',
		},
		{
			title    : 'Línea Unisex & Accesorios',
			subtitle : 'Poleras oversize, beanies, bolsos y calzado',
			href     : '/catalogo?gen=UNISEX',
			image    : 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80',
			accent   : 'rose',
		},
	];
</script>

<section class="py-16 bg-base { className }">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center text-center gap-2 mb-10">
			<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-xs font-semibold">
				<Sparkles class="w-3.5 h-3.5" />
				<span>Acceso por Género</span>
			</div>
			<h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">
				Explora por Tu Preferencia
			</h2>
			<p class="text-xs sm:text-sm text-secondary max-w-md">
				Diseños contemporáneos pensados para cada momento de tu vida.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each collections as item}
				<a
					href={ item.href }
					class="group relative h-96 rounded-3xl overflow-hidden border border-border/80 hover:border-rose-400 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 block"
				>
					<img
						src={ item.image }
						alt={ item.title }
						loading="lazy"
						class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
					/>

					<!-- Gradient Overlay -->
					<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

					<!-- Content -->
					<div class="absolute inset-0 p-6 flex flex-col justify-end text-white gap-2">
						<span class="text-[11px] font-semibold tracking-wider uppercase text-rose-300">
							Explorar línea
						</span>
						<h3 class="font-display font-bold text-xl sm:text-2xl leading-snug">
							{ item.title }
						</h3>
						<p class="text-xs text-zinc-300 line-clamp-1">
							{ item.subtitle }
						</p>

						<div class="pt-2">
							<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold group-hover:bg-rose-500 transition-colors duration-200">
								<span>Ver catálogo</span>
								<ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

