import { useEffect } from 'react'
import React from 'react'
import styles from './FormModal.module.css'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import toast from 'react-hot-toast'
import axios from '../../axios.js'
import { useEmployeeStore } from '../../store/data.js'
const FormModal = ({
	open,
	onClose,
	initialData,
	availableDepartments,
	gridApi,
}) => {
	const emptyForm = {
		name: '',
		post: '',
		full_name: '',
		surname: '',
		sex: '',
		hired: '',
		id_department: '',
	}
	const [formData, setFormData] = React.useState(initialData || emptyForm)
	const { fetchEmployeeItems } = useEmployeeStore()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const handleSubmit = async event => {
		event.preventDefault()
		try {
			formData.id
				? await axios.put(`/employees/${formData.id}`, formData)
				: await axios.post('/employees', formData)
			await fetchEmployeeItems({ start: 0, limit: 500 })
			toast('Успешно', {
				style: {
					padding: '10px',
				},
				icon: '✅',
			})
			gridApi.refreshInfiniteCache()
		} catch (error) {
			alert(error)
			toast.error('Произошла ошибка при отправке')
		} finally {
			setFormData(emptyForm)
			onClose()
		}
	}

	useEffect(() => {
		setFormData(initialData || emptyForm)
	}, [initialData])

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='modal-title'
			aria-describedby='modal-description'
		>
			<Box className={styles.box}>
				<div>
					<div>
						<span className={styles.close} onClick={onClose}>
							&times;
						</span>
						<h1>Работник</h1>
						<form onSubmit={handleSubmit} className={styles.form}>
							<label>
								Имя
								<input
									type='text'
									name='name'
									minLength='2'
									maxLength='30'
									required
									value={formData.name}
									onChange={handleChange}
								/>
							</label>
							<label>
								Фамилия
								<input
									type='text'
									name='full_name'
									minLength='2'
									maxLength='30'
									required
									value={formData.full_name}
									onChange={handleChange}
								/>
							</label>
							<label>
								Отчество
								<input
									type='text'
									name='surname'
									minLength='2'
									maxLength='30'
									value={formData.surname}
									onChange={handleChange}
								/>
							</label>
							<label>
								Должность
								<input
									type='text'
									name='post'
									minLength='2'
									maxLength='50'
									required
									value={formData.post}
									onChange={handleChange}
								/>
							</label>

							<label>
								Пол
								<select
									name='sex'
									value={formData.sex}
									onChange={handleChange}
									required
								>
									<option value=''> </option>
									<option value='Мужской'>Мужской</option>
									<option value='Женский'>Женский</option>
								</select>
							</label>
							<label>
								Отдел
								<select
									name='id_department'
									value={formData.id_department}
									onChange={handleChange}
									required
								>
									<option value=''> </option>
									{availableDepartments.map((department, index) =>
										index == 0 ? (
											<option
												value={department.id}
												key={department.index}
												selected
											>
												{department.name}
											</option>
										) : (
											<option value={department.id} key={department.index}>
												{department.name}
											</option>
										)
									)}
								</select>
							</label>
							<label>
								Нанят
								<input
									type='date'
									name='hired'
									min='1983-04-01'
									max='2025-01-30'
									value={formData.hired}
									onChange={handleChange}
								/>
							</label>
							<button type='submit' className={styles.form_button}>
								Сохранить
							</button>
						</form>
					</div>
				</div>
			</Box>
		</Modal>
	)
}

export default FormModal
