<template>
  <nav>
      <ul>
          <li>
              sheet-pricelist
          </li>
      </ul>
  </nav>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style scoped>
    nav {
        width: 100%;
        display: flex;
        position: sticky;
        top: 0;
        background-color: darkslategray
    }
    ul {
        list-style-type: none;
    }
    li {
        padding: 15px;
        color: white;
    }
</style>