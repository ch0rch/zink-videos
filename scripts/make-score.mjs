// Synthesises the film's score and sound design from oscillators and seeded noise: no samples, no third-party audio.
// Every cue is read from the film's own timeline, so picture and sound cannot drift apart.
// `node scripts/make-score.mjs` writes out/showreel-15/audio/zinkerp-showreel-15-score.wav (48 kHz, stereo, 16 bit).
import {mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {BEAT, FPS, T} from '../src/showreel/timeline.ts';
import {OUT_DIR} from './remotion.mjs';

const RATE = 48000;
const LENGTH = Math.round((T.total / FPS) * RATE);
const left = new Float64Array(LENGTH);
const right = new Float64Array(LENGTH);
/** Reverb send: tonal hits go here as well, so they sit in one room. */
const send = new Float64Array(LENGTH);

const seconds = (frame) => frame / FPS;
const db = (value) => 10 ** (value / 20);

// Seeded noise: the same file on every run.
let seed = 0x5a1c;
const noise = () => {
	seed = (seed + 0x6d2b79f5) | 0;
	let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return (((t ^ (t >>> 14)) >>> 0) / 4294967296) * 2 - 1;
};

/** Writes `length` seconds of `sample(t)` at `start`, panned -1..1, with an optional share sent to the reverb. */
const write = (start, length, sample, {gain = 1, pan = 0, wet = 0} = {}) => {
	const first = Math.round(start * RATE);
	const count = Math.round(length * RATE);
	const l = gain * Math.cos(((pan + 1) * Math.PI) / 4);
	const r = gain * Math.sin(((pan + 1) * Math.PI) / 4);
	for (let i = 0; i < count; i++) {
		const index = first + i;
		if (index < 0 || index >= LENGTH) continue;
		const value = sample(i / RATE);
		left[index] += value * l;
		right[index] += value * r;
		send[index] += value * gain * wet;
	}
};

/** A struck tone: partials with a soft attack and an exponential tail. */
const tone = (start, frequencies, {decay = 0.4, attack = 0.004, gain = 0.1, pan = 0, wet = 0.5} = {}) =>
	write(
		start,
		decay * 6,
		(t) => {
			const envelope = Math.min(1, t / attack) * Math.exp(-t / decay);
			let value = 0;
			for (let i = 0; i < frequencies.length; i++) value += Math.sin(2 * Math.PI * frequencies[i] * t) / (i + 1);
			return value * envelope;
		},
		{gain, pan, wet},
	);

/** A soft low impact: a sine that drops a few hertz as it dies. No click, no boom. */
const thump = (start, {frequency = 52, decay = 0.16, gain = 0.25} = {}) =>
	write(start, decay * 7, (t) => Math.sin(2 * Math.PI * (frequency * t + 14 * decay * (1 - Math.exp(-t / decay)))) * Math.min(1, t / 0.006) * Math.exp(-t / decay), {gain});

/** A tactile tick: two milliseconds of filtered noise over a short high partial. */
const tick = (start, {frequency = 2400, gain = 0.05, pan = 0} = {}) => {
	let low = 0;
	write(
		start,
		0.05,
		(t) => {
			low += 0.35 * (noise() - low);
			return (low * Math.exp(-t / 0.002) + 0.6 * Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t / 0.012)) * Math.min(1, t / 0.0005);
		},
		{gain, pan, wet: 0.3},
	);
};

/** Air moving past the camera: band-limited noise under a bell-shaped envelope. */
const air = (start, length, {gain = 0.03, from = 500, to = 1100} = {}) => {
	let low = 0;
	let band = 0;
	write(
		start,
		length,
		(t) => {
			const x = t / length;
			const cutoff = from + (to - from) * x;
			const k = 1 - Math.exp((-2 * Math.PI * cutoff) / RATE);
			low += k * (noise() - low);
			band += 0.02 * (low - band);
			return (low - band) * Math.sin(Math.PI * x) ** 2;
		},
		{gain, wet: 0.4},
	);
};

// ── Bed: a quiet open chord on D that only becomes major when the mark resolves ─────────────
const D = 146.83;
const padStart = seconds(T.morph[0]);
const resolve = seconds(T.toMark[1]);
const end = seconds(T.total);
write(
	0,
	end,
	(t) => {
		const swell = Math.min(1, Math.max(0, (t - padStart) / 1.6)) * Math.min(1, Math.max(0, (end - t) / 0.7));
		const breathing = 1 + 0.12 * Math.sin(2 * Math.PI * 0.25 * t);
		const major = Math.min(1, Math.max(0, (t - resolve + 0.2) / 0.5));
		const open =
			Math.sin(2 * Math.PI * (D / 2) * t) * 0.38 +
			Math.sin(2 * Math.PI * D * 1.003 * t) * 0.6 +
			Math.sin(2 * Math.PI * D * 1.5 * t) * 0.5 +
			Math.sin(2 * Math.PI * D * 2 * t) * 0.24 +
			Math.sin(2 * Math.PI * D * 2.25 * t) * 0.2;
		const third = Math.sin(2 * Math.PI * D * 2.52 * t) * 0.3 + Math.sin(2 * Math.PI * D * 4 * t) * 0.12;
		return (open + third * major) * swell * breathing * (1 + 0.5 * major);
	},
	{gain: 0.05, wet: 0.25},
);

// A felt pulse on every beat while the product is on screen: it is what makes the cuts land at 120 BPM.
for (let frame = T.scan1; frame < T.toMark[0]; frame += BEAT) thump(seconds(frame), {frequency: 46, decay: 0.09, gain: 0.07});

