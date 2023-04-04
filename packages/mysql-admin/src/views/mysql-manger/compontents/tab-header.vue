<template>
  <div class="header-container">
    <el-header class="header">
      <el-button class="btn" @click="exit" round>
        退出
      </el-button>
      <el-button class="btn"
                 v-for="i in tabArr"
                 :key="i"
                 @click="handleClick(i)"
                 size="small"
                 round>
        {{ i.label }}
      </el-button>
    </el-header>
  </div>
</template>

<script>
import {barData} from "./side-bar-config";

export default {
  name: "tab-header",
  data() {
    return {
      tabArr: barData,
      openedTab: {},
      curTab: ""
    };
  },
  methods: {
    handleClick: function (i) {
      this.$router.push(i.path);
    },
    exit: function () {
      this.$router.push("/")
    }
  },
};
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 60px;
}

.header-container > .header {
  position: fixed;
  z-index: 6;
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #2a2937;
  /* box-shadow: 12px 0px 12px 0 #ddd; */
}

.header-container > .header > .btn {
  background-color: #2a2937;
  color: white;
}
</style>
