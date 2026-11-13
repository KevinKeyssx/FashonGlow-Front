<script lang="ts">
	import { Search, X } from '@lucide/svelte';
	import { DEBOUNCE_MS } from '$lib/config/constants';

	interface Props {
		value?       : string;
		placeholder? : string;
		onSearch?    : ( query: string ) => void;
		class?       : string;
	}

	let {
		value       = $bindable( '' ),
		placeholder = 'Buscar por prenda, zapatilla, chala, marca...',
		onSearch,
		class       : className = '',
	}: Props = $props();

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const handleInput = ( event: Event ): void => {
		const target = event.target as HTMLInputElement;
		value = target.value;

		if ( debounceTimer ) clearTimeout( debounceTimer );
		debounceTimer = setTimeout( () => {
			onSearch?.( value );
		}, DEBOUNCE_MS );
	};

	const clear = (): void => {
		value = '';
		if ( debounceTimer ) clearTimeout( debounceTimer );
		onSearch?.( '' );
	};

	const handleSubmit = ( event: SubmitEvent ): void => {
		event.preventDefault();
		if ( debounceTimer ) clearTimeout( debounceTimer );
		onSearch?.( value );
	};
</script>

<form
	onsubmit={ handleSubmit }
	class="relative flex items-center w-full { className }"
>
	<div class="absolute left-4 flex items-center pointer-events-none text-rose-500">
		<Search class="w-4 h-4" />
	</div>

	<input
		type="text"
		{ value }
		oninput={ handleInput }
		{ placeholder }
		class="w-full bg-subtle text-primary border border-border rounded-full py-3.5 pl-11 pr-11 text-sm transition-all duration-200 placeholder:text-muted-text focus:outline-none focus:border-rose-400 focus:ring-3 focus:ring-rose-400/20 shadow-xs"
	/>

	{#if ( value.trim().length > 0 )}
		<button
			type="button"
			onclick={ clear }
			aria-label="Limpiar búsqueda"
			class="absolute right-3.5 p-1 rounded-full text-muted-text hover:text-primary hover:bg-elevated transition-colors cursor-pointer"
		>
			<X class="w-4 h-4" />
		</button>
	{/if}
</form>

