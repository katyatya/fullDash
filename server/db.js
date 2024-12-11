import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
config()

console.log('ГКДДДДДДД', process.env.DATABASE_URL)
export const sequelize = new Sequelize(
	process.env.DATABASE_URL
	// process.env.DB_NAME,
	// process.env.DB_USER,
	// process.env.DB_PASSWORD,
	// {
	// 	dialect: 'postgres',
	// 	host: process.env.DB_HOST,
	// 	port: process.env.DB_PORT,
	// }
)
