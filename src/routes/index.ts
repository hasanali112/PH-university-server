import { Router } from 'express'
import { studentRoutes } from '../module/student/student.route'
import { userRoutes } from '../module/user/user.routes'
import { academicSemesterRoutes } from '../module/academicSemister/academicSemester.routes'

const routes = Router()

const modules = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },
]

modules.forEach(router => routes.use(router.path, router.route))

export default routes
