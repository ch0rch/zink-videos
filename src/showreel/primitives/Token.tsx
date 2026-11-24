import type {FC} from 'react';
import {brand, fonts} from '../theme';

type Props = {
	x: number;
	y: number;
	z: number;
	scale: number;
	opacity: number;
	label: string;
};

/** The one thing that travels between surfaces: a quantity or an amount, lifted off one screen and set down on the next. */
export const Token: FC<Props> = ({x, y, z, scale, opacity, label}) => (
	<div
		style={{
			position: 'absolute',
			left: x,
			top: y,
			opacity,
			transform: `translate(-50%, -50%) translateZ(${z}px) scale(${scale})`,
			padding: '7px 18px 8px',
			borderRadius: 999,
			backgroundColor: brand.violet,
			boxShadow: '0 14px 34px rgba(114,63,151,0.45), inset 0 0 0 1.5px rgba(164,159,206,0.55)',
			fontFamily: fonts.ui,
			fontWeight: 700,
			fontSize: 24,
			lineHeight: 1.2,
			letterSpacing: '0.01em',
			fontVariantNumeric: 'tabular-nums',
			color: '#ffffff',
			whiteSpace: 'nowrap',
		}}
	>
		{label}
	</div>
);
