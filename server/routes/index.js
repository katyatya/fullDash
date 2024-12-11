import { Router } from 'express'

import departmentsRouter from './DepartmentRoute.js'
import employeesRouter from './EmployeeRoute.js'

const router = Router()
router.use('/departments', departmentsRouter)
router.use('/employees', employeesRouter)

export default router
