import { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import CustomLineChart from '../../components/LineChart'
import ProgressCircle from '../../components/ProgressCircle'
import { useEmployeeStore, useDepartmentStore } from '../../store/data.js'
import {
	useLineDataForDashboard,
	useCircleDataForDashboard,
} from '../../lib/index.js'

const Dashboard = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const { fetchEmployeeItems } = useEmployeeStore()
	const { departments, fetchDepartmentItems } = useDepartmentStore()
	const circleData = useCircleDataForDashboard()
	const totalBudget = useLineDataForDashboard()

	useEffect(() => {
		fetchEmployeeItems({ start: 0, limit: 500 })
		fetchDepartmentItems()
	}, [])

	return (
		<Box m='20px'>
			<Header title='DASHBOARD' />
			<Box
				display='grid'
				gridTemplateColumns='repeat(12, 1fr)'
				gridAutoRows='140px'
				gap='20px'
			>
				<Box
					gridColumn='span 8'
					gridRow='span 3'
					backgroundColor={colors.primary[400]}
				>
					<Box
						mt='45px'
						p='0 30px'
						display='flex '
						justifyContent='space-between'
						alignItems='center'
					>
						<Box>
							<Typography
								variant='h3'
								fontWeight='bold'
								color={colors.greenAccent[500]}
								marginBottom='50px'
							>
								Общий бюджет {totalBudget} ₽
							</Typography>
						</Box>
					</Box>
					<Box height='250px' m='-20px 0 0 0'>
						<CustomLineChart data={departments} />
					</Box>
				</Box>

				<Box
					gridColumn='span 4'
					gridRow='span 3'
					backgroundColor={colors.primary[400]}
					p='30px'
				>
					<Typography variant='h5' fontWeight='600'>
						Соотношение работников
					</Typography>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						mt='25px'
					>
						<ProgressCircle value={circleData} />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Dashboard
