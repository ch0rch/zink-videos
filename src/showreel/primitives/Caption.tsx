import type {FC} from 'react';
import {ease, progress} from '../motion';
import {fonts, stage} from '../theme';

type Props = {
	frame: number;
	lines: readonly string[];
	/** [in, out] frames. */
	span: readonly [number, number];
	x: number;
	y: number;
	align?: 'left' | 'center';
	size?: number;
};

/** A line of copy that moves as one designed object: it rises out of its own baseline and leaves the same way. */
export const Caption: FC<Props> = ({frame, lines, span, x, y, align = 'left', size = 76}) => {
	const [enter, exit] = span;
	if (frame < enter || frame > exit + 24) return null;
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				transform: align === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
				textAlign: align,
				fontFamily: fonts.display,
				fontWeight: 800,
				fontSize: size,
				lineHeight: 1.08,
				letterSpacing: '-0.035em',
				color: stage.text,
				whiteSpace: 'nowrap',
			}}
		>
			{lines.map((line, index) => {
				const arrive = progress(frame, enter + index * 5, enter + index * 5 + 36, ease.out);
				const leave = progress(frame, exit + index * 3, exit + index * 3 + 18, ease.in);
				return (
					<div key={line} style={{overflow: 'hidden', padding: '0.06em 0.04em 0.12em', margin: '-0.06em -0.04em -0.12em'}}>
						<div style={{transform: `translateY(${(1 - arrive) * 112 - leave * 112}%)`, opacity: 1 - leave}}>{line}</div>
					</div>
				);
			})}
		</div>
	);
};
