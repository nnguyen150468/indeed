import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Card, ListGroup, Container, ListGroupItem} from "react-bootstrap";
import { faMap, faEdit, faTrash, faUserMd, faMapPin, faEnvelope, faVenusMars, faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'



export default function HomePage(props) {
    let [candidates, setCandidates] = useState(null)
    let user = useSelector(state => state.user)
    let history = useHistory();
    let admin = 'ad@coderschool.vn'
    //get candidates data from API

   let getCandidates = async () => {
    const url = `https://nguyen-indeed.herokuapp.com/candidates`;
    const result = await fetch(url);
    const data = await result.json();
    console.log("candidates:", data);
    console.log('user state:',user)
    setCandidates(data);
   }

   useEffect(()=> {
    getCandidates();
    console.log("user.authenticated", props.user.authenticated)
   },[])

    const onDeleteCandidate = id => {
      try {
        const config = { method: "DELETE" };
        fetch(`https://nguyen-indeed.herokuapp.com/candidates/${id}`, config);
        const newCandidates = candidates.filter(candidate => candidate.id !== id);
        setCandidates(newCandidates);
      } catch (error) {
        console.log("Error: ", error);
      }
    };



    return !candidates? 
      <div className="d-flex justify-content-center align-items-center" style={{height:"75vh"}}>
      <Loader className="mt-5"
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
      />
      </div>
       : (
      <Container fluid className="mt-4 text-center">
       
          Please log in to edit or delete your profile.  <span className="font-weight-bold">Your email</span> is your login id.
          <p>
            If you are the admin, please log in as <span className="font-weight-bold">ad@coderschool.vn</span>
          </p>
       
        <Row>
          {candidates.map(candidate => {
            return (
              <Col lg="3" key={candidate.id}>
                <Card>
                  <Card.Img variant="top" src={candidate.photo_url} />
                  <Card.Body>
                    <Card.Title>
                      {candidate.first_name + " " + candidate.last_name}
                    </Card.Title>
                    <Card.Text>{candidate.id}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <FontAwesomeIcon icon={faBriefcase} /> {candidate.company}
                    </ListGroupItem>
                    <ListGroupItem>
                      <FontAwesomeIcon icon={faUserMd} /> {candidate.job_title}
                    </ListGroupItem>
                    <ListGroupItem>
                      <FontAwesomeIcon icon={faVenusMars} /> {candidate.gender}
                    </ListGroupItem>
                    <ListGroupItem>
                      <FontAwesomeIcon icon={faMapPin} /> {candidate.city}
                    </ListGroupItem>
                    <ListGroupItem>
                      <FontAwesomeIcon icon={faMap} /> {candidate.country}
                    </ListGroupItem>
                    <ListGroupItem>
                      <FontAwesomeIcon icon={faEnvelope} /> {candidate.email}
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link className="mr-2" style={{display:(user.email===candidate.email || user.email===admin)? '':'none'}}  
                    onClick={() => onDeleteCandidate(candidate.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Remove
                    </Card.Link>
                    <Link to={`/candidates/${candidate.id}`}
                     style={{display:(user.email===candidate.email || user.email===admin)? '':'none'}} 
                     onClick={()=>{
                      if(user.email!==candidate.email&&user.email!==admin){
                        alert('You can only edit your account');
                        // history.push('/')
                      } else history.push(`/candidates/${candidate.id}`)
                    } }>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>  
    )
}



