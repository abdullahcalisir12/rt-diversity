<template>
  <div class="single-chart">
    <div class="chart-container">
      <div class="labels">
        <h6 v-for="label in labels" :key="label">{{label}}</h6>
      </div>
      <svg width="400" :height="chartHeight">
        <g
          v-for="(label, index) in labels"
          :key="index"
        >
          <rect
            x="0"
            :y="index * barHeight + index * gap"
            :width="total > 0 ? (values[index] * width) / total : 0"
            :height="barHeight"
            :fill="colors[index]"
          ></rect>
          <text
            text-anchor="start"
            :x="total > 0 ? (values[index] * width) / total + 5 : 0"
            :y="(index + 1) * barHeight + index * gap - barHeight / 2 + 9"
            style="font-size: 18px; "
          >
            {{ total > 0 ? Number((values[index] * 100) / total).toFixed(1) : 0 }}%
          </text>
        </g>
      </svg>
    </div>
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
  private width = 300;
  private gap = 10;

  private barHeight: number =
    (this.chartHeight - this.values.length * this.gap) / this.values.length;

  get total(): number {
    return this.values && this.values.reduce((acc, cur) => (acc = acc + cur));
  }
}
</script>

<style lang="scss" scoped>
.single-chart {
  width: 100%;

  .chart-container {
    display: flex;
    justify-content: space-between;

    padding: 0rem 4rem 2rem;

    .labels {
      max-width: 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-right: 1rem;

      h6 {
        margin: 0;
        padding: 0;
        font-size: 18px;
        text-align: left;
      }
    }
  }
}
</style>
