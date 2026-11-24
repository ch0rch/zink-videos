import type {FC} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CajaAct} from './acts/CajaAct';
import {OpeningAct} from './acts/OpeningAct';
import {PayoffAct} from './acts/PayoffAct';
import {SaleAct} from './acts/SaleAct';
import {StockAct} from './acts/StockAct';
import {cameraAt, lightAt} from './camera';
import './fonts';
import {type Format, FormatContext} from './format';
import {Caption} from './primitives/Caption';
import {Stage} from './primitives/Stage';
import {World} from './primitives/World';
import {T} from './timeline';

/**
 * ZinkERP · product film, 14.9 s at 60 fps.
 * One sale in Centro, followed across the product: it is rung up, it comes off the stock,
 * it lands in the cash register, and every branch has its own. Then it all folds into the mark.
 */
export const ZinkShowreel15: FC<{format: Format}> = ({format}) => {
	const frame = useCurrentFrame();
	const {caption, branchCaption} = format;
	return (
		<FormatContext.Provider value={format}>
			<Stage frame={frame} light={lightAt(frame, format)}>
				<World camera={cameraAt(frame, format)}>
					<OpeningAct frame={frame} />
					<SaleAct frame={frame} />
					<StockAct frame={frame} />
					<CajaAct frame={frame} />
					<PayoffAct frame={frame} />
				</World>
				<AbsoluteFill>
					<Caption frame={frame} span={T.caption1} lines={['Vendés']} {...caption} />
					<Caption frame={frame} span={T.caption2} lines={['El stock', 'se descuenta']} {...caption} />
					<Caption frame={frame} span={T.caption3} lines={['La caja', 'queda al día']} {...caption} />
					<Caption frame={frame} span={T.caption4} lines={['En cada sucursal']} x={format.width / 2} y={branchCaption.y} align="center" size={branchCaption.size} />
				</AbsoluteFill>
			</Stage>
		</FormatContext.Provider>
	);
};
