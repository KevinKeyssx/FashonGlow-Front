<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?  : 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
		size?     : 'sm' | 'md' | 'lg';
		children? : Snippet;
	}

	let {
		variant   = 'primary',
		size      = 'md',
		class     : className = '',
		children,
		...rest
	}: Props = $props();

	const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full';

	const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
		sm : 'px-3.5 py-1.5 text-xs gap-1.5',
		md : 'px-5 py-2.5 text-sm gap-2',
		lg : 'px-7 py-3.5 text-base gap-2.5',
	};

	const variantStyles: Record<'primary' | 'secondary' | 'outline' | 'ghost' | 'gold', string> = {
		primary   : 'bg-rose-500 text-white hover:bg-rose-600 shadow-md hover:shadow-lg hover:shadow-rose-400/30 active:scale-98',
		secondary : 'bg-subtle text-primary border border-border hover:border-border-subtle hover:bg-elevated active:scale-98',
		outline   : 'border-2 border-rose-400 text-rose-500 hover:bg-rose-500/10 active:scale-98',
		ghost     : 'text-secondary hover:text-primary hover:bg-elevated active:scale-98',
		gold      : 'bg-gold-500 text-white hover:bg-gold-600 shadow-md hover:shadow-lg hover:shadow-gold-400/30 active:scale-98',
	};
</script>

<button
	class="{ baseStyles } { sizeStyles[ size ] } { variantStyles[ variant ] } { className }"
	{ ...rest }
>
	{#if ( children )}
		{@render children()}
	{/if}
</button>

