<template>
  <div class="table-container" ref="mysqlTable">
    <!-- state.insertFormShow, tableName, insertSubmit() -->
    <el-dialog v-model="state.insertFormShow" title="Form" width="500px" center>
      <form-insert
          :tableName="tableName"
          :disableID="true"
          @onSubmit="insertSubmit"
      />
    </el-dialog>

    <el-dialog v-model="state.updateFormShow" width="500px" title="Form" center>
      <form-insert
          ref="updateForm"
          :tableName="tableName"
          :disableID="true"
          @onSubmit="updateSubmit"
      />
    </el-dialog>

    <el-dialog v-model="state.deleteDialogShow" title="Warning" width="30%" center>
      <span>你是否确定删除信息</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.deleteDialogShow = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <div class="table-header">
      <!-- handleInsert -->
      <el-button class="btn" @click="handleInsert" size="small" round
      >增加+
      </el-button
      >
    </div>
    <!--    tableData-->
    <el-table class="table" :data="tableData" border>
      <el-table-column label="Operations" width="150">
        <template #default="scope">
          <!--    handleModify()-->
          <el-button
              @click="handleModify(scope.row)"
              type="primary"
              size="small"
          >
            修改
          </el-button>
          <!--    handleDelete()-->
          <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <!--    tableKeys-->
      <el-table-column
          v-for="key in tableKeys"
          :key="key"
          :prop="key"
          :label="key"
          width="150"
          sortable
      ></el-table-column>
    </el-table>
    <!--    pageSize, tableTotal, curPage-->
    <el-pagination
        class="page-selector"
        :page-size="pageSize"
        :total="tableTotal"
        v-model:current-page="curPage"
        layout="prev, pager, next, jumper "
    >
    </el-pagination>
  </div>
</template>

<script>
import {mysqlAPI} from "@/lib/mysql/mysql-request";
import formInsert from "./form-insert.vue";

export default {
  components: {formInsert},
  name: "mysqlTable",
  props: {
    pageSize: Number,
    tableName: String,
  },
  data() {
    return {
      tableData: [{}],
      tableTotal: 10,
      curPage: 1,
      curID: 1,
      curRow: {},
      primaryKeyName: "",
      state: {
        insertFormShow: false,
        updateFormShow: false,
        deleteDialogShow: false,
      },
      // TODO
      table: {
        name: "",
        data: [{}],
        keyNames: [],
        curRow: 1,
        curID: 1,
        selectedRows: [],
        selectedIDs: [],
        hasPrimaryKey: true,
        primaryKeyName: "",
      },
      pager: {
        total: 1,
        curPage: 1,
      },
      visible: {
        insertDialog: false,
        updateDialog: false,
        deleteDialog: false,
      }
    };
  },
  computed: {
    tableKeys: function () {
      return Object.keys(this.tableData[0]);
    },
    lastPage: function () {
      return Math.floor(this.tableTotal / this.pageSize) + 1;
    },
    // TODO
    // curPage:function () {
    //   return this.pager.curPage
    // }
  },
  watch: {
    curPage(curVal, oldVal) {
      console.log("旧页数", oldVal);
      this.fetchPage(curVal);
    },
  },
  methods: {
    insertSubmit: async function (inputObj) {
      let data = {
        tableName: this.tableName,
        value: inputObj,
      };
      try {
        await mysqlAPI.insertRow(data);
        console.log(this.lastPage);
        this.curPage = this.lastPage;
        this.state.insertFormShow = false;
      } catch (error) {
        alert(error.response.data);
      }
    },
    updateSubmit: async function (inputObj) {
      let data = {
        tableName: this.tableName,
        id: this.curID,
        value: inputObj,
      };
      try {
        await mysqlAPI.updateRow(data);
        await this.fetchPage(this.curPage);
        this.state.updateFormShow = false;
      } catch (error) {
        alert(error.response.data);
      }
    },
    handleInsert: function () {
      this.state.insertFormShow = !this.state.insertFormShow;
    },
    handleModify: function (row) {
      let id = this.calcFirstValueOfRow(row);
      this.curID = id;
      this.curRow = row;
      this.state.updateFormShow = !this.state.insertFormShow;
      this.$refs.updateForm.$data.formLabelAlign = row
    },
    confirmDelete: function () {
      mysqlAPI.deleteRowByID(this.tableName, this.curID)
          .then(() => {
            this.state.deleteDialogShow = false
            this.fetchPage(this.curPage);
          });
    },
    handleDelete: function (row) {
      let id = this.calcFirstValueOfRow(row);
      this.curID = id
      this.curRow = row
      this.state.deleteDialogShow = !this.state.deleteDialogShow
    },
    fetchPage: async function (curPage) {
      await this.fetchSum();
      let res = await mysqlAPI.fetchPage(
          this.tableName,
          this.pageSize,
          curPage
      );
      this.tableData = res.data;
    },
    fetchSum: async function () {
      let res = await mysqlAPI.fetchSum(this.tableName);
      this.tableTotal = res.data.sum;
    },
    fetchPrimaryKey: function () {
      mysqlAPI.fetchPrimaryKey(this.tableName).then((res) => {
        this.primayKeyName = res.data.keyName;
      });
    },
    calcFirstValueOfRow: function (row) {
      let keys = Object.keys(row);
      let firstKeyName = keys[0];
      return row[firstKeyName];
    },
  },
  mounted() {
    this.fetchPage(1);
    this.fetchSum();
  },
};
</script>
<style scoped>
.table-container {
  display: flex;
  overflow: auto;
  align-items: center;
  flex-direction: column;
  /* width: 1000px; */
  max-width: 1600px;
  min-width: 800px;
  height: 800px;
  padding: 15px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(114, 113, 113, 0.5);
  justify-items: center;
}

.table-container > .table {
  overflow: auto;
}

.table-container > .table-header {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: start;
}

.table-container > .table-header > .btn {
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
