<template>
  <Navbar />
  <CategoriesSelect :categories="state.categories" @change="onChangeCategory"/>
</template>

<script>
import Navbar from './components/Layout/Navbar.vue';
import CategoriesSelect from './components/Inputs/CategoriesSelect.vue';
import { reactive } from 'vue';

export default {
  name: 'App',
  components: {
    Navbar,
    CategoriesSelect
  },
  setup(){
    const state = reactive({
      categories: [
        {name:"hola",value:1},
        {name:"mundo",value:2}
      ]
    });
    function onChangeCategory(category){
      alert(category);
    }
    return { state, onChangeCategory }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
