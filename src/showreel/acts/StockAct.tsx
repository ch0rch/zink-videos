import type {FC} from 'react';
import {corner, POS, regionCentre, STOCK, STOCK_ROW} from '../layout';
import {ease, mix, progress, settle} from '../motion';
import {Surface} from '../primitives/Surface';
import {Token} from '../primitives/Token';
import {POS_QUANTITY} from '../surfaces/PosSurface';
import {STOCK_LANDING, StockCentroRow, StockSurface} from '../surfaces/StockSurface';
import {T} from '../timeline';

const lift = {x: corner(POS).x + POS_QUANTITY.x, y: corner(POS).y + POS_QUANTITY.y};
const landing = {x: corner(STOCK).x + STOCK_LANDING.x, y: corner(STOCK).y + STOCK_LANDING.y};
const row = regionCentre(STOCK, STOCK_ROW);

/** The two units sold leave the sale as one token; the camera follows it onto the stock table, where Centro's row lifts to take them off. */
export const StockAct: FC<{frame: number}> = ({frame}) => {
	if (frame < T.pillPop || frame > T.toTiles[1]) return null;
	const lit = progress(frame, T.stockReveal - 8, T.stockReveal + 30, ease.soft);
	const dim = mix(0.62, 0, lit) + 0.8 * progress(frame, T.lineGrow[0], T.lineGrow[1], ease.inOut);
	const raised = progress(frame, T.pillFly[1] - 14, T.pillFly[1] + 6, ease.out) - progress(frame, T.lineDraw[0] - 4, T.lineDraw[1], ease.inOut);
	const active = progress(frame, T.stockRoll - 10, T.stockRoll + 14, ease.soft);

	const fly = progress(frame, T.pillFly[0], T.pillFly[1], ease.inOut);
	const arc = Math.sin(Math.PI * fly);
	const absorbed = progress(frame, T.stockRoll + 6, T.stockRoll + 26, ease.in);

	return (
		<>
			<Surface x={STOCK.x} y={STOCK.y} w={STOCK.w} h={STOCK.h} dim={dim} content={{w: STOCK.w, h: STOCK.h}}>
				<StockSurface frame={frame} />
			</Surface>
			<Surface
				rests="plate"
				x={row.x}
				y={row.y}
				z={1 + 44 * raised}
				scale={1 + 0.012 * raised}
				w={STOCK_ROW.w}
				h={STOCK_ROW.h}
				radius={10 * raised}
				glow={raised}
				opacity={progress(frame, T.stockReveal + 16, T.stockReveal + 30, ease.soft)}
				dim={dim}
				content={{w: STOCK_ROW.w, h: STOCK_ROW.h}}
			>
				<StockCentroRow frame={frame} active={active} />
			</Surface>
			{absorbed < 1 ? (
				<Token
					label="−2"
					x={mix(lift.x, landing.x, fly) - 40 * absorbed}
					y={mix(lift.y, landing.y, fly) - 130 * arc}
					z={mix(150, 70, fly) + 150 * arc}
					scale={settle(frame, T.pillPop, 16) * (1 + 0.16 * arc) * (1 - 0.45 * absorbed)}
					opacity={progress(frame, T.pillPop, T.pillPop + 6, ease.soft) * (1 - absorbed)}
				/>
			) : null}
		</>
	);
};
