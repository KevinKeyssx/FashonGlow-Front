import { z } from 'zod';

const serverEnvSchema = z.object({
	APP_SECRET_KEY : z.string().min( 1, 'APP_SECRET_KEY es requerida para el backend' ).default( 'fashion_glow_secret_key_change_me' )
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

const rawSecret = typeof process !== 'undefined' ? process.env?.APP_SECRET_KEY : undefined;

const parsedServerEnv = serverEnvSchema.safeParse({
	APP_SECRET_KEY : rawSecret ?? 'fashion_glow_secret_key_change_me'
});

if ( !parsedServerEnv.success ) {
	console.error( 'Error en variables de entorno servidor (Back):', parsedServerEnv.error.format() );
	throw new Error( 'Variables de entorno inválidas para el servidor.' );
}

export const serverEnv: ServerEnv = parsedServerEnv.data;
