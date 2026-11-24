import type {FC, ReactNode} from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {stage} from '../theme';

type Props = {
	frame: number;
	/** Screen position of the ambient key light; it trails the hero object. */
	light: {x: number; y: number; strength: number};
	children: ReactNode;
};

/** Dark violet ink, one soft key light, a restrained vignette and grain, all of it behind the product so the interface stays clean. */
export const Stage: FC<Props> = ({frame, light, children}) => (
	<AbsoluteFill style={{backgroundColor: stage.ink, overflow: 'hidden'}}>
		<AbsoluteFill
			style={{
				background: `radial-gradient(1150px 820px at ${light.x}px ${light.y}px, rgba(114,63,151,${0.34 * light.strength}), rgba(114,63,151,0) 72%)`,
			}}
		/>
		<AbsoluteFill
			style={{
				background: `radial-gradient(720px 520px at ${light.x + 420}px ${light.y + 300}px, rgba(16,176,230,${0.07 * light.strength}), rgba(16,176,230,0) 70%)`,
			}}
		/>
		<AbsoluteFill
			style={{
				backgroundImage: `url(${staticFile('textures/grain.png')})`,
				backgroundPosition: `${(frame * 197) % 512}px ${(frame * 331) % 512}px`,
				mixBlendMode: 'overlay',
				opacity: 0.1,
			}}
		/>
		<AbsoluteFill
			style={{
				background: 'radial-gradient(ellipse 78% 78% at 50% 50%, rgba(5,3,9,0) 55%, rgba(5,3,9,0.62) 100%)',
			}}
		/>
		{children}
	</AbsoluteFill>
);
