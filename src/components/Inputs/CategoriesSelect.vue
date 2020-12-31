<template>
  <select name="category" id="category" v-model="state.category" @change="onChange">
    <option value="" selected>Todas</option>
    <option
      v-for="category in props.categories"
      :value="category.id"
      :key="category.id"
    >
      {{ category.name }}
    </option>
  </select>
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
      category: "",
    });
    function onChange(){
      ctx.emit('changeCategory',state.category);
    }
    return { state, props, onChange };
  },
};
</script>

<style>
</style>