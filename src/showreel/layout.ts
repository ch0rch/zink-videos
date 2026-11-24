/** World-space geometry: every surface lives on one plane the camera travels across. */
export type Rect = {x: number; y: number; w: number; h: number};
/** A region of a card, in the card's own top-left coordinates. */
export type Region = {left: number; top: number; w: number; h: number};

export const POS: Rect = {x: 0, y: 0, w: 1100, h: 620};
export const MODAL: Rect = {x: 0, y: 6, w: 600, h: 232};
export const STOCK: Rect = {x: 1560, y: 640, w: 1060, h: 444};

/** The totals column of the POS, the Centro row of the stock table, the Efectivo tile of Caja diaria: each lifts off its card. */
export const POS_TOTALS: Region = {left: 560, top: 174, w: 504, h: 410};
export const STOCK_ROW: Region = {left: 36, top: 222, w: 988, h: 96};
export const CAJA_KPI = {top: 156, w: 272, h: 128, gap: 16, left: (index: number) => 32 + index * (272 + 16)};
export const CAJA_CASH: Region = {left: CAJA_KPI.left(2), top: CAJA_KPI.top, w: CAJA_KPI.w, h: CAJA_KPI.h};

/** The violet rule under Caja diaria's toolbar, in the card's own coordinates. */
export const CAJA_RULE = 138;
export const RULE_INSET = 36;

/** The stock row's bottom edge and the register's rule sit on one world line, so one can become the other. */
export const RULE_Y = STOCK.y - STOCK.h / 2 + STOCK_ROW.top + STOCK_ROW.h;
export const CAJA: Rect = {x: 3520, y: RULE_Y - CAJA_RULE + 320, w: 1200, h: 640};

/** Where the film comes to rest. */
export const FOCUS = {x: CAJA.x, y: CAJA.y};
export const TILE = {w: 620, h: 350};

/** Final lockup: scale and top-left corner of the official 416×110 artwork. */
export const LOCKUP_SCALE = 1.9;
export const LOCKUP_ORIGIN = {x: FOCUS.x - 208 * LOCKUP_SCALE, y: FOCUS.y - 70 - 55 * LOCKUP_SCALE};

/** Opening mark: the symbol alone, larger than in the lockup. */
export const MARK_SCALE = 3.4;

export const corner = (rect: Rect) => ({x: rect.x - rect.w / 2, y: rect.y - rect.h / 2});

/** World-space centre of a card's region. */
export const regionCentre = (rect: Rect, region: Region) => ({
	x: corner(rect).x + region.left + region.w / 2,
	y: corner(rect).y + region.top + region.h / 2,
});
