<script lang="ts">
	import { Check } from '@lucide/svelte';

	interface Props {
		checked?  : boolean;
		disabled? : boolean;
		label?    : string;
		count?    : number;
		onchange? : ( checked: boolean ) => void;
		class?    : string;
	}

	let {
		checked   = $bindable( false ),
		disabled  = false,
		label,
		count,
		onchange,
		class     : className = '',
	}: Props = $props();

	const toggle = (): void => {
		if ( disabled ) return;
		checked = !checked;
		onchange?.( checked );
	};
</script>

<label class="inline-flex items-center gap-2.5 cursor-pointer select-none group { disabled ? 'opacity-50 cursor-not-allowed' : '' } { className }">
	<button
		type="button"
		role="checkbox"
		aria-checked={ checked }
		{ disabled }
		onclick={ toggle }
		class="w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 { checked ? 'bg-rose-500 border-rose-500 text-white shadow-sm shadow-rose-400/30' : 'bg-subtle border-border group-hover:border-rose-400' }"
	>
		{#if ( checked )}
			<Check class="w-3.5 h-3.5 stroke-[3]" />
		{/if}
	</button>

	{#if ( label )}
		<span class="text-sm text-secondary group-hover:text-primary transition-colors flex items-center gap-1.5">
			{ label }
			{#if ( count !== undefined )}
				<span class="text-xs text-muted-text">({ count })</span>
			{/if}
		</span>
	{/if}
</label>

