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
            <select name="category" id="inputCategory" class="form-select">
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
            <input type="text" class="form-control" id="inputName" required />
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
  name: "ModifyCategoryModal",
  props: {
    id: String,
    categories: Array,
  },
  setup(props) {
    return { props };
  },
};
</script>

<style>
</style>