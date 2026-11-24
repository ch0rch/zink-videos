// Turns the silent picture and the score into the deliverables: the film with sound, the poster and the contact sheet.
// `node scripts/finish.mjs [--vertical]`. Every still is decoded from the final MP4, so what is reviewed is what ships.
import {execFileSync} from 'node:child_process';
import {mkdirSync, rmSync} from 'node:fs';
import path from 'node:path';
import {NAME, OUT_DIR, VERTICAL} from './remotion.mjs';

const silent = path.join(OUT_DIR, `${NAME}-mudo.mp4`);
const score = path.join(OUT_DIR, 'audio', 'zinkerp-showreel-15-score.wav');
const film = path.join(OUT_DIR, `${NAME}.mp4`);
const frames = path.join(OUT_DIR, VERTICAL ? 'frames-vertical' : 'frames');
// Stills from an earlier cut would pass for current ones: the folder is rebuilt every time.
rmSync(frames, {recursive: true, force: true});
mkdirSync(frames, {recursive: true});

const ffmpeg = (...args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], {stdio: 'inherit'});
const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', silent]).toString());

// Picture is copied untouched; the audio is cut to the picture so the container never runs past 15 s.
ffmpeg('-i', silent, '-i', score, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-t', String(duration), '-movflags', '+faststart', film);

// The moments the brief asks to review, plus the hand-offs between scenes.
const moments = [0.0, 1.0, 2.8, 3.9, 4.5, 5.5, 6.5, 7.3, 8.5, 9.6, 10.5, 11.3, 12.0, 12.5, 14.0, 14.8];
const stills = moments.map((seconds) => {
	const file = path.join(frames, `t${seconds.toFixed(1).padStart(4, '0')}s.png`);
	// -ss after -i decodes up to the exact frame instead of snapping to a keyframe.
	ffmpeg('-i', film, '-ss', String(Math.min(seconds, duration - 1 / 60)), '-frames:v', '1', file);
	return file;
});
ffmpeg('-i', film, '-ss', String(duration - 1 / 60), '-frames:v', '1', path.join(OUT_DIR, VERTICAL ? 'poster-vertical.png' : 'poster.png'));
// The sheet is an overview, so it is a JPEG at a size that opens anywhere; the full-resolution frames sit next to it.
execFileSync(
	'magick',
	[
		'montage',
		...stills,
		'-tile',
		VERTICAL ? '8x2' : '4x4',
		'-geometry',
		VERTICAL ? '360x640+6+6' : '640x360+6+6',
		'-background',
		'#0b0811',
		'-quality',
		'92',
		path.join(OUT_DIR, VERTICAL ? 'contact-sheet-vertical.jpg' : 'contact-sheet.jpg'),
	],
	{stdio: 'inherit'},
);

console.log(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,width,height,r_frame_rate,nb_frames,pix_fmt', '-of', 'default=nw=1', film]).toString());
