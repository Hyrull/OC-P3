import { displayGallery, displayPreviewGallery, fetchGallery } from './photos.js'
const token = localStorage.getItem('token')

function switchLoginToLogout () {
  // Remplacer "login" par "logout" + enlever le href
  const logButton = document.getElementById('loginbutton')
  logButton.innerText = 'logout'
  logButton.setAttribute('href', 'javascript:void(0);')

  // Eventlistener du logout
  logButton.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
  })
}

function modeEditionDisplay () {
  // "Mode édition"
  if (token) {
    // Bannière "Mode édition". Icône : FontAwesome
    const headerSlot = document.querySelector('.edit-banner')
    headerSlot.classList.toggle('active')
    const editionIcon = document.createElement('i')
    editionIcon.classList.add('fa-regular', 'fa-pen-to-square')
    const editionText = document.createElement('p')
    editionText.innerText = 'Mode édition'
    headerSlot.appendChild(editionIcon)
    headerSlot.appendChild(editionText)

    // Ajout icône "modifier" à mes projets
    const projetsSlot = document.querySelector('.projets-modifier')
    const modifierText = document.createElement('p')
    modifierText.innerText = 'Modifier'
    const modifierIcon = document.createElement('i')
    modifierIcon.classList.add('fa-regular', 'fa-pen-to-square')
    projetsSlot.appendChild(modifierIcon)
    projetsSlot.appendChild(modifierText)
  }
}

// Modale toggle
const modalContainer = document.querySelector('.modal-container');
const modalTrigger = document.querySelectorAll('.modal-trigger');

modalTrigger.forEach(trigger => trigger.addEventListener('click', toggleModal));

function toggleModal(event) {
  event.preventDefault()
  modalContainer.classList.toggle('active');
}

// Add picture
async function sendPhotoRequest (apiUrl, formData, token) {
  console.log('sendPhotoRequest OK')
  const response = await fetch(`${apiUrl}/works`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  if (response.ok) {
    Promise.all([
      toggleModal(),
      fetchGallery(),
      displayPreviewGallery(),
      displayGallery(),
    ])
    return { success: true, message: 'Photo ajoutée !' }
  }

  console.error('Error:', response.status, response.statusText)
  return { success: false, message: "Erreur de l'envoi" }
}

// Delete picture
async function deletePicture (apiUrl, pictureId, token) {
  const response = await fetch(`${apiUrl}/works/${pictureId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.ok) {
    await fetchGallery()
    displayPreviewGallery()
    displayGallery()
  }

  console.error('Error:', response.status, response.statusText)
  return { success: false, message: 'Erreur de la suppression' }
}

if (token) {
  switchLoginToLogout()
  modeEditionDisplay()
}
export { sendPhotoRequest, deletePicture }
