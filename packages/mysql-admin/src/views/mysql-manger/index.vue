<template>
  <div class="mysql-manager">
    <side-bar/>
    <div class="main">
      <tab-header/>
      <jsx-test></jsx-test>
      <div class="view">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "@/views/mysql-manger/compontents/side-bar";
import TabHeader from "@/views/mysql-manger/compontents/tab-header";
import jsxTest from "./jsx-test.jsx";

export default {
  components: {TabHeader, sideBar, jsxTest},
  mounted() {
  },
};
</script>

<style scoped>
.mysql-manager {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.mysql-manager > .main {
  display: flex;
  flex-direction: column;
  overflow: auto;

  width: 100%;
  height: 100%;
}
</style>
