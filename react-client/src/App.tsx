import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Auth from './auth/Auth';

import { Section, Container, Columns, Column, Menu, MenuLink, Nav, NavCenter, NavRight } from 'bloomer'

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
      <Section>
        <Container>
          <Columns>
            <Column>
              <Router history={this.props.history}>
                {this.generateMenu()}
              </Router>
            </Column>
          </Columns>
        </Container>
      </Section>
    )
  }

  generateMenu() {
    return (
      <Nav>
        <NavCenter>
          <Menu>
            <MenuLink href='/'>
              Home
            </MenuLink>
          </Menu>
        </NavCenter>
        <NavRight isMenu>
          <Menu>
            <MenuLink>
              {this.logInLogOutButton()}
            </MenuLink>
          </Menu>
        </NavRight>
      </Nav>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <MenuLink name="logout" onClick={this.handleLogout}>
          Log Out
        </MenuLink>
      )
    } else {
      <MenuLink name="login" onClick={this.handleLogin}>
        Log In
      </MenuLink>
    }
  }
}