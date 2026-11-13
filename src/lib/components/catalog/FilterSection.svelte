<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ChevronDown } from '@lucide/svelte';

	interface Props {
		title        : string;
		activeCount? : number;
		defaultOpen? : boolean;
		children     : Snippet;
		class?       : string;
	}

	let {
		title,
		activeCount = 0,
		defaultOpen = true,
		children,
		class       : className = '',
	}: Props = $props();

	let isOpen = $state( true );

	$effect( () => {
		isOpen = defaultOpen;
	} );
</script>

<div class="border-b border-border/70 py-4 last:border-b-0 { className }">
	<button
		type="button"
		onclick={ () => ( isOpen = !isOpen ) }
		aria-expanded={ isOpen }
		class="w-full flex items-center justify-between text-left group cursor-pointer select-none"
	>
		<div class="flex items-center gap-2">
			<span class="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-rose-500 transition-colors">
				{ title }
			</span>
			{#if ( activeCount > 0 )}
				<span class="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
					{ activeCount }
				</span>
			{/if}
		</div>

		<ChevronDown
			class="w-4 h-4 text-muted-text group-hover:text-primary transition-transform duration-200 { isOpen ? 'rotate-180' : '' }"
		/>
	</button>

	{#if ( isOpen )}
		<div class="pt-3 animate-in fade-in duration-150">
			{@render children()}
		</div>
	{/if}
</div>
