<script lang="ts">
	interface Props {
		checked?  : boolean;
		disabled? : boolean;
		label?    : string;
		onchange? : ( checked: boolean ) => void;
		class?    : string;
	}

	let {
		checked   = $bindable( false ),
		disabled  = false,
		label,
		onchange,
		class     : className = '',
	}: Props = $props();

	const toggle = (): void => {
		if ( disabled ) return;
		checked = !checked;
		onchange?.( checked );
	};
</script>

<label class="inline-flex items-center gap-3 cursor-pointer select-none { disabled ? 'opacity-50 cursor-not-allowed' : '' } { className }">
	<button
		type="button"
		role="switch"
		aria-label={ label ?? 'Interruptor' }
		aria-checked={ checked }
		{ disabled }
		onclick={ toggle }
		class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 { checked ? 'bg-rose-500 glow-rose' : 'bg-elevated border-border' }"
	>
		<span
			class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out { checked ? 'translate-x-5' : 'translate-x-0' }"
		></span>
	</button>

	{#if ( label )}
		<span class="text-sm font-medium text-secondary">
			{ label }
		</span>
	{/if}
</label>