// ── 1 · Mark and sale ────────────────────────────────────────────────────────────────────────
tone(seconds(T.glint), [2093, 3136, 4186], {decay: 0.22, gain: 0.045, pan: -0.1, wet: 0.8});
for (let i = 0; i < 15; i++) tick(seconds(T.markIn + i * 2), {frequency: 1800 + i * 60, gain: 0.014, pan: -0.3 + i * 0.04});
air(seconds(T.morph[0]), seconds(T.morph[1] - T.morph[0]) + 0.1, {gain: 0.035, from: 300, to: 1400});
thump(seconds(T.morph[1] - 4), {gain: 0.22, decay: 0.2});
for (const frame of [T.scan1, T.scan2]) {
	tone(seconds(frame), [1318.5], {decay: 0.05, attack: 0.003, gain: 0.05, pan: 0.25, wet: 0.35});
	tick(seconds(frame + 16), {gain: 0.025, pan: 0.3});
}
tick(seconds(T.press[0]), {frequency: 900, gain: 0.07, pan: 0.3});
thump(seconds(T.press[0]), {frequency: 120, decay: 0.03, gain: 0.08});
tone(seconds(T.modalIn), [880], {decay: 0.32, gain: 0.05, pan: 0.1, wet: 0.7});
tone(seconds(T.modalIn) + 0.09, [1174.7], {decay: 0.45, gain: 0.05, pan: 0.15, wet: 0.7});

// ── 2 · Stock ────────────────────────────────────────────────────────────────────────────────
tick(seconds(T.pillPop), {frequency: 1568, gain: 0.04, pan: -0.2});
air(seconds(T.pillFly[0]), seconds(T.pillFly[1] - T.pillFly[0]), {gain: 0.03});
thump(seconds(T.pillFly[1]), {gain: 0.17});
tick(seconds(T.pillFly[1]), {gain: 0.04, pan: 0.2});
tick(seconds(T.stockRoll + 4), {frequency: 2000, gain: 0.035, pan: 0.15});
tick(seconds(T.stockRoll + 10), {frequency: 2000, gain: 0.035, pan: 0.2});

// ── 3 · Caja: the totals fall into place as an arpeggio of the same chord ────────────────────
air(seconds(T.lineGrow[0]), seconds(T.lineTail[1] - T.lineGrow[0]), {gain: 0.03, from: 400, to: 1300});
thump(seconds(T.cashRoll), {gain: 0.2});
[0, 10, 18, 26, 32].forEach((offset, i) => tone(seconds(T.cashRoll + offset), [[587.33, 739.99, 880, 1174.7, 1479.98][i]], {decay: 0.3, gain: 0.034, pan: 0.1 + i * 0.08, wet: 0.7}));

// ── 4 · Branches ─────────────────────────────────────────────────────────────────────────────
air(seconds(T.toTiles[0]), seconds(T.toTiles[1] - T.toTiles[0]), {gain: 0.025});
thump(seconds(T.toTiles[1]), {gain: 0.13});
tick(seconds(T.toTiles[0] + 40), {frequency: 2000, gain: 0.03, pan: -0.25});
tick(seconds(T.toTiles[0] + 46), {frequency: 2000, gain: 0.03, pan: 0.25});

// ── 5 · Payoff: the chord resolves when the symbol closes ────────────────────────────────────
air(seconds(T.toMark[0]), seconds(T.toMark[1] - T.toMark[0]), {gain: 0.03, from: 1200, to: 400});
thump(resolve, {frequency: 73.4, decay: 0.3, gain: 0.2});
tone(resolve, [293.66, 587.33], {decay: 1.1, attack: 0.02, gain: 0.05, pan: -0.15, wet: 0.9});
tone(resolve + 0.03, [369.99], {decay: 1.1, attack: 0.03, gain: 0.04, pan: 0.15, wet: 0.9});
tone(resolve + 0.06, [440, 880], {decay: 1.2, attack: 0.03, gain: 0.035, wet: 0.9});
tone(seconds(T.tagline), [659.25], {decay: 0.9, attack: 0.02, gain: 0.022, pan: 0.2, wet: 0.9});

// ── Room: a small Schroeder reverb on the send ───────────────────────────────────────────────
const reverb = (input, delays, feedback) => {
	const output = new Float64Array(LENGTH);
	for (const delay of delays) {
		const buffer = new Float64Array(delay);
		let damp = 0;
		for (let i = 0; i < LENGTH; i++) {
			const delayed = buffer[i % delay];
			damp += 0.35 * (delayed - damp);
			buffer[i % delay] = input[i] + damp * feedback;
			output[i] += delayed / delays.length;
		}
	}
	return output;
};
const roomLeft = reverb(send, [1687, 1931, 2251, 2503], 0.8);
const roomRight = reverb(send, [1733, 1999, 2203, 2579], 0.8);

// ── Master: gentle saturation instead of a limiter, peak at -3 dBFS ──────────────────────────
let peak = 0;
for (let i = 0; i < LENGTH; i++) {
	left[i] = Math.tanh((left[i] + roomLeft[i] * 0.5) * 3.2);
	right[i] = Math.tanh((right[i] + roomRight[i] * 0.5) * 3.2);
	peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const master = db(-1.5) / peak;

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + LENGTH * 4, 4);
header.write('WAVEfmt ', 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(RATE, 24);
header.writeUInt32LE(RATE * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(LENGTH * 4, 40);
const pcm = Buffer.alloc(LENGTH * 4);
for (let i = 0; i < LENGTH; i++) {
	pcm.writeInt16LE(Math.round(left[i] * master * 32767), i * 4);
	pcm.writeInt16LE(Math.round(right[i] * master * 32767), i * 4 + 2);
}

const directory = path.join(OUT_DIR, 'audio');
mkdirSync(directory, {recursive: true});
const file = path.join(directory, 'zinkerp-showreel-15-score.wav');
writeFileSync(file, Buffer.concat([header, pcm]));
console.log(file);
