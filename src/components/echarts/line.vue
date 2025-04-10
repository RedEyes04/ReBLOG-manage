<template>
  <div :style="{ height: chartHeight }" ref="chart" class="chart"></div>
</template>

<script lang="ts" setup>

import { ref, onMounted, onBeforeUnmount, markRaw, watch } from 'vue'
// import * as echarts from 'echarts/core'
import * as echarts from 'echarts/core';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
//引入折线、饼图组件
import { LineChart } from 'echarts/charts';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition
]);
// type EChartsOption = echarts.ComposeOption<
//   GridComponentOption | LineSeriesOption>;
const chart = ref<HTMLDivElement>()

const myChart = ref()
// 接受父组件传过来的option，和echarts的高度

// 可以根据父组件传过来的option对象生成折线图、柱状图、饼图等等。
const props = defineProps(['data', 'chartHeight'])

const xAxisD = ref<string[]>([]);
const seriesD = ref<number[]>([]);
const option = ref();
const visit = (e: any) => {
  xAxisD.value = []; seriesD.value = [];
  for (let i = 0; i < e.length; i++) {
    xAxisD.value.push(e[i].date)
    seriesD.value.push(e[i].count)
  }
  option.value = {
    color: ['#2B5AED'],
    grid: {
      top: "4%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisD.value,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: seriesD.value,
        type: 'line',
        smooth: true
      }
    ]
  }
}

onMounted(() => {
  visit(props.data);
  // 函数体
  // ！！！这里必须用markRaw包裹住，否则当页面宽度变化控制台会报错
  myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
  myChart.value.setOption(option.value)
  // 监听页面视图变化echarts图的宽度变化
  window.addEventListener("resize", () => {
    myChart.value.resize()
  })

})
watch(
  () => props.data,
  (n) => {
    visit(n);
    myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
    myChart.value.setOption(option.value)
  },
)

// 组件销毁前一定要取消监听的事情，不然会印象性能和暂用内存
onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    myChart.value.resize()
  })
})

</script>

<style lang="less" scoped>
.chart {
  width: 100%;
}
</style>