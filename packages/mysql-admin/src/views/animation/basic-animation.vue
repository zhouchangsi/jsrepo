<template>
  <div class="basic-animation">
    <div class="animation-control">
      <button @click="startAnimation">start</button>
    </div>
    <node-square ref="node-square"/>

  </div>
</template>
<script>
import NodeSquare from "@/components/shape/node-square";
export default {
  name: "basicAnimation",
  components: {NodeSquare},
  computed:{

  },
  methods:{
    startAnimation:function (){
      let square = this.$refs["node-square"]
      square.doAnime()
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
.basic-animation{
  height: 500px;
  display: flex;
  flex-direction: column;
  background-color: #444444;
}
.animation-control {
  width: 100%;
  height: 30px;
  background-color: #444444;
  display: flex;
  align-items: center;
}
</style>