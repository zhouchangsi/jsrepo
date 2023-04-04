<template>
  <div class="side-bar">
    <!--addRoom()-->
    <!--roomList setRoom()-->
    <el-menu>
      <el-menu-item>
        <el-button class="el-icon-plus" @click="addRoom"
                   title="添加房间"
                   circle></el-button>
        <i class="el-icon-s-unfold">所有房间</i>
      </el-menu-item>
    </el-menu>
    <el-menu class="side-menu">
      <el-menu-item v-for="roomName in roomNameList"
                    @click="setRoom(roomName)">
        <i class="el-icon-s-home">
          {{ roomName }}
        </i>
      </el-menu-item>
    </el-menu>

    <div class="line"></div>

    <el-menu>
      <el-menu-item>
<!--        <el-button class="btn-add-room" title="添加房间" circle>-->
<!--        </el-button>-->
        <i class="el-icon-s-unfold"> 房间用户</i>
      </el-menu-item>
    </el-menu>
    <el-menu class="side-menu">
      <el-menu-item v-for="username in currentRoomUsers">
        <i class="el-icon-user-solid">
          {{ username }}
        </i>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
import socket from "@/plugins/socket_io_client";
import note from "@/components/note";

export default {
  name: "sideBar",
  components: {
    note
  },
  data() {
    return {
      newRoom: "",
    }
  },
  computed: {
    note: function () {
      return this.$refs.note
    },
    state: function () {
      return this.$store.state
    },
    roomNameList: function () {
      return this.$store.state.roomNameList
    },
    currentRoomUsers: function () {
      return this.$store.state.currentRoomUsers
    }
  },
  methods: {
    setRoom: function (room) {
      if (room !== this.state.currentRoom) {
        socket.emit('joinRoom', room)
        socket.emit('syncData', room)
        this.showNote(`${this.state.currentUser} 加入 ${room}`)
      }
    },
    addRoom: function () {
      this.$prompt("请输入房间名", "创建房间", {
        inputErrorMessage: "房间已存在"
      }).then(({value}) => {
        if (this.hasRoom(value)) {
          alert("you")
          this.addRoom()
        } else {
          this.newRoom = value
          socket.emit("joinRoom", value)
          socket.emit("syncData")
        }
      })
    },
    hasRoom: function (roomName) {
      let result = false
      this.roomNameList.forEach((item) => {
        if (item === roomName) {
          result = true
        }
      })
      return result
    },
    showNote: function (note) {
      this.$message(note)
    }
  },
}
</script>

<style>
@import "../assets/css/scroll_bar.css";

.side-menu {
  overflow: scroll;
  max-height: 45%;
  min-height: 20%;
}

.line {
  border: 1px solid #ebeef5;
}

.btn-add-room {
}


</style>