// Renders single frames for review: `node scripts/render-stills.mjs [seconds,...] [--dir=name] [--vertical]`.
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {renderStill} from '@remotion/renderer';
import {OUT_DIR, prepare} from './remotion.mjs';

const args = process.argv.slice(2);
const dirName = args.find((arg) => arg.startsWith('--dir='))?.slice(6) ?? 'stills';
const times = (args.find((arg) => !arg.startsWith('--')) ?? '0,1,2.5,4.5,6.5,8.5,10.5,12.5,14,14.8').split(',').map(Number);

const {serveUrl, composition} = await prepare();
const dir = path.join(OUT_DIR, dirName);
mkdirSync(dir, {recursive: true});

for (const seconds of times) {
	const frame = Math.min(composition.durationInFrames - 1, Math.round(seconds * composition.fps));
	const output = path.join(dir, `t${seconds.toFixed(2).padStart(5, '0')}s-f${String(frame).padStart(3, '0')}.png`);
	await renderStill({serveUrl, composition, frame, output, imageFormat: 'png'});
	console.log(output);
}
