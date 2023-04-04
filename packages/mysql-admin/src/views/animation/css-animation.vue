<template>
  <div id="css-animation">
      <div id="example-1">ex-1</div>
  </div>
</template>

<script>
export default {
  name: "cssAnimation"
}
</script>

<style scoped>
#example-1 {
  width: 30px;
  height: 30px;
  background-color: #333333;
  color: #FFF;
  animation: smoothMove 1s linear;
}

@keyframes smoothMove {
  25% {
    transform: translateX(100px);
  }
  75% {
    transform: translateY(100px);
  }
}

</style>