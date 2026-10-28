document.addEventListener("DOMContentLoaded", function() {
const buscador = document.getElementById("buscarEntrenamiento");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroNivel = document.getElementById("filtroNivel");
const botonLimpiar = document.getElementById("limpiarFiltros");
const contador = document.getElementById("contadorEntrenamientos");
const mensajeVacio = document.getElementById("sinEntrenamientos");
const entrenamientos = Array.from(document.querySelectorAll(".training-item"));

if (!buscador || !filtroCategoria || !filtroNivel || !botonLimpiar || !contador || !mensajeVacio) {
return;
}

function normalizar(texto) {
return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function filtrarEntrenamientos() {
const busqueda = normalizar(buscador.value);
const categoria = filtroCategoria.value;
const nivel = filtroNivel.value;
let visibles = 0;

entrenamientos.forEach(function(elemento) {
const categorias = elemento.dataset.categoria.split(" ");
const niveles = elemento.dataset.nivel.split(" ");
const nombre = normalizar(elemento.dataset.nombre + " " + elemento.textContent);
const coincideCategoria = categoria === "todos" || categorias.includes(categoria);
const coincideNivel = nivel === "todos" || niveles.includes(nivel);
const coincideBusqueda = !busqueda || nombre.includes(busqueda);
const mostrar = coincideCategoria && coincideNivel && coincideBusqueda;

elemento.hidden = !mostrar;

if (mostrar) {
visibles++;
}
});

contador.textContent = visibles === 1
? "Mostrando 1 entrenamiento"
: "Mostrando " + visibles + " entrenamientos";

mensajeVacio.classList.toggle("d-none", visibles !== 0);
}

buscador.addEventListener("input", filtrarEntrenamientos);
filtroCategoria.addEventListener("change", filtrarEntrenamientos);
filtroNivel.addEventListener("change", filtrarEntrenamientos);

botonLimpiar.addEventListener("click", function() {
buscador.value = "";
filtroCategoria.value = "todos";
filtroNivel.value = "todos";
filtrarEntrenamientos();
});

filtrarEntrenamientos();
});