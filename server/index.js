import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import { departmentsController } from './controllers/DepartmentsController.js'
import { sequelize } from './db.js'
console.log(departmentsController.getAll)
const app = express()
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({ alter: true })
		app.listen(5005, () => console.log(`Server started on port 5005`))
	} catch (e) {
		console.log(e)
	}
}

start()
