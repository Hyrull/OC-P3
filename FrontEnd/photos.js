// local storage pour les photos ?

// Aller chercher la gallery dans le backend
let projets = ""
async function fetchGallery() {
    const worksAPI = await fetch('http://localhost:5678/api/works')
    const gallery = await worksAPI.json()
    projets = gallery
}

async function displayGallery() {
    await fetchGallery()

    const sectionGallery = document.querySelector(".gallery")
    sectionGallery.innerHTML = ''

    for (let i = 0; i < projets.length; i++) {
        const projet = projets[i]

        const projetFigure = document.createElement('figure')
        const projetImg = document.createElement('img')
        projetImg.src = projet.imageUrl
        const projetCaption = document.createElement('figcaption')
        projetCaption.innerText = projet.title
        // CHECK
        console.log(projet)

        sectionGallery.appendChild(projetFigure)
        projetFigure.appendChild(projetImg)
        projetFigure.appendChild(projetCaption)
    }
}

displayGallery()