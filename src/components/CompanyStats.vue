<template>
  <div class="company-stats">
    <template v-if="companyInfo">
      <Card>
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['LGBTGIA']"
        />
      </Card>
      <Card>
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['has-a-disability']"
        />
      </Card>
      <Card>
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['non-native-english-speaker']"
        />
      </Card>
      <Card>
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['served-in-military']"
        />
      </Card>
    </template>
    <template>
      <Card>
        <BarChart
          :labels="genders.map(gen => gen.label)"
          :values="genders.map(gen => gen.count)"
          :colors="genders.map(gen => gen.color)"
        />
      </Card>
      <Card>
        <BarChart
          :labels="ethnicitys.map(eth => eth.label)"
          :values="ethnicitys.map(eth => eth.count)"
          :colors="ethnicitys.map(eth => eth.color)"
        />
      </Card>
      <Card>
        <BarChart
          :labels="locations.map(loc => loc.label)"
          :values="locations.map(loc => loc.count)"
          :colors="locations.map(loc => loc.color)"
        />
      </Card>
      <Card>
        <BarChart
          :labels="ageCategories.map(ageC => ageC.label)"
          :values="ageCategories.map(ageC => ageC.count)"
          :colors="ageCategories.map(ageC => ageC.color)"
        />
      </Card>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Api from "@/airtable-api";
import { genders, ethnicitys, locations, ageCategories } from "@/constants.ts";
import SemiCircleProgressBar from "@/components/SemiCircleProgressBar.vue";
import BarChart from "@/components/BarChart.vue";
import Card from "@/components/Card.vue";
import { Records } from "airtable";

@Component({
  components: {
    SemiCircleProgressBar,
    BarChart,
    Card
  }
})
export default class CompanyStats extends Vue {
  private companyInfo: Airtable.Record<{}> | null = null;
  private employees: Array<any | never> = [];
  private genders: Array<any> = [];
  private ethnicitys: Array<any> = [];
  private locations: Array<any> = [];
  private ageCategories: Array<any> = [];

  @Prop({ required: true }) readonly company!: string;

  @Watch("company", { immediate: true })
  onSelectedCompanyChanged(value: string) {
    Api.find("Companies", value).then(
      async (result: Airtable.Record<{}> | any) => {
        this.companyInfo = result.fields;
        this.employees = [];
        result.fields.Employees.forEach(async (emp: string) => {
          const employee = await Api.find("Employees", emp);
          this.employees.push(employee.fields);
        });
      }
    );
    this.genders = genders.map(gen => {
      return {
        ...gen,
        count: 0
      };
    });
    this.ethnicitys = ethnicitys.map(eth => {
      return {
        ...eth,
        count: 0
      };
    });
    this.ageCategories = ageCategories.map(ageC => {
      return {
        ...ageC,
        count: 0
      };
    });
    this.locations = locations.map(loc => {
      return {
        ...loc,
        count: 0
      };
    });
  }

  @Watch("employees", { deep: true })
  onEmployeesChanged(value: string) {
    if (
      this.companyInfo &&
      this.companyInfo["Employees"].length === value.length
    ) {
      this.employees.forEach(emp => {
        this.genders[
          this.genders.findIndex(gender => gender.label === emp.gender)
        ].count += 1;
        this.ethnicitys[
          this.ethnicitys.findIndex(
            ethnicity => ethnicity.label === emp.ethnicity
          )
        ].count += 1;
        this.locations[
          this.locations.findIndex(location => location.label === emp.location)
        ].count += 1;
        this.ageCategories[
          this.ageCategories.findIndex(
            ageCategory =>
              emp.age > ageCategory.min && emp.age <= ageCategory.max
          )
        ].count += 1;
      });
    }
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
