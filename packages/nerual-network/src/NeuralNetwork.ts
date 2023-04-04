export {};
import * as math from "mathjs";

const mmap = math.map; // to be used to pass each element of a matrix to a function
const rand = math.random;
const transp = math.transpose;
const mat = math.matrix;
const e = math.evaluate;
const sub = math.subtract;
const sqr = math.square;
const sum = math.sum;

type input = {
  last_quality: number;
  current_quality: number;
  timestep: number;
  repetition: number;
};
type output = {
  timestep: number;
};

/**
 * Back-Propogate Neural Network with one hidden layer.
 */
export class NeuralNetwork {
  inputnodes: number;
  hiddennodes: number;
  outputnodes: number;
  learningrate: number;
  /**
   * weights of input-to-hidden layer
   */
  wih: math.MathType;
  /**
   * weights of hidden-to-output layer
   */
  who: math.MathType;

  act: (matrix: math.Matrix) => math.Matrix;

  constructor(
    inputnodes: number,
    hiddennodes: any,
    outputnodes: any,
    learningrate: number,
    wih?: math.Matrix,
    who?: math.Matrix
  ) {
    this.inputnodes = inputnodes;
    this.hiddennodes = hiddennodes;
    this.outputnodes = outputnodes;
    this.learningrate = learningrate;

    this.wih = wih || sub(mat(rand([hiddennodes, inputnodes])), 0.5);
    this.who = who || sub(mat(rand([outputnodes, hiddennodes])), 0.5);

    // active function use sigmoid function
    this.act = (matrix: math.Matrix) =>
      mmap(matrix, (x) => 1 / (1 + Math.exp(-x)));
  }

  cache: {
    loss: Array<math.Matrix>;
    input: math.Matrix;
    h_out: math.Matrix;
    actual: math.Matrix;
    dwih: math.Matrix;
    dwho: math.Matrix;
  } = {
    loss: [],
    input: math.matrix([[]]),
    h_out: math.matrix([[]]),
    actual: math.matrix([[]]),
    dwih: math.matrix([[]]),
    dwho: math.matrix([[]]),
  };

  static normalizeData = (data: any) => {
    return data;
  };

  forward = (input: number[]) => {
    const wih = this.wih;
    const who = this.who;
    const act = this.act;

    const inputMatrix = transp<math.Matrix>(mat([input]));

    const h_in = e("wih * input", { wih, input: inputMatrix });
    const h_out = act(h_in);

    const o_in = e("who * h_out", { who, h_out });
    const actual = act(o_in);

    this.cache.input = inputMatrix;
    this.cache.h_out = h_out;
    this.cache.actual = actual;

    return actual;
  };

  backward = (target: number[]) => {
    const who = this.who;
    const input = this.cache.input;
    const h_out = this.cache.h_out;
    const actual = this.cache.actual;

    const formated_target = transp(mat([target]));

    // calculate the gradient of the error function (E) w.r.t the activation function (A)
    const dEdA = sub<math.Matrix>(formated_target, actual);

    // calculate the gradient of the activation function (A) w.r.t the weighted sums (Z) of the output layer
    const o_dAdZ = e("actual .* (1 - actual)", {
      actual,
    });

    // calculate the error gradient of the loss function w.r.t the weights of the hidden-to-output layer
    const dwho = e("(dEdA .* o_dAdZ) * h_out'", {
      dEdA,
      o_dAdZ,
      h_out,
    });

    // calculate the weighted error for the hidden layer
    const h_err = e("who' * (dEdA .* o_dAdZ)", {
      who,
      dEdA,
      o_dAdZ,
    });

    // calculate the gradient of the activation function (A) w.r.t the weighted sums (Z) of the hidden layer
    const h_dAdZ = e("h_out .* (1 - h_out)", {
      h_out,
    });

    // calculate the error gradient of the loss function w.r.t the weights of the input-to-hidden layer
    const dwih = e("(h_err .* h_dAdZ) * input'", {
      h_err,
      h_dAdZ,
      input,
    });

    this.cache.dwih = dwih;
    this.cache.dwho = dwho;

    this.cache.loss.push(sum(dEdA.map((m) => sqr(m))));
  };
  update = () => {
    const wih = this.wih;
    const who = this.who;
    const dwih = this.cache.dwih;
    const dwho = this.cache.dwho;
    const r = this.learningrate;

    this.wih = e("wih + (r .* dwih)", { wih, r, dwih });
    this.who = e("who + (r .* dwho)", { who, r, dwho });
  };
  predict = (input: number[]) => {
    return this.forward(input);
  };
  train = (input: number[], target: number[]) => {
    this.forward(input);
    this.backward(target);
    this.update();
  };
  get weights() {
    return { who: this.who, wih: this.wih };
  }
}
