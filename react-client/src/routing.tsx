import React from 'react'
import { Router, Route } from 'react-router-dom'
import Callback from './components/Callback'
import Auth from './auth/Auth'
import App from './App'

const createHistory = require('history').createBrowserHistory
const history = createHistory()
const auth = new Auth(history)

const handleAuthentication = (props: any) => {
    const location = props.location
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication()
    }
}

export const makeAuthRouting = () => {
    return (
        <Router history={history}>
            <div>
                <Route
                    path='/callback'
                    render={(props) => {
                        handleAuthentication(props)
                        return <Callback />
                    }}
                />
                <Route
                    render={(props: any) => {
                        return <App auth={auth} {...props} />
                    }}
                />
            </div>
        </Router>
    )
}