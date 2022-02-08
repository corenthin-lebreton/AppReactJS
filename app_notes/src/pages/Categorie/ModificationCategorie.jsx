import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';


export default function ModificationCategorie(){
const [titre, setTitre] = useState([])
const navigate = useNavigate();
const { id } = useParams();
 const [formUpdate, setFormUpdate] = useState({
    id,
    title: ''
  })


function update(e) {
    e.preventDefault()
    let tmpForm = { ...formUpdate }

    setFormUpdate(tmpForm)

    let categorie = localStorage.getItem('category')
    if (categorie === null) categorie = '[]'
    categorie = JSON.parse(categorie)
     let newCategorie = categorie.filter((item)=> {
        if(item.id != tmpForm.id){
            return true
        }return false
    })
    newCategorie.push(tmpForm)
    localStorage.setItem('category', JSON.stringify(newCategorie))
    navigate('/parametres')
  }

    return(
        <>
        <Container>
        <Row>
          <Col>
            <h1>Modifier une catégorie</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form onSubmit={e => update(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Titre de la catégorie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le nom de la catégorie"
                  value={formUpdate.title}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.title = e.target.value
                    setFormUpdate(tmp)
                  }}
                  required
                />
              
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
        
        </>
    )
}