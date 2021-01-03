<template>
  <div
    class="modal fade"
    :id="props.id"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="itemModalLabel"
            v-if="props.categories.length > 0"
          >
            {{ create ? "Crear Item" : `Editar: ${item.name}` }}
          </h5>
          <h5 class="modal-title" id="itemModalLabel" v-else>Crear Item</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="props.categories.length > 0">
          <div class="mb-3">
            <label for="inputCategory" class="form-label">Categoría</label>
            <select
              name="category"
              id="inputCategory"
              class="form-select"
              v-model="state.categoryId"
              required
            >
              <option
                v-for="(category, index) in categories"
                :value="category.id"
                :key="category.id"
                :selected="
                  item.categoryId === category.id || (create && index === 0)
                "
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputName" class="form-label">Nombre</label>
            <input
              v-model="state.name"
              required
              type="text"
              class="form-control"
              id="inputName"
            />
          </div>
          <div class="mb-3">
            <label for="inputUnit" class="form-label">Unidad</label>
            <input
              v-model="state.unit"
              required
              type="text"
              class="form-control"
              id="inputUnit"
            />
          </div>
          <div class="mb-3">
            <label for="inputPrice" class="form-label">Precio</label>
            <input
              v-model="state.price"
              required
              type="text"
              class="form-control"
              id="inputPrice"
            />
          </div>
        </div>
        <div class="alert-warning modal-body" v-else>
          Antes de poder crear un item, debes crear una categoría.
        </div>
        <div class="modal-footer">
          <button
            @click="onDelete"
            type="submit"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            v-if="props.categories.length > 0 && state.created"
          >
            Eliminar
          </button>
          <div
            class="spacer"
            v-if="props.categories.length > 0 && state.created"
          ></div>
          <button
            v-else
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            @click="onSubmit"
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-if="props.categories.length > 0"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import config from "../../config";
import axios from "axios";

export default {
  name: "ItemModal",
  props: {
    item: Object,
    id: String,
    categories: Array,
    create: Boolean,
  },
  setup(props, ctx) {
    const state = reactive({
      name: props.item.name,
      id: props.item.id,
      categoryId: props.item.categoryId,
      created: props.item.created,
      unit: props.item.unit,
      price: props.item.price,
    });
    watch(
      () => props.item,
      (item) => {
        state.name = item.name;
        state.id = item.id;
        state.categoryId = item.categoryId || props.categories[0].id;
        state.created = item.created;
        state.unit = item.unit;
        state.price = item.price;
      }
    );
    function onSubmit() {
      const { name, categoryId, unit, price } = state;
      if (name && categoryId && unit && price) {
        if (props.create) {
          axios
            .post(`${config.aws_api}/items`, {
              ...state,
            })
            .then(() => {
              ctx.emit("itemPostSuccess");
            });
        } else {
          axios
            .put(`${config.aws_api}/items`, {
              ...props.item,
              ...state,
            })
            .then(() => {
              ctx.emit("itemPostSuccess");
            });
        }
      }
    }
    function onDelete() {
      const { created, id } = state;
      if (created && id) {
        axios
          .delete(`${config.aws_api}/items`, {
            data: {created, id}
          })
          .then(() => {
            ctx.emit("itemPostSuccess");
          });
      }
    }
    return { props, onSubmit, onDelete, state };
  },
};
</script>

<style>
.spacer {
  flex-grow: 1;
}
</style>