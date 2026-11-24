import type {CSSProperties, FC} from 'react';
import {ui} from '../theme';
import {at, surfaceBase} from './atoms';

const button: CSSProperties = {
	height: 54,
	borderRadius: 8,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: 20,
	boxSizing: 'border-box',
};
const outline: CSSProperties = {...button, border: `1px solid ${ui.link}`, color: ui.link, backgroundColor: ui.surface};

/** The app's own confirmation after Finalizar. */
export const SaleModal: FC = () => (
	<div style={surfaceBase}>
		<div style={{...at(0, 30, 600), textAlign: 'center', fontSize: 27, fontWeight: 500}}>Venta registrada</div>
		<div style={{...at(104, 88, 188), ...button, backgroundColor: ui.primary, color: '#ffffff', fontWeight: 500}}>Imprimir</div>
		<div style={{...at(308, 88, 188), ...outline}}>Fiscal (F10)</div>
		<div style={{...at(180, 154, 240), ...outline}}>Nueva venta (ESC)</div>
	</div>
);
