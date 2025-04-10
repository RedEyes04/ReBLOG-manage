<template>
  <div :style="{ height: chartHeight }" ref="chart" class="chart"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, markRaw, watch } from 'vue'
import * as echarts from 'echarts/core';
// 引入所需组件
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition
]);

const chart = ref<HTMLDivElement>()
const myChart = ref()
const props = defineProps(['data', 'title', 'chartHeight'])
const option = ref();

// 计算总数并生成饼图配置
const survey = (e: any) => {
  let total: number = 0;
  e.forEach((item: any) => total += item.value);

  option.value = {
    color: ['#4D9BEB', '#6B8E23', '#8A2BE2', '#FF6347', '#20B2AA'], // 采用蓝色、绿色、紫色、橙色、青色
    title: {
      text: total, // 主标题文本
      subtext: props.title, // 副标题文本
      left: "center",
      top: "35%",
      textStyle: {
        fontSize: 30,
        color: "#2C3E50", // 主标题颜色
        align: "center",
      },
      subtextStyle: {
        fontSize: 14,
        color: "#7F8C8D", // 副标题颜色
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: true,
      bottom: -5,
      icon: 'circle',
      textStyle: {
        color: '#7F8C8D' // 设置图例文字颜色
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '76%'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: false,
            fontSize: 14, // 标签字体大小
          },
          emphasis: {
            show: false,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2C3E50', // 高亮时标签的颜色
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
            color: '#2C3E50',
          }
        },
        labelLine: {
          show: false,
        },
        data: e,
      }
    ]
  };
};

// 初始时调用 survey 函数
survey(props.data);

// 初始化图表
onMounted(() => {
  myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement));
  myChart.value.setOption(option.value);

  // 监听视图变化，调整图表大小
  window.addEventListener("resize", () => {
    myChart.value.resize();
  });
});

// 监听数据变化，更新图表
watch(
  () => props.data,
  (n) => {
    survey(n);
    myChart.value.setOption(option.value);
  },
);

// 组件销毁前移除事件监听，防止内存泄漏
onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    myChart.value.resize();
  });
});
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 100%;
}
</style>
