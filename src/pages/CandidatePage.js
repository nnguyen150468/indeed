import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import CandidateForm from './CandidateForm'
import {Container, Col, Row} from 'react-bootstrap'


export default function CandidatePage(props) {
    console.log({ props });
    console.log(props.match.params.id)
    const [candidate, setCandidate] = useState({})
    let {id} = useParams(); //bring the parameter from UR:

    const getCandidate = async () => {
      let url = `http://localhost:3001/candidates/${id}`
      let response = await fetch(url);
      let data = await response.json();
      console.log('candidates data:', data)
      setCandidate(data);
    }

    useEffect( ()=> {
        // let url = `http://localhost:3001/candidates/${props.match.params.id}`
       getCandidate();
        
    }, [])

    return (
        <Container>
        <Row>
          <Col>
            <CandidateForm candidate={candidate} />
          </Col>
        </Row>
      </Container>
    )
}
