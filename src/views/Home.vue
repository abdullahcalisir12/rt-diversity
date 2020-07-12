<template>
  <div class="home">
    <SelectBox
      v-model="selectedCompany"
      class="select-box"
      :options="companies"
    ></SelectBox>
    <CompanyStats v-if="selectedCompany" :company="selectedCompany" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Api from "@/airtable-api";

import SelectBox from "@/components/SelectBox.vue";
import CompanyStats from "@/components/CompanyStats.vue";
import { Query, Records } from "airtable";

@Component({
  components: {
    SelectBox,
    CompanyStats
  }
})
export default class Home extends Vue {
  public companiesTable: Query<{}> | null = null;
  private companies: Array<any | never> = [];
  private selectedCompany = "";
  created() {
    Api.get("Companies").then(async (result: Query<{}>) => {
      this.companiesTable = result;
      result.eachPage(async (records: Records<{}>, fetchNextPage: Function) => {
        this.companies = await records.map((record: any) => {
          return {
            value: record.id,
            name: record.get("company-name")
          };
        });
        fetchNextPage();
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 4rem;

  .select-box {
    margin-bottom: 4rem;
  }
}
</style>
