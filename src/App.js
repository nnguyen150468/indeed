import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import HomePage from './pages/HomePage'
import CreateCandidate from './pages/CreateCandidate'
import CandidatePage from './pages/CandidatePage'
import CompanyPage from './pages/CompanyPage'
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from './pages/Auth'
import Landing from './pages/Landing'
import Page404 from './pages/Page404'
// import ProtectedRoute from './pages/ProtectedRoute'


function App() {
  let [user, setUser] = useState({authenticated:false})

  // let ProtectedRoute = ({component:Component, user, ...rest}) => {
  //   return (
  //     <Route {...rest} user={user} render={(props)=> {
  //       if(user.authenticated===true){
  //         return(
  //           <Component {...props}/>
  //         )
  //       } else {
  //         return(
  //           <Redirect to={{pathname:'/'}} />
  //         )
  //       }
  //     }}  />
  //   )
  // }

    const ProtectedRoute = (props) => {
      if(user.authenticated){
        return(
          <Route {...props} render={props.render} />
        )
      } else {
        return <Redirect to='/' />
      }
    }

  return (
    <div className="App">
     <Router>

        <Link to="/">Home page</Link>

        <Link to="/createCandidate">Create Candidate</Link>

        <Link to="/landing">Landing</Link>

        <button onClick={()=> {
          setUser({authenticated: true});
          console.log('user authenticated clicked:',user.authenticated);
        }}>
          Login
        </button>
        
        <button onClick={()=>{
          setUser({authenticated: false});
        }}>
          Logout
        </button>

       <Switch> 
         
         <Route path="/" exact render={()=><HomePage user={user}  />}/>

         <ProtectedRoute path="/candidates/:id" exact render={(props)=><CandidatePage user={user} {...props}/>} />
         

         <Route path="/landing" component={Landing}/>
         <Route path="/createCandidate" component={CreateCandidate}/>
          
         <Route path="*" render={(props)=><Page404 {...props} /> }  />

       </Switch>
     </Router>
    </div>
  );
}

export default App;

