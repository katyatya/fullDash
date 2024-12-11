import { useDepartmentStore } from '../store/data'

export const useLineDataForDashboard = () => {
	const { departments } = useDepartmentStore()
	const totalBudget = departments.reduce(
		(acc, department) => acc + Number(department.budget),
		0
	)
	return totalBudget
}
