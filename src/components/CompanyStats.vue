<template>
  <div class="company-stats">
    <Card>
      <SemiCircleProgressBar />
    </Card>
    <Card>
      <SemiCircleProgressBar />
    </Card>
    <Card>
      <SemiCircleProgressBar />
    </Card>
    <Card>
      <SemiCircleProgressBar />
    </Card>
    <Card>
      <BarChart />
    </Card>
    <Card>
      <BarChart />
    </Card>
    <Card>
      <BarChart />
    </Card>
    <Card>
      <BarChart />
    </Card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import SemiCircleProgressBar from "@/components/SemiCircleProgressBar.vue";
import BarChart from "@/components/BarChart.vue";
import Card from "@/components/Card.vue";

@Component({
  components: {
    SemiCircleProgressBar,
    BarChart,
    Card
  }
})
export default class CompanyStats extends Vue {

}
</script>

<style lang="scss" scoped>
.company-stats {
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}
</style>