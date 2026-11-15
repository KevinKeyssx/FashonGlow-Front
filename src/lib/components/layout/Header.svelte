<script lang="ts">
	import { Search, Menu, Sparkles, Heart } from '@lucide/svelte';

    import { mainNavLinks }     from '$lib/config/navigation';
	import { favoritesStore }   from '$lib/stores/favorites.svelte';
	import Logo                 from './Logo.svelte';
	import ThemeToggle          from './ThemeToggle.svelte';
	import CurrencySelector     from './CurrencySelector.svelte';
	import MobileMenu           from './MobileMenu.svelte';


    let isMobileMenuOpen = $state( false );
</script>

<header class="sticky top-0 z-40 w-full bg-base/80 backdrop-blur-md border-b border-border/80 transition-colors">
	<!-- Top announcement bar -->
	<div class="bg-linear-to-r from-rose-500 via-rose-600 to-gold-500 text-white text-[11px] font-medium py-1 px-4 text-center tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
		<Sparkles class="w-3 h-3 animate-pulse" />

        <span>Atención personalizada vía WhatsApp | Envíos coordinados a todo Chile | Fashion Glow Boutique</span>
	</div>

	<!-- Main navigation bar -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
		<!-- Left: Logo -->
		<div class="flex items-center gap-8">
			<Logo size="md" />

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-1">
				{#each mainNavLinks as link}
					<a
						href    = { link.href }
						class   = "px-4 py-2 rounded-full text-sm font-medium text-secondary hover:text-primary hover:bg-elevated transition-all duration-150"
					>
						{ link.label }
					</a>
				{/each}
			</nav>
		</div>

		<!-- Right: Actions & Tools -->
		<div class="flex items-center gap-2.5">
			<!-- Quick search bar button -->
			<a
				href    = "/catalogo"
				class   = "hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-subtle border border-border hover:border-rose-400 text-xs text-muted-text hover:text-primary transition-all duration-150"
				title   = "Buscar productos..."
			>
				<Search class="w-3.5 h-3.5 text-rose-500" />

                <span class="pr-2">Buscar catálogo...</span>

                <kbd class="text-[10px] px-1.5 py-0.5 rounded-md bg-elevated border border-border/80 font-mono">⌘K</kbd>
			</a>

			<CurrencySelector class="hidden sm:block" />

			<!-- Favorites button with live counter badge -->
			<a
				href        = "/favoritos"
				class       = "relative p-2 rounded-full border border-border hover:border-rose-400 text-secondary hover:text-rose-500 hover:bg-elevated transition-all duration-150 cursor-pointer flex items-center justify-center"
				title       = "Mis favoritos"
				aria-label  = "Ver favoritos"
			>
				<Heart class="w-4 h-4 { favoritesStore.count > 0 ? 'text-rose-500 fill-rose-500' : '' }" />

                {#if ( favoritesStore.count > 0 )}
					<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold font-mono flex items-center justify-center shadow-xs">
						{ favoritesStore.count }
					</span>
				{/if}
			</a>

			<ThemeToggle />

			<!-- <a
				href="/login"
				class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-rose-500/25 transition-all duration-150 active:scale-95"
			>
				<User class="w-3.5 h-3.5" />
				<span>Ingresar</span>
			</a> -->

			<!-- Mobile menu toggle -->
			<button
				type        = "button"
				onclick     = { () => ( isMobileMenuOpen = true ) }
				class       = "md:hidden p-2 rounded-full hover:bg-elevated text-secondary hover:text-primary transition-colors cursor-pointer"
				aria-label  = "Abrir menú"
			>
				<Menu class="w-5 h-5" />
			</button>
		</div>
	</div>
</header>

<MobileMenu
	isOpen={ isMobileMenuOpen }
	onClose={ () => ( isMobileMenuOpen = false ) }
/>
