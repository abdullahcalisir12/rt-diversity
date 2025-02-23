<template>
  <div class="company-stats">
    <div v-if="loading" class="loading">
      <div class="loader">
        <img src="https://res.cloudinary.com/hebu10lmu/image/upload/q_auto,c_scale,w_119/v1579546392/www/logo-light_mijgnj.png" alt="">
      </div>
    </div>
    <template v-if="companyInfo">
      <Card title="LGBTGIA+" infoBox="The letters LGBTQIA+ refer to lesbian, gay, bisexual, transgender, queer or questioning, intersex, and asexual identities.">
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['LGBTGIA']"
        />
      </Card>
      <Card title="Has a Disability" infoBox="Disabilities can include chronic illness or pain, neurological disorders, or any other differing abilities.">
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['has-a-disability']"
        />
      </Card>
      <Card title="Non-Native English Speaker">
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['non-native-english-speaker']"
        />
      </Card>
      <Card title="Served in the Military">
        <SemiCircleProgressBar
          :total="companyInfo['total-employees']"
          :value="companyInfo['served-in-military']"
        />
      </Card>
    </template>
    <template v-if="companyInfo">
      <Card title="Gender">
        <BarChart
          :labels="genders.map(gen => gen.label)"
          :values="genders.map(gen => gen.count)"
          :colors="genders.map(gen => gen.color)"
        />
      </Card>
      <Card title="Ethnicity">
        <BarChart
          :labels="ethnicitys.map(eth => eth.label)"
          :values="ethnicitys.map(eth => eth.count)"
          :colors="ethnicitys.map(eth => eth.color)"
        />
      </Card>
      <Card title="Locations">
        <BarChart
          :labels="locations.map(loc => loc.label)"
          :values="locations.map(loc => loc.count)"
          :colors="locations.map(loc => loc.color)"
        />
      </Card>
      <Card title="Age">
        <BarChart
          :labels="ageCategories.map(ageC => ageC.label)"
          :values="ageCategories.map(ageC => ageC.count)"
          :colors="ageCategories.map(ageC => ageC.color)"
        />
      </Card>
      <Card title="Company Culture / Team Values">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['team-values']" :key="key">{{value}}</h3>
        </div>
      </Card>
      <Card title="Company Culture / Daily Routines">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['daily-routines']" :key="key">{{value}}</h3>
        </div>
      </Card>
      <Card title="Company Culture / Personal Health">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['personal-health']" :key="key">{{value}}</h3>
        </div>
      </Card>
      <Card title="Company Culture / Engineering">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['engineering']" :key="key">{{value}}</h3>
        </div>
      </Card>
      <Card title="Company Culture / Career Growth">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['career-growth']" :key="key">{{value}}</h3>
        </div>
      </Card>
      <Card title="Company Culture / Strategy">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['strategy']" :key="key">{{value}}</h3>
        </div>
      </Card>
      <Card title="Company Culture / Company Properties">
        <div class="culture">
          <h3 v-for="(value, key) in companyInfo['company-properties']" :key="key">{{value}}</h3>
        </div>
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
  private loading = false;

  @Prop({ required: true }) readonly company!: string;

  @Watch("company", { immediate: true })
  onSelectedCompanyChanged(value: string) {
    this.loading = true;
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
    setTimeout(() => {
      this.loading = false;
    }, 2000)
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

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

  .loader {
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
    font-size: 48px;
  }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  }

  .culture {
    padding: 0 2rem 2rem;
    h3 {
      padding: 1rem;
      background: lightcoral;
      border-radius: 12px;
      color: white;
    }
  }
}
</style>
