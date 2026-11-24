import type {FC, ReactNode} from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';

export type Camera = {
	/** World point held at the centre of the frame. */
	x: number;
	y: number;
	zoom: number;
	/** Tilt of the product plane, in degrees. */
	rx: number;
	ry: number;
};

/** One plane holding every surface, filmed by a camera that pans, pushes and tilts. */
export const World: FC<{camera: Camera; children: ReactNode}> = ({camera, children}) => {
	const {width, height} = useVideoConfig();
	return (
		<AbsoluteFill style={{perspective: 2400, perspectiveOrigin: '50% 50%'}}>
			<div
				style={{
					position: 'absolute',
					left: width / 2,
					top: height / 2,
					width: 0,
					height: 0,
					transformStyle: 'preserve-3d',
					transform: `rotateX(${camera.rx}deg) rotateY(${camera.ry}deg) scale(${camera.zoom}) translate3d(${-camera.x}px, ${-camera.y}px, 0)`,
				}}
			>
				{children}
			</div>
		</AbsoluteFill>
	);
};
