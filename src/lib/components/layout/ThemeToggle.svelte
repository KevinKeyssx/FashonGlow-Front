<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { themeStore } from '$lib/stores/theme.svelte';

	interface Props {
		class? : string;
	}

	let {
		class : className = '',
	}: Props = $props();
</script>

<button
	type="button"
	onclick={ () => themeStore.toggle() }
	aria-label="Cambiar tema de color"
	class="relative p-2.5 rounded-full bg-subtle border border-border hover:border-rose-400 text-secondary hover:text-rose-500 transition-all duration-200 cursor-pointer hover:shadow-sm active:scale-95 { className }"
>
	{#if ( themeStore.isDark )}
		<Sun class="w-4 h-4 text-gold-400 animate-in spin-in-90 duration-200" />
	{:else}
		<Moon class="w-4 h-4 text-rose-500 animate-in spin-in-90 duration-200" />
	{/if}
</button>

