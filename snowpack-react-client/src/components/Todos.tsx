import * as React from 'react';

import dateFormat from 'dateformat';
import update from 'immutability-helper';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Auth from '../auth/Auth';
import { getTodos, patchTodo, createTodo } from '../api/todos-api';
import { Todo } from '../../types/Todo';

const createBrowserHistory = require('history').createBrowserHistory;

interface TodosProps {
  auth: Auth;
  history: typeof createBrowserHistory;
}

interface TodosState {
  todos: Todo[];
  newTodoName: string;
  loadingTodos: boolean;
}

export class Todos extends React.PureComponent<TodosProps, TodosState> {
  status: TodosState = {
    todos: [],
    newTodoName: '',
    loadingTodos: true,
  };

  handleNamechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoName: event.target.value });
  };

  onEditButtonClick = (todoId: string) => {
    this.props.history.push(`/todos/${todoId}/edit`);
  };

  onTodoCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const dueDate = this.calculateDueDate();
      const newTodo = await createTodo(this.props.auth.getIdToken(), {
        name: this.state.newTodoName,
        dueDate,
      });
      this.setState({
        todos: [...this.state.todos, newTodo],
        newTodoName: '',
      });
    } catch {
      alert('Todo creation failed');
    }
  };

  onTodoCheck = async (pos: number) => {
    try {
      const todo = this.status.todos[pos];
      await patchTodo(this.props.auth.getIdToken(), todo.todoId, {
        name: todo.name,
        dueDate: todo.dueDate,
        done: !todo.done,
      });
      this.setState({
        todos: update(this.state.todos, {
          [pos]: { done: { $set: !todo.done } },
        }),
      });
    } catch {
      alert('Todo deletion failed');
    }
  };

  async componentDidMount() {
    try {
      const todos = await getTodos(this.props.auth.getIdToken());
      this.setState({
        todos,
        loadingTodos: false,
      });
    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`);
    }
  }

  render() {
    return (
      <div>
        <h1>TODOS</h1>
        {this.renderTodos()}
      </div>
    );
  }

  renderCreateTodoInput() {
    return (
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl placeholder="To change the world.." />
          </InputGroup>
        </Col>
      </Row>
    );
  }

  renderTodos() {
    if (this.state.loadingTodos) {
      return this.renderLoading();
    }
    return this.returnTodosList();
  }

  renderLoading() {
    return (
      <Row>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  returnTodosList() {
    return (
      <Container>
        {this.state.todos.map((todo, pos) => {
          return (
            <Row key={todo.todoId}>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend></InputGroup.Prepend>
                </InputGroup>
              </Col>
              <Col>{todo.name}</Col>
              <Col>{todo.dueDate}</Col>
            </Row>
          );
        })}
      </Container>
    );
  }
  calculateDueDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    return dateFormat(date, 'yyyy-mm-dd') as string;
  }
}
