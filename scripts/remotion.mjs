// Shared by the render scripts: bundle the project once and resolve the composition.
// Pass --vertical to any of them to work on the 1080×1920 recomposition instead of the 16:9 master.
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {selectComposition} from '@remotion/renderer';

export const VERTICAL = process.argv.includes('--vertical');
export const OUT_DIR = path.resolve('out/showreel-15');
/** Base name of every deliverable of the chosen cut. */
export const NAME = VERTICAL ? 'zinkerp-showreel-15-vertical' : 'zinkerp-showreel-15';

export const prepare = async () => {
	const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
	const composition = await selectComposition({serveUrl, id: VERTICAL ? 'ZinkShowreel15Vertical' : 'ZinkShowreel15'});
	return {serveUrl, composition};
};
