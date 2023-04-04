export interface DirectionMap {
  N: any;
  S: any;
  E: any;
  W: any;
  NW: any;
  NE: any;
  SE: any;
  SW: any;
}

export interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface Point {
  x: number;
  y: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calcAngle = (p1: Point, p2: Point): number => {
  return Math.atan2(p1.y - p2.y, p2.x - p1.x) * (180 / Math.PI);
};

const isInRange = (x: number, start: number, end: number): boolean =>
  start <= x && x <= end;

const isInArea = (p: Point, rect: Rect): boolean =>
  isInRange(p.x, rect.left, rect.right) &&
  isInRange(p.y, rect.top, rect.bottom);

export const closeDirection = (
  p: Point,
  rect: Rect,
  error: number
): keyof DirectionMap | void => {
  const {
    top: boxTop,
    right: boxRight,
    bottom: boxBottom,
    left: boxLeft,
  } = rect;

  const activeArea: DirectionMap = {
    N: {
      top: boxTop - error,
      bottom: boxTop + error,
      left: boxLeft + error,
      right: boxRight - error,
    },
    S: {
      top: boxBottom - error,
      bottom: boxBottom + error,
      left: boxLeft + error,
      right: boxRight - error,
    },
    E: {
      top: boxTop + error,
      bottom: boxBottom - error,
      left: boxRight - error,
      right: boxRight + error,
    },
    W: {
      top: boxTop + error,
      bottom: boxBottom - error,
      left: boxLeft - error,
      right: boxLeft + error,
    },
    NW: {
      top: boxTop - error,
      bottom: boxTop + error,
      left: boxLeft - error,
      right: boxLeft + error,
    },
    NE: {
      top: boxTop - error,
      bottom: boxTop + error,
      left: boxRight - error,
      right: boxRight + error,
    },
    SE: {
      top: boxBottom - error,
      bottom: boxBottom + error,
      left: boxRight - error,
      right: boxRight + error,
    },
    SW: {
      top: boxBottom - error,
      bottom: boxBottom + error,
      left: boxLeft - error,
      right: boxLeft + error,
    },
  };

  for (const key of Object.keys(activeArea)) {
    if (isInArea(p, activeArea[key])) {
      return key as keyof DirectionMap;
    }
  }
};
