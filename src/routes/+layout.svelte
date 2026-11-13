<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { onMount }      from 'svelte';

    import {
        QueryClient,
        QueryClientProvider
    }                   from '@tanstack/svelte-query';
	import { Toaster }  from 'svelte-5-french-toast';

    import Header               from '$lib/components/layout/Header.svelte';
	import Footer               from '$lib/components/layout/Footer.svelte';
	import { themeStore }       from '$lib/stores/theme.svelte';
	import { currencyStore }    from '$lib/stores/currency.svelte';


    interface Props {
		children : Snippet;
	}


    let { children }: Props = $props();


    const queryClient = new QueryClient({
		defaultOptions : {
			queries : {
				refetchOnWindowFocus : false,
				retry                : 1,
			},
		},
	});


    onMount( () => {
		themeStore.init();
		currencyStore.init();
	} );
</script>

<QueryClientProvider client={ queryClient }>
	<Toaster
		position="bottom-right"
		toastOptions={{
			duration : 4000,
			style    : 'border-radius: 9999px; font-size: 13px; font-weight: 500; padding: 12px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.12);',
		}}
	/>

	<div class="min-h-screen flex flex-col bg-base text-primary">
		<Header />

		<main class="flex-1">
			{@render children()}
		</main>

		<Footer />
	</div>
</QueryClientProvider>
