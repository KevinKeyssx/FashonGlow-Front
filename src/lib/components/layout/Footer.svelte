<script lang="ts">
	import { Heart, Sparkles, Send, ShieldCheck, Truck, RefreshCw, CreditCard } from '@lucide/svelte';
	import Logo from './Logo.svelte';
	import { footerLinks } from '$lib/config/navigation';

	let email = $state( '' );
	let subscribed = $state( false );

	const handleSubscribe = ( e: Event ): void => {
		e.preventDefault();
		if ( email.trim() ) {
			subscribed = true;
			email = '';
		}
	};
</script>

<!-- Value proposition banners -->
<section class="border-t border-border bg-subtle py-8">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			<div class="flex items-center gap-3.5">
				<div class="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
					<Truck class="w-5 h-5" />
				</div>
				<div>
					<h4 class="text-xs font-semibold text-primary">Envíos a todo Chile</h4>
					<p class="text-[11px] text-muted-text">Gratis en compras sobre $49.990</p>
				</div>
			</div>

			<div class="flex items-center gap-3.5">
				<div class="w-10 h-10 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0">
					<ShieldCheck class="w-5 h-5" />
				</div>
				<div>
					<h4 class="text-xs font-semibold text-primary">Compra 100% Segura</h4>
					<p class="text-[11px] text-muted-text">Garantía en todos tus pedidos</p>
				</div>
			</div>

			<div class="flex items-center gap-3.5">
				<div class="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
					<RefreshCw class="w-5 h-5" />
				</div>
				<div>
					<h4 class="text-xs font-semibold text-primary">Cambios Fáciles</h4>
					<p class="text-[11px] text-muted-text">30 días de plazo continuo</p>
				</div>
			</div>

			<div class="flex items-center gap-3.5">
				<div class="w-10 h-10 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0">
					<CreditCard class="w-5 h-5" />
				</div>
				<div>
					<h4 class="text-xs font-semibold text-primary">Multi-Moneda</h4>
					<p class="text-[11px] text-muted-text">Paga en tu divisa preferida</p>
				</div>
			</div>
		</div>
	</div>
</section>

<footer class="border-t border-border bg-base text-secondary">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
			<!-- Col 1: Brand & Bio -->
			<div class="lg:col-span-2 flex flex-col gap-4">
				<Logo size="md" />
				<p class="text-xs text-secondary leading-relaxed max-w-sm">
					Fashion Glow es la tienda de moda contemporánea diseñada para destacar tu brillo personal. Ropa, calzado y accesorios seleccionados con elegancia, versatilidad y máxima calidad.
				</p>
				<div class="flex items-center gap-2 text-xs text-muted-text">
					<Sparkles class="w-4 h-4 text-gold-500" />
					<span>Santiago de Chile • Envíos nacionales e internacionales</span>
				</div>
			</div>

			<!-- Col 2: Colecciones -->
			<div class="flex flex-col gap-3">
				<h4 class="text-xs font-bold uppercase tracking-wider text-primary">Colecciones</h4>
				<ul class="flex flex-col gap-2 text-xs">
					<li><a href="/catalogo?cat=ropa" class="hover:text-rose-500 transition-colors">Ropa</a></li>
					<li><a href="/catalogo?cat=calzado" class="hover:text-rose-500 transition-colors">Calzado</a></li>
					<li><a href="/catalogo?cat=accesorios" class="hover:text-rose-500 transition-colors">Accesorios</a></li>
					<li><a href="/catalogo?cat=deportivo" class="hover:text-rose-500 transition-colors">Línea Deportiva</a></li>
					<li><a href="/catalogo?oferta=1" class="text-rose-500 font-semibold hover:underline">Ofertas Glow</a></li>
				</ul>
			</div>

			<!-- Col 3: Enlaces -->
			<div class="flex flex-col gap-3">
				<h4 class="text-xs font-bold uppercase tracking-wider text-primary">Navegación</h4>
				<ul class="flex flex-col gap-2 text-xs">
					{#each footerLinks as link}
						<li><a href={ link.href } class="hover:text-rose-500 transition-colors">{ link.label }</a></li>
					{/each}
				</ul>
			</div>

			<!-- Col 4: Newsletter -->
			<div class="flex flex-col gap-3">
				<h4 class="text-xs font-bold uppercase tracking-wider text-primary">Club Glow</h4>
				<p class="text-xs text-secondary">
					Suscríbete para recibir lanzamientos exclusivos y un 15% de descuento en tu primera compra.
				</p>

				{#if ( subscribed )}
					<div class="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium animate-in fade-in">
						¡Bienvenido al Club Glow! Revisa tu correo con el cupón.
					</div>
				{:else}
					<form onsubmit={ handleSubscribe } class="flex items-center gap-1.5">
						<input
							type="email"
							bind:value={ email }
							placeholder="Tu correo electrónico..."
							required
							class="w-full px-3.5 py-2 text-xs bg-subtle border border-border rounded-full text-primary placeholder:text-muted-text focus:outline-none focus:border-rose-400"
						/>
						<button
							type="submit"
							class="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-sm shrink-0 transition-all cursor-pointer"
							aria-label="Suscribirse"
						>
							<Send class="w-3.5 h-3.5" />
						</button>
					</form>
				{/if}
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-text">
			<p>© { new Date().getFullYear() } Fashion Glow Boutique. Todos los derechos reservados.</p>
			<div class="flex items-center gap-1">
				<span>Diseñado con</span>
				<Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
				<span>para amantes de la moda</span>
			</div>
		</div>
	</div>
</footer>

