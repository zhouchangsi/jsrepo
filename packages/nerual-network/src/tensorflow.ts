import * as tf from "@tensorflow/tfjs-node-gpu";

const model = tf.sequential();
// input layer
model.add(
  tf.layers.dense({
    name: "input",
    units: 10,
    inputShape: [4],
    activation: "relu",
    useBias: true,
  })
);
// hidden layer
model.add(
  tf.layers.dense({
    name: "hidden",
    units: 1,
    inputShape: [10],
    activation: "relu",
    useBias: true,
  })
);
// output layer
model.add(
  tf.layers.dense({
    name: "output",
    units: 1,
    activation: "relu",
    useBias: true,
  })
);

model.compile({
  loss: "meanSquaredError",
  optimizer: "sgd",
  metrics: ["MAE"],
});

// Generate some random fake data for demo purpose.
const xs = tf.randomUniform([10, 4]);
const ys = tf.randomUniform([10, 1]);
const valXs = tf.randomUniform([10, 4]);
const valYs = tf.randomUniform([10, 1]);
export { xs, ys, valXs, valYs };

// Start model training process.
async function train(
  trainingData?: tf.Tensor<tf.Rank>,
  output?: tf.Tensor<tf.Rank>
) {
  await model.fit(xs, ys, {
    epochs: 100,
    validationData: [valXs, valYs],
  });
}
train();

// TODO: train one time
function trainOne(): void {
  const input = tf.tensor([[1, 2, 3, 4]]);
  const output = tf.tensor([1]);
  model.fit(input, output);
}
// TODO: predict
function predict() {}
