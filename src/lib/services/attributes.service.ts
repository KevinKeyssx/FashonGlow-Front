import type { AttributeDefinition, AttributeOption } from '$lib/types';
import { mockGetAttributeDefs, mockGetAttributeOptions } from '$lib/mock/handlers';

export const getAttributeDefinitions = (): Promise<AttributeDefinition[]> =>
	mockGetAttributeDefs();

export const getAttributeOptions = ( attributeId?: string ): Promise<AttributeOption[]> =>
	mockGetAttributeOptions( attributeId );

