<script lang="ts">
	import { X, User, Sparkles, ChevronRight } from '@lucide/svelte';
	import { mainNavLinks } from '$lib/config/navigation';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import CurrencySelector from './CurrencySelector.svelte';

	interface Props {
		isOpen   : boolean;
		onClose  : () => void;
	}

	let {
		isOpen   = false,
		onClose,
	}: Props = $props();
</script>

{#if ( isOpen )}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
		onclick={ onClose }
		aria-label="Cerrar menú"
	></button>

	<!-- Drawer -->
	<div class="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-base border-r border-border z-50 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between pb-4 border-b border-border">
				<Logo size="sm" />
				<button
					type="button"
					onclick={ onClose }
					class="p-2 rounded-full hover:bg-elevated text-secondary hover:text-primary transition-colors cursor-pointer"
					aria-label="Cerrar menú"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			<nav class="flex flex-col gap-1.5">
				{#each mainNavLinks as link}
					<a
						href={ link.href }
						onclick={ onClose }
						class="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-secondary hover:text-primary hover:bg-elevated transition-colors"
					>
						<span>{ link.label }</span>
						<ChevronRight class="w-4 h-4 text-muted-text" />
					</a>
				{/each}
			</nav>
		</div>

		<div class="flex flex-col gap-4 pt-6 border-t border-border">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-text font-medium">Preferencia</span>
				<div class="flex items-center gap-2">
					<CurrencySelector />
					<ThemeToggle />
				</div>
			</div>

			<a
				href="/login"
				onclick={ onClose }
				class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-md shadow-rose-500/25 transition-all active:scale-98"
			>
				<User class="w-4 h-4" />
				<span>Iniciar sesión</span>
			</a>

			<div class="flex items-center justify-center gap-1.5 text-[11px] text-muted-text text-center">
				<Sparkles class="w-3 h-3 text-gold-500" />
				<span>Moda, Calzado & Accesorios Exclusivos</span>
			</div>
		</div>
	</div>
{/if}

