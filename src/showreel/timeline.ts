export const FPS = 60;
/** 120 BPM: one beat every 30 frames. The cues that carry weight sit on a beat. */
export const BEAT = 30;

/** Every cue of the film, in frames. Spans are [start, end]. */
export const T = {
	/** 14.9 s: just under the 15 s ceiling, with room for the container's audio padding. */
	total: 894,

	// 1 · The mark, and the sale that comes out of it
	glint: 3,
	markIn: 8,
	morph: [56, 114],
	posChrome: 90,
	scan1: 120,
	scan2: 150,
	caption1: [165, 236],
	press: [195, 204, 216],
	modalIn: 210,

	// 2 · The quantity leaves the sale and lands on the stock
	pillPop: 234,
	pillFly: [246, 300],
	stockReveal: 250,
	stockRoll: 308,
	caption2: [324, 388],

	// 3 · The stock row's rule runs on and becomes the cash register's
	lineDraw: [338, 374],
	lineGrow: [396, 446],
	lineTail: [416, 470],
	cajaReveal: 420,
	chipFly: [450, 480],
	cashRoll: 480,
	caption3: [514, 578],

	// 4 · One register becomes one per branch
	toTiles: [585, 630],
	caption4: [646, 696],

	// 5 · The branches fold back into the mark
	toMark: [702, 750],
	wordmark: [750, 790],
	tagline: 780,
	cta: 804,
} as const;
