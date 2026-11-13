<script lang="ts">  
	import { Sparkles } from '@lucide/svelte';

	interface Props {
		size?  : 'sm' | 'md' | 'lg';
		class? : string;
	}

	let {
		size  = 'md',
		class : className = '',
	}: Props = $props();

	const textSizes: Record<'sm' | 'md' | 'lg', string> = {
		sm : 'text-lg',
		md : 'text-2xl',
		lg : 'text-3xl',
	};

	const iconSizes: Record<'sm' | 'md' | 'lg', string> = {
		sm : 'w-4 h-4',
		md : 'w-5 h-5',
		lg : 'w-6 h-6',
	};
</script>

<a
	href="/"
	class="inline-flex items-center gap-2 group select-none transition-transform duration-200 hover:scale-102 { className }"
>
	<div class="relative flex items-center justify-center p-1.5 rounded-xl bg-linear-to-tr from-rose-500 to-gold-400 text-white shadow-md shadow-rose-500/25 group-hover:shadow-rose-500/40 transition-shadow">
		<Sparkles class="{ iconSizes[ size ] } transition-transform group-hover:rotate-12" />
	</div>

	<div class="flex flex-col leading-none">
		<span class="font-display font-bold tracking-tight text-primary { textSizes[ size ] }">
			Fashion<span class="text-rose-500 italic font-normal ml-1">Glow</span>
		</span>
		{#if ( size !== 'sm' )}
			<span class="text-[9px] tracking-widest uppercase font-semibold text-gold-500">
				Boutique & Co.
			</span>
		{/if}
	</div>
</a>

