import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { NotesProvider } from './../../providers/NotesProvider'

export default function ModificationNote() {
  const [note, setNote] = useState({})
  const [titre, setTitre] = useState([])
   const showdown  = require('showdown')
  const converter = new showdown.Converter()
  const [html, setHtml] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [formUpdate, setFormUpdate] = useState({
    id: '',
    titre:'',
    note: '',
    categorieId: ''
  })

  const notesProviders = new NotesProvider()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let tmpNote = notesProviders.getNoteById(id)

    if (!tmpNote) {
      alert('note non trouvé dans la base')
      navigate('/')
    } else {
      setNote(tmpNote)
      setFormUpdate(tmpNote)
    }

  }, [id, navigate])

  useEffect(() => {
    let data = localStorage.getItem('carnet')
        ? localStorage.getItem('carnet')
        : '[]'
    data = JSON.parse(data)
    setTitre(data)
}, [])




let displayCarnet = note.idCarnet !== undefined ?   
    <Container>
          <Button onClick={(e) => update(e)} className="button-notes">Enregistrer</Button>        
          <Button variant="outline-secondary"
              className="float-end mx-2"
              type="reset" 
              onClick={() => navigate('/page-note/' + note.idCarnet)} className="button-notes">Annuler</Button>        
    </Container> : ''

    function update(e) {
    e.preventDefault()
    let res = notesProviders.update(formUpdate)
    if (res) navigate('/page-note/' + note.idCarnet)
    else alert("Erreur lors de l'enregistrement")
  }

useEffect(() => {

  let datas = localStorage.getItem('category')
  ? localStorage.getItem('category')
  : '[]'
  datas = JSON.parse(datas)
  setCategorie(datas)
  console.log(datas)

},[])

useEffect(()=>{
     setHtml(converter.makeHtml(formUpdate.note))  
}, [formUpdate])

let displayOption = categorie.map((category) =>{
  return(

      <option value={category.id}>{category.title}</option>

  )})

  return (


    <>
      <Container>
        <Row>
          <Col>
            <h1>Modifier une note</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={6}>
            <Form onSubmit={e => update(e)}>
              <Form.Group className="mb-3">
                <Form.Label className="title-card" >Titre</Form.Label>
                <Form.Control
                className=""
                  type="text"
                  placeholder="Modifier le titre de la note"
                  value={formUpdate.titre}
                  onChange={e => {
                    let tmp = { ...formUpdate }
                    tmp.titre = e.target.value
                    setFormUpdate(tmp)
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <textarea
                className="textarea-note"
                onChange={e => {
                  let tmp = { ...formUpdate }
                  tmp.note = e.target.value
                  setFormUpdate(tmp)
                }}
                required
                type="text"
                placeholder="Modifier le contenu de la note"
                value={formUpdate.note}
              ></textarea>
              </Form.Group>

                <p></p>
                <Form.Group className="mb-3">
                <Form.Label>Catégorie</Form.Label>
                <Form.Select onChange={e => {
                    let tmp = { ...formUpdate }
                    console.log(e.target.value)
                    tmp.categorieId = e.target.value
                    setFormUpdate(tmp)}}>
                  <option>open le select</option>
                  {displayOption}
                 </Form.Select>
                </Form.Group>
              <hr />

              {displayCarnet}
            </Form>
          </Col>
        </Row>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Container>
    </>
  )
}