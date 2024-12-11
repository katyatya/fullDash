import React, { useState, useEffect } from 'react'
import { AgCharts } from 'ag-charts-react'

const CustomLineChart = ({ data }) => {
	const processedData = data
		? data.map(item => ({ name: item.name, budget: parseFloat(item.budget) }))
		: []
	const [options, setOptions] = useState({
		data: processedData,
		background: {
			fill: 'transparent',
		},
		series: [
			{
				type: 'line',
				xKey: 'name',
				yKey: 'budget',
				yName: 'Budget',

				marker: {
					stroke: 'white',
					strokeWidth: 3,
					shape: 'diamond',
				},
			},
		],
		axes: [
			{ type: 'category', position: 'bottom', label: { color: '#74bdc0' } },
			{ type: 'number', position: 'left', label: { color: '#74bdc0' } },
		],
	})
	useEffect(() => {
		const processedData = data
			? data.map(item => ({ name: item.name, budget: parseFloat(item.budget) }))
			: []
		setOptions({ ...options, data: processedData })
	}, [data])
	return <AgCharts options={options} />
}

export default CustomLineChart
