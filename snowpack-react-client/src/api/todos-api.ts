import Axios from 'axios';
import signale from 'signale';
import { Todo } from '../../types/Todo';
import { apiEndpoint } from '../config';
import { CreateTodoRequest } from '../../types/CreateTodoRequest';
import { UpdateTodoRequest } from '../../types/UpdateTodoRequest';

export async function getTodos(idToken: string): Promise<Todo[]> {
  signale.info('Fetching todos...');

  const response = await Axios.get(`${apiEndpoint}/todos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });

  signale.log('Todos: ', response.data);
  return response.data.items;
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest,
): Promise<Todo> {
  const response = await Axios.post(
    `${apiEndpoint}/todos`,
    JSON.stringify(newTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
  return response.data.item;
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest,
): Promise<void> {
  await Axios.patch(
    `${apiEndpoint}/todos/${todoId}`,
    JSON.stringify(updatedTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
}

export async function deleteTodo(
  idToken: string,
  todoId: string,
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
}
