import type {FC} from 'react';
import {interpolateColors} from 'remotion';
import {SYMBOL_MODULES} from '../brand/symbol';
import {useFormat} from '../format';
import {CAJA, CAJA_CASH, corner, FOCUS, LOCKUP_ORIGIN, LOCKUP_SCALE, regionCentre, RULE_INSET, RULE_Y, STOCK, TILE} from '../layout';
import {ease, mix, progress} from '../motion';
import {Surface} from '../primitives/Surface';
import {modulePoint, moduleSide} from '../primitives/SymbolModules';
import {Token} from '../primitives/Token';
import {BranchTile} from '../surfaces/BranchTile';
import {CajaCash, CajaSurface} from '../surfaces/CajaSurface';
import {T} from '../timeline';
import {brand, ui} from '../theme';

/** The two modules of the final symbol that the branch tiles turn into. */
export const CENTRO_MODULE = 2;
export const SUR_MODULE = 12;

const stockLeft = corner(STOCK).x + RULE_INSET;
const stockRight = corner(STOCK).x + STOCK.w - RULE_INSET;
const cajaLeft = corner(CAJA).x + RULE_INSET;
const cajaRight = corner(CAJA).x + CAJA.w - RULE_INSET;
const cash = regionCentre(CAJA, CAJA_CASH);

/** The violet rule: drawn under Centro's stock row, it runs on across the stage and becomes the rule of Caja diaria. */
const Rule: FC<{frame: number}> = ({frame}) => {
	if (frame < T.lineDraw[0] || frame > T.toTiles[0] + 16) return null;
	const drawn = progress(frame, T.lineDraw[0], T.lineDraw[1], ease.out);
	const grown = progress(frame, T.lineGrow[0], T.lineGrow[1], ease.inOut);
	const tail = progress(frame, T.lineTail[0], T.lineTail[1], ease.inOut);
	const left = mix(stockLeft, cajaLeft, tail);
	const right = mix(mix(stockLeft, stockRight, drawn), cajaRight, grown);
	// Between the two cards the rule crosses the dark stage: it brightens there, and goes back to the app's violet on white.
	const crossing = grown * (1 - tail);
	return (
		<div
			style={{
				position: 'absolute',
				left,
				top: RULE_Y - 1.5,
				width: right - left,
				height: 3,
				transform: 'translateZ(3px)',
				borderRadius: 2,
				backgroundColor: interpolateColors(crossing, [0, 0.6], [ui.primary, brand.violetLight]),
				boxShadow: `0 0 ${22 * crossing}px rgba(164,159,206,${0.7 * crossing})`,
				opacity: 1 - progress(frame, T.toTiles[0], T.toTiles[0] + 14, ease.soft),
			}}
		/>
	);
};

/** A tile folding into one module of the symbol: it shrinks, stands on its corner and takes the module's colour. */
const fold = (frame: number, tile: {x: number; y: number}, module: number) => {
	const p = progress(frame, T.toMark[0] + 2, T.toMark[1], ease.inOut);
	const target = modulePoint(module, LOCKUP_ORIGIN, LOCKUP_SCALE);
	const side = moduleSide(LOCKUP_SCALE) + 0.5;
	return {
		p,
		x: mix(tile.x, target.x, p),
		y: mix(tile.y, target.y, p),
		w: mix(TILE.w, side, p),
		h: mix(TILE.h, side, p),
		rotate: 45 * progress(frame, T.toMark[0] + 12, T.toMark[1], ease.inOut),
		radius: 28 * (1 - p),
		skin: interpolateColors(p, [0.35, 0.88], ['#ffffff', SYMBOL_MODULES[module].fill]),
		glow: 1 - p,
	};
};

