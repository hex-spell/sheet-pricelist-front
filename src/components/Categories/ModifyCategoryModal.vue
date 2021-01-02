<template>
  <div
    class="modal fade"
    :id="props.id"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="">
        <div class="modal-header">
          <h5 class="modal-title" id="itemModalLabel">Modificar categoría</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="inputCategory" class="form-label">Categoría</label>
            <select name="category" id="inputCategory" class="form-select" v-model="state.id" required @change="onCategoryChange">
              <option
                v-for="(category, index) in categories"
                :value="category.id"
                :key="category.id"
                :selected="index === 0"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputName" class="form-label">Nuevo nombre</label>
            <input type="text" class="form-control" id="inputName" required v-model="state.name"/>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <input type="button" class="btn btn-primary" @click="onSubmit" value="Guardar cambios" data-bs-dismiss="modal"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import config from "../../config";

export default {
  name: "ModifyCategoryModal",
  props: {
    id: String,
    categories: Array,
  },
  setup(props, ctx) {
    const state = reactive({
      id: '',
      name: '',
    });
    function onSubmit() {
      if (state.id&&state.name){
        axios
          .put(`${config.aws_api}/categories`, {
            id: state.id,
            name: state.name,
          })
          .then(() => {
            ctx.emit("categoryPostSuccess");
          })
          .catch((e) => console.log("error", e));
      }
    }
    function onCategoryChange() {
      state.name = props.categories.filter((category)=>category.id===state.id)[0].name;
    }
    return { props, state, onSubmit, onCategoryChange };
  },
};
</script>

<style>
</style>