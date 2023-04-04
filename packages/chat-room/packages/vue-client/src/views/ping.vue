<template>
  <div class="ping-form">
    <el-card>
      <el-form class="el-form"
               ref="form" :model="form"
               label-width="150px"
               label-position="left">

        <el-form-item label="域名(domain)">
          <el-input v-model="domain"></el-input>
        </el-form-item>

        <el-form-item label="ping次数(repeat)">
          <el-input v-model="repeat"></el-input>
        </el-form-item>

        <el-form-item label="协议(Protocol)">
          <el-select v-model="form.networkProtocol" placeholder="请选择协议">
            <el-option label="IPv4" value="IPv4"></el-option>
            <el-option label="IPv6" value="IPv6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="失败重试次数(retries)">
          <el-input v-model="form.retries"></el-input>
        </el-form-item>

        <el-form-item label="发送包大小(packetSize)">
          <el-input v-model="form.packetSize"></el-input>
        </el-form-item>

        <el-form-item label="超时时间(timeout)">
          <el-input v-model="form.timeout"></el-input>
        </el-form-item>

        <el-form-item label="生存值时间(ttl)">
          <el-input v-model="form.ttl"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="onSubmit"
                     type="success">发送
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="message-display">
      <div class="message-node">
        <ul>
          <el-card v-show="pingOptionShow">
            <h2>{{ "网络协议: " + form.networkProtocol }}</h2>
            <h2>{{ "失败重试次数: " + form.retries + " 次" }}</h2>
            <h2>{{ "发送包大小: " + form.packetSize + "字节" }}</h2>
            <h2>{{ "超时时间: " + form.timeout + " 毫秒" }}</h2>
            <h2>{{ "生存时间值:" + form.ttl }}</h2>
          </el-card>
          <li v-for="item in messageArr">
            <el-card>{{ item }}</el-card>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>
<script>
import socket from "@/plugins/socket_io_client";
import "../assets/css/scroll_bar.css"

export default {
  name: "ping",
  data() {
    return {
      domain: "www.baidu.com",
      repeat: "10",
      form: {
        networkProtocol: 'IPv4',
        retries: '1',
        packetSize: '32',
        timeout: '2000',
        ttl: '128',
      },
      pingResult: {},
      messageArr: [],
      pingOptionShow: false
    }
  },
  computed: {
    pingOption: function () {
      return this.$store.state.pingOption
    },
    pingData: function () {
      return {domain: this.domain, pingOption: this.pingOption}
    }
  },
  methods: {
    onSubmit: function () {
      this.$store.commit('mod_data', (state) => {
        state.pingOption = this.pingOption
      })
      this.pingOptionShow = true
      for (let i = 0; i < this.repeat; i++) {
        socket.emit("ping", this.pingData)
      }

    }
  },
  mounted() {
    socket.on("ping-result", (pingResult) => {
      this.pingResult = pingResult
      console.log(this.pingResult)
      let message = `ping ${this.pingResult.ip} 响应 ${this.pingResult.ms} 毫秒`
      this.messageArr.push(message)
    })
  }
}

</script>
<style>
.ping-form {
  display: flex;
}

.message-display {
  margin-left: 15px;
  /*background-color: #eff;*/
  min-width: 450px;
  overflow: scroll;
  overflow-x: hidden;
  height: 600px;
}

.message-node {
  color: white;
}

.message-node li {
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>


