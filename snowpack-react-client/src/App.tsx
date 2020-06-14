import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import Auth from './auth/Auth';
import { LogIn } from './components/LogIn';
import { NotFound } from './components/NotFound';
import { Todos } from './components/Todos';
import { EditTodo } from './components/EditTodo';

export interface AppProps {}

export interface AppProps {
  auth: Auth;
  history: any;
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.props.auth.login();
  }

  handleLogout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Router history={this.props.history}>
              {this.generateMenu()}
              {this.generateCurrentPage()}
            </Router>
          </Col>
        </Row>
      </Container>
    );
  }

  generateMenu() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Nav>
          <Nav.Item>
            <Nav.Link className="logout" onClick={this.handleLogout}>
              Log Out
            </Nav.Link>
          </Nav.Item>
        </Nav>
      );
    } else {
      return (
        <Nav.Item>
          <Nav.Link className="login" onClick={this.handleLogin}>
            Log In
          </Nav.Link>
        </Nav.Item>
      );
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />;
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return <Todos {...props} auth={this.props.auth} />;
          }}
        />
        <Route
          path="/"
          exact
          render={(props) => {
            return <EditTodo {...props} auth={this.props.auth} />;
          }}
        />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
