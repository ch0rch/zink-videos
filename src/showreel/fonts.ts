import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Montserrat is the brand typeface; Roboto is what the app itself renders in.
void loadFont({family: 'Montserrat', url: staticFile('fonts/Montserrat-Variable.ttf'), weight: '100 900'});
void loadFont({family: 'Roboto', url: staticFile('fonts/Roboto-Variable-latin.woff2'), weight: '100 900'});
