// Envoi du formulaire de connexion à l'API
function sendLogin (email, password) {
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => {
      if (!response.ok) {
        showError()
        throw new Error('Wrong login combination')
      }
      return response.json()
    })
    .then(data => {
      const token = data.token
      localStorage.setItem('token', token)
      console.log(`Login réussi. token: '${token}'`)
      window.location.href = 'index.html'
    })
    .catch(error => {
      console.error(error)
    })
}
const loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', function () {
  const email = document.querySelector('input[name="email"]').value
  const password = document.querySelector('input[name="password"]').value
  sendLogin(email, password)
})

function showError () {
  const errorSection = document.querySelector('.errorsection')
  errorSection.innerText = 'Combinaison e-mail & mot de passe incorrecte.'
}
