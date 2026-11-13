export interface NavLink {
	label : string;
	href  : string;
}

export const mainNavLinks: NavLink[] = [
	{ label: 'Inicio',   href: '/' },
	{ label: 'Catálogo', href: '/catalogo' },
	{ label: 'Hombre',   href: '/catalogo?gen=HOMBRE' },
	{ label: 'Mujer',    href: '/catalogo?gen=MUJER' },
	{ label: 'Ofertas',  href: '/catalogo?oferta=1' },
];

export const footerLinks: NavLink[] = [
	{ label: 'Inicio',         href: '/' },
	{ label: 'Catálogo',       href: '/catalogo' },
	{ label: 'Ofertas',        href: '/catalogo?oferta=1' },
	{ label: 'Iniciar sesión', href: '/login' },
];

