import type { AttributeDefinition, AttributeOption } from '$lib/types';

export const MOCK_ATTRIBUTE_DEFS: AttributeDefinition[] = [
	{
		id           : 'ATTRDEF0100000000000001',
		name         : 'Material',
		slug         : 'material',
		isFilterable : true,
	},
	{
		id           : 'ATTRDEF0100000000000002',
		name         : 'Calce / Fit',
		slug         : 'fit',
		isFilterable : true,
	},
	{
		id           : 'ATTRDEF0100000000000003',
		name         : 'Temporada',
		slug         : 'temporada',
		isFilterable : true,
	},
	{
		id           : 'ATTRDEF0100000000000004',
		name         : 'Estilo',
		slug         : 'estilo',
		isFilterable : true,
	},
];

export const MOCK_ATTRIBUTE_OPTIONS: AttributeOption[] = [
	// Material
	{
		id           : 'ATTROPT010000000000001',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : '100% Algodón',
		filterSlug   : 'algodon',
	},
	{
		id           : 'ATTROPT010000000000002',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : 'Algodón Orgánico',
		filterSlug   : 'algodon-organico',
	},
	{
		id           : 'ATTROPT010000000000003',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : 'Poliéster',
		filterSlug   : 'poliester',
	},
	{
		id           : 'ATTROPT010000000000004',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : 'Denim',
		filterSlug   : 'denim',
	},
	{
		id           : 'ATTROPT010000000000005',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : 'Cuero Sintético',
		filterSlug   : 'cuero-sintetico',
	},
	{
		id           : 'ATTROPT010000000000006',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : 'Lino',
		filterSlug   : 'lino',
	},
	{
		id           : 'ATTROPT010000000000007',
		attributeId  : 'ATTRDEF0100000000000001',
		displayValue : 'Punto / Knit',
		filterSlug   : 'knit',
	},
	// Fit
	{
		id           : 'ATTROPT010000000000008',
		attributeId  : 'ATTRDEF0100000000000002',
		displayValue : 'Regular',
		filterSlug   : 'regular',
	},
	{
		id           : 'ATTROPT010000000000009',
		attributeId  : 'ATTRDEF0100000000000002',
		displayValue : 'Slim Fit',
		filterSlug   : 'slim',
	},
	{
		id           : 'ATTROPT010000000000010',
		attributeId  : 'ATTRDEF0100000000000002',
		displayValue : 'Oversize',
		filterSlug   : 'oversize',
	},
	{
		id           : 'ATTROPT010000000000011',
		attributeId  : 'ATTRDEF0100000000000002',
		displayValue : 'Wide Leg',
		filterSlug   : 'wide-leg',
	},
	{
		id           : 'ATTROPT010000000000012',
		attributeId  : 'ATTRDEF0100000000000002',
		displayValue : 'Crop',
		filterSlug   : 'crop',
	},
	// Temporada
	{
		id           : 'ATTROPT010000000000013',
		attributeId  : 'ATTRDEF0100000000000003',
		displayValue : 'Primavera/Verano',
		filterSlug   : 'primavera-verano',
	},
	{
		id           : 'ATTROPT010000000000014',
		attributeId  : 'ATTRDEF0100000000000003',
		displayValue : 'Otoño/Invierno',
		filterSlug   : 'otono-invierno',
	},
	{
		id           : 'ATTROPT010000000000015',
		attributeId  : 'ATTRDEF0100000000000003',
		displayValue : 'Todo el año',
		filterSlug   : 'todo-el-anio',
	},
	// Estilo
	{
		id           : 'ATTROPT010000000000016',
		attributeId  : 'ATTRDEF0100000000000004',
		displayValue : 'Casual',
		filterSlug   : 'casual',
	},
	{
		id           : 'ATTROPT010000000000017',
		attributeId  : 'ATTRDEF0100000000000004',
		displayValue : 'Formal',
		filterSlug   : 'formal',
	},
	{
		id           : 'ATTROPT010000000000018',
		attributeId  : 'ATTRDEF0100000000000004',
		displayValue : 'Deportivo',
		filterSlug   : 'deportivo',
	},
	{
		id           : 'ATTROPT010000000000019',
		attributeId  : 'ATTRDEF0100000000000004',
		displayValue : 'Bohemio',
		filterSlug   : 'bohemio',
	},
	{
		id           : 'ATTROPT010000000000020',
		attributeId  : 'ATTRDEF0100000000000004',
		displayValue : 'Minimalista',
		filterSlug   : 'minimalista',
	},
];
