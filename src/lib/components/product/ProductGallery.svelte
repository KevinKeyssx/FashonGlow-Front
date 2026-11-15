<script lang="ts">
	import type { ProductImage }    from '$lib/types';
	import { getImagesByColor }     from '$lib/utils/colors';


    interface Props {
		images       : ProductImage[];
		colorFamily? : string | null;
		productName  : string;
		class?       : string;
	}


    let {
		images,
		colorFamily = null,
		productName,
		class : className = '',
	}: Props = $props();


    const activeImages = $derived( getImagesByColor( images, colorFamily ) );


    let activeIndex = $state( 0 );

	// Reset index when color changes
	$effect( () => {
		if ( colorFamily !== undefined ) {
			activeIndex = 0;
		}
	});

	const currentImage = $derived(
		activeImages[ activeIndex ]?.url ?? images[ 0 ]?.url,
	);
</script>

<div class="flex flex-col-reverse sm:flex-row gap-4 w-full { className }">
	<!-- Thumbnails list (vertical scroll only when needed, zero horizontal scrollbar) -->
	{#if ( activeImages.length > 1 )}
		<div
			class="flex sm:flex-col gap-3 overflow-x-auto no-scrollbar sm:overflow-x-hidden sm:overflow-y-auto max-h-135 p-1.5 shrink-0"
			style="scrollbar-width: none !important; scrollbar-color: transparent transparent !important; -ms-overflow-style: none !important;"
		>
			{#each activeImages as img, idx}
				<button
					type="button"
					onclick={ () => ( activeIndex = idx ) }
					class="relative w-18 h-22 sm:w-20 sm:h-26 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 { activeIndex === idx ? 'border-rose-500 ring-2 ring-rose-500/20 scale-102' : 'border-border opacity-70 hover:opacity-100' }"
				>
					<img
						src={ img.url }
						alt="{ productName } miniatura { idx + 1 }"
						class="w-full h-full object-cover object-center"
					/>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Main Image View -->
	<div class="flex-1 relative aspect-3/4 rounded-3xl overflow-hidden bg-elevated border border-border/80 shadow-lg">
		{#if ( currentImage )}
			<img
				src={ currentImage }
				alt={ productName }
				class="w-full h-full object-cover object-center transition-all duration-300"
			/>
		{:else}
			<div class="w-full h-full flex items-center justify-center text-muted-text text-sm">
				Sin imagen disponible
			</div>
		{/if}
	</div>
</div>
