import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { AgCharts } from 'ag-charts-react'
import { useCircleDataForDashboard } from '../lib/index'

const ProgressCircle = ({ value }) => {
	const data = [
		{ name: 'М', value: value.dict['Мужской'] },
		{ name: 'Ж', value: value.dict['Женский'] },
	]

	const [options, setOptions] = useState({
		data: data,
		background: {
			fill: 'transparent',
		},
		series: [
			{
				type: 'pie',
				angleKey: 'value',
				calloutLabelKey: 'name',
				sectorLabelKey: 'value',
				fills: ['#74bdc0', '#d194df'],
				sectorLabel: {
					color: 'white',
					fontWeight: 'bold',
				},
			},
		],
	})

	useEffect(() => {
		setOptions({
			...options,
			data,
		})
	}, [value])

	return (
		<>
			<AgCharts options={options} />
		</>
	)
}

export default ProgressCircle
