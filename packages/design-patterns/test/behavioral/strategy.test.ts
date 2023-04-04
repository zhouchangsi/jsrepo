import { Strategy } from "@/bahavioral/strategy";
import { describe, expect, it } from "vitest";
describe("Strategy Pattern", () => {
  const context = new Strategy.Context(),
    defalutStrategy = new Strategy.DefalutStrategy(),
    five = new Strategy.Five(),
    price: number = 10,
    amount: number = 10;

  let priceAfterDiscount = 0;

  it("Default strategy is not discount", () => {
    context.useStrategy(defalutStrategy);
    priceAfterDiscount = context.excuteStrategy(price, amount);
    expect(priceAfterDiscount).toBe(price * amount);
  });

  it("Five Strategy is discount", () => {
    context.useStrategy(five);
    priceAfterDiscount = context.excuteStrategy(price, amount);
    expect(priceAfterDiscount).toBe(0.5 * price * amount);
  });
});
