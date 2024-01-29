// local storage pour les photos ?

let projets = ''
let categories = ''
let apiUrl = ''

// stocker l'url de l'API depuis config.json
async function fetchApiURL () {
  const configResponse = await fetch('./config.json')
  const config = await configResponse.json()
  apiUrl = config.apiUrl
}

// établir la liste pour la gallery (variable "projets")
async function fetchGallery () {
  const worksAPI = await fetch(`${apiUrl}/works`)
  projets = await worksAPI.json()
}

// établir la liste des catégories dynamiquement (variables "categories")
async function fetchCategories () {
  const categoriesAPI = await fetch(`${apiUrl}/categories`)
  categories = await categoriesAPI.json()
}

// affiche la gallery dans le DOM de l'index.
function displayGallery (filter = projets) {
  const sectionGallery = document.querySelector('.gallery')
  sectionGallery.innerHTML = ''

  // boucle display de chaque image
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

// Afficher les différents filtres
function displayFilters () {
  // DOM - Préparation (filtres)
  const sectionPortfolio = document.querySelector('#portfolio')
  const filterDiv = document.createElement('div')
  filterDiv.classList.add('filters')

  // Filtre "tous"
  const tousButton = createFilterButton('Tous', null)
  tousButton.classList.add('activefilter')
  filterDiv.appendChild(tousButton)

  // Autres filtres (dynamiquement) - appelle la fonction createFilterButton x fois
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const filterButton = createFilterButton(category.name, category.id)
    filterDiv.appendChild(filterButton)
  }

  // Création du filtre
  function createFilterButton (name, categoryId) {
    const button = document.createElement('button')
    button.innerText = name

    button.addEventListener('click', () => {
      // Retirer classe "activefilter" des autres boutons
      const buttons = filterDiv.querySelectorAll('button')
      buttons.forEach(btn => btn.classList.remove('activefilter'))

      // Classe ajoutée pour changer la couleur du filtre actif (css)
      button.classList.add('activefilter')

      // Filtre la liste des projets en comparant l'ID de chaque projet à l'ID de la catégorie choisie (sauf si name === tous)
      const filteredProjects = (name === 'Tous')
        ? projets
        : projets.filter(projet => projet.categoryId === categoryId)
      displayGallery(filteredProjects)
    })
    return button
  }
  // DOM - Affichage de la liste de tous les filtres
  const sectionGallery = document.querySelector('.gallery')
  sectionPortfolio.insertBefore(filterDiv, sectionGallery)
}

async function setup () {
  await fetchApiURL()
  await fetchGallery()
  await fetchCategories()
  displayFilters()
  displayGallery()
}

setup()
