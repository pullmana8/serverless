import { Todo } from "../types/Todo"
import { apiEndpoint } from "../config"

const axios = require('axios').default

export async function getTodos(idToken: string): Promise<Todo[]> {
    console.log('Fetching todos')

    const response = await axios.get(`${apiEndpoint}/todos`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    console.log('Todos: ', response.data)
    return response.data.items
}