import { Router } from 'express'
import { employeesController } from '../controllers/index.js'
const router = new Router()

router.get('/', employeesController.getAll)
router.get('/:id', employeesController.getOne)
router.delete('/:id', employeesController.deleteOne)
router.post('/', employeesController.createOne)
router.put('/:id', employeesController.update)

export default router
