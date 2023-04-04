export class Iterator {
  private index: number;
  subject: Array<unknown>;
  constructor(subect: Array<unknown> = []) {
    this.index = 0;
    this.subject = subect;
  }
  reset() {
    this.index = 0;
  }
  first() {
    this.reset();
    return this.next();
  }
  next() {
    return this.subject[this.index++];
  }
  hasNext() {
    return this.index <= this.subject.length;
  }
  each(callback: (i: unknown) => unknown) {
    let i = this.first();
    while (this.hasNext()) {
      callback(i);
      i = this.next();
    }
  }
}
