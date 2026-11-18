import { z } from 'zod';

const clientEnvSchema = z.object({
	PUBLIC_WHATSAPP_NUMBER		: z.string().min( 1, 'El número de WhatsApp es requerido' ).default( '+56978863344' ),
	PUBLIC_TELEGRAM_USERNAME	: z.string().min( 1, 'El nombre de usuario de Telegram es requerido' )
		.default( 'fashion_glow' )
		.transform( ( val: string ): string => val.replace( /^@/, '' )
			.replace( /^https?:\/\/t\.me\//, '' )
			.trim()
		),
	PUBLIC_API_BASE				: z.string().default( '/api' )
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

const parsedClientEnv = clientEnvSchema.safeParse({
	PUBLIC_WHATSAPP_NUMBER		: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '+56978863344',
	PUBLIC_TELEGRAM_USERNAME	: import.meta.env.PUBLIC_TELEGRAM_USERNAME ?? 'kevinkeyss',
	PUBLIC_API_BASE				: import.meta.env.PUBLIC_API_BASE ?? '/api'
});

if ( !parsedClientEnv.success ) {
	console.error( 'Error en variables de entorno cliente (Front):', parsedClientEnv.error.format() );
	throw new Error( 'Variables de entorno inválidas para el cliente.' );
}

export const clientEnv: ClientEnv = parsedClientEnv.data;
