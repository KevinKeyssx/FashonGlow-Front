const THEME_KEY = 'fg-theme';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const getInitialTheme = (): Theme => {
		if ( typeof window === 'undefined' ) return 'light';
		const stored = localStorage.getItem( THEME_KEY );
		if ( stored === 'dark' || stored === 'light' ) return stored;
		return window.matchMedia( '(prefers-color-scheme: dark)' ).matches ? 'dark' : 'light';
	};

	let theme = $state<Theme>( 'light' );

	const init = () => {
		theme = getInitialTheme();
		applyTheme( theme );
	};

	const applyTheme = ( t: Theme ) => {
		if ( typeof document === 'undefined' ) return;
		document.documentElement.classList.toggle( 'dark', t === 'dark' );
	};

	const toggle = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem( THEME_KEY, theme );
		applyTheme( theme );
	};

	const set = ( t: Theme ) => {
		theme = t;
		localStorage.setItem( THEME_KEY, theme );
		applyTheme( theme );
	};

	return {
		get current() { return theme; },
		get isDark()  { return theme === 'dark'; },
		init,
		toggle,
		set,
	};
}

export const themeStore = createThemeStore();
