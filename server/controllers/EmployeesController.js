import { Employee } from '../models/index.js'

class EmployeesController {
	async getAll(req, res) {
		try {
			const { start = 0, limit = 100 } = req.query
			const employees = await Employee.findAll({
				limit: limit,
				offset: start,
			})
			console.log('bd', req.query)

			return res.json(employees)
		} catch (error) {
			console.error('Error in controller:', error)
			return res.json({ success: false, error: error.message })
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params
			const employee = await Employee.findOne({
				where: { id },
			})
			return res.json(employee)
		} catch (error) {
			console.error('Error in controller:', error)
			return res.json({ success: false, error: error.message })
		}
	}
	async deleteOne(req, res) {
		try {
			const { id } = req.params
			await Employee.destroy({
				where: {
					id,
				},
			})
			return res.json({ success: true })
		} catch (error) {
			console.error('Error in controller:', error)
			return res.status(500).json({ success: false, error: error.message })
		}
	}
	async createOne(req, res) {
		try {
			const { name, post, full_name, surname, sex, hired, id_department } =
				req.body
			console.log('req.body', req.body)
			const employeeData = {
				name,
				post,
				full_name,
				surname,
				sex,
				hired,
				id_department,
			}
			const employee = await Employee.create(employeeData)
			console.log('employee', employee)
			return res.json({ success: true, employee })
		} catch (error) {
			console.error('Error in controller:', error)
			return res.status(500).json({ success: false, error: error.message })
		}
	}
	async update(req, res) {
		try {
			const { id, name, post, full_name, surname, sex, hired, id_department } =
				req.body

			const employee = await Employee.update(
				{ id, name, post, full_name, surname, sex, hired, id_department },
				{
					where: {
						id,
					},
				}
			)

			return res.json({ success: true })
		} catch (error) {
			console.error('Error in controller:', error)
			return res.status(500).json({ success: false, error: error.message })
		}
	}
}
const employeesController = new EmployeesController()

export { employeesController }
