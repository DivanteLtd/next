import Vue from 'vue'
import VueCompositionApi, { reactive, ref, computed } from '@vue/composition-api'

Vue.use(VueCompositionApi);

const UiState = reactive({
  isCartSidebarOpen: false
})

const isCartSidebarOpen = computed({
  get: () => UiState.isCartSidebarOpen,
  set: val => { UiState.isCartSidebarOpen = val }
})

export {
  isCartSidebarOpen
}