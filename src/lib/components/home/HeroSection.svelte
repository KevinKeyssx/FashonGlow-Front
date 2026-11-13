<script lang="ts">
	import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from '@lucide/svelte';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();
</script>

<section class="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-subtle via-base to-base { className }">
	<!-- Background glow blobs -->
	<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute top-1/3 right-10 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			<!-- Left Editorial Column -->
			<div class="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
				<!-- Pill Badge -->
				<div class="inline-flex items-center gap-2 self-center lg:self-start px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-semibold glow-rose">
					<Sparkles class="w-3.5 h-3.5 animate-spin duration-3000" />
					<span>Nueva Colección Otoño • Invierno 2026</span>
				</div>

				<!-- Main Headline -->
				<h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary leading-tight">
					Eleva tu estilo con la <span class="bg-gradient-to-r from-rose-500 via-rose-600 to-gold-500 bg-clip-text text-transparent italic">esencia glow</span> de la moda
				</h1>

				<!-- Subheading -->
				<p class="text-secondary text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
					Prendas de autor, calzado de tendencia y accesorios diseñados para destacar. Encuentra las últimas colecciones urbanas, elegantes y contemporáneas con despacho a todo Chile y pagos multi-moneda.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
					<a
						href="/catalogo"
						class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-500/30 glow-rose transition-all duration-200 active:scale-98"
					>
						<span>Explorar Catálogo</span>
						<ArrowRight class="w-4 h-4" />
					</a>

					<a
						href="/catalogo?oferta=1"
						class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-elevated hover:bg-rose-500/10 text-primary border border-border hover:border-rose-400 font-semibold text-sm transition-all duration-200 active:scale-98"
					>
						<span class="text-gold-500">✨</span>
						<span>Ver Ofertas Glow</span>
					</a>
				</div>

				<!-- Micro guarantees -->
				<div class="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 max-w-lg mx-auto lg:mx-0">
					<div class="flex flex-col items-center lg:items-start">
						<span class="font-display font-bold text-xl text-primary">+2.5K</span>
						<span class="text-[11px] text-muted-text">Clientes felices</span>
					</div>
					<div class="flex flex-col items-center lg:items-start">
						<span class="font-display font-bold text-xl text-rose-500">100%</span>
						<span class="text-[11px] text-muted-text">Calidad premium</span>
					</div>
					<div class="flex flex-col items-center lg:items-start">
						<span class="font-display font-bold text-xl text-gold-500">24/48h</span>
						<span class="text-[11px] text-muted-text">Despacho express</span>
					</div>
				</div>
			</div>

			<!-- Right Visual Editorial Grid -->
			<div class="lg:col-span-5 relative">
				<div class="relative mx-auto max-w-md lg:max-w-none">
					<!-- Hero Image Collage -->
					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-4">
							<div class="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-3/4">
								<img
									src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
									alt="Moda Fashion Glow"
									class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								/>
							</div>
							<div class="p-4 rounded-3xl bg-subtle border border-border/80 shadow-md">
								<div class="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
									<Truck class="w-3.5 h-3.5" />
									<span>Despacho Rápido</span>
								</div>
								<p class="text-[11px] text-secondary">
									Envíos coordinados a Santiago y regiones.
								</p>
							</div>
						</div>

						<div class="space-y-4 pt-8">
							<div class="p-4 rounded-3xl bg-gradient-to-tr from-rose-500 to-rose-600 text-white shadow-xl glow-rose">
								<span class="text-xs uppercase tracking-wider font-semibold opacity-90">Destacado</span>
								<h3 class="font-display font-bold text-lg mt-0.5 mb-1">Estilo Urbano</h3>
								<p class="text-[11px] opacity-90">Prendas con caída perfecta y confección cuidada.</p>
							</div>

							<div class="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-3/4">
								<img
									src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
									alt="Calzado Fashion Glow"
									class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

