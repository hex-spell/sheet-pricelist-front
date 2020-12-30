<template>
  <select name="category" id="category" v-model="state.category" @change="onChange">
    <option
      v-for="category in props.categories"
      :value="category.value"
      :key="category.value"
    >
      {{ category.name }}
    </option>
  </select>
  {{ state.category }}
</template>

<script>
import { reactive } from "vue";

export default {
  name: "CategoriesSelect",
  props: {
    categories: Array,
  },
  setup(props, ctx) {
    const state = reactive({
      category: 1,
    });
    function onChange(){
      ctx.emit('change',state.category);
    }
    return { state, props, onChange };
  },
};
</script>

<style>
</style>