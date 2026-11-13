import type { Brand } from '$lib/types';
import { mockGetBrands } from '$lib/mock/handlers';

export const getBrands = (): Promise<Brand[]> =>
	mockGetBrands();

