<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  }
}
</script>
<template>
  <div id="app">
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  color: rgb(116, 116, 116);
  background-color: rgb(243, 243, 243);
  min-height: 100vh;
}
</style>
