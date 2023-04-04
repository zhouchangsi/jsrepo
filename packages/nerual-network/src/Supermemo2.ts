/**
 * Caculate new Ease-Factor, interval and repetition
 * @param ease_factor
 * @param interval
 * @param quality <br/>
 * - 5 - perfect response
 * - 4 - correct response after a hesitation
 * - 3 - correct response recalled with serious difficulty
 * - 2 - incorrect response; where the correct one seemed easy to recall
 * - 1 - incorrect response; the correct one remembered
 * - 0 - complete blackout.
 * @param repetition
 * @returns New Ease-Factor, interval and repetition
 */
export function sm2(
  ease_factor: number,
  interval: number,
  quality: number,
  repetition: number
) {
  const q = quality;
  let r = repetition;
  let EF = ease_factor;

  let i = interval; // interval
  if (q > 3) {
    if (r === 0) {
      i = 1;
    } else if (r === 1) {
      i = 6;
    } else {
      i = Math.round(i * EF);
    }
    r++;
  } else {
    r = 0;
    i = 1;
  }

  EF = newEF(EF, q);

  return {
    ease_factor: EF,
    interval: i,
    repetition: r,
  };
}

function newEF(oldEF: number, quality: number) {
  const EF = oldEF;
  const q = quality;

  if (q < 3) {
    return EF;
  }
  let newEF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEF < 1.3) {
    newEF = 1.3;
  }
  return newEF;
}
