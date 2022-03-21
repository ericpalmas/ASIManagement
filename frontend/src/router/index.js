import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import CourseListView from '../views/CourseListView.vue'
import AdministrativeDataView from '../views/AdministrativeDataView.vue'
import AsiInfoView from '../views/AsiInfoView.vue'
import AsiManagementView from '../views/AsiManagementView.vue'
import AsiProjectsView from '../views/AsiProjectsView.vue'
import AsiTechnicalSpecializationManagementView from '../views/AsiTechnicalSpecializationManagementView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('../views/Dashboard.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // },
  {
    path: '/AsiCourseList',
    name: 'courseList',
    component: CourseListView
  },
  {
    path: '/AsiInformation',
    name: 'AsiInfoView',
    component: AsiInfoView
  },
  {
    path: '/AsiTechnicalSpecialization',
    name: 'AsiTechnicalSpecializationManagementView',
    component: AsiTechnicalSpecializationManagementView
  },
  {
    path: '/AsiAdminData',
    name: 'AdministrativeDataView',
    component: AdministrativeDataView
  },
  {
    path: '/AsiManagement',
    name: 'AsiManagementView',
    component: AsiManagementView
  },

  {
    path: '/AsiProjects',
    name: 'adminData',
    component: AsiProjectsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
