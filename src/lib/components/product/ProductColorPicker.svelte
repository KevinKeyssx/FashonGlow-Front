<script lang="ts">
	import { Check } from '@lucide/svelte';
	import type { ColorGroup } from '$lib/utils/colors';
	import { getContrastColor } from '$lib/utils/colors';

	interface Props {
		colorGroups  : ColorGroup[];
		selected     : string;
		onSelect     : ( colorFamily: string ) => void;
		class?       : string;
	}

	let {
		colorGroups,
		selected,
		onSelect,
		class : className = '',
	}: Props = $props();

	const activeGroup = $derived(
		colorGroups.find( ( g ) => g.colorFamily === selected ) ?? colorGroups[ 0 ],
	);
</script>

<div class="flex flex-col gap-2.5 { className }">
	<div class="flex items-center justify-between text-xs">
		<span class="font-semibold text-secondary uppercase tracking-wider text-[11px]">
			Color seleccionado:
		</span>
		<span class="font-bold text-primary capitalize">
			{ activeGroup?.colorName ?? selected }
		</span>
	</div>

	<div class="flex items-center gap-3">
		{#each colorGroups as group}
			{@const isSelected = selected === group.colorFamily}
			{@const contrast = getContrastColor( group.colorHex )}
			<button
				type="button"
				onclick={ () => onSelect( group.colorFamily ) }
				aria-label="Color { group.colorName }"
				title="{ group.colorName }"
				class="relative w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all duration-150 cursor-pointer { isSelected ? 'ring-3 ring-rose-500 ring-offset-2 scale-108' : 'hover:scale-105' }"
				style="background-color: { group.colorHex };"
			>
				{#if ( isSelected )}
					<Check
						class="w-4 h-4 stroke-[3]"
						style="color: { contrast };"
					/>
				{/if}
			</button>
		{/each}
	</div>
</div>

