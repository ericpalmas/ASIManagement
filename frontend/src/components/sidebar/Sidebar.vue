<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>S</div>
        <div>I</div>
      </span>
      <span v-else>SUPSI</span>
    </h1>
    <!-- 
    <SidebarLink to="/" icon="fas fa-home">ASI creation</SidebarLink>
    <SidebarLink to="/dashboard" icon="fas fa-columns">Projects</SidebarLink>
    <SidebarLink to="/analytics" icon="fas fa-chart-bar">Profile</SidebarLink>
    <SidebarLink to="/friends" icon="fas fa-users">Courses</SidebarLink>
    <SidebarLink to="/image" icon="fas fa-image">Informations</SidebarLink> -->

    <SidebarLink to="/AsiManagement" icon="fas fa-home">
      ASI creation
    </SidebarLink>
    <SidebarLink to="/AsiTechnicalSpecialization" icon="fas fa-home">
      Technical
    </SidebarLink>
    <SidebarLink to="/AsiProjects" icon="fas fa-columns">Projects</SidebarLink>
    <SidebarLink to="/AsiAdminData" icon="fas fa-chart-bar">
      Profile
    </SidebarLink>
    <SidebarLink to="/AsiCourseList" icon="fas fa-users">Courses</SidebarLink>
    <SidebarLink to="/AsiInformation" icon="fas fa-image">
      Informations
    </SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #3f4254;
  --sidebar-item-hover: #a6a7a6;
  --sidebar-item-active: #a6a7a6;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
