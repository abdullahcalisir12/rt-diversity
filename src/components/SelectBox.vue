<template>
  <div class="select-box">
    <select v-model="selectedOption" @change="onValueChange">
      <option value="" disabled>Please Select One</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        >{{ option.name }}</option
      >
    </select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from "vue-property-decorator";
@Component
export default class SelectBox extends Vue {
  @Prop({ required: true }) readonly options!: Array<object>;
  @Model("change", { type: String }) readonly value!: string;

  private selectedOption = this.value;

  @Emit("change")
  onValueChange() {
    return this.selectedOption;
  }
}
</script>
