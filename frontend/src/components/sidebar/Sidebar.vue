<script>
import SidebarLink from './SidebarLink'
import { mapActions, mapGetters } from 'vuex'

import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },
  computed: {
    ...mapGetters(['token']),
    ...mapGetters(['loggedUser'])
  },

  methods: {
    ...mapActions(['fetchLoggedUser'])
  },

  created() {
    this.fetchLoggedUser()
  },

  watch: {
    loggedUser: function () {
      console.log(this.loggedUser)
    }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div style="padding-left: 25%">S</div>
        <div style="padding-left: 25%">I</div>
      </span>
      <span style="padding-left: 5%" v-else>SUPSI</span>
    </h1>
    <div v-if="loggedUser !== undefined && loggedUser !== null">
      <SidebarLink
        v-if="loggedUser.Role === 'Student'"
        to="/AsiManagement"
        icon="fas fa-home"
      >
        ASI creation
      </SidebarLink>

      <SidebarLink
        v-if="loggedUser.Role === 'Student'"
        to="/AsiTechnicalSpecialization"
        icon="fas fa-home"
      >
        Technical
      </SidebarLink>

      <SidebarLink
        v-if="loggedUser.Role === 'Student'"
        to="/AsiProjects"
        icon="fas fa-columns"
      >
        Projects
      </SidebarLink>
      <SidebarLink
        v-if="
          loggedUser.Role === 'Student' ||
          loggedUser.Role === 'Advisor' ||
          loggedUser.Role === 'Administrator' ||
          loggedUser.Role === 'StudentAdvisor' ||
          loggedUser.Role === 'ProfileResponsible' ||
          loggedUser.Role === 'ProfileResponsibleAdvisor' ||
          loggedUser.Role === 'ProfileResponsibleStudentAdvisor'
        "
        to="/AsiAdminData"
        icon="fas fa-chart-bar"
      >
        Profile
      </SidebarLink>
      <SidebarLink
        v-if="
          loggedUser.Role === 'Student' ||
          loggedUser.Role === 'Advisor' ||
          loggedUser.Role === 'StudentAdvisor' ||
          loggedUser.Role === 'ProfileResponsible' ||
          loggedUser.Role === 'ProfileResponsibleAdvisor' ||
          loggedUser.Role === 'ProfileResponsibleStudentAdvisor'
        "
        to="/AsiCourseList"
        icon="fas fa-users"
      >
        Courses
      </SidebarLink>
      <SidebarLink
        v-if="
          loggedUser.Role === 'Student' ||
          loggedUser.Role === 'Advisor' ||
          loggedUser.Role === 'Administrator' ||
          loggedUser.Role === 'StudentAdvisor' ||
          loggedUser.Role === 'ProfileResponsible' ||
          loggedUser.Role === 'ProfileResponsibleAdvisor' ||
          loggedUser.Role === 'ProfileResponsibleStudentAdvisor'
        "
        to="/AsiInformation"
        icon="fas fa-image"
      >
        Informations
      </SidebarLink>

      <SidebarLink
        v-if="loggedUser.Role === 'Advisor'"
        to="/StudentList"
        icon="fas fa-users"
      >
        Students
      </SidebarLink>

      <SidebarLink
        v-if="
          loggedUser.Role === 'ProfileResponsible' ||
          loggedUser.Role === 'ProfileResponsibleAdvisor' ||
          loggedUser.Role === 'ProfileResponsibleStudentAdvisor'
        "
        to="/StudentListResponsibleProfile"
        icon="fas fa-users"
      >
        Students
      </SidebarLink>

      <SidebarLink
        v-if="loggedUser.Role === 'Administrator'"
        to="/StudentListAdministrator"
        icon="fas fa-users"
      >
        Students
      </SidebarLink>

      <SidebarLink
        v-if="loggedUser.Role === 'Administrator'"
        to="/AdvisorListAdministrator"
        icon="fas fa-users"
      >
        Advisors
      </SidebarLink>
    </div>

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
