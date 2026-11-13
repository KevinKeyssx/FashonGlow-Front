<script lang="ts">
	import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from '@lucide/svelte';
	import toast from 'svelte-5-french-toast';
	import Logo from '$lib/components/layout/Logo.svelte';

	let email       = $state( '' );
	let password    = $state( '' );
	let rememberMe  = $state( false );
	let showPassword = $state( false );
	let isSubmitting = $state( false );

	let emailError    = $state( '' );
	let passwordError = $state( '' );

	const validate = (): boolean => {
		let valid = true;
		emailError    = '';
		passwordError = '';

		if ( !email.trim() ) {
			emailError = 'El correo electrónico es requerido';
			valid = false;
		} else if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email ) ) {
			emailError = 'Ingresa un correo electrónico válido';
			valid = false;
		}

		if ( !password ) {
			passwordError = 'La contraseña es requerida';
			valid = false;
		} else if ( password.length < 6 ) {
			passwordError = 'La contraseña debe tener al menos 6 caracteres';
			valid = false;
		}

		return valid;
	};

	const handleSubmit = async ( e: SubmitEvent ): Promise<void> => {
		e.preventDefault();
		if ( !validate() ) return;

		isSubmitting = true;

		// Simulated login delay
		setTimeout( () => {
			isSubmitting = false;
			toast.success(
				'¡Bienvenido de vuelta! Sesión iniciada con éxito.',
				{ icon: '✨' },
			);
		}, 1000 );
	};
</script>

<svelte:head>
	<title>Iniciar Sesión — Fashion Glow</title>
	<meta
		name="description"
		content="Inicia sesión en tu cuenta de Fashion Glow para acceder a tus pedidos, listas de deseos y beneficios exclusivos del Club Glow."
	/>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-subtle via-base to-base">
	<!-- Background glow blobs -->
	<div class="absolute top-1/4 left-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

	<!-- Login Card -->
	<div class="w-full max-w-md relative z-10">
		<div class="p-8 sm:p-10 rounded-3xl bg-base/80 backdrop-blur-xl border border-border/80 shadow-2xl shadow-black/10 flex flex-col gap-6 glow-rose">
			<!-- Header -->
			<div class="flex flex-col items-center text-center gap-2">
				<Logo size="md" />
				<h1 class="font-display font-bold text-2xl text-primary mt-2">
					Bienvenido a tu Espacio Glow
				</h1>
				<p class="text-xs text-secondary max-w-xs">
					Ingresa tus credenciales para gestionar tus pedidos y acceder a promociones exclusivas.
				</p>
			</div>

			<!-- Form -->
			<form onsubmit={ handleSubmit } class="flex flex-col gap-4">
				<!-- Email Input -->
				<div class="flex flex-col gap-1.5">
					<label for="login-email" class="text-xs font-semibold text-secondary uppercase tracking-wider text-[11px]">
						Correo Electrónico
					</label>

					<div class="relative flex items-center">
						<div class="absolute left-3.5 text-muted-text pointer-events-none">
							<Mail class="w-4 h-4 text-rose-500" />
						</div>

						<input
							id="login-email"
							type="email"
							bind:value={ email }
							placeholder="ejemplo@correo.com"
							class="w-full py-3 pl-10 pr-4 rounded-full text-xs bg-subtle border border-border text-primary placeholder:text-muted-text focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all { emailError ? '!border-rose-500' : '' }"
						/>
					</div>

					{#if ( emailError )}
						<span class="text-[11px] text-rose-500 pl-3 font-medium">
							{ emailError }
						</span>
					{/if}
				</div>

				<!-- Password Input -->
				<div class="flex flex-col gap-1.5">
					<div class="flex items-center justify-between">
						<label for="login-password" class="text-xs font-semibold text-secondary uppercase tracking-wider text-[11px]">
							Contraseña
						</label>
						<a
							href="/login"
							onclick={ ( e ) => { e.preventDefault(); toast( 'Funcionalidad de recuperación próximamente' ); } }
							class="text-[11px] text-rose-500 hover:text-rose-600 font-medium hover:underline"
						>
							¿Olvidaste tu contraseña?
						</a>
					</div>

					<div class="relative flex items-center">
						<div class="absolute left-3.5 text-muted-text pointer-events-none">
							<Lock class="w-4 h-4 text-rose-500" />
						</div>

						<input
							id="login-password"
							type={ showPassword ? 'text' : 'password' }
							bind:value={ password }
							placeholder="••••••••"
							class="w-full py-3 pl-10 pr-10 rounded-full text-xs bg-subtle border border-border text-primary placeholder:text-muted-text focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all { passwordError ? '!border-rose-500' : '' }"
						/>

						<button
							type="button"
							onclick={ () => ( showPassword = !showPassword ) }
							aria-label={ showPassword ? 'Ocultar contraseña' : 'Ver contraseña' }
							class="absolute right-3.5 text-muted-text hover:text-primary transition-colors cursor-pointer"
						>
							{#if ( showPassword )}
								<EyeOff class="w-4 h-4" />
							{:else}
								<Eye class="w-4 h-4" />
							{/if}
						</button>
					</div>

					{#if ( passwordError )}
						<span class="text-[11px] text-rose-500 pl-3 font-medium">
							{ passwordError }
						</span>
					{/if}
				</div>

				<!-- Remember me checkbox -->
				<div class="flex items-center justify-between py-1">
					<label class="flex items-center gap-2 cursor-pointer select-none">
						<input
							type="checkbox"
							bind:checked={ rememberMe }
							class="w-4 h-4 rounded-md accent-rose-500 cursor-pointer"
						/>
						<span class="text-xs text-secondary">Recordar mi sesión</span>
					</label>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={ isSubmitting }
					class="w-full py-3.5 px-6 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold text-xs shadow-lg shadow-rose-500/30 glow-rose transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
				>
					{#if ( isSubmitting )}
						<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
						<span>Validando...</span>
					{:else}
						<span>Iniciar Sesión</span>
						<ArrowRight class="w-4 h-4" />
					{/if}
				</button>
			</form>

			<!-- Footer notes -->
			<div class="pt-4 border-t border-border/60 text-center flex flex-col gap-2">
				<p class="text-xs text-secondary">
					¿Aún no tienes una cuenta?
					<button
						type="button"
						onclick={ () => toast( 'Registro habilitado con la integración backend NestJS' ) }
						class="text-rose-500 font-semibold hover:underline cursor-pointer ml-1"
					>
						Crear cuenta
					</button>
				</p>

				<div class="inline-flex items-center justify-center gap-1.5 text-[10px] text-muted-text">
					<Sparkles class="w-3 h-3 text-gold-500" />
					<span>Conexión cifrada de extremo a extremo</span>
				</div>
			</div>
		</div>
	</div>
</div>

