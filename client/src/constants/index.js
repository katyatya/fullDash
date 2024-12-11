export const columnDepartments = [
	{ field: 'id' },
	{ field: 'name' },
	{ field: 'email' },
	{ field: 'budget' },
]

export const columnEmpoyees = [
	{ field: 'id', cellEditor: 'agSelectCellEditor' },
	{ field: 'post' },
	{ field: 'name' },
	{ field: 'full_name', filter: true },
	{ field: 'surname' },
	{ field: 'sex' },
	{ field: 'hired' },
]
export const defaultColDef = {
	flex: 1,
}
