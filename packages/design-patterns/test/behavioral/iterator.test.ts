import { Iterator } from "@/bahavioral/iterator";
import { describe, it, expect } from "vitest";

describe("Iterator Pattern", () => {
  it("Iterator.each()", () => {
    const arr = [1, 2, 3, 2, 6, 1];
    const arrIterator = new Iterator(arr);
    let index = 0;
    arrIterator.each((value) => {
      expect(value).toBe(arr[index++]);
    });

    // let arr = [1, 2, 3, 4, 5];
    // const iterator = function (arr, callback) {
    //   let i = arr.length;
    //   if (i--) {
    //     callback.call(arr[i], i);
    //     return iterator(arr, callback);
    //   }
    // };

    // iterator(arr, (value, index) => {
    //   console.log(index + ": " + value);
    // });
  });
});
