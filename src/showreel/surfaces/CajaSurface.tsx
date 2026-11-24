import type {CSSProperties, FC, ReactNode} from 'react';
import {CAJA_KPI} from '../layout';
import {ease, progress, rise} from '../motion';
import {Odometer} from '../primitives/Odometer';
import {T} from '../timeline';
import {ui} from '../theme';
import {at, atRight, Breadcrumb, Caret, surfaceBase} from './atoms';

const card: CSSProperties = {boxSizing: 'border-box', border: `1px solid ${ui.borderLilac}`, borderRadius: 10, backgroundColor: ui.surface};
const label: CSSProperties = {fontSize: 16, fontWeight: 500, letterSpacing: '0.01em', color: ui.textSoft, whiteSpace: 'nowrap'};
const rule = (top: number): CSSProperties => ({position: 'absolute', left: 18, right: 18, top, height: 1, backgroundColor: ui.borderLilac});
const field: CSSProperties = {...at(16, 62, 240, 48), boxSizing: 'border-box', border: `1px solid ${ui.inputBorder}`, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 20};

const BEFORE = 'AR$ 1.852,00';
const AFTER = 'AR$ 11.552,00';

/** A figure that takes the app's violet for a moment when it changes, then goes back to ink. */
const Live: FC<{frame: number; at: number; before: string; after: string}> = ({frame, at: start, before, after}) => {
	const lit = progress(frame, start, start + 10, ease.out) - progress(frame, start + 34, start + 76, ease.soft);
	// The currency prefix stays put; only the digits roll, so the figure grows without jumping.
	const prefix = before.startsWith('AR$ ') ? 'AR$ ' : '';
	return (
		<span style={{color: `color-mix(in srgb, ${ui.primary} ${Math.max(0, lit) * 100}%, ${ui.text})`}}>
			<Odometer
				frame={frame}
				prefix={prefix}
				duration={20}
				stagger={1.5}
				states={[
					{at: T.cajaReveal, value: before.slice(prefix.length)},
					{at: start, value: after.slice(prefix.length)},
				]}
			/>
		</span>
	);
};

const Kpi: FC<{title: string; children: ReactNode; style?: CSSProperties}> = ({title, children, style}) => (
	<div style={{...card, ...style}}>
		<div style={{...at(18, 17), ...label, textTransform: 'uppercase'}}>{title}</div>
		<div style={rule(48)} />
		{children}
	</div>
);

const CashKpi: FC<{frame: number; style: CSSProperties}> = ({frame, style}) => (
	<Kpi title="Efectivo en caja" style={style}>
		<div style={{...atRight(18, 66), fontSize: 34, fontWeight: 700}}>
			<Live frame={frame} at={T.cashRoll} before={BEFORE} after={AFTER} />
		</div>
	</Kpi>
);

/** Efectivo en caja as its own plate: it lifts off the card, over the tile it copies, while it takes the sale in. */
export const CajaCash: FC<{frame: number}> = ({frame}) => (
	<div style={surfaceBase}>
		<CashKpi frame={frame} style={{position: 'absolute', inset: 0}} />
	</div>
);

const Line: FC<{top: number; name: string; value: ReactNode}> = ({top, name, value}) => (
	<>
		<div style={{...at(24, top), fontSize: 18, fontWeight: 500, whiteSpace: 'nowrap'}}>{name}</div>
		<div style={{...at(310, top), fontSize: 18, whiteSpace: 'nowrap'}}>{value}</div>
	</>
);

const figure: CSSProperties = {fontSize: 29};

