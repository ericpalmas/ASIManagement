import { createRouter, createWebHistory } from 'vue-router'
import CourseListView from '../views/CourseListView.vue'
import AdministrativeDataView from '../views/AdministrativeDataView.vue'
import AsiInfoView from '../views/AsiInfoView.vue'
import AsiManagementView from '../views/AsiManagementView.vue'
import AsiProjectsView from '../views/AsiProjectsView.vue'
import AsiTechnicalSpecializationManagementView from '../views/AsiTechnicalSpecializationManagementView.vue'
import LoginView from '../views/LoginView'
import UserRegistrationAdministratorView from '../views/UserRegistrationAdministratorView'
import SelectUserTypeView from '../views/SelectUserTypeView'
import StudentListView from '../views/StudentListView'
import StudentView from '../views/StudentView'
import StudentResponsibleProfileView from '../views/StudentResponsibleProfileView'
import StudentListResponsibleProfileView from '../views/StudentListResponsibleProfileView'
import StudentListAdministratorView from '../views/StudentListAdministratorView'
import AdvisorListAdministratorView from '../views/AdvisorListAdministratorView'
import ProfileResponsibleListAdministratorView from '../views/ProfileResponsibleListAdministratorView'
import UserProfileAdminstratorView from '../views/UserProfileAdminstratorView'
import AsiSummaryPreviewView from '../views/AsiSummaryPreviewView'
import LogsAdministratorView from '../views/LogsAdministratorView'

const routes = [
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
  },

  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/selectType',
    name: 'SelectUserType',
    component: SelectUserTypeView
  },
  {
    path: '/StudentList',
    name: 'StudentListView',
    component: StudentListView
  },
  {
    path: '/Student/:studentId',
    name: 'StudentView',
    component: StudentView
  },
  {
    path: '/StudentListResponsibleProfile/:studentId',
    name: 'StudentResponsibleProfileView',
    component: StudentResponsibleProfileView
  },
  {
    path: '/StudentListResponsibleProfile',
    name: 'StudentListResponsibleProfileView',
    component: StudentListResponsibleProfileView
  },
  {
    path: '/StudentListAdministrator',
    name: 'StudentListAdministratorView',
    component: StudentListAdministratorView
  },
  {
    path: '/AdvisorListAdministrator',
    name: 'AdvisorListAdministratorView',
    component: AdvisorListAdministratorView
  },
  {
    path: '/ProfileResponsibleListAdministrator',
    name: 'ProfileResponsibleListAdministratorView',
    component: ProfileResponsibleListAdministratorView
  },
  {
    path: '/UserRegistrationAdministrator',
    name: 'UserRegistrationAdministratorView',
    component: UserRegistrationAdministratorView
  },
  {
    path: '/UserProfileAdminstrator/:userId',
    name: 'UserProfileAdminstratorView',
    component: UserProfileAdminstratorView
  },
  {
    path: '/AsiSummaryPreview',
    name: 'AsiSummaryPreviewView',
    component: AsiSummaryPreviewView
  },
  {
    path: '/LogsAdministrator',
    name: 'LogsAdministratorView',
    component: LogsAdministratorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
