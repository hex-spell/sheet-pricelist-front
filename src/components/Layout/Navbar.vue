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
              >Modificar categoría</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    createCategoryTarget: String,
    modifyCategoryTarget: String
  },
  setup(props) {
    return { props };
  },
};
</script>

<style>
</style>