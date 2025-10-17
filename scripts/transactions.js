import { dibujarTransacciones } from "./panel.js";
import { listarInformacionUsuario } from "./localstorage.js";

window.addEventListener("DOMContentLoaded", function () {
    // ===== ELEMENTOS DEL DOM (Consolidated from both) =====
    const balance = document.getElementById("balance"); // Balance de saldo total
    const boton = document.getElementById("agregar"); // Botón agregar transacción
    const tipoDropDown = document.getElementById("tipo"); // Tipo de transacción Dropdown
    const montoInput = document.getElementById("monto"); // Monto de transacción Input
    const descripcion = document.getElementById("descripcion"); // Descripción de transacción Input
    
    // Elements added/used by Person A's new functionality (calculating totals)
    const totalIngresos = document.getElementById("total-ingresos"); // Total de ingresos display
    const totalEgresos = document.getElementById("total-egresos"); // Total de egresos display
    const porcentajeGastos = document.getElementById("porcentaje-gastos"); // Porcentaje de gastos display
    const buttonIngresos = document.getElementById("ingresos-button");
    const buttonEgresos = document.getElementById("egresos-button");

    // ===== FUNCIÓN PARA CALCULAR Y MOSTRAR TOTALES (Added by Person A - CRUCIAL) =====
    function calcularTotales() {
        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);

        if (!usuario) {
            console.error("No hay usuario logeado");
            return;
        }

        // Calcular suma de ingresos
        const sumaIngresos = usuario.transacciones
            .filter(t => t.tipo === "ingreso")
            .reduce((acc, t) => acc + parseFloat(t.monto), 0);

        // Calcular suma de egresos
        const sumaEgresos = usuario.transacciones
            .filter(t => t.tipo === "egreso")
            .reduce((acc, t) => acc + parseFloat(t.monto), 0);

        // Calcular monto disponible (ingresos - egresos)
        const montoDisponible = sumaIngresos - sumaEgresos;

        // Calcular porcentaje de egresos (protección contra división por cero)
        const porcentaje = sumaIngresos > 0 ? (sumaEgresos / sumaIngresos) * 100 : 0;

        // Actualizar el DOM (Se comprueba la existencia de los elementos por si la estructura HTML varía)
        if (totalIngresos) {
            totalIngresos.textContent = `+${sumaIngresos.toFixed(2)}`;
        }

        if (totalEgresos) {
            totalEgresos.textContent = `-${sumaEgresos.toFixed(2)}`;
        }

        if (balance) {
            // El balance principal ahora muestra el monto disponible, no solo el saldo inicial
            balance.textContent = montoDisponible.toFixed(2); 
        }

        if (porcentajeGastos) {
            porcentajeGastos.textContent = `${porcentaje.toFixed(0)}%`;
        }
    }
    
    // ===== CARGAR SALDO INICIAL / INICIALIZACIÓN DE PANTALLA =====
    function cargarSaldoInicial() {
        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);

        if (usuario && balance) {
            // Cargar el saldo actual del usuario en la base, aunque 'calcularTotales' lo sobreescribirá
            // con el monto disponible (ingresos - egresos), que es lo correcto para un presupuesto.
            balance.textContent = parseFloat(usuario.saldo).toFixed(2);
        }

        // Calcular y mostrar totales después de cargar el saldo/datos.
        calcularTotales();
    }

    // ===== FUNCIÓN PARA ACTUALIZAR SALDO (Lógica de negocio) =====
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

        // Validación de saldo negativo para egresos
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

        // Actualizar el saldo del usuario en la base de datos.
        usuario.saldo = parseFloat(saldoNuevo.toFixed(2));
        elemento.textContent = usuario.saldo.toFixed(2);
        localStorage.setItem("basedefault", JSON.stringify(usersBase));

        return true;
    }

    // ===== FUNCIÓN PARA OBTENER FECHA FORMATEADA =====
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

    // ===== EVENTO CLICK DEL BOTÓN (Manejo de formulario) =====
    boton.addEventListener("click", function (e) {
        e.preventDefault();

        // Obtener valores actuales
        const tipoTransaccion = tipoDropDown.value;
        const montoTransaccion = montoInput.value;
        const descripcionTransaccion = descripcion.value;

        // ===== VALIDACIONES DE FORMULARIO =====
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

        // ===== PROCESO DE TRANSACCIÓN =====
        // 1. Intentar actualizar el saldo (con validación de monto)
        const exito = actualizarSaldo(balance, montoTransaccion, tipoTransaccion);

        if (exito) {
            // 2. Ingresar la transacción al storage
            ingresaTransaccionStorage(tipoTransaccion, montoTransaccion, descripcionTransaccion);
            
            // 3. Recalcular y actualizar los totales en el header
            calcularTotales();
            
            // 4. Actualizar la lista de transacciones usando el tipo de transacción recién agregado
            const datos = listarInformacionUsuario();
            const listaElement = document.getElementById("lista-transacciones");
            dibujarTransacciones(datos, listaElement, tipoTransaccion);
            
            // 5. Limpiar campos del formulario
            descripcion.value = "";
            montoInput.value = "";
            tipoDropDown.selectedIndex = 0; 
            
            // 6. Actualizar la vista global (si existe la función)
            // Esto es útil si otro script (e.g., panel.js) necesita actualizar su vista de tabs.
            if (typeof window.actualizarVistaTransacciones === 'function') {
                window.actualizarVistaTransacciones();
            }
            
            // 7. Mostrar éxito
            Toastify({
                text: "Transacción registrada exitosamente",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            
            // 8. Actualizar el estilo del tab activo para reflejar el tipo de transacción agregada
            // (Esto asume que el usuario quiere ver inmediatamente la lista del tipo que acaba de agregar)
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

    // ===== INICIALIZAR LA APLICACIÓN AL CARGAR EL DOM =====
    cargarSaldoInicial();
});