<template>
  <div class="info-header">
    <i class="el-icon-connection">{{ " " + id }}</i>
    <i class="el-icon-user">{{ " " + username }}</i>
    <i class="el-icon-house">{{ " " + currentRoom }}</i>
  </div>
</template>

<script>

export default {
  name: "infoHeader",
  data() {
    return {}
  },
  computed: {
    id: function () {
      return this.$store.state.socketId
    },
    username: function () {
      return this.$store.state.currentUser
    },
    currentRoom: function () {
      return this.$store.state.currentRoom
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style>
.info-header {
  display: flex;
  justify-content: flex-end;
  background-color: teal;
  color: white;
}

.info-header i {
  margin: 15px;
}
</style>