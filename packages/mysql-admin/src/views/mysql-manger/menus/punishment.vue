<template lang="html">
  <div class="users-manager" ref="usersManager">
    <mysql-table :page-size="pageSize" :table-name="tableName" />
  </div>
</template>

<script>
import mysqlTable from "@/views/mysql-manger/compontents/mysql-table";

export default {
  name: "users-manager",
  components: { mysqlTable },
  data() {
    return {
      pageSize: 10,
      tableName: "punishment",
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="css" scoped>
.users-manager {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 100px;
  transition: 300ms ease-in-out;
  /* background-color: #fafafa; */
  background-image: url("../../../assets/jpg/grid.jpg");
}
</style>
