import React from 'react'
import { Form, Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

export default function Login() {
    let email = ''
    let password = '';
    let dispatch = useDispatch();
    let history=useHistory()

    let login = (e) => {
        e.preventDefault();
        let user = {email: email, password: password, authenticated: true};
        dispatch({type: 'LOGIN', payload:user})
        history.push('/')
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height: "75vh"}}>
        <Form onSubmit={(e)=>login(e)}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                onChange={(e)=>email=e.target.value} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                onChange={(e)=>password=e.target.value}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
        </Button>
        </Form>
        </div>
    )
}
