let activeEffect = void 0;
let shouldTrack = false;
const targetMap = new WeakMap();

type AnyFunction = (...x: any[]) => any;
class ReactiveEffect {
  private _fn: AnyFunction;
  private deps = [];
  constructor(fn: AnyFunction) {
    this._fn = fn;
  }
  run() {
    this._fn();
  }
}
export const effect = (fn: AnyFunction, options = {}) => {
  const _effect = new ReactiveEffect(fn);
  Object.assign(_effect, options);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
};

export const track = () => {};
