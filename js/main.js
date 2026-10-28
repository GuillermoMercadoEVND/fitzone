document.addEventListener("DOMContentLoaded", function() {
const cuerpo = document.body;
const claveTema = "fitzoneTema";

function aplicarTema(tema) {
const temaClaro = tema === "claro";
cuerpo.classList.toggle("light-theme", temaClaro);

document.querySelectorAll(".theme-toggle").forEach(function(boton) {
boton.innerHTML = temaClaro
? '<i class="fa-solid fa-moon"></i>'
: '<i class="fa-solid fa-sun"></i>';

boton.setAttribute("aria-label", temaClaro ? "Activar tema oscuro" : "Activar tema claro");
boton.setAttribute("title", temaClaro ? "Activar tema oscuro" : "Activar tema claro");
});

const metaColor = document.querySelector('meta[name="theme-color"]');

if (metaColor) {
metaColor.setAttribute("content", temaClaro ? "#F4F6F0" : "#101210");
}
}

let temaGuardado = "oscuro";

try {
temaGuardado = localStorage.getItem(claveTema) || "oscuro";
} catch (error) {
console.warn("No se pudo recuperar la preferencia de tema.");
}

aplicarTema(temaGuardado);

document.querySelectorAll(".theme-toggle").forEach(function(boton) {
boton.addEventListener("click", function() {
const nuevoTema = cuerpo.classList.contains("light-theme") ? "oscuro" : "claro";
aplicarTema(nuevoTema);

try {
localStorage.setItem(claveTema, nuevoTema);
} catch (error) {
console.warn("No se pudo guardar la preferencia de tema.");
}
});
});

const elementosAnimados = document.querySelectorAll(
".benefit-card, .program-card, .health-card, .program-step, .health-habit"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
elementosAnimados.forEach(function(elemento) {
elemento.classList.add("reveal-pending");
});

const observador = new IntersectionObserver(function(entradas, observer) {
entradas.forEach(function(entrada) {
if (entrada.isIntersecting) {
entrada.target.classList.add("reveal-visible");
observer.unobserve(entrada.target);
}
});
}, {
threshold: 0.12
});

elementosAnimados.forEach(function(elemento) {
observador.observe(elemento);
});
} else {
elementosAnimados.forEach(function(elemento) {
elemento.classList.add("reveal-visible");
});
}

document.querySelectorAll("[data-current-year]").forEach(function(elemento) {
elemento.textContent = new Date().getFullYear();
});

document.querySelectorAll(".navbar-fitzone .nav-link").forEach(function(enlace) {
enlace.addEventListener("click", function() {
const menu = enlace.closest(".navbar-collapse");

if (menu && menu.classList.contains("show") && window.bootstrap) {
window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
}
});
});
});
