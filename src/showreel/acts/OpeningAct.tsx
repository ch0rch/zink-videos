import type {FC} from 'react';
import {focusOn, type Format, useFormat} from '../format';
import {MARK_SCALE, POS} from '../layout';
import {ease, mix, progress, settle} from '../motion';
import {modulePoint, SymbolModules} from '../primitives/SymbolModules';
import {T} from '../timeline';

/** The symbol's detached top module: the glint the film opens on and the plate the product grows out of. */
const SEED = 15;

/** The opening mark is centred on the frame the camera starts with: top-left corner of its artwork, in world space. */
const markOrigin = (format: Format) => {
	const start = focusOn(format, POS, format.zoom.pos);
	return {x: start.x - 40 * MARK_SCALE, y: start.y - 55 * MARK_SCALE};
};

export const seedPoint = (format: Format) => modulePoint(SEED, markOrigin(format), MARK_SCALE);

/** The mark is machined one module at a time out of its own top dot, then the camera goes through it. */
export const OpeningAct: FC<{frame: number}> = ({frame}) => {
	const format = useFormat();
	if (frame > T.morph[0] + 44) return null;
	const origin = markOrigin(format);
	const seed = seedPoint(format);
	const through = progress(frame, T.morph[0], T.morph[0] + 42, ease.in);
	const flare = progress(frame, T.glint, T.glint + 7, ease.out) - progress(frame, T.glint + 7, T.glint + 30, ease.soft);

	return (
		<>
			<SymbolModules
				origin={origin}
				scale={MARK_SCALE}
				pose={(index) => {
					if (index === SEED) {
						if (frame >= T.morph[0]) return null;
						return {scale: settle(frame, T.glint, 22), opacity: progress(frame, T.glint, T.glint + 6)};
					}
					// Each module slides out of its neighbour, the chain unrolling away from the dot.
					const start = T.markIn + (SEED - 1 - index) * 2;
					const p = progress(frame, start, start + 22, ease.out);
					const own = modulePoint(index, origin, MARK_SCALE);
					const neighbour = modulePoint(index + 1, origin, MARK_SCALE);
					return {
						dx: (neighbour.x - own.x) * (1 - p) + (own.x - seed.x) * through * 2.4,
						dy: (neighbour.y - own.y) * (1 - p) + (own.y - seed.y) * through * 2.4,
						scale: mix(0.4, 1, p) * (1 + through * 1.8),
						opacity: progress(frame, start, start + 7, ease.soft) * (1 - progress(frame, T.morph[0] + 6, T.morph[0] + 40, ease.soft)),
					};
				}}
			/>
			{flare > 0.01 ? (
				<div
					style={{
						position: 'absolute',
						left: seed.x,
						top: seed.y,
						width: 260 * flare,
						height: 2,
						opacity: flare,
						transform: 'translate(-50%, -50%) translateZ(4px) rotate(-14deg)',
						background: 'linear-gradient(90deg, rgba(143,205,240,0), rgba(255,255,255,0.95) 50%, rgba(143,205,240,0))',
					}}
				/>
			) : null}
		</>
	);
};
