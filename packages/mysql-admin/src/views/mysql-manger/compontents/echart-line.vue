<template>
  <div class="echart-line">
    <div class="main">
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {option} from './echart-line-option'

export default {
  name: "echart-line",
  methods: {
    showCharts: function () {
      let dom = document.getElementsByClassName("main")[0]
      let myChart = echarts.init(dom)
      option && myChart.setOption(option)
    }
  },
  mounted() {
    this.showCharts()
  }
}
</script>

<style scoped>
/*.echart-line{*/
/*  width: 800px;*/
/*  height: 300px;*/
/*  overflow: auto;*/
/*}*/
.main{
  width: 800px;
  height: 100px;
  overflow: auto;
}

</style>