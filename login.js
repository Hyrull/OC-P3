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
      }
      return response.json()
    })
    .then(data => {
      const token = data.token
      localStorage.setItem('token', token)
      console.log(`Login réussi. token: '${token}'`)
    })
    .catch(error => {
      console.error('Error during login:', error)
    })
}
const loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', function () {
  const email = document.querySelector('input[name="email"]').value
  const password = document.querySelector('input[name="password"]').value
  sendLogin(email, password)
})

function showError () {
  console.log('Erreur')
}
