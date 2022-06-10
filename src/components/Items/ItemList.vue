<template>
  <div class="list-group item-list">
  <a href="#" class="list-group-item list-group-item-action" v-for="item in props.items" :key="item.id" @click="onItemClick(item)" data-bs-toggle="modal" :data-bs-target="props.modalTarget">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{item.name}}</h5>
      <h4 class="text-success">${{item.price}}</h4>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <div class="mb-1">{{item.unit}}</div>
      <small>{{item.created}}</small>
    </div>
  </a>
</div>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    items: Array,
    modalTarget: String
  },
  setup(props, ctx){
    function onItemClick(item) {
      ctx.emit('clickedItem',item);
    }
    return { props, onItemClick }
  }
};
</script>

<style>
.item-list {
  max-height: 70vh;
  overflow-y: auto;
}
</style>