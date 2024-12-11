import { useEmployeeStore } from '../store/data'
export const useCircleDataForDashboard = () => {
	const { employees } = useEmployeeStore()
	const dict = { Мужской: 0, Женский: 0 }
	employees.map(item => (dict[item.sex] += 1))
	return {
		dict,
	}
}
