import type {FC, ReactNode} from 'react';

type Props = {
	/** Centre, in world space. */
	x: number;
	y: number;
	z?: number;
	w: number;
	h: number;
	rotate?: number;
	scale?: number;
	radius?: number;
	skin?: string;
	/** 0 = fully lit, 1 = lost in the dark of the stage. */
	dim?: number;
	opacity?: number;
	/**
	 * What the surface rests on. A `stage` surface throws violet light onto the dark;
	 * a `plate` is a region of UI lifted off its card, and only shadows the card below.
	 */
	rests?: 'stage' | 'plate';
	/** Strength of that light or shadow. */
	glow?: number;
	/** The layout the content was designed at. It never reflows: it is scaled or cropped as the surface changes shape. */
	content?: {w: number; h: number; opacity?: number; scale?: number};
	children?: ReactNode;
};

/** A physical piece of product UI: it can change size, turn, lift and lose its light. */
export const Surface: FC<Props> = ({x, y, z = 0, w, h, rotate = 0, scale = 1, radius = 28, skin = '#ffffff', dim = 0, opacity = 1, rests = 'stage', glow = 1, content, children}) => (
	<div
		style={{
			position: 'absolute',
			left: x,
			top: y,
			width: w,
			height: h,
			opacity,
			transform: `translate(-50%, -50%) translateZ(${z}px) rotate(${rotate}deg) scale(${scale})`,
			borderRadius: radius,
			backgroundColor: skin,
			overflow: 'hidden',
			boxShadow:
				rests === 'stage'
					? `0 ${50 * glow}px ${130 * glow}px rgba(114,63,151,${0.42 * glow * (1 - dim)}), 0 ${24 * glow}px ${60 * glow}px rgba(3,2,6,${0.6 * glow})`
					: `0 ${22 * glow}px ${46 * glow}px rgba(38,20,60,${0.2 * glow}), 0 ${4 * glow}px ${10 * glow}px rgba(38,20,60,${0.1 * glow})`,
		}}
	>
		{content ? (
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: content.w,
					height: content.h,
					opacity: content.opacity ?? 1,
					transform: `scale(${content.scale ?? 1})`,
					transformOrigin: '0 0',
				}}
			>
				{children}
			</div>
		) : (
			children
		)}
		{/* Light falls off towards the far corner, the way it does on a lit object. */}
		<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(114,63,151,0) 58%, rgba(114,63,151,0.07))'}} />
		<div style={{position: 'absolute', inset: 0, backgroundColor: `rgba(11,8,17,${dim})`}} />
	</div>
);
