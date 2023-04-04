import { test, expect } from "vitest";
import { NeuralNetwork } from "nn.js";

test("nn.forward", () => {
  const inputnodes = 4;
  const hiddennodes = 3;
  const outputnodes = 1;
  const learningrate = 0.2;
  const myNN = new NeuralNetwork(
    inputnodes,
    hiddennodes,
    outputnodes,
    learningrate
  );
  let input = [1, 1, 1, 1];
  let result = myNN.forward(input);
  console.log(result);
  expect(result).toBeDefined();
});
