<template>
  <div id="square" ref="square">
    {text}
  </div>
</template>

<script>
// import {doAnimeFrame} from "@/assets/js/mini-anime";

export default {
  name: "nodeSquare",
  data() {
    return {
      destination: {
        x: 600,
        y: 0
      },
    }
  },
  computed: {
    square: function () {
      return this.$refs.square
    }
  },
  methods: {
    move: function () {
      return `
      @-webkit-keyframes move {
        10%, 20% {
          transform: translateX(40px);
        }
        100% {
          transform: translateX(200px);
        }
      }`
    },
    doAnime: function () {

      const square = document.getElementById("square")

      let arr = [
        {
          transform: 'translateY(0%)'
        },
        {
          transform: `translateX(100px) translateY(100px) scale(2)`,
          borderRadius: `25px`,
          backgroundColor: `red`
        }
      ]

      let option = {
        direction: "alternate",
        duration: 1000,
        easing: `ease-in-out`,
        iterations: `Infinity`,
      }
      console.log(square)
      square.animate(arr, option)
    }
  },
  mounted() {
    // this.doAnime()
  }
}
</script>

<style>

#square {
  position: relative;
  display: flex;
  width: 50px;
  height: 50px;
  color: #FFF;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  text-align: center;
  text-overflow: ellipsis;
  background-color: #00aaaa;
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes move {
  10%, 20% {
    transform: translateX(40px);
  }
  100% {
    transform: translateX(200px);
  }
}
</style>