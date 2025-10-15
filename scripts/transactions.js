window.addEventListener("DOMContentLoaded", function () {
    // ===== ELEMENTOS DEL DOM =====
    const balance = document.getElementById("balance");
    const boton = document.getElementById("agregar"); 
    const tipoDropDown = document.getElementById("tipo");
    const montoInput = document.getElementById("monto");
    const descripcion = document.getElementById("descripcion");

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
            alert("Por favor ingresa un monto válido mayor a 0");
            return false;
        }

        const saldoNuevo = tipo.toLowerCase() === "ingreso"
            ? saldoActual + monto
            : saldoActual - monto;

        if (saldoNuevo < 0) {
            alert("No tienes saldo suficiente para este gasto");
            return false;
        }

        usuario.saldo = parseFloat(saldoNuevo.toFixed(2));
        elemento.textContent = usuario.saldo.toFixed(2);
        localStorage.setItem("basedefault", JSON.stringify(usersBase));

        return true;
    }

    // ===== INGRESAR TRANSACCION A STORAGE =====
    function ingresaTransaccionStorage(tipo, monto, desc) {
        const nuevaTransaccion = {
            tipo: tipo,
            descripcion: desc,
            monto: parseFloat(monto),
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
            alert("Por favor selecciona un tipo de transacción");
            return;
        }

        if (isNaN(montoTransaccion) || parseFloat(montoTransaccion) <= 0) {
            alert("Por favor ingresa un monto válido");
            return;
        }

        if (descripcionTransaccion.trim() === "") {
            alert("Por favor ingresa el detalle de transacción");
            return;
        }

        // Intentar actualizar el saldo
        const exito = actualizarSaldo(balance, montoTransaccion, tipoTransaccion);
        
        if (exito) {
            // Pasar los valores como parámetros
            ingresaTransaccionStorage(tipoTransaccion, montoTransaccion, descripcionTransaccion);
            
            // Limpiar campos
            descripcion.value = "";
            montoInput.value = "";
            tipoDropDown.selectedIndex = 0;
            alert("Transacción registrada exitosamente");
        }
    });

    // ===== INICIALIZAR =====
    cargarSaldoInicial();
});