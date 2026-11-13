<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		value?       : string | number;
		icon?        : Snippet;
		suffix?      : Snippet;
		error?       : string;
	}

	let {
		value       = $bindable( '' ),
		icon,
		suffix,
		error,
		class       : className = '',
		...rest
	}: Props = $props();
</script>

<div class="relative w-full flex flex-col gap-1.5">
	<div class="relative flex items-center w-full">
		{#if ( icon )}
			<div class="absolute left-3.5 flex items-center pointer-events-none text-muted-text">
				{@render icon()}
			</div>
		{/if}

		<input
			bind:value
			class="w-full bg-subtle text-primary border border-border rounded-full py-2.5 text-sm transition-all duration-200 placeholder:text-muted-text focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 { icon ? 'pl-10' : 'pl-4' } { suffix ? 'pr-10' : 'pr-4' } { error ? '!border-rose-600 !ring-rose-600/20' : '' } { className }"
			{ ...rest }
		/>

		{#if ( suffix )}
			<div class="absolute right-3.5 flex items-center text-muted-text">
				{@render suffix()}
			</div>
		{/if}
	</div>

	{#if ( error )}
		<span class="text-xs text-rose-500 pl-3 font-medium">
			{ error }
		</span>
	{/if}
</div>

