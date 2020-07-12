<template>
  <div class="single-chart">
    <svg width="400" :height="chartHeight">
      <rect
        v-for="(label, index) in labels"
        :key="index"
        x="0"
        :y="index * barHeight + index * gap"
        :width="total > 0 ? (values[index] * 100) / total : 0"
        :height="barHeight"
        :fill="colors[index]"
      ></rect>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class BarChart extends Vue {
  @Prop({ required: true }) readonly labels!: Array<string>;
  @Prop({ required: true }) readonly values!: Array<number>;
  @Prop({ required: true }) readonly colors!: Array<string>;

  private chartHeight = 300;
  private gap = 10;

  private barHeight: number =
    (this.chartHeight - this.values.length * this.gap) / this.values.length;

  get total(): number {
    return this.values && this.values.reduce((acc, cur) => (acc = acc + cur));
  }
}
</script>

<style scoped>
.single-chart {
  padding: 2rem 0;
}
</style>
