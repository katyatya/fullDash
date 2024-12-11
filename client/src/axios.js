import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5005/api',
	headers: {
		'Content-Type': 'application/json',
	},
})
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
console.log(process.env.REACT_APP_API_URL)
export default instance
