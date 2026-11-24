import type {CSSProperties} from 'react';
import {Easing, interpolate} from 'remotion';

type EasingFn = (t: number) => number;

export const ease = {
	/** Arrivals: fast out of the gate, long settle. */
	out: Easing.bezier(0.16, 1, 0.3, 1),
	/** Travel between scenes: weight at both ends. */
	inOut: Easing.bezier(0.72, 0, 0.18, 1),
	/** Departures. */
	in: Easing.bezier(0.6, 0, 0.9, 0.5),
	soft: Easing.bezier(0.33, 1, 0.68, 1),
} as const;

export const progress = (frame: number, from: number, to: number, easing: EasingFn = ease.out) =>
	interpolate(frame, [from, to], [0, 1], {easing, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type Step = {from: number; to: number; value: number; easing?: EasingFn};

/** A value with several targets is the sum of one eased response per change. */
export const track = (frame: number, initial: number, steps: readonly Step[]) => {
	let value = initial;
	let previous = initial;
	for (const step of steps) {
		value += (step.value - previous) * progress(frame, step.from, step.to, step.easing ?? ease.inOut);
		previous = step.value;
	}
	return value;
};

const ZETA = 0.82;
const OMEGA = 10;
const DAMPED = OMEGA * Math.sqrt(1 - ZETA * ZETA);

/** Closed-form damped spring: lands with about 1% overshoot, never bounces. */
export const settle = (frame: number, at: number, duration: number) => {
	const x = Math.max(0, (frame - at) / duration);
	return 1 - Math.exp(-ZETA * OMEGA * x) * (Math.cos(DAMPED * x) + ((ZETA * OMEGA) / DAMPED) * Math.sin(DAMPED * x));
};

/** A UI region arriving in place. */
export const rise = (frame: number, at: number, distance = 12, duration = 30): CSSProperties => {
	const p = progress(frame, at, at + duration);
	return {opacity: progress(frame, at, at + duration * 0.6, ease.soft), transform: `translateY(${(1 - p) * distance}px)`};
};
