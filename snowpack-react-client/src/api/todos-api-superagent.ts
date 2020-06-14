import { apiEndpoint } from '../config';
import { Todo } from '../../types/Todo';
import { UpdateTodoRequest } from '../../types/UpdateTodoRequest';
import { CreateTodoRequest } from '../../types/CreateTodoRequest';
import superagent from 'superagent';
import signale from 'signale';

export async function getTodos(idToken: string): Promise<Todo[]> {
  signale.success('Fetching todos...');

  const response = await superagent
    .get(`${apiEndpoint}/todos`, function (err: any, res: any) {
      signale.success(response.body);
    })
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    })
    .send();

  signale.success('Todos: ', response);
  return response.body;
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest,
): Promise<void> {
  await superagent
    .patch(`${apiEndpoint}/todos/${todoId}`)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    })
    .send(updatedTodo)
    .end(function (err, data) {
      signale.success(data);
    });
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest,
): Promise<Todo> {
  const response = await superagent
    .post(`${apiEndpoint}/todos`)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    })
    .send(newTodo);
  return response.body;
}
