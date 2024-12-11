import React, { useState, useEffect } from 'react'
import axios from '../../axios.js'
import { useTheme } from '@mui/material'

import { AgGridReact } from 'ag-grid-react'
import { themeQuartz } from '@ag-grid-community/theming'
import toast from 'react-hot-toast'

import { useDepartmentStore, useEmployeeStore } from '../../store/data.js'
import { tokens } from '../../theme'
import FormModal from '../../components/FormModal/FormModal.jsx'
import { styles } from './Team.module.css'
import {
	columnDepartments,
	columnEmpoyees,
	defaultColDef,
} from '../../constants/index.js'
import Buttons from '../../components/Buttons.jsx'

const Team = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const myTheme = themeQuartz.withParams({
		accentColor: colors.greenAccent[400],
		backgroundColor: colors.primary[400],
		browserColorScheme: 'dark',
		chromeBackgroundColor: {
			ref: 'foregroundColor',
			mix: 0.07,
			onto: 'backgroundColor',
		},
		foregroundColor: '#FFF',
		headerBackgroundColor: '#232A37',
		headerFontSize: 14,
		headerTextColor: null,
	})

	const [selectedRow, setSelectedRow] = useState()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [gridApi, setGridApi] = useState(null)

	const { fetchDepartmentItems, departments } = useDepartmentStore()

	const availableDepartments = departments.map(department => ({
		id: department.id,
		name: department.name,
	}))

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const rowSelection = React.useMemo(() => {
		return {
			mode: 'singleRow',
		}
	}, [])

	const onDelete = async params => {
		try {
			const id = selectedRow.id
			await axios.delete(`/employees/${id}`)
			toast.success('Успешно')
			setSelectedRow()
			gridApi.refreshInfiniteCache()
		} catch (error) {
			toast.error('Произошла ошибка при удалении')
			console.log(error)
		}
	}

	const onAdd = () => {
		setIsModalOpen(!isModalOpen)
	}

	const onRowSelected = params => {
		if (params.event !== null) {
			setSelectedRow(params.data)
			if (params.data.id === selectedRow?.id) {
				setSelectedRow()
			}
		}
	}

	const datasource = {
		getRows(params) {
			console.log(JSON.stringify(params, null, 1))
			const { startRow, endRow } = params
			let url = `http://localhost:3000/api/employees?`

			url += `_start=${startRow}&_end=${endRow}`
			fetch(url)
				.then(httpResponse => httpResponse.json())
				.then(response => {
					params.successCallback(response, 499)
				})
				.catch(error => {
					console.error(error)
					params.failCallback()
				})
		},
	}

	const onGridReady = params => {
		setGridApi(params.api)
		params.api.setGridOption('datasource', datasource)
	}

	const components = {
		loading: params => {
			if (params.value !== undefined) {
				return params.value
			} else {
				return "<img src='https://www.ag-grid.com/example-assets/loading.gif'/>"
			}
		},
	}

	useEffect(() => {
		fetchDepartmentItems()
	}, [])

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					marginTop: '10px',
				}}
			>
				<Buttons selectedRow={selectedRow} onAdd={onAdd} onDelete={onDelete} />
			</div>
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '80%',
					marginTop: '10px',
				}}
			>
				<div
					style={{
						width: '50%',
						height: '100%',
						marginRight: '20px',
						marginLeft: '20px',
					}}
				>
					<AgGridReact
						theme={myTheme}
						rowData={departments}
						columnDefs={columnDepartments}
						defaultColDef={defaultColDef}
						rowSelection='single'
					/>
				</div>

				<div style={{ width: '50%', height: '100%' }}>
					<FormModal
						open={isModalOpen}
						gridApi={gridApi}
						onClose={handleCloseModal}
						initialData={selectedRow}
						availableDepartments={availableDepartments}
					/>

					<AgGridReact
						theme={myTheme}
						onRowSelected={onRowSelected}
						rowSelection={rowSelection}
						columnDefs={columnEmpoyees}
						defaultColDef={defaultColDef}
						rowModelType='infinite'
						onGridReady={onGridReady}
						cacheBlockSize={100}
						maxConcurrentDatasourceRequests={1}
						infiniteInitialRowCount={100}
						maxBlocksInCache={100}
						components={components}
					/>
				</div>
			</div>
		</>
	)
}

export default Team
