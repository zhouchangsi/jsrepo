const keyframes = {
    moveXY: function (x, y) {
        return [
            {},
            {
                transform: `translateX(${x}) translateY(${y}`,
            }
        ]
    },
}
console.log(keyframes)

const defaultOption = {
    delay: 0,
    direction: "normal",
    duration: 1000,
    easing: "linear",
    endDelay: 0,
    fill: "none",
    iterations: 0,
    composite: "replace",
    iterationComposite: "replace",
}

console.log(defaultOption)