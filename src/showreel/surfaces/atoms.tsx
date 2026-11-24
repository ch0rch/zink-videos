import type {CSSProperties, FC} from 'react';
import {fonts, ui} from '../theme';

/** Absolute placement inside a surface's fixed layout. */
export const at = (left: number, top: number, width?: number, height?: number): CSSProperties => ({
	position: 'absolute',
	left,
	top,
	width,
	height,
});

/** Same, anchored to the right edge: where the app right-aligns its figures. */
export const atRight = (right: number, top: number): CSSProperties => ({position: 'absolute', right, top, whiteSpace: 'nowrap'});

export const surfaceBase: CSSProperties = {
	position: 'absolute',
	inset: 0,
	backgroundColor: ui.surface,
	fontFamily: fonts.ui,
	color: ui.text,
	fontSize: 22,
	lineHeight: 1.2,
	WebkitFontSmoothing: 'antialiased',
};

export const HEADER_HEIGHT = 68;

/** The app's breadcrumb bar: branch first, then the screen. */
export const Breadcrumb: FC<{branch: string; screen: string; style?: CSSProperties}> = ({branch, screen, style}) => (
	<div
		style={{
			...at(0, 0),
			right: 0,
			height: HEADER_HEIGHT,
			backgroundColor: ui.surface,
			borderBottom: `1px solid ${ui.border}`,
			display: 'flex',
			alignItems: 'center',
			paddingLeft: 36,
			fontSize: 22,
			...style,
		}}
	>
		<span style={{color: ui.textSoft}}>{branch}</span>
		<span style={{color: ui.placeholder, margin: '0 11px'}}>/</span>
		<span style={{fontWeight: 600}}>{screen}</span>
	</div>
);

export const Caret: FC = () => (
	<div style={{width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: `8px solid ${ui.textMuted}`}} />
);
