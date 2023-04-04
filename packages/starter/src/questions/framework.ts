export function templates() {
  return [
    {
      type: "list",
      name: "template",
      display: "template",
      message: "choice js/ts",
      choices: [
        "dom-js",
        "dom-ts",
        "node-js",
        "node-ts",
        "react-js",
        "react-ts",
        "vue-js",
        "vue-ts",
      ],
    },
  ];
}
