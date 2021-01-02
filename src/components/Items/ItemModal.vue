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
          <h5 class="modal-title" id="itemModalLabel">
            {{ create ? "Crear Item" : `Editar: ${item.name}` }}
          </h5>
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
            <select
              name="category"
              id="inputCategory"
              class="form-select"
              v-model="state.categoryId"
              required
            >
              <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
                :selected="item.categoryId === category.id || create"
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
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";

export default {
  name: "ItemModal",
  props: {
    item: Object,
    id: String,
    categories: Array,
    create: Boolean,
  },
  setup(props) {
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
        state.categoryId = item.categoryId;
        state.created = item.created;
        state.unit = item.unit;
        state.price = item.price;
      }
    );
    function onSubmit() {
      console.log({...state});
    }

    return { props, onSubmit, state };
  },
};
</script>

<style>
</style>