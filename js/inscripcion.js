const formulario = document.getElementById("formInscripcion");

if (formulario) {
const campoComentarios = document.getElementById("comentarios");
const contadorComentarios = document.getElementById("contadorComentarios");
const botonEnviar = formulario.querySelector('button[type="submit"]');

const camposTexto = [
document.getElementById("nombre"),
document.getElementById("correo"),
document.getElementById("comentarios")
];

function actualizarContador() {
contadorComentarios.textContent = campoComentarios.value.length;
}

function validarNombre() {
const nombre = document.getElementById("nombre");
const valor = nombre.value.trim();
nombre.setCustomValidity(
valor.length >= 3 && /[a-záéíóúüñ]/i.test(valor)
? ""
: "Escribe un nombre válido de al menos 3 caracteres."
);
}

function validarCorreo() {
const correo = document.getElementById("correo");
const valor = correo.value.trim();
correo.setCustomValidity(
/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)
? ""
: "Escribe un correo electrónico válido."
);
}

function validarEdad() {
const edad = document.getElementById("edad");
const valor = Number(edad.value);
edad.setCustomValidity(
edad.value !== "" && Number.isInteger(valor) && valor >= 15 && valor <= 100
? ""
: "La edad debe ser un número entero entre 15 y 100."
);
}

document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("correo").addEventListener("input", validarCorreo);
document.getElementById("edad").addEventListener("input", validarEdad);

campoComentarios.addEventListener("input", actualizarContador);

camposTexto.forEach(campo => {
campo.addEventListener("input", () => {
if (campo.classList.contains("is-invalid")) {
campo.classList.remove("is-invalid");
}
});
});

actualizarContador();

formulario.addEventListener("submit", async function(evento) {
evento.preventDefault();

validarNombre();
validarCorreo();
validarEdad();

formulario.classList.add("was-validated");

if (!formulario.checkValidity()) {
const primerCampoInvalido = formulario.querySelector(":invalid");

if (primerCampoInvalido) {
primerCampoInvalido.focus();
}

if (typeof Swal !== "undefined") {
await Swal.fire({
icon: "warning",
title: "Revisa tus datos",
text: "Completa correctamente los campos obligatorios antes de continuar.",
confirmButtonText: "Revisar",
confirmButtonColor: "#B6F23A",
background: "#1C211D",
color: "#F5F7F2"
});
}

return;
}

const datos = {
nombre: document.getElementById("nombre").value.trim(),
correo: document.getElementById("correo").value.trim(),
edad: Number(document.getElementById("edad").value),
nivel: document.getElementById("nivel").value,
objetivo: document.getElementById("objetivo").value,
programa: document.getElementById("programa").value,
dias: document.getElementById("dias").value,
horario: document.getElementById("horario").value,
comentarios: campoComentarios.value.trim(),
fechaRegistro: new Date().toISOString()
};

try {
localStorage.setItem("fitzoneInscripcion", JSON.stringify(datos));

if (typeof Swal !== "undefined") {
const resultado = await Swal.fire({
icon: "success",
title: "¡Excelente, " + datos.nombre + "!",
html:
"<p>Tu propuesta inicial está preparada.</p>" +
"<p><strong>Programa:</strong> " + datos.programa + "</p>" +
"<p><strong>Objetivo:</strong> " + datos.objetivo + "</p>" +
"<p><strong>Disponibilidad:</strong> " + datos.dias + "</p>" +
"<p>Los datos se guardaron en este navegador.</p>",
confirmButtonText: "Entendido",
confirmButtonColor: "#B6F23A",
background: "#1C211D",
color: "#F5F7F2"
});

if (resultado.isConfirmed) {
formulario.reset();
formulario.classList.remove("was-validated");
actualizarContador();
}
} else {
alert("Tu propuesta se guardó correctamente en este navegador.");
}
} catch (error) {
if (typeof Swal !== "undefined") {
await Swal.fire({
icon: "error",
title: "No se pudieron guardar los datos",
text: "El navegador no permitió guardar la información. Comprueba su configuración e inténtalo de nuevo.",
confirmButtonText: "Entendido",
confirmButtonColor: "#B6F23A",
background: "#1C211D",
color: "#F5F7F2"
});
} else {
alert("No se pudieron guardar los datos en el navegador.");
}
}
});
}