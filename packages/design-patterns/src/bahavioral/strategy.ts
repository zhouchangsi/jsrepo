export namespace Strategy {
  export class Context {
    currentStrategy: Strategy;
    constructor() {
      this.currentStrategy = new DefalutStrategy();
    }
    useStrategy(strategy: Strategy) {
      this.currentStrategy = strategy;
    }
    excuteStrategy(price: number, amount: number) {
      return this.currentStrategy.excute(price, amount);
    }
  }

  interface Strategy {
    excute(price: number, amount: number): number;
  }
  export class DefalutStrategy implements Strategy {
    excute(price: number, amount: number) {
      return price * amount;
    }
  }
  export class Five implements Strategy {
    excute(price: number, amount: number) {
      return 0.5 * price * amount;
    }
  }

  const context = new Context();
  context.useStrategy(new Five());
}
