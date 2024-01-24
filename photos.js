// local storage pour les photos ?

let projets = ''
let categories = ''

async function fetchGallery () {
  const worksAPI = await fetch('http://localhost:5678/api/works')
  projets = await worksAPI.json()
}

async function fetchCategories () {
  const categoriesAPI = await fetch('http://localhost:5678/api/categories')
  categories = await categoriesAPI.json()
}

async function displayGallery (filter = projets) {
  const sectionGallery = document.querySelector('.gallery')
  sectionGallery.innerHTML = ''

  for (let i = 0; i < filter.length; i++) {
    const projet = filter[i]

    // DOM - Préparation
    const projetFigure = document.createElement('figure')
    const projetImg = document.createElement('img')
    projetImg.src = projet.imageUrl
    const projetCaption = document.createElement('figcaption')
    projetCaption.innerText = projet.title
    // DOM - Affichage
    sectionGallery.appendChild(projetFigure)
    projetFigure.appendChild(projetImg)
    projetFigure.appendChild(projetCaption)
  }
}

async function displayFilters () {
  // DOM - Préparation (filtres)
  const sectionPortfolio = document.querySelector('#portfolio')
  const filterDiv = document.createElement('div')
  filterDiv.classList.add('filters')

  // Filtre "tous"
  const tousButton = createFilterButton('Tous', null)
  tousButton.classList.add('activefilter')
  filterDiv.appendChild(tousButton)

  // Autres filtres (dynamic)
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const filterButton = createFilterButton(category.name, category.id)
    filterDiv.appendChild(filterButton)
  }

  // Créer un filtre
  function createFilterButton (name, categoryId) {
    const button = document.createElement('button')
    button.innerText = name

    button.addEventListener('click', () => {
      // Retirer classe "activefilter" des autres boutons
      const buttons = filterDiv.querySelectorAll('button')
      buttons.forEach(btn => btn.classList.remove('activefilter'))

      // Ajouter la classe au bouton en question
      button.classList.add('activefilter')

      // Comparaison de l'id filtre & id catégorie pour l'image (sauf si "tous")
      const filteredProjects = (name === 'Tous')
        ? projets
        : projets.filter(projet => projet.categoryId === categoryId)
      displayGallery(filteredProjects)
    })
    return button
  }
  // DOM - Affichage (filtres)
  const sectionGallery = document.querySelector('.gallery')
  sectionPortfolio.insertBefore(filterDiv, sectionGallery)
}

async function setup () {
  await fetchGallery()
  await fetchCategories()
  displayFilters()
  displayGallery()
}
setup()
