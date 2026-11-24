import {Config} from '@remotion/cli/config';

// PNG frames keep the dark violet gradients free of JPEG blocking before x264.
Config.setVideoImageFormat('png');
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(14);
Config.setColorSpace('bt709');
Config.setOverwriteOutput(true);
