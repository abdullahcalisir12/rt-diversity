<template>
  <div class="home">
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
import Api from "@/airtable-api";

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
export default class Home extends Vue {
  private msg = "Hello Remote Team";
  private apiKey = process.env.VUE_APP_AIRTABLE_API_KEY;

  created() {
    Api.get("Table 1");
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;
  padding: 4rem;
}

.break {
  flex-basis: 100%;
  height: 0;
}
</style>
