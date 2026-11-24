import type {FC} from 'react';
import {interpolateColors} from 'remotion';
import {useFormat} from '../format';
import {MARK_SCALE, MODAL, POS, POS_TOTALS, regionCentre} from '../layout';
import {ease, mix, progress} from '../motion';
import {Surface} from '../primitives/Surface';
import {moduleSide} from '../primitives/SymbolModules';
import {PosSurface, PosTotals} from '../surfaces/PosSurface';
import {SaleModal} from '../surfaces/SaleModal';
import {T} from '../timeline';
import {brand} from '../theme';
import {seedPoint} from './OpeningAct';

const totals = regionCentre(POS, POS_TOTALS);

/** The mark's dot turns square, grows into the point of sale, and the sale is closed on it. */
export const SaleAct: FC<{frame: number}> = ({frame}) => {
	const format = useFormat();
	if (frame < T.morph[0] || frame > T.lineTail[1]) return null;
	const seed = seedPoint(format);
	const turn = progress(frame, T.morph[0], T.morph[0] + 38, ease.inOut);
	const grow = progress(frame, T.morph[0] + 10, T.morph[1], ease.inOut);
	const side = moduleSide(MARK_SCALE);
	const plate = {x: mix(seed.x, POS.x, grow), y: mix(seed.y, POS.y, grow), scale: mix(side, POS.w, grow) / POS.w};
	// The plate is still unlit when it reaches full size; the interface arrives with the light.
	const unlit = 0.16 * (1 - progress(frame, T.posChrome, T.posChrome + 30, ease.soft));
	const leaving = 0.94 * progress(frame, T.pillFly[0], T.pillFly[1], ease.inOut);
	const totalsIn = progress(frame, T.posChrome + 8, T.posChrome + 44, ease.out);
	const modal = progress(frame, T.modalIn, T.modalIn + 28, ease.out);

	return (
		<>
			<Surface
				x={plate.x}
				y={plate.y}
				w={mix(side, POS.w, grow)}
				h={mix(side, POS.h, grow)}
				rotate={45 * (1 - turn)}
				radius={28 * grow}
				skin={interpolateColors(grow, [0.06, 0.5, 0.9], [brand.cyan, brand.cyanLight, '#ffffff'])}
				glow={mix(0.15, 1, grow)}
				dim={unlit * grow + leaving}
				content={{w: POS.w, h: POS.h, scale: plate.scale, opacity: progress(frame, T.posChrome - 4, T.posChrome + 10, ease.soft)}}
			>
				<PosSurface frame={frame} />
			</Surface>
			{frame >= T.posChrome + 8 ? (
				// The totals column rides the plate while it is still growing, then settles onto it from the front.
				<Surface
					rests="plate"
					x={plate.x + (totals.x - POS.x) * plate.scale}
					y={plate.y + (totals.y - POS.y) * plate.scale}
					z={mix(150, 48, totalsIn)}
					scale={plate.scale}
					w={POS_TOTALS.w}
					h={POS_TOTALS.h}
					radius={12}
					opacity={progress(frame, T.posChrome + 8, T.posChrome + 20, ease.soft)}
					dim={leaving}
					content={{w: POS_TOTALS.w, h: POS_TOTALS.h}}
				>
					<PosTotals frame={frame} />
				</Surface>
			) : null}
			{modal > 0 ? (
				<Surface
					x={MODAL.x}
					y={MODAL.y + (1 - modal) * 34}
					z={mix(70, 130, modal)}
					w={MODAL.w}
					h={MODAL.h}
					radius={16}
					glow={0.7}
					opacity={progress(frame, T.modalIn, T.modalIn + 12, ease.soft)}
					dim={leaving}
					content={{w: MODAL.w, h: MODAL.h}}
				>
					<SaleModal />
				</Surface>
			) : null}
		</>
	);
};
