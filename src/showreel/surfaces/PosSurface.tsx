import type {FC} from 'react';
import {POS_TOTALS} from '../layout';
import {ease, progress, rise} from '../motion';
import {Odometer} from '../primitives/Odometer';
import {T} from '../timeline';
import {ui} from '../theme';
import {at, atRight, Breadcrumb, surfaceBase} from './atoms';

const ITEMS = {left: 36, top: 174, w: 500, h: 410};
const ROW = {left: 10, top: 10, w: 478, h: 104};

/** Where the item's quantity sits, in the card's own coordinates: the "−2" token lifts off from here. */
export const POS_QUANTITY = {x: ITEMS.left + ROW.left + 26, y: ITEMS.top + ROW.top + 70};

/** The sale's running amount, without its "AR$ " prefix: one unit scanned, then the second. */
const amount = [
	{at: T.scan1, value: '4.850,00'},
	{at: T.scan2, value: '9.700,00'},
] as const;

/** The app dims the sale behind its confirmation dialog. */
const Scrim: FC<{frame: number}> = ({frame}) => (
	<div style={{position: 'absolute', inset: 0, backgroundColor: `rgba(20,14,28,${0.46 * progress(frame, T.modalIn - 4, T.modalIn + 22, ease.out)})`}} />
);

/** Centro / POS, rebuilt from the QA capture: the search bar and the list of scanned items. */
export const PosSurface: FC<{frame: number}> = ({frame}) => {
	const c = T.posChrome;
	const scanned = frame >= T.scan1;
	const flash = frame >= T.scan2 ? 1 - progress(frame, T.scan2, T.scan2 + 28, ease.soft) : 1 - progress(frame, T.scan1, T.scan1 + 28, ease.soft);

	return (
		<div style={{...surfaceBase, backgroundColor: ui.canvas}}>
			<Breadcrumb branch="Centro" screen="POS" style={rise(frame, c, 0)} />
			<div
				style={{
					...at(36, 92, 1028, 58),
					...rise(frame, c + 4),
					boxSizing: 'border-box',
					border: `1.5px solid ${ui.primary}`,
					borderRadius: 8,
					backgroundColor: ui.surface,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 18px',
				}}
			>
				<span style={{color: ui.placeholder, fontSize: 20, letterSpacing: '0.02em'}}>ESCANEAR O BUSCAR PRODUCTO</span>
				<span style={{color: ui.textSoft, fontSize: 17}}>[F4] Listado&nbsp;&nbsp;&nbsp;[F5] Panel</span>
			</div>
			<div style={{...at(ITEMS.left, ITEMS.top, ITEMS.w, ITEMS.h), ...rise(frame, c + 8), boxSizing: 'border-box', border: `1px solid ${ui.border}`, borderRadius: 12}}>
				{scanned ? (
					<div
						style={{
							...at(ROW.left, ROW.top, ROW.w, ROW.h),
							...rise(frame, T.scan1, 12, 22),
							borderRadius: 6,
							backgroundColor: ui.rowSelected,
							boxShadow: `inset 0 0 0 2px rgba(117,0,185,${0.55 * flash})`,
						}}
					>
						<div style={{...at(18, 17), fontSize: 25, whiteSpace: 'nowrap'}}>Yerba mate 1 kg (EJ001)</div>
						<div style={{...at(18, 58), fontSize: 20, color: ui.textSoft, whiteSpace: 'pre'}}>
							<Odometer
								frame={frame}
								states={[
									{at: T.scan1, value: '1'},
									{at: T.scan2, value: '2'},
								]}
							/>
							{' × AR$ 4.850,00'}
						</div>
						<div style={{...atRight(18, 56), fontSize: 23, fontWeight: 700}}>
							<Odometer frame={frame} prefix="AR$ " states={amount} />
						</div>
					</div>
				) : null}
			</div>
			<Scrim frame={frame} />
		</div>
	);
};

const shortcut = (label: string) => <span style={{color: ui.link, marginRight: 26}}>{label}</span>;

/** The totals column of the POS, lifted off the card: customer, total and the button that closes the sale. */
export const PosTotals: FC<{frame: number}> = ({frame}) => {
	const c = T.posChrome + 6;
	const [down, hold, up] = T.press;
	const pressed = progress(frame, down, hold, ease.out) - progress(frame, hold, up, ease.out);
	const closed = progress(frame, T.modalIn - 4, T.modalIn + 22, ease.out);

	return (
		<div style={{...surfaceBase, backgroundColor: ui.canvas, boxSizing: 'border-box', border: `1px solid ${ui.border}`, borderRadius: 12}}>
			<div style={{...at(15, 15, POS_TOTALS.w - 32, 250), boxSizing: 'border-box', border: `1px solid ${ui.border}`, borderRadius: 8, backgroundColor: ui.surface}}>
				<div style={{...at(20, 18), fontSize: 18, color: ui.textSoft, whiteSpace: 'nowrap'}}>[F3] Cliente: Consumidor Final</div>
				<div style={{...at(20, 54), fontSize: 20, fontWeight: 700}}>Subtotal</div>
				<div style={{...atRight(20, 54), fontSize: 20, fontWeight: 700}}>
					<Odometer frame={frame} prefix="AR$ " states={[{at: c, value: '0,00'}, ...amount]} />
				</div>
				<div style={{...at(20, 104), fontSize: 14, letterSpacing: '0.1em', color: ui.textSoft}}>TOTAL</div>
				<div style={{...at(20, 120), fontSize: 70, fontWeight: 700, letterSpacing: '-0.012em', whiteSpace: 'nowrap'}}>
					<Odometer frame={frame} prefix="AR$ " anchor="left" duration={20} stagger={1.2} states={[{at: c, value: '0,00'}, ...amount]} />
				</div>
				<div style={{...at(20, 208), fontSize: 18, color: ui.textSoft}}>{frame >= T.scan2 ? '2 productos' : frame >= T.scan1 ? '1 producto' : '0 productos'}</div>
			</div>
			<div style={{...at(22, 284), fontSize: 18, whiteSpace: 'nowrap'}}>
				{shortcut('[F6] Descuento')}
				{shortcut('[F9] Recargo')}
			</div>
			<div
				style={{
					...at(15, 326, POS_TOTALS.w - 32, 66),
					borderRadius: 8,
					backgroundColor: ui.success,
					color: '#ffffff',
					fontSize: 22,
					fontWeight: 500,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transform: `scale(${1 - 0.035 * pressed})`,
					filter: `brightness(${1 - 0.16 * pressed})`,
					opacity: 1 - 0.5 * closed,
				}}
			>
				Finalizar (F2)
			</div>
			<Scrim frame={frame} />
		</div>
	);
};
