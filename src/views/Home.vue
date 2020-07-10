<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private msg = "Hello Remote Team";
}
</script>
