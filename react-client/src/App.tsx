import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Auth from './auth/Auth';

import { Section, Container, Columns, Column, Menu, MenuLink, MenuList } from 'bloomer'

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
          <Columns isCentered>
            <Column isSize='1/3'>
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
      <Menu>
        <MenuLink href='/'>
          Home          
        </MenuLink>
        <MenuList>
        </MenuList>
      </Menu>
    )
  }
}