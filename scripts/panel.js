import {
  inicializarBase,
  obtenerBase,
  listarInformacionUsuario,
} from "./localstorage.js";

// inicializar base del localstorage
inicializarBase("basedefault");
// inicializar localstorage para poder trabajar
const base = obtenerBase("basedefault");
//guarda estado de inicio de sesion
const sesionActiva = base.find((u) => u.logeado === true);
// se valida que tenga sesion activa
if (sesionActiva === undefined) {
  location.href = "/login.html";
}


// obtener la base del localstorage
let datos = listarInformacionUsuario();

const lista = document.getElementById("lista-transacciones");

// funciona para convertir el formato de fecha a uno legible
const convertirFecha = (fecha) => {
  const date = new Date(fecha);

  // nombres de meses en español
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // obtener día y mes
  const dia = date.getDate();
  const mes = meses[date.getMonth()];

  const fechaConvertida = `${dia} ${mes}`;
  return fechaConvertida;
};

// funcion para renderizar las transacciones en el DOM
export const dibujarTransacciones = (base, elemento, tipoDeTransaccion) => {
  // limpiamos el div contenedor
  elemento.innerHTML = "";
  datos = listarInformacionUsuario()
  let totalIngresos = 0;

  for (const transaccion of base.transacciones) {
    if (transaccion.tipo === "ingreso") {
      totalIngresos += transaccion.monto;
    }
  }

  // se recorren las transacciones del objeto
  base.transacciones.forEach((t) => {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm";

    // signo y color según tipo
    const color = t.tipo === "ingreso" ? "text-green-600" : "text-red-600";
    const signo = t.tipo === "ingreso" ? "+" : "-";

    // se injectan los elementos en el div creado
    div.innerHTML = `
        <div class="text-gray-700 font-medium">${convertirFecha(t.fecha)} - ${
      t.descripcion
    }</div>
      `;

    // se decide por medio del tipo de transaccion si se va a mostrar el % de gasto
    if (tipoDeTransaccion === "egreso") {
      const obtenerPorcentaje = (t.monto / totalIngresos) * 100;
      div.innerHTML += `
        <div class="${color} font-medium">${signo} ${t.monto.toFixed(
        2
      )} <span class="bg-red-400 text-white text-xs p-1 rounded-md font-normal">(${obtenerPorcentaje.toFixed(
        2
      )}%)</span></div>
      `;
    } else {
      div.innerHTML += `
        <span class="${color} font-medium">${signo} ${t.monto.toFixed(2)}</span>
      `;
    }

    // se decide que elementos se van a injectar en el div contenedor segun el tipo transaccion
    if (t.tipo === tipoDeTransaccion) elemento.appendChild(div);
  });
};

// se inicializa el primer renderizado de las transacciones
dibujarTransacciones(datos, lista, "ingreso");

// se agrega el evento al boton ingreso
const buttonIngresos = document.getElementById("ingresos-button");

buttonIngresos.addEventListener("click", function () {
  buttonIngresos.classList.add("bg-slate-800", "text-white");
  buttonIngresos.classList.remove("bg-gray-200", "text-gray-700");
  buttonEgresos.classList.remove("bg-slate-800", "text-white");
  buttonEgresos.classList.add("bg-gray-200", "text-gray-700");

  dibujarTransacciones(datos, lista, "ingreso");

});

// se agrega el evento egreso
const buttonEgresos = document.getElementById("egresos-button");

buttonEgresos.addEventListener("click", function () {
  buttonEgresos.classList.add("bg-slate-800", "text-white");
  buttonEgresos.classList.remove("bg-gray-200", "text-gray-700");
  buttonIngresos.classList.remove("bg-slate-800", "text-white");
  buttonIngresos.classList.add("bg-gray-200", "text-gray-700");


  dibujarTransacciones(datos, lista, "egreso");

});