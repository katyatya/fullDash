import { QueryTypes } from 'sequelize'
import { Department } from '../models/index.js'
import { sequelize } from '../db.js'

class DepartmentsController {
	async hello(req, res) {
		try {
			return res.json({ hello: 'dddd' })
		} catch {}
	}
	async getAll(req, res) {
		try {
			const departments = await Department.findAll()
			return res.json(departments)
		} catch (error) {
			console.error('Error in controller:', error)
			return res.json({ success: false, error: error.message })
		}
	}
	async getOne(req, res) {
		try {
			const department = await Department.findOne({
				where: { id: req.params },
			})
			return res.json(department)
		} catch (error) {
			console.error('Error in controller:', error)
			return res.json({ success: false, error: error.message })
		}
	}
	async deleteOne(req, res) {
		try {
			const { id } = req.params
			await sequelize.query('DELETE FROM departments WHERE id = $1', {
				bind: [id],
				type: QueryTypes.DELETE,
			})
			return res.json({ success: true })
		} catch (error) {
			console.error('Error in controller:', error)
			return res.status(500).json({ success: false, error: error.message })
		}
	}
	async createOne(req, res) {
		try {
			const { name, email, budget } = req.body
			const department = await sequelize.query(
				'INSERT INTO departments (name, email, budget) VALUES ($1,$2,$3) RETURNING *',
				{
					bind: [name, email, budget],
					type: QueryTypes.INSERT,
				}
			)
			return res.json({ success: true, department })
		} catch (error) {
			console.error('Error in controller:', error)
			return res.status(500).json({ success: false, error: error.message })
		}
	}
}
const departmentsController = new DepartmentsController()

export { departmentsController }
