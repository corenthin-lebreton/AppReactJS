export class NotesProvider {
  notes
  constructor() {
    this.notes = this.getNotes()
  }

  save() {
    localStorage.setItem('data-note', JSON.stringify(this.notes))
  }

  load() {
    let datas = localStorage.getItem('data-note')
    if (datas === null) datas = '[]'
    datas = JSON.parse(datas)
    this.notes = datas
  }

  getNotes() {
    this.load()
    return this.notes
  }

  add(note) {
    const id = Date.now()
    let tmp = { ...note }
    tmp.id = id
    this.notes.push(tmp)
    this.save()
  }

  update(note) {
    const { id } = note
    let indice = -1
    for (let i = 0; i < this.notes.length; i++)
      if (this.notes[i].id === Number(id)) indice = i

    if (indice === -1) return false
    this.notes[indice] = note
    this.save()
    return true
  }

  remove(note) {
    let indice = -1
    for (let i = 0; i < this.notes.length; i++)
      if (this.notes[i].id === Number(note.id)) indice = i

    if (indice === -1) return false

    this.notes.splice(indice, 1)
    this.save()
    return true
  }

  getNoteById(id) {
    let res = this.notes.filter(note => note.id === Number(id))
    return res.length === 0 ? false : res[0]
  }
}
