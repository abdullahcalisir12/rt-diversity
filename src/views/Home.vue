<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Api from "@/airtable-api";
@Component
export default class Home extends Vue {
  private msg = "Hello Remote Team";
  private apiKey = process.env.VUE_APP_AIRTABLE_API_KEY;

  created() {
    Api.get("Table 1");
  }
}
</script>
