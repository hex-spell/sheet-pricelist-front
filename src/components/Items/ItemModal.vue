<template>
  <div
    class="modal fade"
    :id="props.id"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form class="modal-content">
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
            <select name="category" id="inputCategory" class="form-select">
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
              required
              :value="item.name"
              type="text"
              class="form-control"
              id="inputName"
            />
          </div>
          <div class="mb-3">
            <label for="inputUnit" class="form-label">Unidad</label>
            <input
              required
              :value="item.unit"
              type="text"
              class="form-control"
              id="inputUnit"
            />
          </div>
          <div class="mb-3">
            <label for="inputPrice" class="form-label">Precio</label>
            <input
              required
              :value="item.price"
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
          <button type="button" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemModal",
  props: {
    item: Object,
    id: String,
    categories: Array,
    create: Boolean
  },
  setup(props) {
    return { props };
  },
};
</script>

<style>
</style>