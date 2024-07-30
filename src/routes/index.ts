import { Router } from 'express'
import { studentRoutes } from '../module/student/student.route'
import { userRoutes } from '../module/user/user.routes'
import { academicSemesterRoutes } from '../module/academicSemister/academicSemester.routes'
import { academicFacultyRoutes } from '../module/academicFaculty/academicFaculty.routes'
import { academicDepertmentRoutes } from '../module/academicDepertment/academicDepertment.routes'
import { courseRoutes } from '../module/course/course.routes'
import { FacultyRoutes } from '../module/faculty/faculty.routes'
import { semesterRegistrationRoutes } from '../module/semesterRegistration/semesterRegistration.routes'
import { offeredCourseRoutes } from '../module/offeredCourse/offeredCourse.routes'

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
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-depertment',
    route: academicDepertmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offer-course',
    route: offeredCourseRoutes,
  },
]

modules.forEach(router => routes.use(router.path, router.route))

export default routes
