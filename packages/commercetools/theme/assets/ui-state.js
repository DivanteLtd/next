import Vue from 'vue'
import VueCompositionApi, { reactive, computed } from '@vue/composition-api'

Vue.use(VueCompositionApi);

const UiState = reactive({
  isCartSidebarOpen: false
})

function setIsCartSidebarOpen(value) {
  UiState.isCartSidebarOpen = value
}

export {
  UiState,
  setIsCartSidebarOpen
}