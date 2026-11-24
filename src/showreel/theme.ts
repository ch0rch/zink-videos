/** Official ZinkERP palette (Zink in Tech brand sheet, as shipped in zinkerp.com/brand). */
export const brand = {
	violet: '#723f97',
	violetMid: '#8262a9',
	violetLight: '#a49fce',
	cyan: '#10b0e6',
	cyanLight: '#8fcdf0',
} as const;

/** The dark stage the product is filmed on: violet ink, never pure black. */
export const stage = {
	ink: '#0b0811',
	text: '#f4f1ec',
	textMuted: '#a49fce',
} as const;

/** Colours sampled from the QA captures of the running app. */
export const ui = {
	surface: '#ffffff',
	canvas: '#fafafa',
	text: '#1a1322',
	textSoft: '#4a4458',
	textMuted: '#6b6575',
	placeholder: '#9a94a6',
	border: '#e4e0ea',
	borderLilac: '#eadcf5',
	inputBorder: '#c9c4d1',
	primary: '#7500b9',
	success: '#43a047',
	link: '#1e9bd7',
	rowSelected: '#e6e6e6',
} as const;

export const fonts = {
	display: 'Montserrat, sans-serif',
	ui: 'Roboto, sans-serif',
} as const;
