import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import HomePage from './pages/HomePage'
import CreateCandidate from './pages/CreateCandidate'
import CandidatePage from './pages/CandidatePage'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login'

import Page404 from './pages/Page404'
import {useSelector, useDispatch} from 'react-redux'



function App() {
  let user = useSelector(state => state.user)
  let dispatch = useDispatch()

    const ProtectedRoute = (props) => {
      if(user.authenticated){
        return(
          <Route {...props} render={props.render} />
        )
      } else {
        return <Redirect to='/' />
      }
    }

    const logOut = () => {
      console.log('logout');
      let user = {email: '', password: '', authenticated: false}
      dispatch({type: 'LOGOUT', payload: user});  
    }

  return (
    <div className="App">
      <div style={{display: user.authenticated? '':'none'}} >Welcome, <span className="font-weight-bold">{user.email.split('@')[0]}</span></div>
     <Router>

        <Link to="/">Home page</Link>

        <Link to="/createCandidate">Create Candidate</Link>

        <Link to='/login'>
          <button className="btn btn-success" style={{display: user.authenticated? 'none': ''}}>
            Login</button></Link>
        <button className="btn btn-danger" onClick={()=>logOut()} style={{display: user.authenticated? '': 'none'}}>
          Logout</button>

       <Switch> 
         
         <Route path="/" exact render={()=><HomePage user={user}  />}/>

         <ProtectedRoute path="/candidates/:id" exact render={(props)=><CandidatePage user={user} {...props}/>} />
         
         <Route path="/createCandidate" component={CreateCandidate}/>
          
         <Route path="/login" exact component={Login} />

         <Route path="*" render={(props)=><Page404 {...props} /> }  />

         

       </Switch>
     </Router>
    </div>
  );
}

export default App;

