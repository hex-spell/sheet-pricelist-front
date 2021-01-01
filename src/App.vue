<template>
  <Navbar />
  <div class="container mt-3">
    <div class="card">
      <div class="card-header">
        <div class="input-group">
          <CategoriesSelect
            :categories="state.categories"
            @changeCategory="onChangeCategory"
            style="min-width:200px;"
          />
          <input
            type="search"
            aria-label="Buscar"
            placeholder="Buscar..."
            class="form-control"
            style="min-width:200px;"
          />
        </div>
      </div>
      <div class="card-body">
        <ItemList :items="state.items" @clickedItem="onClickedItem($event)" modalTarget="#itemModal"/>
      </div>
    </div>
  </div>
  <ItemModal :item="state.currentItem" id="itemModal"/>
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
import CategoriesSelect from "./components/Inputs/CategoriesSelect.vue";
import ItemList from "./components/Items/ItemList.vue";
import ItemModal from "./components/Items/ItemModal.vue";
import { reactive } from "vue";
import useFetch from "./hooks/useFetch";
import config from "./config";

export default {
  name: "App",
  components: {
    Navbar,
    CategoriesSelect,
    ItemList,
    ItemModal
  },
  setup() {
    const state = reactive({
      categories: [],
      items: [],
      currentItem: {}
    });
    const { response: categories } = useFetch(
      `${config.aws_api}/categories`,
      {}
    );
    if (categories) {
      state.categories = categories;
    }
    const { response: items } = useFetch(`${config.aws_api}/items`, {});
    if (items) {
      state.items = items;
    }
    function onChangeCategory(category) {
      const { response: items } = useFetch(
        `${config.aws_api}/items?categoryId=${category}`,
        {}
      );
      if (items) {
        state.items = items;
      }
    }
    function onClickedItem(item) {
      state.currentItem = item;
    }
    return { state, onChangeCategory, onClickedItem };
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
