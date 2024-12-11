const Buttons = ({ selectedRow, onDelete, onAdd }) => {
	return (
		<>
			{selectedRow ? (
				<>
					<button onClick={onDelete}>Удалить</button>
					<button disabled onClick={onAdd} style={{ backgroundColor: 'grey' }}>
						Добавить
					</button>
					<button onClick={onAdd}>Обновить</button>
				</>
			) : (
				<>
					<button
						disabled
						onClick={onDelete}
						style={{ backgroundColor: 'grey' }}
					>
						Удалить
					</button>
					<button onClick={onAdd}>Добавить</button>
					<button disabled onClick={onAdd} style={{ backgroundColor: 'grey' }}>
						Обновить
					</button>
				</>
			)}
		</>
	)
}

export default Buttons
