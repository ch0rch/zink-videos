import type {FC} from 'react';
import {Img, staticFile} from 'remotion';
import {LOCKUP} from '../brand/symbol';
import {useFormat} from '../format';
import {FOCUS, LOCKUP_ORIGIN, LOCKUP_SCALE} from '../layout';
import {ease, progress, settle} from '../motion';
import {SymbolModules} from '../primitives/SymbolModules';
import {T} from '../timeline';
import {brand, fonts, stage} from '../theme';
import {CENTRO_MODULE, SUR_MODULE} from './CajaAct';

/** Left edge of the wordmark outlines inside the official artwork, with a little air. */
const WORDMARK_LEFT = 98;
const baseline = LOCKUP_ORIGIN.y + LOCKUP.height * LOCKUP_SCALE;

/** The rest of the symbol closes around the two branch modules, and the wordmark is drawn out of it. */
export const PayoffAct: FC<{frame: number}> = ({frame}) => {
	// A narrow frame cannot hold the call to action on one line: it stacks, and the type grows to match the frame.
	const stacked = useFormat().ctaLines === 2;
	if (frame < T.toMark[0]) return null;
	const word = progress(frame, T.wordmark[0], T.wordmark[1], ease.out);
	const tagline = progress(frame, T.tagline, T.tagline + 36, ease.out);
	const cta = progress(frame, T.cta, T.cta + 34, ease.out);
	const wordWidth = (LOCKUP.width - WORDMARK_LEFT) * LOCKUP_SCALE;

	return (
		<>
			<SymbolModules
				origin={LOCKUP_ORIGIN}
				scale={LOCKUP_SCALE}
				pose={(index) => {
					if (index === CENTRO_MODULE || index === SUR_MODULE) return null;
					// The chain closes outward from the two modules the branches became.
					const distance = Math.min(Math.abs(index - CENTRO_MODULE), Math.abs(index - SUR_MODULE));
					const start = T.toMark[0] + 26 + distance * 3;
					return {scale: settle(frame, start, 22), opacity: progress(frame, start, start + 6, ease.soft)};
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: LOCKUP_ORIGIN.x + WORDMARK_LEFT * LOCKUP_SCALE,
					top: LOCKUP_ORIGIN.y,
					width: wordWidth * word,
					height: LOCKUP.height * LOCKUP_SCALE,
					overflow: 'hidden',
				}}
			>
				<Img
					src={staticFile('brand/zinkerp-wordmark-dark.svg')}
					style={{
						position: 'absolute',
						left: -WORDMARK_LEFT * LOCKUP_SCALE - (1 - word) * 22,
						top: 0,
						width: LOCKUP.width * LOCKUP_SCALE,
						height: LOCKUP.height * LOCKUP_SCALE,
						maxWidth: 'none',
					}}
				/>
			</div>
			<div style={{position: 'absolute', left: FOCUS.x - 600, top: baseline + 44, width: 1200, overflow: 'hidden', textAlign: 'center', paddingBottom: 8}}>
				<div
					style={{
						fontFamily: fonts.display,
						fontWeight: 600,
						fontSize: stacked ? 40 : 34,
						lineHeight: 1.25,
						letterSpacing: '-0.02em',
						color: stage.text,
						whiteSpace: 'nowrap',
						transform: `translateY(${(1 - tagline) * 110}%)`,
					}}
				>
					<span style={{color: stage.textMuted}}>Ventas, stock y caja.</span> En un solo sistema
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: FOCUS.x - 600,
					top: baseline + (stacked ? 128 : 116),
					width: 1200,
					textAlign: 'center',
					fontFamily: fonts.display,
					fontWeight: 500,
					fontSize: stacked ? 30 : 23,
					lineHeight: 1.5,
					letterSpacing: '-0.005em',
					color: stage.text,
					whiteSpace: 'nowrap',
					opacity: cta * 0.92,
					transform: `translateY(${(1 - cta) * 10}px)`,
				}}
			>
				Agendá una demo, desde 15 minutos
				{stacked ? <br /> : <span style={{color: stage.textMuted, margin: '0 14px'}}>·</span>}
				<span style={{color: brand.cyanLight, fontWeight: 600}}>zinkerp.com/agendar-demo</span>
			</div>
		</>
	);
};
