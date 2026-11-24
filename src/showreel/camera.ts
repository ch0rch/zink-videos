import {focusOn, type Format} from './format';
import {CAJA, FOCUS, POS, STOCK} from './layout';
import {ease, progress, track} from './motion';
import type {Camera} from './primitives/World';
import {T} from './timeline';

const toStock = {from: T.pillFly[0] - 6, to: T.pillFly[1] + 10};
const toCaja = {from: T.lineGrow[0] + 8, to: T.lineTail[1]};
const toBranches = {from: T.toTiles[0], to: T.toTiles[1] + 6};
const tiltIn = {from: T.morph[0], to: T.morph[1] + 24, easing: ease.soft};

/** While a surface holds the frame the camera creeps in on it; each journey to the next one gives that distance back. */
const PUSH = 1.035;

/** One camera for the whole film: it follows the travelling object, then comes to rest on the mark. */
export const cameraAt = (frame: number, format: Format): Camera => {
	const {zoom} = format;
	const pos = focusOn(format, POS, zoom.pos);
	const stock = focusOn(format, STOCK, zoom.stock);
	const caja = focusOn(format, CAJA, zoom.caja);
	// A slow, never-quite-still drift, as on a product shoot. It dies out before the final lockup.
	const alive = progress(frame, 40, 150, ease.soft) * (1 - progress(frame, T.toMark[0] - 30, T.wordmark[0], ease.soft));
	return {
		x:
			track(frame, pos.x, [
				{...toStock, value: stock.x},
				{...toCaja, value: caja.x},
				{...toBranches, value: FOCUS.x},
			]) +
			14 * Math.sin(frame / 96) * alive,
		y: track(frame, pos.y, [
			{...toStock, value: stock.y},
			{...toCaja, value: caja.y},
			{...toBranches, value: FOCUS.y},
		]),
		zoom: track(frame, zoom.pos, [
			{from: T.morph[1], to: toStock.from + 20, value: zoom.pos * PUSH, easing: ease.soft},
			{...toStock, value: zoom.stock},
			{from: toStock.to - 10, to: toCaja.from + 20, value: zoom.stock * PUSH, easing: ease.soft},
			{...toCaja, value: zoom.caja},
			{from: toCaja.to - 10, to: toBranches.from + 20, value: zoom.caja * PUSH, easing: ease.soft},
			{...toBranches, value: 1},
		]),
		rx:
			track(frame, 0, [
				{...tiltIn, value: 5},
				{...toStock, value: 6.5},
				{...toCaja, value: 4},
				{...toBranches, value: 0},
			]) +
			0.6 * Math.sin(frame / 83 + 2) * alive,
		ry:
			track(frame, 0, [
				{...tiltIn, value: -9},
				{...toStock, value: 8},
				{...toCaja, value: -7},
				{...toBranches, value: 0},
			]) +
			1.1 * Math.sin(frame / 71 + 0.8) * alive,
	};
};

/** The key light sits behind whatever holds the frame: the mark at both ends, the hero surface in between. */
export const lightAt = (frame: number, format: Format) => ({
	x: track(frame, format.width / 2, [
		{from: T.morph[0], to: T.morph[1], value: format.hero.x},
		{...toBranches, value: format.width / 2},
	]),
	y: track(frame, format.height / 2, [
		{from: T.morph[0], to: T.morph[1], value: format.hero.y},
		{...toBranches, value: format.height / 2},
	]),
	strength: track(frame, 0.5, [
		{from: T.morph[0], to: T.morph[1], value: 1},
		{from: T.toMark[0], to: T.toMark[1], value: 0.7},
	]),
});
