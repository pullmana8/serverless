import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Auth from './auth/Auth';
import { Section } from 'bloomer';
import { Container } from 'bloomer/lib/layout/Container';
import { Column } from 'bloomer/lib/grid/Column';
import { Columns } from 'bloomer/lib/grid/Columns';

export interface AppProps { }
export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState { }

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <Section>
          <Container>
            <Columns isCentered>
              <Column isSize='1/3'>
                <Router history={this.props.history}>

                </Router>
              </Column>
            </Columns>
          </Container>
        </Section>
      </div>
    )
  }
}