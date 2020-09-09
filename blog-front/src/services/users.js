import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getById = async (userId) => {
	try {
		const response = await axios.get(`${baseUrl}/user/${userId}`)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export default { getUsers, getById }
