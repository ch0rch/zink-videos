import type {FC} from 'react';
import {ease, progress} from '../motion';

type Props = {
	frame: number;
	/** Each state takes over at its frame; the columns that differ roll to the new glyph. */
	states: readonly {at: number; value: string}[];
	/** Fixed text ahead of the figure ("AR$ "): it shares the figure's row but never rolls. */
	prefix?: string;
	/** Which side the digits are anchored to when the length changes. */
	anchor?: 'left' | 'right';
	duration?: number;
	stagger?: number;
};

/** A number that changes the way a mechanical counter does: only the columns that differ move. */
export const Odometer: FC<Props> = ({frame, states, prefix = '', anchor = 'right', duration = 14, stagger = 1}) => {
	if (frame < states[0].at) return null;
	let index = 0;
	for (let i = 0; i < states.length; i++) {
		if (frame >= states[i].at) index = i;
	}
	const current = states[index];
	// Spaces become non-breaking so a column holding one keeps its width.
	const before = index === 0 ? '' : states[index - 1].value.replaceAll(' ', '\u00a0');
	const after = current.value.replaceAll(' ', '\u00a0');
	const length = Math.max(before.length, after.length);
	const [from, to] = [before, after].map((value) => (anchor === 'right' ? value.padStart(length, '\0') : value.padEnd(length, '\0')));
	const appear = index === 0 ? progress(frame, current.at, current.at + 10, ease.soft) : 1;

	return (
		// Every column is a box of the same height on one flex row, so rolling and resting glyphs share a baseline.
		<span style={{display: 'inline-flex', whiteSpace: 'pre', fontVariantNumeric: 'tabular-nums', lineHeight: 1.2}}>
			{prefix ? <span style={{opacity: appear}}>{prefix}</span> : null}
			{Array.from({length}, (_, column) => {
				const a = from[column] === '\0' ? '' : from[column];
				const b = to[column] === '\0' ? '' : to[column];
				if (a === b) return <span key={column}>{b}</span>;
				const start = current.at + column * stagger;
				const p = progress(frame, start, start + duration, ease.out);
				// A column that did not exist opens up instead of popping in, so the figure never jumps sideways.
				// Tabular digits are exactly 1ch wide; punctuation is roughly half of that.
				const opening = before !== '' && (a === '' || b === '') && p < 1;
				const full = /\d/.test(a || b) ? 1 : 0.48;
				return (
					<span key={column} style={{display: 'inline-grid', overflow: 'hidden', height: '1.2em', width: opening ? `${(b === '' ? 1 - p : p) * full}ch` : undefined}}>
						<span style={{gridArea: '1 / 1', transform: `translateY(${-p * 100}%)`, opacity: 1 - p}}>{a}</span>
						<span style={{gridArea: '1 / 1', transform: `translateY(${(1 - p) * 100}%)`, opacity: p}}>{b}</span>
					</span>
				);
			})}
		</span>
	);
};
