import { Router } from 'express'
import { studentRoutes } from '../module/student/student.route'
import { userRoutes } from '../module/user/user.routes'

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
]

modules.forEach(router => routes.use(router.path, router.route))

export default routes
