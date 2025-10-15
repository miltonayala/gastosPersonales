import { inicializarBase, listarInformacionUsuario } from "./localstorage.js";

window.addEventListener("DOMContentLoaded", function () {
  inicializarBase("basedefault");
  const datos = listarInformacionUsuario();

  const lista = document.getElementById("lista-transacciones");

  const dibujarTransacciones = (base, elemento, tipoDeTransaccion) => {
    elemento.innerHTML = "";
    base.transacciones.forEach((t) => {
      const div = document.createElement("div");
      div.className =
        "flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm";

      // signo y color según tipo
      const color = t.tipo === "ingreso" ? "text-green-600" : "text-red-600";
      const signo = t.tipo === "ingreso" ? "+" : "-";

      div.innerHTML = `
        <span class="text-gray-700 font-medium">${t.descripcion}</span>
        <span class="${color} font-medium">${signo} ${t.monto.toFixed(2)}</span>
      `;

      if (t.tipo === tipoDeTransaccion) elemento.appendChild(div);
    });
  };

  dibujarTransacciones(datos, lista, "ingreso");

  const buttonIngresos = document.getElementById("ingresos-button");

  buttonIngresos.addEventListener("click", function () {
    buttonIngresos.classList.add("bg-slate-800", "text-white");
    buttonIngresos.classList.remove("bg-gray-200", "text-gray-700");
    buttonEgresos.classList.remove("bg-slate-800", "text-white");
    buttonEgresos.classList.add("bg-gray-200", "text-gray-700");

    dibujarTransacciones(datos, lista, "ingreso");
  });

  const buttonEgresos = document.getElementById("egresos-button");

  buttonEgresos.addEventListener("click", function () {
    buttonEgresos.classList.add("bg-slate-800", "text-white");
    buttonEgresos.classList.remove("bg-gray-200", "text-gray-700");
    buttonIngresos.classList.remove("bg-slate-800", "text-white");
    buttonIngresos.classList.add("bg-gray-200", "text-gray-700");

    dibujarTransacciones(datos, lista, "egreso");
  });
});
