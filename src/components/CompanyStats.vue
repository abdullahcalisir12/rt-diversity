<template>
  <div class="company-stats">
    <Card>
      <SemiCircleProgressBar :total="companyInfo['total-employees']" :value="companyInfo['LGBTGIA']" />
    </Card>
    <Card>
      <SemiCircleProgressBar :total="companyInfo['total-employees']" :value="companyInfo['has-a-disability']" />
    </Card>
    <Card>
      <SemiCircleProgressBar :total="companyInfo['total-employees']" :value="companyInfo['non-native-english-speaker']" />
    </Card>
    <Card>
      <SemiCircleProgressBar :total="companyInfo['total-employees']" :value="companyInfo['served-in-military']" />
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
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
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
export default class CompanyStats extends Vue {
  public companyInfo: Airtable.Record<{}> | null = null;
  @Prop({ required: true }) readonly company!: string;

  @Watch('company', { immediate: true })
  onSelectedCompanyChanged(value: string) {
    Api.find("Companies", value).then((result: Airtable.Record<{}> | any) => {
      this.companyInfo = result.fields;
    });
  }
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
