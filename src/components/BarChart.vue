<template>
  <div class="single-chart">
    <svg width="420" :height="chartHeight">
      <rect
        v-for="n in total"
        :key="n"
        x="0"
        :y="(n - 1) * barHeight + n * gap"
        :width="(420 * 1) / n"
        :height="barHeight"
      ></rect>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class BarChart extends Vue {
  private chartHeight = 300;
  private gap = 10;
  private total = 12;

  private barHeight: number =
    (this.chartHeight - this.total * this.gap) / this.total;
}
</script>

<style scoped>
.single-chart {
  padding: 2rem 0;
}
</style>
