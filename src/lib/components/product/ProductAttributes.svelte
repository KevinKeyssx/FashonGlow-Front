<script lang="ts">
	import type { ProductWithRelations } from '$lib/types';

	interface Props {
		product : ProductWithRelations;
		class?  : string;
	}

	let {
		product,
		class : className = '',
	}: Props = $props();
</script>

<div class="flex flex-col gap-4 rounded-3xl p-6 bg-subtle border border-border { className }">
	<h3 class="font-display font-bold text-base">
		Ficha Técnica & Detalles
	</h3>

	<dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
		<div class="flex items-center justify-between pb-2 border-b border-border/60">
			<dt class="text-muted-text font-medium">Marca</dt>
			<dd class="font-semibold text-primary">{ product.brand.name }</dd>
		</div>

		<div class="flex items-center justify-between pb-2 border-b border-border/60">
			<dt class="text-muted-text font-medium">Categoría</dt>
			<dd class="font-semibold text-primary">{ product.category.name }</dd>
		</div>

		<div class="flex items-center justify-between pb-2 border-b border-border/60">
			<dt class="text-muted-text font-medium">Subcategoría</dt>
			<dd class="font-semibold text-primary">{ product.subcategory.name }</dd>
		</div>

		<div class="flex items-center justify-between pb-2 border-b border-border/60">
			<dt class="text-muted-text font-medium">Género</dt>
			<dd class="font-semibold text-primary capitalize">{ product.gender.toLowerCase() }</dd>
		</div>

		{#each product.attributes as { definition, option }}
			<div class="flex items-center justify-between pb-2 border-b border-border/60">
				<dt class="text-muted-text font-medium">{ definition.name }</dt>
				<dd class="font-semibold text-primary">{ option.displayValue }</dd>
			</div>
		{/each}
	</dl>
</div>

