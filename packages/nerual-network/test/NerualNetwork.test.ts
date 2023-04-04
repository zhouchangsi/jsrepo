import { test, expect, describe, it } from "vitest";
import { NeuralNetwork } from "../src/NeuralNetwork";

const inputnodes = 4;
const hiddennodes = 10;
const outputnodes = 1;
const learningrate = 0.2;

const myNN = new NeuralNetwork(
  inputnodes,
  hiddennodes,
  outputnodes,
  learningrate
);

let input = [0.5, 0, 0.5, 0];
let target = [1];

test("train", () => {
  expect("i").toBe("i");
});
