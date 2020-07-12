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
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class SemiRadialChart extends Vue {
  @Prop({ required: true }) readonly total!: number;
  @Prop({ required: true }) readonly value!: number;

  get strokeDashArray(): string {
    return `${
      this.value && this.total ? (this.value * 50) / this.total : 0
    }, 100`;
  }
}
</script>

<style>
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
