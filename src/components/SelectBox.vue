<template>
  <div class="select-box">
    <select v-model="value" @change="onValueChange">
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
  @Model('change', { type: String }) readonly value!: string;

  @Emit('change')
  onValueChange() {
    return this.value;
  }
}
</script>
