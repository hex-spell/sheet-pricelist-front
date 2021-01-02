<template>
  <Navbar
    createCategoryTarget="#createCategoryModal"
    modifyCategoryTarget="#modifyCategoryModal"
    createItemTarget="#itemModal"
    @createItemClick="onCreateItemClick"
  />
  <div class="container mt-3 mb-3">
    <div class="card main-card">
      <div class="card-header">
        <div class="input-group mb-2">
          <select
            name="category"
            id="category"
            @change="onChangeCategory"
            class="form-select"
            v-model="state.selectedCategory"
          >
            <option value="" selected>
              Todas las categorias
            </option>
            <option
              v-for="category in state.categories"
              :value="category.id"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <button
            data-bs-toggle="modal"
            data-bs-target="#confirmDeleteCategory"
            v-if="state.selectedCategory !== ''"
            class="input-group-text"
            id="basic-addon2"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>

        <input
          type="search"
          aria-label="Buscar"
          placeholder="Buscar..."
          class="form-control"
          style="min-width: 200px"
          v-model="state.search"
        />
      </div>
      <div class="card-body">
        <div
          v-if="state.fetchingItems"
          class="spinner-border"
          role="status"
        ></div>
        <ItemList
          v-else
          :items="filteredItems"
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
    @itemPostSuccess="onItemPostSuccess"
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
  <ConfirmActionModal
    id="confirmDeleteCategory"
    actionDescription="eliminar esta categoría"
    actionConsequences="Todos los items que pertenezcan a ella serán eliminados de forma irreversible."
    @confirm="deleteCategory"
  />
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
import ConfirmActionModal from "./components/Layout/ConfirmActionModal.vue";
import CreateCategoryModal from "./components/Categories/CreateCategoryModal.vue";
import ModifyCategoryModal from "./components/Categories/ModifyCategoryModal.vue";
import ItemList from "./components/Items/ItemList.vue";
import ItemModal from "./components/Items/ItemModal.vue";
import { reactive, computed } from "vue";
import useFetch from "./hooks/useFetch";
import config from "./config";
import axios from "axios";

export default {
  name: "App",
  components: {
    Navbar,
    CreateCategoryModal,
    ItemList,
    ItemModal,
    ModifyCategoryModal,
    ConfirmActionModal,
  },
  setup() {
    const state = reactive({
      categories: [],
      items: [],
      currentItem: {},
      createItemMode: false,
      fetchingItems: true,
      search: "",
      selectedCategory: "",
    });
    const filteredItems = computed(() =>
      state.items.filter((item) => item.name.toLowerCase().includes(state.search.toLowerCase()))
    );
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
    function onChangeCategory() {
      const { response: items, fetching: fetchingItems } = useFetch(
        `${config.aws_api}/items?categoryId=${state.selectedCategory}`,
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
    function onItemPostSuccess() {
      onChangeCategory()
    }
    function deleteCategory() {
      axios
        .delete(`${config.aws_api}/categories`, {
          data: { id: state.selectedCategory },
        })
        .then(() => {
          fetchCategories();
          fetchItems();
          state.selectedCategory = "";
        });
    }
    return {
      state,
      onChangeCategory,
      onClickedItem,
      onCreateItemClick,
      onCategoryPostSuccess,
      filteredItems,
      deleteCategory,
      onItemPostSuccess
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
