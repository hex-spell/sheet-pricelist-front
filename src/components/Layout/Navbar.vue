<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Lista de precios</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li>
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              data-bs-toggle="modal"
              :data-bs-target="props.createCategoryTarget"
              >Crear categoría</a
            >
          </li>
          <li>
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              data-bs-toggle="modal"
              :data-bs-target="props.modifyCategoryTarget"
              >Renombrar categoría</a
            >
          </li>
          <li>
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              data-bs-toggle="modal"
              :data-bs-target="props.createItemTarget"
              @click="onCreateItemClick"
              >Crear Item</a
            >
          </li>
          <li>
            <a
              class="nav-link"
              aria-current="page"
              :href="`${config.aws_api}/generate`"
              target="_blank"
              >Generar PDF</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import config from "../../config";

export default {
  name: "Navbar",
  props: {
    createCategoryTarget: String,
    modifyCategoryTarget: String,
    createItemTarget: String,
  },
  setup(props, ctx) {
    function onCreateItemClick() {
      ctx.emit("createItemClick");
    }
    return { props, onCreateItemClick, config };
  },
};
</script>

<style>
</style>