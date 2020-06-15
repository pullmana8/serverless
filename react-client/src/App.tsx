import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import Auth from './auth/Auth';
import { Menu, Grid, Segment } from 'semantic-ui-react';

export interface AppProps { }
export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState { }

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={this.props.history}>
                {this.generateMenu()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item id="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      <Menu.Item id="login" onClick={this.handleLogin}>
        Log In
      </Menu.Item>
    }
  }
}