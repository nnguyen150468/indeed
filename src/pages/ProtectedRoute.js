import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from './Auth'
import CandidatePage from './CandidatePage'

export default function ProtectedRoute(props) {
    if(Auth.authenticated){
        return (
            <Route {...props} />
        )
    } else {
        return <Redirect to="/" />
    }
}
