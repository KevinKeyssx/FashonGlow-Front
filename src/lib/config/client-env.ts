import { z } from 'zod';

const clientEnvSchema = z.object({
	PUBLIC_WHATSAPP_NUMBER : z.string().min( 1, 'El número de WhatsApp es requerido' ).default( '+56978863344' )
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

const parsedClientEnv = clientEnvSchema.safeParse({
	PUBLIC_WHATSAPP_NUMBER : import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '+56978863344'
});

if ( !parsedClientEnv.success ) {
	console.error( 'Error en variables de entorno cliente (Front):', parsedClientEnv.error.format() );
	throw new Error( 'Variables de entorno inválidas para el cliente.' );
}

export const clientEnv: ClientEnv = parsedClientEnv.data;
