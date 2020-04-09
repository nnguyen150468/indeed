import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import CandidateForm from './CandidateForm'
import {Container, Col, Row} from 'react-bootstrap'


export default function CandidatePage(props) {
    console.log({ props });
    console.log(props.match.params.id)
    const [candidate, setCandidate] = useState({})
    let {id} = useParams(); //bring the parameter from UR:

    const getCandidate = async () => {
      let url = `https://nguyen-indeed.herokuapp.com/candidates/${id}`
      let response = await fetch(url);
      let data = await response.json();
      console.log('candidates data:', data)
      setCandidate(data);
    }

    useEffect( ()=> {
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
