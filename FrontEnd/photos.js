// local storage pour les photos ?

let projets = ""
let categories = ""

async function fetchGallery() {
    const worksAPI = await fetch('http://localhost:5678/api/works')
    projets = await worksAPI.json()
}

async function fetchCategories() {
    const categoriesAPI = await fetch('http://localhost:5678/api/categories');
    categories = await categoriesAPI.json();
}


async function displayGallery(filter = projets) {
    const sectionGallery = document.querySelector(".gallery")
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

async function displayFilters() {
    const sectionPortfolio = document.querySelector("#portfolio")
    const filterDiv = document.createElement("div")


    // Filtre "tous"
    const tousButton = document.createElement('button')
    tousButton.innerText = "Tous"
    tousButton.addEventListener('click', () => {
        displayGallery()
    })
    sectionPortfolio.appendChild(tousButton)
    
    // Autres filtres (dynamic)
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]

        const filterButton = document.createElement('button')
        filterButton.innerText=category.name

        filterButton.addEventListener('click', () => {
            const filteredProjects = projets.filter(projet => projet.categoryId === category.id)
            displayGallery(filteredProjects)
        })
        filterDiv.appendChild(filterButton);
    }
    const sectionGallery = document.querySelector(".gallery")
    sectionPortfolio.insertBefore(filterDiv, sectionGallery)
}

async function setup() {
    await fetchGallery()
    await fetchCategories()
    displayFilters()
    displayGallery()
}
setup()
