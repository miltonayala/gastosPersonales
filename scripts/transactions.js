window.addEventListener("DOMContentLoaded", function () {
    // ===== ELEMENTOS DEL DOM =====
    const balance = document.getElementById("balance");
    const boton = document.getElementById("agregar");
    const tipoDropDown = document.getElementById("tipo");
    const montoInput = document.getElementById("monto");

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

        // Convertir a número y validar
        const saldoActual = parseFloat(usuario.saldo);
        const monto = parseFloat(saldo);

        if (isNaN(monto) || monto <= 0) {
            alert("Por favor ingresa un monto válido mayor a 0");
            return false;
        }

        // Calcular nuevo saldo según el tipo
        const saldoNuevo = tipo.toLowerCase() === "ingreso" 
            ? saldoActual + monto 
            : saldoActual - monto;

        // Validar que no quede saldo negativo
        if (saldoNuevo < 0) {
            alert("No tienes saldo suficiente para este gasto");
            return false;
        }

        // Actualizar el saldo del usuario
        usuario.saldo = parseFloat(saldoNuevo.toFixed(2));

        // Mostrar en el elemento HTML
        elemento.textContent = usuario.saldo.toFixed(2);

        // Guardar en localStorage
        localStorage.setItem("basedefault", JSON.stringify(usersBase));
        
        return true;
    }

    // ===== EVENTO DEL BOTÓN AGREGAR =====
    boton.addEventListener("click", function() {
        // Obtener valores actuales en el momento del clic
        const tipoTransaccion = tipoDropDown.value;
        const montoTransaccion = montoInput.value;
        
        // console.log("Transacción:", {
        //     tipo: tipoTransaccion,
        //     monto: montoTransaccion
        // });
        
        // Validaciones básicas
        if (tipoTransaccion !== "ingreso" && tipoTransaccion !== "egreso"){
            alert("Por favor selecciona un tipo de transacción");
            return;
        }
        
        if (isNaN(montoTransaccion) || montoTransaccion <= 0) {
            alert("Por favor ingresa un monto válido");
            return;
        }
        
        // Intentar actualizar el saldo
        const exito = actualizarSaldo(balance, montoTransaccion, tipoTransaccion);
        
        // Si se actualizó correctamente, limpiar los campos
        if (exito) {
            montoInput.value = ""; // Limpiar el campo de monto
            tipoDropDown.selectedIndex = 0; // Resetear el dropdown al primer option
            alert("Transaccion registrada exitosamente");
        }
    });

    // ===== INICIALIZAR =====
    cargarSaldoInicial();
});