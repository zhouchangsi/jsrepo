<template>
  <div class="home">
    <info-header id="info-header"></info-header>
    <div class="message-main">
      <side-bar class="side-bar"></side-bar>
      <div class="message-inter">
        <message-container></message-container>
      </div>
    </div>
  </div>
</template>

<script>
import infoHeader from "@/components/infoHeader";
import sideBar from "@/components/sideBar";
import messageContainer from "@/components/messageContainer";
import socket from "@/plugins/socket_io_client";
import store from "@/store";

export default {
  components: {
    infoHeader,
    sideBar,
    messageContainer,
  },
  methods: {
    socketInit: function () {
      socket.on("connect", () => {
        socket.on("client-info", (dataObj) => {
          store.commit("mod_data", (state) => {
            state.socketId = socket.id;
            state.currentUser = dataObj.username;
            state.currentRoom = dataObj.currentRoom;
          });
        });

        socket.on("room-name-list", (dataArr) => {
          store.commit("mod_data", (state) => {
            state.roomNameList = dataArr;
          });
        });

        socket.on("current-room-users", (dataArr) => {
          store.commit("mod_data", (state) => {
            state.currentRoomUsers = dataArr;
          });
        });

        socket.on("current-room-megs", (dataArr) => {
          store.commit("mod_data", (state) => {
            state.currentRoomMegs = dataArr;
          });
        });
      });
    },
  },
  created() {
    this.socketInit();
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-main {
  display: flex;
  width: 100%;
}

.side-bar {
  width: 25%;
  box-shadow: 2px 2px 2px 2px #dddddd;
}

.message-inter {
  width: 75%;
}
</style>
