<template>
  <div class="mini-anime-js">
    <button @click="addNode">add</button>
    <div class="anime-square" ref="animeSquare"></div>
  </div>
</template>
<script>
import {doAnimeFrame} from "@/assets/js/mini-anime";

export default {
  name: "miniAnimeJS",
  data() {
    return {}
  },
  methods: {
    addNode: function () {
      let miniAnimeJS = document.getElementsByClassName("mini-anime-js")
      let square = document.createElement("div")
      square.setAttribute("style", "width:5rem;height:5rem;background-color:red;")
      square.setAttribute("class","anime-square")
      miniAnimeJS[0].appendChild(square)
    }
  },
  mounted() {
    let i = 0, v = 1
    let animeSquare = document.getElementsByClassName("anime-square")
    let animeSquareToDo = function (timeExecuted, numberExecuted) {
      animeSquare[0].innerText =
          `${timeExecuted}\n${numberExecuted}`
      animeSquare[0].style.marginLeft = i + "px"
      if (i < 0 || i > 180) {
        v = -v
      }
      i += v
    }
    doAnimeFrame(animeSquareToDo, 1200)


  },
}
</script>

<style scoped>
.mini-anime-js {
  width: 100%;
  min-height: 50vh;
  background-color: #333333;
}

.anime-square {
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  background-color: #99e999;
  position: center;
  animation-name: anime-square;
  animation: anime-square 2s;
}

@keyframes anime-square {
  from {

  }
  to {
    background-color: teal;
  }
}

</style>