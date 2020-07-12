<template>
  <div class="home">
    <SelectBox v-model="selectedCompany" class="select-box" :options="companies"></SelectBox>
    <CompanyStats v-if="selectedCompany" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Api from "@/airtable-api";

import SelectBox from "@/components/SelectBox.vue";
import CompanyStats from "@/components/CompanyStats.vue";

@Component({
  components: {
    SelectBox,
    CompanyStats
  }
})
export default class Home extends Vue {
  private companies: Array<any | never> = [];
  private selectedCompany = '';
  created() {
    Api.get("Companies").then((result: any) => {
      result.eachPage(async (records: Array<any>, fetchNextPage: Function) => {
        // Set companies array to bind SelectBox
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