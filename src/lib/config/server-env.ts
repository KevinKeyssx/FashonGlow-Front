import { z } from 'zod';

const serverEnvSchema = z.object({
	APP_SECRET_KEY	: z.string().min( 1, 'APP_SECRET_KEY es requerida para el backend' ).default( 'fashion_glow_secret_key_change_me' ),
	BACKEND_API_URL	: z.string().url( 'BACKEND_API_URL debe ser una URL válida' ).default( 'http://localhost:3000/api/v1' )
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

const rawSecret = typeof process !== 'undefined' ? process.env?.APP_SECRET_KEY : undefined;
const rawBackendUrl = typeof process !== 'undefined' ? process.env?.BACKEND_API_URL : undefined;

const parsedServerEnv = serverEnvSchema.safeParse({
	APP_SECRET_KEY	: rawSecret ?? 'fashion_glow_secret_key_change_me',
	BACKEND_API_URL	: rawBackendUrl ?? 'http://localhost:3000/api/v1'
});

if ( !parsedServerEnv.success ) {
	console.error( 'Error en variables de entorno servidor (Back):', parsedServerEnv.error.format() );
	throw new Error( 'Variables de entorno inválidas para el servidor.' );
}

export const serverEnv: ServerEnv = parsedServerEnv.data;
