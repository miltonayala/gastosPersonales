import { inicializarBase, listarInformacionUsuario } from "./localstorage.js";

window.addEventListener("DOMContentLoaded", function () {
  inicializarBase("basedefault");
  
  const lista = document.getElementById("lista-transacciones");
  let tipoActual = "ingreso"; // Variable para mantener el tab activo

  const dibujarTransacciones = (tipoDeTransaccion) => {
    const datos = listarInformacionUsuario(); // Obtener datos actualizados
    
    if (!datos) {
      console.error("No hay usuario logeado");
      return;
    }

    lista.innerHTML = "";
    datos.transacciones.forEach((t) => {
      const div = document.createElement("div");
      div.className =
        "flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm";

      // signo y color según tipo
      const color = t.tipo === "ingreso" ? "text-green-600" : "text-red-600";
      const signo = t.tipo === "ingreso" ? "+" : "-";

      div.innerHTML = `
        <span class="text-gray-700 font-medium">${t.descripcion}</span>
        <span class="${color} font-medium">${signo} ${parseFloat(t.monto).toFixed(2)}</span>
      `;

      if (t.tipo === tipoDeTransaccion) lista.appendChild(div);
    });
  };

  // Función para actualizar la vista
  window.actualizarVistaTransacciones = function() {
    dibujarTransacciones(tipoActual);
  };

  dibujarTransacciones("ingreso");

  const buttonIngresos = document.getElementById("ingresos-button");

  buttonIngresos.addEventListener("click", function () {
    tipoActual = "ingreso";
    buttonIngresos.classList.add("bg-slate-800", "text-white");
    buttonIngresos.classList.remove("bg-gray-200", "text-gray-700");
    buttonEgresos.classList.remove("bg-slate-800", "text-white");
    buttonEgresos.classList.add("bg-gray-200", "text-gray-700");

    dibujarTransacciones("ingreso");
  });

  const buttonEgresos = document.getElementById("egresos-button");

  buttonEgresos.addEventListener("click", function () {
    tipoActual = "egreso";
    buttonEgresos.classList.add("bg-slate-800", "text-white");
    buttonEgresos.classList.remove("bg-gray-200", "text-gray-700");
    buttonIngresos.classList.remove("bg-slate-800", "text-white");
    buttonIngresos.classList.add("bg-gray-200", "text-gray-700");

    dibujarTransacciones("egreso");
  });
});
