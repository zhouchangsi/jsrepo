<template>
  <div id="test">
    <div class="test">
      <span>sdf</span>
      <i>asdfasfdfasdf</i>
    </div>
  </div>
</template>

<script>

export default {
  name: "test",
}
</script>

<style scoped>
.test {
  display: flex;
  width: 40px;
  height: 40px;
  background-color: red;
}

.test span {
  position: relative;
  left: 10px;
  width: 10px;
  height: 10px;
}

.test i {
  position: relative;
  left: 100px;
  width: 100px;
  height: 10px
}

</style>