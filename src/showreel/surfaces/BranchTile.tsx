import type {FC} from 'react';
import {rise} from '../motion';
import {Odometer} from '../primitives/Odometer';
import {ui} from '../theme';
import {at, surfaceBase} from './atoms';

type Props = {
	frame: number;
	/** Frame the tile's content starts arriving. */
	reveal: number;
	branch: string;
	cash: string;
	sales: string;
};

/** Caja diaria reduced to what the owner reads first, one tile per branch. */
export const BranchTile: FC<Props> = ({frame, reveal, branch, cash, sales}) => (
	<div style={surfaceBase}>
		<div style={{...at(36, 30), ...rise(frame, reveal, 8), fontSize: 24, whiteSpace: 'nowrap'}}>
			<span style={{fontWeight: 600}}>{branch}</span>
			<span style={{color: ui.placeholder, margin: '0 11px'}}>/</span>
			<span style={{color: ui.textSoft}}>Caja diaria</span>
		</div>
		<div style={{...at(36, 78, 548, 2), ...rise(frame, reveal + 3, 0), backgroundColor: ui.primary}} />
		<div style={{...at(36, 108), ...rise(frame, reveal + 6, 8), fontSize: 16, fontWeight: 500, letterSpacing: '0.01em', color: ui.textSoft}}>EFECTIVO EN CAJA</div>
		<div style={{...at(36, 132), fontSize: 62, fontWeight: 700, letterSpacing: '-0.012em', whiteSpace: 'pre'}}>
			<Odometer frame={frame} prefix="AR$ " duration={22} stagger={1.5} states={[{at: reveal + 8, value: cash}]} />
		</div>
		<div style={{...at(36, 234), ...rise(frame, reveal + 14, 8), fontSize: 16, fontWeight: 500, letterSpacing: '0.01em', color: ui.textSoft}}>CANTIDAD DE VENTAS</div>
		<div style={{...at(36, 258), fontSize: 36}}>
			<Odometer frame={frame} duration={22} states={[{at: reveal + 18, value: sales}]} />
		</div>
	</div>
);
