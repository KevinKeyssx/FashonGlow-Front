<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?  : 'rose' | 'gold' | 'outline' | 'neutral' | 'success';
		size?     : 'sm' | 'md';
		glow?     : boolean;
		children? : Snippet;
	}

	let {
		variant   = 'rose',
		size      = 'sm',
		glow      = false,
		class     : className = '',
		children,
		...rest
	}: Props = $props();

	const sizeStyles: Record<'sm' | 'md', string> = {
		sm : 'px-2.5 py-0.5 text-xs',
		md : 'px-3 py-1 text-xs font-semibold',
	};

	const variantStyles: Record<'rose' | 'gold' | 'outline' | 'neutral' | 'success', string> = {
		rose    : 'bg-rose-500/15 text-rose-500 border border-rose-500/30',
		gold    : 'bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30',
		outline : 'border border-border text-secondary',
		neutral : 'bg-elevated text-secondary border border-border',
		success : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
	};
</script>

<span
	class="inline-flex items-center justify-center font-medium rounded-full select-none transition-all duration-200 { sizeStyles[ size ] } { variantStyles[ variant ] } { glow && variant === 'rose' ? 'glow-rose' : '' } { glow && variant === 'gold' ? 'glow-gold' : '' } { className }"
	{ ...rest }
>
	{#if ( children )}
		{@render children()}
	{/if}
</span>

