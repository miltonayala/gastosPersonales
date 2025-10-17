import { dibujarTransacciones } from "./panel.js";
import { listarInformacionUsuario } from "./localstorage.js";

window.addEventListener("DOMContentLoaded", function () {
    // ===== ELEMENTOS DEL DOM =====
    const balance = document.getElementById("balance");
    const boton = document.getElementById("agregar");
    const tipoDropDown = document.getElementById("tipo");
    const montoInput = document.getElementById("monto");
    const descripcion = document.getElementById("descripcion");
    const buttonIngresos = document.getElementById("ingresos-button")
    const buttonEgresos = document.getElementById("egresos-button")

    // ===== CARGAR SALDO INICIAL =====
    function cargarSaldoInicial() {
        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);

        if (usuario && balance) {
            balance.textContent = parseFloat(usuario.saldo).toFixed(2);
        }
    }

    // ===== FUNCIÓN PARA ACTUALIZAR SALDO =====
    function actualizarSaldo(elemento, saldo, tipo) {
        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);

        if (!usuario) {
            console.error("No hay usuario logeado");
            return false;
        }

        const saldoActual = parseFloat(usuario.saldo);
        const monto = parseFloat(saldo);

        if (isNaN(monto) || monto <= 0) {
            Toastify({
                text: "Por favor ingresa un monto válido mayor a 0",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                },
            }).showToast();
            return false;
        }

        const saldoNuevo = tipo.toLowerCase() === "ingreso"
            ? saldoActual + monto
            : saldoActual - monto;

        if (saldoNuevo < 0) {
            Toastify({
                text: "No tienes saldo suficiente para este gasto",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                },
            }).showToast();

            return false;
        }

        usuario.saldo = parseFloat(saldoNuevo.toFixed(2));
        elemento.textContent = usuario.saldo.toFixed(2);
        localStorage.setItem("basedefault", JSON.stringify(usersBase));

        return true;
    }

    function obtenerFecha() {
        const fecha = new Date();

        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const segundos = String(fecha.getSeconds()).padStart(2, '0');

        return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }


    // ===== INGRESAR TRANSACCION A STORAGE =====
    function ingresaTransaccionStorage(tipo, monto, desc) {
        const fechaTransac = obtenerFecha();
        const nuevaTransaccion = {
            tipo: tipo,
            descripcion: desc,
            monto: parseFloat(monto),
            fecha: fechaTransac
        };

        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);

        usuario.transacciones.push(nuevaTransaccion);
        localStorage.setItem("basedefault", JSON.stringify(usersBase));
    }

    // ===== EVENTO CLICK DEL BOTÓN =====
    boton.addEventListener("click", function (e) {
        e.preventDefault();

        // Obtener valores actuales
        const tipoTransaccion = tipoDropDown.value;
        const montoTransaccion = montoInput.value;
        const descripcionTransaccion = descripcion.value;

        // Validaciones
        if (tipoTransaccion !== "ingreso" && tipoTransaccion !== "egreso") {
            Toastify({
                text: "Por favor selecciona un tipo de transacción",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                },
            }).showToast();
            return;
        }

        if (isNaN(montoTransaccion) || parseFloat(montoTransaccion) <= 0) {
            Toastify({
                text: "Por favor ingresa un monto válido",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                },
            }).showToast();
            return;
        }

        if (descripcionTransaccion.trim() === "") {
            Toastify({
                text: "Por favor ingresa el detalle de transacción",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                },
            }).showToast();
            return;
        }

        // Intentar actualizar el saldo
        const exito = actualizarSaldo(balance, montoTransaccion, tipoTransaccion);

        if (exito) {
            // Pasar los valores como parámetros
            ingresaTransaccionStorage(tipoTransaccion, montoTransaccion, descripcionTransaccion);
            const datos = listarInformacionUsuario()
            const lista = document.getElementById("lista-transacciones");
            dibujarTransacciones(datos, lista, tipoTransaccion)
            // Limpiar campos
            descripcion.value = "";
            montoInput.value = "";
            tipoDropDown.selectedIndex = 0;

            Toastify({
                text: "Transacción registrada exitosamente",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            if (tipoTransaccion === "egreso") {
                buttonEgresos.classList.add("bg-slate-800", "text-white");
                buttonEgresos.classList.remove("bg-gray-200", "text-gray-700");
                buttonIngresos.classList.remove("bg-slate-800", "text-white");
                buttonIngresos.classList.add("bg-gray-200", "text-gray-700");
            } else {
                buttonIngresos.classList.add("bg-slate-800", "text-white");
                buttonIngresos.classList.remove("bg-gray-200", "text-gray-700");
                buttonEgresos.classList.remove("bg-slate-800", "text-white");
                buttonEgresos.classList.add("bg-gray-200", "text-gray-700");
            }
        }
    });

    // ===== INICIALIZAR =====
    cargarSaldoInicial();
});