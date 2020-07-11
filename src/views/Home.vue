<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <div>
      <SemiCircleProgressBar />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Api from "@/airtable-api";

import SemiCircleProgressBar from "@/components/SemiCircleProgressBar.vue";

@Component({
  components: {
    SemiCircleProgressBar
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
