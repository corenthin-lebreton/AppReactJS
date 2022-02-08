export class CategorieProvider {
  categories
  constructor() {
    this.categories = this.getCategories()
  }

  save() {
    localStorage.setItem('categorie-data', JSON.stringify(this.categories))
  }

load(){
    let datas = localStorage.getItem('categorie-data')
    if (datas === null) datas  ='[]'
    datas = JSON.parse(datas)
    this.categories = datas
}


  getCategories() {
    let datas = localStorage.getItem('categorie-data')
    datas = JSON.parse(datas)
    return datas
  }

  add(categorie) {
    const id = Date.now()
    let tmp = { ...categorie }
    tmp.id = id
    this.categories.push(tmp)
    this.save()
  }

  update(categorie) {
    const { id } = categorie
    let indice = -1
    for (let i = 0; i < this.categories.length; i++)
      if (this.categories[i].id === Number(id)) indice = i

    if (indice === -1) return false
    this.categories[indice] = categorie
    this.save()
    return true
  }

  remove(categorie) {
    let indice = -1
    for (let i = 0; i < this.categories.length; i++)
      if (this.categories[i].id === Number(categorie.id)) indice = i

    if (indice === -1) return false

    this.categories.splice(indice, 1)
    this.save()
    return true
  }

  getCatById(id) {
    let res = this.categories.filter(categorie => categorie.id === Number(id))
    return res.length === 0 ? false : res[0]
  }
}
