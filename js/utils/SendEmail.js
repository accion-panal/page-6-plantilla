const formEmail = document.getElementById('form-contact');


formEmail.addEventListener('submit', function(e) {
    e.preventDefault();


let firstName = document.getElementById('nombre');
let receptEmail = document.getElementById('email');
let subject = document.getElementById('sujeto');
let phone = document.getElementById('phone');
let message = document.getElementById('mensaje');


// const data = {
//   receptEmail
// }

fetch("https://formsubmit.co/ajax/fabian.salas.astete@gmail.com", {
  method: "POST",
  headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  body: JSON.stringify({
    Nombre: firstName.value,
    Correo: receptEmail.value,
    Telefono: phone.value,
    Sujeto: subject.value,
    Mensaje: message.value,
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error al enviar correo',error));

})