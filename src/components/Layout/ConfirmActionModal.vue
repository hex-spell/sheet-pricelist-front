<template>
  <div
    class="modal fade"
    :id="props.id"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="itemModalLabel">¿Seguro que desea {{props.actionDescription}}?</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{props.actionConsequences}}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="ctx.emit('confirm')"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ConfirmActionModal",
  props: {
    actionDescription: String,
    actionConsequences: String,
    id: String
  },
  setup(props, ctx) {
    return { props, ctx };
  },
};
</script>

<style>
</style>