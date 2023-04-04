/**
 * window.requestAnimationFrame(callback)<br>
 * Execute callback function per 1/60 second
 **/
function doAnimeFrame(callback, duration) {
    // let lastTime = 0

    function play(/*timeExecuted*/) {
        // let frameTime = timeExecuted - lastTime
        let numberExecuted = window.requestAnimationFrame(play) // execute
        // play() per 1/60 second

        if (numberExecuted >= duration) {
            window.cancelAnimationFrame(numberExecuted) // cancel frame execute
        }
        callback(numberExecuted)

        // lastTime = timeExecuted
    }

    play()
}


export {doAnimeFrame}