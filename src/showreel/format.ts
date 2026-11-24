import {createContext, useContext} from 'react';
import type {Rect} from './layout';

/** How the one film is composed for a frame shape. The story, timing and surfaces are shared; only the staging changes. */
export type Format = {
	width: number;
	height: number;
	/** Where the centre of the surface on screen is held: beside the copy in landscape, under it in portrait. */
	hero: {x: number; y: number};
	/** Camera distance while each surface holds the frame. */
	zoom: {pos: number; stock: number; caja: number};
	/** Scene copy. */
	caption: {x: number; y: number; align: 'left' | 'center'; size: number};
	/** "En cada sucursal", set against the two branch tiles. */
	branchCaption: {y: number; size: number};
	/** Where each branch tile sits, relative to the point the film comes to rest on. */
	tiles: {centro: {x: number; y: number}; sur: {x: number; y: number}};
	/** The call to action runs on one line when the frame is wide enough for it. */
	ctaLines: 1 | 2;
};

export const LANDSCAPE: Format = {
	width: 1920,
	height: 1080,
	hero: {x: 1250, y: 540},
	// Caja diaria is the widest surface: it is framed from a step further back so it clears both the copy and the frame edge.
	zoom: {pos: 1, stock: 1, caja: 0.95},
	caption: {x: 124, y: 540, align: 'left', size: 76},
	branchCaption: {y: 812, size: 64},
	tiles: {centro: {x: -345, y: -80}, sur: {x: 345, y: -80}},
	ctaLines: 1,
};

/** 9:16 for Reels, Stories and X: copy on top, the surface under it, everything inside the area the apps leave clear. */
export const PORTRAIT: Format = {
	width: 1080,
	height: 1920,
	hero: {x: 540, y: 1060},
	zoom: {pos: 0.88, stock: 0.92, caja: 0.81},
	caption: {x: 540, y: 640, align: 'center', size: 88},
	branchCaption: {y: 470, size: 80},
	tiles: {centro: {x: 0, y: -140}, sur: {x: 0, y: 250}},
	ctaLines: 2,
};

export const FormatContext = createContext<Format>(LANDSCAPE);
export const useFormat = () => useContext(FormatContext);

/** The world point the camera must hold at the centre of the frame for `rect` to sit on the format's hero spot. */
export const focusOn = (format: Format, rect: Rect, zoom: number) => ({
	x: rect.x - (format.hero.x - format.width / 2) / zoom,
	y: rect.y - (format.hero.y - format.height / 2) / zoom,
});
