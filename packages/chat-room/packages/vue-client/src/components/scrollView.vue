<template>
  <div>
    <!--messages-->
    <div class="message-display">
      <div v-for="megObj in messages" class="message-node">
        <h4 class="username">
          <i class="el-icon-user-solid">{{ megObj.sender }}</i>
        </h4>
        <div class="message-card">
          <img :src="megObj.text">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: "scrollView",
  components: {},
  data() {
    return {};
  },
  computed: {
    state: function () {
      return this.$store.state;
    },
    messages: function () {
      return this.state.currentRoomMegs;
    },
  },
  methods: {},
  created() {
  },
  mounted() {
  },
};
</script>

<style>

</style>
