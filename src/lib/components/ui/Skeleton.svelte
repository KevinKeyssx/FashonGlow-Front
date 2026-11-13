<script lang="ts">
	interface Props {
		class?   : string;
		rounded? : 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	}

	let {
		class   : className = '',
		rounded = 'xl',
	}: Props = $props();

	const roundedStyles: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full', string> = {
		sm    : 'rounded-sm',
		md    : 'rounded-md',
		lg    : 'rounded-lg',
		xl    : 'rounded-xl',
		'2xl' : 'rounded-2xl',
		'3xl' : 'rounded-3xl',
		full  : 'rounded-full',
	};
</script>

<div
	class="animate-pulse bg-elevated { roundedStyles[ rounded ] } { className }"
></div>
