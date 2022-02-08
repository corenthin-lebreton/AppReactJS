import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, } from 'react'
import { NotesProvider } from '../../providers/NotesProvider'
import { useEffect } from 'react'



export default function CreationNote() {
    const { id } = useParams();
  const [formAdd, setFormAdd] = useState({
    id: '',
    titre: '',
    note: '',
    idCarnet: id
  })

  
  const showdown  = require('showdown')
  const converter = new showdown.Converter()
  const notesProvider = new NotesProvider();
  const navigate = useNavigate()
  const [carnets, setCarnets] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [html, setHtml] = useState("");
  
  function add(e) {
    e.preventDefault()
    notesProvider.add(formAdd)
    navigate('/')
  }

     useEffect(() => {
         let data = localStorage.getItem('carnet')
         ? localStorage.getItem('carnet')
         : '[]'
        data = JSON.parse(data)
        setCarnets(data)

     }, [])

     let displayTitre = carnets.map((carnet) =>{
        if(parseInt(id) === carnet.id){
            return(
             <h1 key={"titre" + carnet.id}> Ajouter une note au carnet {carnet.title}</h1>
            )
        } 
            console.log(id === carnet.id)
     })


// Passage au ShowDownJS

useEffect(()=>{
   
     setHtml(converter.makeHtml(formAdd.note)) 
    
}, [formAdd])



//Ajout des Catégories
useEffect(()=>{

  let datas = localStorage.getItem('category')
  ? localStorage.getItem('category')
  : '[]'
  datas = JSON.parse(datas)
  setCategorie(datas)
  console.log(datas)
  
},[])

let displayOption = categorie.map((category) =>{
  return(

      <option value={category.id}>{category.title}</option>


  )
})

  return (
    <>
      <Container>
        <Row>
          <Col>
            {displayTitre}
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <p></p>
            <Form onSubmit={e => add(e)}>
              <Form.Group className="text-note">
                <Form.Control
                  type="text"
                  placeholder="Entrer le titre de la note"
                  value={formAdd.titre}
                  onChange={e => {
                    let tmp = { ...formAdd }
                    tmp.titre = e.target.value
                    setFormAdd(tmp)
                  }}
                  required
                />
              </Form.Group>
              <p></p>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <textarea
                className="textarea-note"
                onChange={e => {
                  let tmp = { ...formAdd }
                  tmp.note = e.target.value
                  setFormAdd(tmp)
                }}
                type="text"
                placeholder="Entrer le contenu de la note"
                value={formAdd.note}
              ></textarea>
              </Form.Group>
                <p></p>
              <Form.Group className="mb-3">
                <Form.Label>Catégorie</Form.Label>
                <Form.Select onChange={e => {
                    let tmp = { ...formAdd }
                    console.log(e.target.value)
                    tmp.categorieId = e.target.value
                    setFormAdd(tmp)}}
                    required
                    >
                  <option value ="">open le select</option> 
                  {displayOption}
                 </Form.Select>

              </Form.Group>
              <hr />
              <Button variant="success" type="submit" className="button-notes">
                Enregistrer
              </Button>

                <Button variant="light" className="button-notes" as={Link} to="/">
                Retour
              </Button>



              <Button  as={Link} to="/"
                variant="outline-secondary"
                className="button-notes"
                type="reset"
              >
                Annuler
              </Button>

              
            </Form>
          </Col>
        </Row>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>

      </Container>
    </>
  )
}
