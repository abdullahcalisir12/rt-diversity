<template>
  <div class="single-chart">
    <svg width="420" height="300" >
      <rect v-for="n in 7" :key="n" x="0" :y="(n - 1) * barHeight + n * gap" :width="420 * 1 / n" :height="barHeight"></rect>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class SemiRadialChart extends Vue {
  private barHeight = 30;
  private gap = 10;
}
</script>