/** Centro / Caja diaria, rebuilt from the QA capture. The sale arrives and every total that depends on it follows. */
export const CajaSurface: FC<{frame: number}> = ({frame}) => {
	const r = T.cajaReveal;
	const roll = T.cashRoll;
	const kpi = (index: number): CSSProperties => ({...at(CAJA_KPI.left(index), CAJA_KPI.top, CAJA_KPI.w, CAJA_KPI.h), ...rise(frame, r + 8 + index * 6, -14)});
	return (
		<div style={{...surfaceBase, backgroundColor: '#fcfcfc'}}>
			<Breadcrumb branch="Centro" screen="Caja diaria" style={rise(frame, r, 0)} />

			<div style={{...at(760, 82, 236, 44), ...rise(frame, r + 4, -8), boxSizing: 'border-box', border: `1px solid ${ui.inputBorder}`, borderRadius: 4, backgroundColor: ui.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 14px', fontSize: 19}}>
				<span>Operador</span>
				<Caret />
			</div>
			<div style={{...at(1010, 82, 154, 44), ...rise(frame, r + 6, -8), boxSizing: 'border-box', border: `1px solid ${ui.link}`, borderRadius: 6, backgroundColor: ui.surface, color: ui.link, fontSize: 17, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				Ver consolidado
			</div>

			<Kpi title="Fecha" style={kpi(0)}>
				<div style={field}>23/11/2026</div>
			</Kpi>
			<Kpi title="Caja inicial" style={kpi(1)}>
				<div style={{...field, justifyContent: 'flex-end'}}>AR$ 0</div>
			</Kpi>
			<CashKpi frame={frame} style={kpi(2)} />
			<Kpi title="Cantidad de ventas" style={kpi(3)}>
				<div style={{...at(18, 68), fontSize: 32}}>
					<Live frame={frame} at={roll + 10} before="1" after="2" />
				</div>
			</Kpi>

			<div style={{...at(32, 300, 560, 150), ...card, ...rise(frame, r + 30, -14)}}>
				<div style={{...at(18, 24), ...label}}>TOTAL FISCAL</div>
				<div style={{...atRight(18, 14), ...figure}}>AR$ 1.852,00</div>
				<div style={rule(60)} />
				<Line top={76} name="Importe fiscal pendiente" value="AR$ 0,00" />
				<Line top={110} name="Importe fiscal autorizado" value="AR$ 1.852,00" />
			</div>
			<div style={{...at(608, 300, 560, 150), ...card, ...rise(frame, r + 36, -14)}}>
				<div style={{...at(18, 24), ...label}}>TOTAL COMPRAS</div>
				<div style={{...atRight(18, 14), ...figure}}>AR$ 0,00</div>
				<div style={rule(60)} />
				<div style={{...at(18, 98), ...label}}>TOTAL VENTAS</div>
				<div style={{...atRight(18, 88), ...figure}}>
					<Live frame={frame} at={roll + 18} before={BEFORE} after={AFTER} />
				</div>
			</div>

			<div style={{...at(32, 466, 560, 220), ...card, ...rise(frame, r + 42, -14)}}>
				<div style={{...at(18, 23), fontSize: 18, fontWeight: 500, whiteSpace: 'nowrap'}}>Total ingresos por ventas</div>
				<div style={{...atRight(18, 14), ...figure}}>
					<Live frame={frame} at={roll + 26} before={BEFORE} after={AFTER} />
				</div>
				<div style={rule(60)} />
				<Line top={76} name="Efectivo" value={<Live frame={frame} at={roll + 32} before={BEFORE} after={AFTER} />} />
				<Line top={108} name="Cuenta Corriente" value="AR$ 0,00" />
				<Line top={140} name="Cheque" value="AR$ 0,00" />
			</div>
			<div style={{...at(608, 466, 560, 220), ...card, ...rise(frame, r + 48, -14)}}>
				<div style={{...at(18, 23), fontSize: 18, fontWeight: 500, whiteSpace: 'nowrap'}}>Total egresos por compras</div>
				<div style={{...atRight(18, 14), ...figure}}>AR$ 0,00</div>
				<div style={rule(60)} />
				<Line top={76} name="Efectivo" value="AR$ 0,00" />
				<Line top={108} name="Cuenta Corriente" value="AR$ 0,00" />
				<Line top={140} name="Cheque" value="AR$ 0,00" />
			</div>

			{/* The screen goes on below; the plate lets it fall away instead of cutting a row in half. */}
			<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, background: 'linear-gradient(rgba(252,252,252,0), #fcfcfc 84%)'}} />
		</div>
	);
};
