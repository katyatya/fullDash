import { create } from 'zustand'
import axios from '../axios.js'
export const useDepartmentStore = create((set, get) => ({
	departments: [],
	error: false,
	loading: true,
	totalAmount: 0,
	fetchDepartmentItems: async () => {
		set({ loading: true, error: false })
		try {
			const response = await axios.get('/departments')
			set({
				departments: response.data,
				loading: false,
				error: false,
				totalAmount: response.data.length,
			})
		} catch (error) {
			set({ error: true, loading: false })
			console.error('Error fetching departments:', error)
		}
	},
}))
export const useEmployeeStore = create((set, get) => ({
	employees: [],
	error: false,
	loading: true,
	totalAmount: 0,
	fetchEmployeeItems: async ({ start = 0, limit = 500 }) => {
		set({ loading: true, error: false })
		try {
			const response = await axios.get('/employees', {
				params: {
					start: start,
					limit: limit,
				},
			})
			set({
				employees: response.data,
				loading: false,
				error: false,
				totalAmount: response.data.length,
			})
			console.log(response.data.length)
		} catch (error) {
			set({ error: true, loading: false })
			console.error('Error fetching employees:', error)
		}
	},
}))
