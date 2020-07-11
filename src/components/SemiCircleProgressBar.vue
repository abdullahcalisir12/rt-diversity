<template>
  <div class="single-chart">
    <svg viewBox="0 0 36 36">
      <g>
        <path
          d="M3,18 a15.9155,15.9155 0 0,1 31.831,0"
          fill="none"
          stroke-width="3"
          stroke="#efefef"
          stroke-linecap="round"
        />
        <path
          class="circle"
          d="M3,18 a15.9155,15.9155 0 0,1 31.831,0"
          fill="none"
          stroke-width="3"
          stroke="orange"
          stroke-linecap="round"
          stroke-dasharray="25, 100"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class SemiRadialChart extends Vue {}
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
