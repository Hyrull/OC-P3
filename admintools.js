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

if (token) {
  switchLoginToLogout()
  modeEditionDisplay()
}

// Modale
const modalContainer = document.querySelector('.modal-container')
const modalTrigger = document.querySelectorAll('.modal-trigger')

modalTrigger.forEach(trigger => trigger.addEventListener('click', toggleModal))

function toggleModal () {
  modalContainer.classList.toggle('active')
}
