import type {CSSProperties, FC} from 'react';
import {STOCK_ROW} from '../layout';
import {rise} from '../motion';
import {Odometer} from '../primitives/Odometer';
import {T} from '../timeline';
import {ui} from '../theme';
import {at, Breadcrumb, Caret, surfaceBase} from './atoms';

/** Column positions, measured from the left edge of a table row. */
const COLUMNS = [
	['Código', 16],
	['Descripción', 140],
	['Stock', 416],
	['Ubicación', 624],
	['Organización', 810],
] as const;

/** Where the "−2" token is set down: right after the Centro stock figure, in the card's own coordinates. */
export const STOCK_LANDING = {x: STOCK_ROW.left + COLUMNS[2][1] + 150, y: STOCK_ROW.top + STOCK_ROW.h / 2};

const cell = (left: number): CSSProperties => ({position: 'absolute', left, top: 0, height: STOCK_ROW.h, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'});

type RowProps = {frame: number; branch: string; stock: readonly {at: number; value: string}[]};

/** One row of the stock table: the same product in one branch. */
export const StockRow: FC<RowProps> = ({frame, branch, stock}) => (
	<>
		<div style={cell(COLUMNS[0][1])}>EJ001</div>
		<div style={cell(COLUMNS[1][1])}>Yerba mate 1 kg</div>
		<div style={{...cell(COLUMNS[2][1]), fontSize: 40, fontWeight: 600}}>
			<Odometer frame={frame} states={stock} duration={26} stagger={4} />
		</div>
		<div style={cell(COLUMNS[3][1])}>Depósito</div>
		<div style={{...cell(COLUMNS[4][1]), fontWeight: 500}}>{branch}</div>
	</>
);

/** Centro's row. It is its own plate: it lifts to take the two units off, then settles back. */
export const StockCentroRow: FC<{frame: number; active: number}> = ({frame, active}) => (
	<div style={surfaceBase}>
		<div style={{position: 'absolute', inset: 0, backgroundColor: `rgba(117,0,185,${0.06 * active})`}} />
		<StockRow
			frame={frame}
			branch="Centro"
			stock={[
				{at: T.stockReveal + 18, value: '51.00'},
				{at: T.stockRoll, value: '49.00'},
			]}
		/>
	</div>
);

/** Centro / Consulta de stock, rebuilt from the QA capture: one product, one row per branch. */
export const StockSurface: FC<{frame: number}> = ({frame}) => {
	const r = T.stockReveal;
	return (
		<div style={surfaceBase}>
			<Breadcrumb branch="Centro" screen="Consulta de stock" style={rise(frame, r, 0)} />
			<div
				style={{
					...at(36, 92, 560, 58),
					...rise(frame, r + 5),
					boxSizing: 'border-box',
					border: `1.5px solid ${ui.primary}`,
					borderRadius: 6,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 20px 0 18px',
				}}
			>
				<span>EJ001</span>
				<Caret />
			</div>
			<div style={{...at(STOCK_ROW.left, 176, STOCK_ROW.w, 46), ...rise(frame, r + 10), boxSizing: 'border-box', borderBottom: `1px solid ${ui.border}`, fontSize: 17, fontWeight: 700}}>
				{COLUMNS.map(([label, left]) => (
					<div key={label} style={{position: 'absolute', left, top: 11}}>
						{label}
					</div>
				))}
			</div>
			<div style={{...at(STOCK_ROW.left, STOCK_ROW.top + STOCK_ROW.h, STOCK_ROW.w, STOCK_ROW.h), ...rise(frame, r + 24), boxSizing: 'border-box', borderTop: `1px solid ${ui.border}`, borderBottom: `1px solid ${ui.border}`}}>
				<StockRow frame={frame} branch="Sur" stock={[{at: r + 26, value: '13.00'}]} />
			</div>
		</div>
	);
};
