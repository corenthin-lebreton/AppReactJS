import React from 'react';
import { Container, Row, Button, Table, Col, Card, ListGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NotesProvider } from './../../providers/NotesProvider'
import { useEffect, useState } from 'react'

const PageCarnetNote = () => {
const { id } = useParams();
 const [notes, setNotes] = useState([])
  const [categories, setCategories] = useState([])
  const noteProvider = new NotesProvider()
const showdown = require('showdown');
const converter = new showdown.Converter()
const navigate = useNavigate()
  useEffect(() => {
    let datas = noteProvider.getNotes()
    setNotes(datas)
  }, [])

  function remove(note) {
    let rep = window.confirm(
      `Etes-vous sur de vouloir supprimer la note ${note.titre} ${note.note}`
    )
    if (rep) {
      noteProvider.remove(note)
      let datas = noteProvider.getNotes()
      setNotes(datas)
    }
  }


  useEffect(()=>{
    let data = localStorage.getItem('category')
         ? localStorage.getItem('category')
         : '[]'
        data = JSON.parse(data)
        setCategories(data)
  }, [])


  let displayNotes = notes.filter((note) => note.idCarnet === id

  ).sort((a, b) => a.titre.localeCompare(b.titre)).map((note, indice) => {
    return (
      <tr key={'note-' + note.id}>
        <td>{indice + 1}</td>
        <td>{note.titre}</td>
        <td>{categories.length > 0 && categories.find((categorie) => +note.categorieId === +categorie.id).title}</td>
         <td dangerouslySetInnerHTML={{ __html: converter.makeHtml(note.note)}}></td>
        <td>
          <Button
            className="button-modif"
          >
            Prévisualiser
          </Button>
        </td>
        <td>
          <Button
            className="button-modif"
            as={Link}
            to={'/modification-note/' + note.id}
            variant="light"
          >
            Modifier
          </Button>
        </td>
        <td>
          <Button
            className="button-modif"
            variant="light"
            onClick={() => remove(note)}
          >
            Supprimer
          </Button>
        </td>
      </tr>
    )
  })

    return (

        <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Gestion des notes</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="mb-3">
              <Button className="button-add" onClick={() => navigate('/creation-note/' + id)}>
                Ajouter une note
              </Button>
            </div>

            <Table className="table-design">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Note</th>
                  <th>Préviualiser</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>{displayNotes}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>


        </div>
    );
};

export default PageCarnetNote;