/** Caja diaria receives the sale; then the one register becomes one tile per branch, and the tiles fold into the mark. */
export const CajaAct: FC<{frame: number}> = ({frame}) => {
	const {tiles} = useFormat();
	if (frame < T.lineGrow[0]) return null;
	const tileCentro = {x: FOCUS.x + tiles.centro.x, y: FOCUS.y + tiles.centro.y};
	const tileSur = {x: FOCUS.x + tiles.sur.x, y: FOCUS.y + tiles.sur.y};
	const lit = progress(frame, T.cajaReveal - 6, T.cajaReveal + 26, ease.soft);
	const shrink = progress(frame, T.toTiles[0] + 4, T.toTiles[1], ease.inOut);
	// The tiles keep their figures while they shrink, and lose them on the way: they are never blank cards.
	const folding = 1 - progress(frame, T.toMark[0] + 6, T.toMark[0] + 30, ease.soft);
	const cajaContent = 1 - progress(frame, T.toTiles[0] + 6, T.toTiles[0] + 30, ease.soft);
	const tileContent = progress(frame, T.toTiles[0] + 20, T.toTiles[1] - 6, ease.soft) * folding;
	const centro = fold(frame, tileCentro, CENTRO_MODULE);
	const sur = fold(frame, tileSur, SUR_MODULE);
	const surOut = progress(frame, T.toTiles[0] + 14, T.toTiles[1] + 10, ease.out);
	const w = centro.p > 0 ? centro.w : mix(CAJA.w, TILE.w, shrink);

	const raised = progress(frame, T.chipFly[1] - 12, T.chipFly[1] + 8, ease.out) - progress(frame, T.cashRoll + 44, T.cashRoll + 92, ease.inOut);
	const slide = progress(frame, T.chipFly[0], T.chipFly[1] - 8, ease.inOut);
	const drop = progress(frame, T.chipFly[1] - 14, T.chipFly[1], ease.inOut);
	const absorbed = progress(frame, T.cashRoll + 2, T.cashRoll + 20, ease.in);

	return (
		<>
			{surOut > 0 ? (
				<Surface
					x={mix(tileCentro.x, sur.x, surOut)}
					y={mix(tileCentro.y, sur.y, surOut)}
					z={-8 * (1 - surOut)}
					w={sur.w}
					h={sur.h}
					rotate={-sur.rotate}
					radius={sur.radius}
					skin={sur.skin}
					glow={sur.glow}
					dim={0.5 * (1 - progress(frame, T.toTiles[0] + 18, T.toTiles[1] + 6, ease.soft))}
					opacity={progress(frame, T.toTiles[0] + 14, T.toTiles[0] + 22, ease.soft)}
					content={{w: TILE.w, h: TILE.h, scale: sur.w / TILE.w, opacity: folding}}
				>
					<BranchTile frame={frame} reveal={T.toTiles[0] + 18} branch="Sur" cash="4.850,00" sales="1" />
				</Surface>
			) : null}
			<Surface
				x={centro.p > 0 ? centro.x : mix(CAJA.x, tileCentro.x, shrink)}
				y={centro.p > 0 ? centro.y : mix(CAJA.y, tileCentro.y, shrink)}
				w={w}
				h={centro.p > 0 ? centro.h : mix(CAJA.h, TILE.h, shrink)}
				rotate={centro.rotate}
				radius={centro.radius}
				skin={centro.skin}
				glow={centro.glow}
				dim={mix(0.62, 0, lit)}
			>
				{/* Both layouts ride the plate as it changes size, so the register visibly becomes the tile. */}
				{cajaContent > 0 ? (
					<div style={{position: 'absolute', left: 0, top: 0, width: CAJA.w, height: CAJA.h, opacity: cajaContent, transform: `scale(${w / CAJA.w})`, transformOrigin: '0 0'}}>
						<CajaSurface frame={frame} />
					</div>
				) : null}
				{tileContent > 0 ? (
					<div style={{position: 'absolute', left: 0, top: 0, width: TILE.w, height: TILE.h, opacity: tileContent, transform: `scale(${w / TILE.w})`, transformOrigin: '0 0'}}>
						<BranchTile frame={frame} reveal={T.toTiles[0] + 16} branch="Centro" cash="11.552,00" sales="2" />
					</div>
				) : null}
			</Surface>
			{raised > 0.002 ? (
				<Surface
					rests="plate"
					x={cash.x}
					y={cash.y}
					z={1 + 96 * raised}
					scale={1 + 0.07 * raised}
					w={CAJA_CASH.w}
					h={CAJA_CASH.h}
					radius={10}
					glow={raised}
					content={{w: CAJA_CASH.w, h: CAJA_CASH.h}}
				>
					<CajaCash frame={frame} />
				</Surface>
			) : null}
			<Rule frame={frame} />
			{frame >= T.chipFly[0] && absorbed < 1 ? (
				<Token
					label="+ AR$ 9.700,00"
					x={mix(cajaLeft - 240, cash.x, slide)}
					y={mix(RULE_Y, cash.y + 22, drop)}
					z={mix(40, 112, drop)}
					scale={1 - 0.3 * absorbed}
					opacity={progress(frame, T.chipFly[0], T.chipFly[0] + 10, ease.soft) * (1 - absorbed)}
				/>
			) : null}
		</>
	);
};
