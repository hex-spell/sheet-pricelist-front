<template>
  <Navbar />
  <CategoriesSelect :categories="state.categories" @changeCategory="onChangeCategory" />
  <ItemList :items="state.items" />
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
import CategoriesSelect from "./components/Inputs/CategoriesSelect.vue";
import ItemList from "./components/Items/ItemList.vue";
import { reactive } from "vue";
import useFetch from "./hooks/useFetch";
import config from './config';

export default {
  name: "App",
  components: {
    Navbar,
    CategoriesSelect,
    ItemList
  },
  setup() {
    const state = reactive({
      categories: [],
      items: []
    });
    const { response: categories } = useFetch(`${config.aws_api}/categories`, {});
    if (categories) {
      state.categories = categories;
    }
    const { response: items } = useFetch(`${config.aws_api}/items`, {});
    if (items) {
      state.items = items;
    }
    function onChangeCategory(category) {
      const { response: items } = useFetch(`${config.aws_api}/items?categoryId=${category}`, {});
      if (items) {
        state.items = items;
      }
    }
    return { state, onChangeCategory };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
