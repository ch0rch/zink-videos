import type {FC} from 'react';
import {Composition} from 'remotion';
import {LANDSCAPE, PORTRAIT} from './showreel/format';
import {ZinkShowreel15} from './showreel/ZinkShowreel15';
import {FPS, T} from './showreel/timeline';

export const Root: FC = () => (
	<>
		<Composition
			id="ZinkShowreel15"
			component={ZinkShowreel15}
			defaultProps={{format: LANDSCAPE}}
			durationInFrames={T.total}
			fps={FPS}
			width={LANDSCAPE.width}
			height={LANDSCAPE.height}
		/>
		<Composition
			id="ZinkShowreel15Vertical"
			component={ZinkShowreel15}
			defaultProps={{format: PORTRAIT}}
			durationInFrames={T.total}
			fps={FPS}
			width={PORTRAIT.width}
			height={PORTRAIT.height}
		/>
	</>
);
