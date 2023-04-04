<template>
  <div class="container">
    <!-- formLabelAlign,keys -->
    <el-form class="form" label-width="100px" :model="formLabelAlign">
      <el-form-item
        class="item"
        v-for="key in keys"
        :key="key"
        :label="key"
        size="medium"
      >
        <el-input
          v-model="formLabelAlign[key]"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- thisSubmit -->
    <div class="btn-container">
      <el-button @click="thisSubmit" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mysqlAPI } from "@/lib/mysql/mysql-request";
export default {
  name: "form-insert",
  props: {
    tableName: String,
    disableID: Boolean,
  },
  data() {
    return {
      formLabelAlign: {},
    };
  },
  emits: ["onSubmit"],
  computed: {
    keys: function () {
      return Object.keys(this.formLabelAlign);
    },
  },
  methods: {
    thisSubmit: function () {
      this.$emit("onSubmit", this.formLabelAlign);
    },
    fecthKey: async function () {
      let res = await mysqlAPI.fetchKeys(this.tableName);
      let arr = res.data;
      if (this.disableID) {
        arr.forEach((key) => {
          if (key === "id") {
            return;
          }
          this.formLabelAlign[key] = "";
        });
      } else {
        this.formLabelAlign = arr;
      }
    },
  },
  mounted() {
    this.fecthKey();
  },
};
</script>
<style scoped>
.container {
  overflow: auto;
  width: 450px;
  height: 600px;
  box-shadow: 0 2px 12px 0 #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container > .form > .header {
  padding: 5px;
  width: 450px;
  height: 30px;
  background-color: #34495d;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container > .form > .item {
  margin-top: 45px;
  width: 360px;
}
.container > .btn-container {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
