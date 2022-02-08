import { useState, React } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


function CreationCarnet() {

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
      

    let carnet = localStorage.getItem('carnet')
    if (carnet === null) carnet = '[]'
    carnet = JSON.parse(carnet)
    carnet.push(tmpForm)
    localStorage.setItem('carnet', JSON.stringify(carnet))
    navigate('/')
  }

    return (

      <div>

      <Container>
        <Row>
          <Col>
            <h1>Ajouter un Carnet</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form onSubmit={e => add(e)}>
              <Form.Group className="mb-3">
                <Form.Label className="title-carnet">Titre</Form.Label>
                <Form.Control
                className="text-note"
                  type="text"
                  placeholder="Entrer un titre"
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


export default CreationCarnet;