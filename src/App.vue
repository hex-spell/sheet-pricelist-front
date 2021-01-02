<template>
  <Navbar
    createCategoryTarget="#createCategoryModal"
    modifyCategoryTarget="#modifyCategoryModal"
    createItemTarget="#itemModal"
    @createItemClick="onCreateItemClick"
  />
  <div class="container mt-3">
    <div class="card">
      <div class="card-header">
        <div class="input-group">
          <CategoriesSelect
            :categories="state.categories"
            @changeCategory="onChangeCategory"
            style="min-width: 200px"
            :includeAllCategoriesOption="true"
            selected=""
          />
          <input
            type="search"
            aria-label="Buscar"
            placeholder="Buscar..."
            class="form-control"
            style="min-width: 200px"
          />
        </div>
      </div>
      <div class="card-body">
        <div v-if="state.fetchingItems" class="spinner-border" role="status"></div>
        <ItemList
          v-else
          :items="state.items"
          @clickedItem="onClickedItem($event)"
          modalTarget="#itemModal"
        />
      </div>
    </div>
  </div>
  <ItemModal
    :item="state.currentItem"
    id="itemModal"
    :categories="state.categories"
    :create="state.createItemMode"
  />
  <CreateCategoryModal
    id="createCategoryModal"
    @categoryPostSuccess="onCategoryPostSuccess"
  />
  <ModifyCategoryModal
    id="modifyCategoryModal"
    :categories="state.categories"
    @categoryPostSuccess="onCategoryPostSuccess"
  />
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
import CategoriesSelect from "./components/Inputs/CategoriesSelect.vue";
import CreateCategoryModal from "./components/Categories/CreateCategoryModal.vue";
import ModifyCategoryModal from "./components/Categories/ModifyCategoryModal.vue";
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
    CreateCategoryModal,
    ItemList,
    ItemModal,
    ModifyCategoryModal,
  },
  setup() {
    const state = reactive({
      categories: [],
      items: [],
      currentItem: {},
      createItemMode: false,
      fetchingItems: true,
    });
    const fetchCategories = () => {
      const { response: categories } = useFetch(
        `${config.aws_api}/categories`,
        {}
      );
      if (categories) {
        state.categories = categories;
      }
    };
    fetchCategories();
    const fetchItems = () => {
      const { response: items, fetching: fetchingItems } = useFetch(
        `${config.aws_api}/items`,
        {}
      );
      if (items) {
        state.items = items;
        state.fetchingItems = fetchingItems;
      }
    };
    fetchItems();
    function onChangeCategory(category) {
      const { response: items, fetching: fetchingItems } = useFetch(
        `${config.aws_api}/items?categoryId=${category}`,
        {}
      );
      if (items) {
        state.items = items;
        state.fetchingItems = fetchingItems;
      }
    }
    function onClickedItem(item) {
      state.currentItem = item;
      state.createItemMode = false;
    }
    function onCreateItemClick() {
      state.currentItem = {};
      state.createItemMode = true;
    }
    function onCategoryPostSuccess() {
      fetchCategories();
    }
    return {
      state,
      onChangeCategory,
      onClickedItem,
      onCreateItemClick,
      onCategoryPostSuccess,
    };
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
