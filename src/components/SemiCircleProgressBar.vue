<template>
  <div class="single-chart">
    <svg viewBox="0 0 36 36">
      <g>
        <path
          d="M2,26 a15.9155,15.9155 0 0,1 31.831,0"
          fill="none"
          stroke-width="2"
          stroke="#efefef"
          stroke-linecap="round"
        />
        <path
          v-if="value"
          class="circle"
          d="M2,26 a15.9155,15.9155 0 0,1 31.831,0"
          fill="none"
          stroke-width="2"
          stroke="orange"
          stroke-linecap="round"
          :stroke-dasharray="strokeDashArray"
        />
      </g>
      <text x="50%" y="60%" text-anchor="middle" dy=".3em"  style="font-size: 6px;">{{ percentage }}%</text>
      <text x="1.5" y="30" style="font-size: 2px;">0</text>
      <text x="32" y="30" style="font-size: 2px;">100</text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class SemiRadialChart extends Vue {
  @Prop({ required: true }) readonly total!: number;
  @Prop({ required: true }) readonly value!: number;

  get percentage(): number {
    if (this.value && this.total) {
      const percentage = (this.value * 100) / this.total;
      return percentage % 1 !== 0 ? Number(percentage.toFixed(1)) : percentage;
    }

    return 0;
  }

  get strokeDashArray(): string {
    return `${
      this.percentage / 2
    }, 100`;
  }
}
</script>

<style scoped>
.single-chart {
  width: 100%;
  max-width: 400px;
}

.circle {
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
</style>
