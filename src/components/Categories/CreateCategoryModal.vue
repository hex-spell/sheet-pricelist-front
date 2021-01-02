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
          <h5 class="modal-title" id="itemModalLabel">Crear categoría</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="inputName" class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              required
              v-model="state.name"
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
          <input
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            value="Guardar cambios"
            @click="onSubmit"
          />
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
  name: "CreateCategoryModal",
  props: {
    id: String,
  },
  setup(props, ctx) {
    const state = reactive({
      name: "",
    });

    function onSubmit() {
      if (state.name) {
        axios
          .post(`${config.aws_api}/categories`, {
            name: state.name,
          })
          .then(() => {
            ctx.emit("categoryPostSuccess");
          })
          .catch((e) => console.log("error", e));
      }
    }
    return { props, onSubmit, state };
  },
};
</script>

<style>
</style>