import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../db.js'
export const Department = sequelize.define(
	'departments',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(125),
		},
		email: {
			type: DataTypes.STRING(50),
		},
		budget: {
			type: DataTypes.DECIMAL(10, 2),
		},
	},
	{
		timestamps: false, // Отключаем автоматическое добавление timestamp-ов
		freezeTableName: true,
	}
)

export const Employee = sequelize.define(
	'employees',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		post: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		full_name: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING(30),
		},
		sex: {
			type: DataTypes.ENUM('Мужской', 'Женский'),
			allowNull: false,
		},
		hired: {
			type: DataTypes.DATEONLY,
			defaultValue: Sequelize.fn('NOW'),
			allowNull: false,
		},
	},
	{
		timestamps: false, // Отключаем автоматическое добавление timestamp-ов
		freezeTableName: true,
	}
)

Employee.belongsTo(Department, {
	foreignKey: 'id_department',
	as: 'department',
})

// export class Department {
// 	constructor(data) {
// 		this.id = data.id
// 		this.name = data.name
// 		this.email = data.email
// 		this.budget = data.budget
// 	}
// 	static async getAll(db) {
// 		const results = await db.any('SELECT * FROM departments')
// 		return results.map(result => new Department(result))
// 	}
// }

// export class Employee {
// 	constructor(data) {
// 		this.id = data.id
// 		this.name = data.name
// 		this.post = data.post
// 		this.full_name = data.full_name
// 		this.surname = data.surname
// 		this.sex = data.sex
// 		this.hired = data.hired
// 		this.id_department = data.id_department
// 	}
// }
