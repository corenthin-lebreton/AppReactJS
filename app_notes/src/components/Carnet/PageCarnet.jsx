import React from 'react';
import { Container, Row, Col, Button, Table, ListGroup, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function PageCarnet() {

const [titre, setTitre] = useState([])
const [notes, setNotes] = useState([])
const navigate = useNavigate();
const { id } = useParams();

useEffect(() => {
    let data = localStorage.getItem('carnet')
        ? localStorage.getItem('carnet')
        : '[]'
    data = JSON.parse(data)
    setTitre(data)
}, [])


useEffect(() => {
    let data = localStorage.getItem('data-note')
        ? localStorage.getItem('data-note')
        : '[]'
    data = JSON.parse(data)
    setNotes(data)
}, [])



function remove(title){
    let rep = window.confirm(
      `Êtes-vous sur de vouloir supprimer le carnet ${title.title}`
    )
    if (rep) {
        const newCarnet = titre.filter((item) => {
        if(item.id !== title.id) return true
        return false  
      })
      const newNotes = notes.filter((item) => {
        if(+item.idCarnet !== +title.id) return true
        return false  
      })
      console.log(title.id)
      setTitre(newCarnet)
      localStorage.setItem('carnet', JSON.stringify(newCarnet))

      setNotes(newNotes)
      localStorage.setItem('data-note', JSON.stringify(newNotes))

    }
  }





let displayCarnet = titre.map((title, indice) => {
    return(
        <Container key={indice + 1}>
                <Col lg={4} md={4}>

        <Card className="card-note" style={{ width: '18rem' }}>
        <Card.Header className="title-card">{title.title}</Card.Header>

        <ListGroup variant="flush">
            <ListGroup.Item><Button className= "button-modif" onClick={()=>navigate('/creation-note/' + title.id)}>Ajouter une note</Button></ListGroup.Item>
            <ListGroup.Item><Button className= "button-modif" onClick={() => navigate('/page-note/' + title.id)}>Accéder aux notes</Button></ListGroup.Item>
             <ListGroup.Item><Button className= "button-modif" onClick={() => remove(title)}>Supprimer le carnet</Button></ListGroup.Item>
            </ListGroup>
        </Card>
        <hr />
                </Col>
        </Container>

    )
})

    return (
        <>
        
        <Container>
            <Row>
            {displayCarnet}
            </Row>
        </Container>
        
        </>
    );
};