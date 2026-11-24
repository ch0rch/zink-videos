import type {FC} from 'react';
import {SYMBOL_MODULES, type SymbolModule} from '../brand/symbol';

export type ModulePose = {dx?: number; dy?: number; scale?: number; opacity?: number};

type Props = {
	/** Top-left corner of the official artwork, in world space, and its scale. */
	origin: {x: number; y: number};
	scale: number;
	/** Pose of each module; return null for a module another object is standing in for. */
	pose: (index: number, module: SymbolModule) => ModulePose | null;
};

export const moduleSide = (scale: number) => SYMBOL_MODULES[0].r * Math.SQRT2 * scale;

export const modulePoint = (index: number, origin: {x: number; y: number}, scale: number) => ({
	x: origin.x + SYMBOL_MODULES[index].cx * scale,
	y: origin.y + SYMBOL_MODULES[index].cy * scale,
});

/** The symbol's sixteen modules at the exact positions and fills of the official artwork, each free to move. */
export const SymbolModules: FC<Props> = ({origin, scale, pose}) => (
	<>
		{SYMBOL_MODULES.map((module, index) => {
			const current = pose(index, module);
			if (!current || (current.opacity ?? 1) <= 0) return null;
			// Half a pixel of overlap closes the hairline seams between neighbouring modules.
			const side = module.r * Math.SQRT2 * scale + 0.5;
			return (
				<div
					key={index}
					style={{
						position: 'absolute',
						left: origin.x + module.cx * scale + (current.dx ?? 0),
						top: origin.y + module.cy * scale + (current.dy ?? 0),
						width: side,
						height: side,
						opacity: current.opacity ?? 1,
						backgroundColor: module.fill,
						transform: `translate(-50%, -50%) rotate(45deg) scale(${current.scale ?? 1})`,
					}}
				/>
			);
		})}
	</>
);
