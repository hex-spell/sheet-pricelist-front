import {toRefs, reactive} from 'vue';
import axios from 'axios';

export default function(url, options) {
  const state = reactive({
    response: [],
    error: null,
    fetching: false
  });
  const fetchData = async () => {
    state.fetching = true;
    try {
      const res = await axios.get(url, options);
      state.response = res.data;
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  };
  fetchData();
  return {...toRefs(state)}
}