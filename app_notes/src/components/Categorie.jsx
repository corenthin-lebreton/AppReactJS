import React from 'react';
import { Container, Row, Col, Button, ListGroup, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function PageCarnet() {

const [categorie, setCategorie] = useState([])
const [notes, setNotes] = useState([])
const navigate = useNavigate();
const { id } = useParams();
useEffect(() => {
    let data = localStorage.getItem('category')
        ? localStorage.getItem('category')
        : '[]'
    data = JSON.parse(data)
    setCategorie(data)
}, [])


useEffect(() => {
    let data = localStorage.getItem('data-note')
        ? localStorage.getItem('data-note')
        : '[]'
    data = JSON.parse(data)
    setNotes(data)
}, [])

function remove(category) {
    const hasNotes = notes.find((note)=>{
        return +note.categorieId === +category.id
    })
    if(hasNotes){
      window.alert("Vous ne pouvez pas supprimer cette catégorie !")
      return
    }
  
    let rep = window.confirm(
      `Êtes-vous sur de vouloir supprimer la catégorie ${category.title}`
    )
    if (rep) {
      const newCategorie = categorie.filter((item) => {
        if(item.id !== category.id) return true
        return false  
      })
      console.log(category.id)
      localStorage.setItem('category', JSON.stringify(newCategorie))
      setCategorie(newCategorie)
    }
  }

let displayCategorie = categorie.sort((a, b) => a.title.localeCompare(b.title)).map((category, indice) => {
    return(
        <Container>
            <Row>
                <Col>

        <Card style={{ width: '18rem' }}>
        <Card.Header className="title-card" >{category.title}</Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item><Button className="button-modif-c" onClick={() => navigate('/modification-categorie/' +category.id)}>Modifier la catégorie</Button></ListGroup.Item>
           <ListGroup.Item><Button className="button-modif-c" onClick={() => remove(category)}>Supprimer la categorie</Button></ListGroup.Item>
            </ListGroup>
        </Card>
        <hr />
                </Col>
            </Row>
        </Container>
       
    )
})

    return (
        <>
        
        
        <Container>

            {displayCategorie}
        
            </Container>
        
        
        
        </>
    );
};