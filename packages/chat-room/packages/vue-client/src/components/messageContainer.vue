<template>
  <div class="message-container">
    <!--messages-->
    <div class="message-display">
      <div v-for="megObj in messages" class="message-node">
        <h4 class="username">
          <i class="el-icon-user-solid">{{ megObj.sender }}</i>
        </h4>
        <div class="message-card">
          <h4>{{ megObj.text }}</h4>
        </div>
      </div>
    </div>
    <!--selectEmoji()"-->
    <div class="message-tools-bar">
      <el-popover
          placement="top"
          width="325"
          trigger="click">
        <VEmojiPicker @select="selectEmoji"/>
        <el-button class="tool-btn"
                   slot="reference"
                   icon="el-icon-star-off"
                   type="warning"
                   circle>
        </el-button>
      </el-popover>
      <el-button class="tool-btn" @click="setName"
                 icon="el-icon-edit"
                 type="info"
                 circle>
      </el-button>
      <el-button class="tool-btn" @click="clearMessage"
                 icon="el-icon-delete"
                 type="danger"
                 circle>
      </el-button>

      <el-button
          class="tool-btn"
          size="medium"
          native-type="submit"
          type="success"
          @click="sendMessage"
      >
        发送
      </el-button>
    </div>
    <!--v-model="text_input"-->
    <el-input class="message-input"
              v-model="text_input"
              type="textarea"
              maxlength="99"
              placeholder="请输入内容"
              show-word-limit
              :rows="3">
    </el-input>
  </div>
</template>

<script>
import socket from "@/plugins/socket_io_client";
import note from "@/components/note";

export default {
  name: "messageContainer",
  components: {
    note
  },
  data() {
    return {
      text_input: "hello Socket",
      showEmoji: false,
      imgURL: ""
    }
  },
  computed: {
    avatar: function () {
      return this.$refs.avatar
    },
    myName: function () {
      return this.$store.state.currentUser
    },
    msgObj: function () {
      return {sender: this.myName, text: this.text_input}
    },
    state: function () {
      return this.$store.state;
    },
    messages: function () {
      return this.state.currentRoomMegs;
    },
  },
  methods: {
    selectEmoji: function (emoji) {
      this.text_input += emoji.data
    },
    // send message
    sendMessage() {
      if (this.text_input !== "") {
        socket.emit('send-message-in-current-room', this.msgObj)
        this.text_input = ""
      }
    },
    clearMessage: function () {
      this.text_input = ""
    },
    addMessageList: function (msg) {
      this.$store.commit('mod_data', (state) => {
        state.currentRoomMegs.push(msg)
      })
    },
    setName: function () {
      this.$prompt("请输入昵称", "更改昵称")
          .then(({value}) => {
            socket.emit("setName", value)
          })
    },
  },
  created() {
    socket.on('message', (msg) => {
      this.addMessageList(msg)
    })
  },
  mounted() {
  }

}

</script>

<style>
.message-container {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 2px #dddddd;
}

.message-display {
  width: 100%;
  height: 600px;
  overflow: scroll;
  overflow-x: hidden;
  background-color: #eeeef5;
  display: flex;
  flex-direction: column;
}

.message-node {
  margin-bottom: 15px;
  max-width: 300px;
}

.username {
  opacity: 0.5;
}

.message-card {
  margin-top: 10px;
  margin-left: 15px;
  padding: 10px;
  background-color: #01b7c4;
  color: #fff;
  border-radius: 0 60px 60px 60px;
  font-size: large;
  animation: fadeIn;
}

@keyframes fadeIn {
  0% {

  }
  25%{
    transform: translateX(100px);
  }
  75%{
    transform: translateX(200px);
  }
  100% {
  }
}

.message-tools-bar {
  display: flex;
  align-items: center;
}

.tool-btn {
  margin: 10px 15px;
}

.message-input {
  max-width: 90%;
  margin: 10px 15px;
  font-size: large;
}


</style>