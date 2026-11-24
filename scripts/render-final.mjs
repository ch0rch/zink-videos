// Renders the silent 60 fps picture: `node scripts/render-final.mjs [--vertical] [--draft]`.
// scripts/make-score.mjs writes the score and scripts/finish.mjs joins the two.
import {mkdirSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {renderMedia} from '@remotion/renderer';
import {NAME, OUT_DIR, prepare} from './remotion.mjs';

const draft = process.argv.includes('--draft');
const {serveUrl, composition} = await prepare();
mkdirSync(OUT_DIR, {recursive: true});
const outputLocation = path.join(OUT_DIR, draft ? `${NAME}-draft.mp4` : `${NAME}-mudo.mp4`);

let lastLogged = -1;
await renderMedia({
	serveUrl,
	composition,
	codec: 'h264',
	outputLocation,
	// PNG frames keep the dark violet gradients free of JPEG blocking before x264 sees them.
	imageFormat: draft ? 'jpeg' : 'png',
	jpegQuality: 90,
	crf: draft ? 23 : 14,
	pixelFormat: 'yuv420p',
	colorSpace: 'bt709',
	x264Preset: draft ? 'veryfast' : 'slow',
	concurrency: Math.max(2, Math.floor(os.cpus().length / 2)),
	muted: true,
	onProgress: ({progress}) => {
		const percent = Math.floor(progress * 10) * 10;
		if (percent !== lastLogged) {
			lastLogged = percent;
			console.log(`render ${percent}%`);
		}
	},
});
console.log(outputLocation);
