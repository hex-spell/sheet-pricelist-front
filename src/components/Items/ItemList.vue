<template>
  <ul>
      <li v-for="item in props.items" :key="item.id">{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    items: Array,
  },
  setup(props){
    return { props }
  }
};
</script>

<style>
</style>