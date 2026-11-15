<script lang="ts">
	import { Heart }    from '@lucide/svelte';
	import toast        from 'svelte-5-french-toast';

    import { favoritesStore } from '$lib/stores/favorites.svelte';

	interface Props {
		productId    : string;
		productName? : string;
		size?        : 'sm' | 'md' | 'lg';
		class?       : string;
	}

	let {
		productId,
		productName = 'Producto',
		size = 'md',
		class : className = '',
	}: Props = $props();

	const isFavorited = $derived( favoritesStore.has( productId ) );

	const sizeClasses = {
		sm : 'p-2.5',
		md : 'p-3',
		lg : 'p-4',
	};

	const iconSizes = {
		sm : 'w-4 h-4',
		md : 'w-5 h-5',
		lg : 'w-5.5 h-5.5',
	};

	const toggle = ( e: MouseEvent ): void => {
		e.preventDefault();
		e.stopPropagation();

		const added = favoritesStore.toggle( productId );
		if ( added ) {
			toast.success( `Guardado en favoritos: ${ productName }` );
		} else {
			toast( `Eliminado de favoritos: ${ productName }` );
		}
	};
</script>

<button
	type="button"
	onclick={ toggle }
	aria-label={ isFavorited ? 'Eliminar de favoritos' : 'Agregar a favoritos' }
	title={ isFavorited ? 'Eliminar de favoritos' : 'Agregar a favoritos' }
	class="rounded-full border border-border/70 hover:border-rose-400 bg-base/85 backdrop-blur-md text-secondary hover:text-rose-500 hover:bg-base transition-all duration-200 cursor-pointer shadow-xs active:scale-90 flex items-center justify-center { sizeClasses[ size ] } { isFavorited ? 'border-rose-400/80 bg-rose-50/50 dark:bg-rose-950/20' : '' } { className }"
>
	<Heart
		class="{ iconSizes[ size ] } transition-all duration-200 { isFavorited ? 'text-rose-500 fill-rose-500 scale-110' : 'hover:scale-105' }"
	/>
</button>
