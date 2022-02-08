import { useState, React } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


function CreationCategorie() {

   const [formAdd, setFormAdd] = useState({
     id:'',
    title :''
  })

    const navigate = useNavigate()

    function add(e) {
    e.preventDefault()
    const id = Date.now()
    let tmpForm = { ...formAdd }
    tmpForm.id = id


    setFormAdd(tmpForm)
      

    let categorie = localStorage.getItem('category')
    if (categorie === null) categorie = '[]'
    categorie = JSON.parse(categorie)
    categorie.push(tmpForm)
    localStorage.setItem('category', JSON.stringify(categorie))
    navigate('/parametres')
  }

    return (

      <div>

      <Container>
        <Row>
          <Col>
            <h1>Ajouter une catégorie</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form onSubmit={e => add(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Titre de la catégorie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le nom de la catégorie"
                  value={formAdd.title}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.title = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
        
    );
};

export default CreationCategorie;