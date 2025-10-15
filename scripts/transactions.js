window.addEventListener("DOMContentLoaded", function () {
    // ===== ELEMENTOS DEL DOM =====
    const balance = document.getElementById("balance"); //balance de saldo total
    const boton = document.getElementById("agregar"); //boton agregar transaccion
    const tipoDropDown = document.getElementById("tipo"); //tipo de transaccion
    const montoInput = document.getElementById("monto"); //monto de transaccion
    const descripcion = document.getElementById("descripcion") //descripcion de transaccion
    const totalIngresos = document.getElementById("total-ingresos"); //total de ingresos
    const totalEgresos = document.getElementById("total-egresos"); //total de egresos
    const porcentajeGastos = document.getElementById("porcentaje-gastos"); //porcentaje de gastos

    // ===== FUNCIÓN PARA CALCULAR TOTALES =====
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

        // Calcular porcentaje de egresos
        const porcentaje = sumaIngresos > 0 ? (sumaEgresos / sumaIngresos) * 100 : 0;

        // Actualizar el DOM
        if (totalIngresos) {
            totalIngresos.textContent = `+${sumaIngresos.toFixed(2)}`;
        }

        if (totalEgresos) {
            totalEgresos.textContent = `-${sumaEgresos.toFixed(2)}`;
        }

        if (balance) {
            balance.textContent = montoDisponible.toFixed(2);
        }

        if (porcentajeGastos) {
            porcentajeGastos.textContent = `${porcentaje.toFixed(0)}%`;
        }
    }

    // ===== CARGAR SALDO INICIAL =====
    function cargarSaldoInicial() {
        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);
        console.log(usuario.transacciones)

        if (usuario && balance) {
            balance.textContent = parseFloat(usuario.saldo).toFixed(2);
        }

        // Calcular y mostrar totales
        calcularTotales();
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

    // ===== INGRESAR TRANSACCION A STORAGE =====
    function ingresaTransaccionStorage() {
        const nuevaTransaccion = {
            tipo: tipoDropDown.value,
            descripcion: descripcion.value,
            monto: montoInput.value,
        };

        const usersBase = JSON.parse(localStorage.getItem("basedefault"));
        const usuario = usersBase.find((u) => u.logeado === true);

        // Hacer push del OBJETO
        usuario.transacciones.push(nuevaTransaccion);

        // ACTUALIZAR LOCALSTORAGE
        localStorage.setItem("basedefault", JSON.stringify(usersBase));
    }

    // ===== EVENTO DEL BOTÓN AGREGAR =====
    boton.addEventListener("click", function () {
        // Obtener valores actuales en el momento del clic
        const tipoTransaccion = tipoDropDown.value;
        const montoTransaccion = montoInput.value;

        // Validaciones básicas
        if (tipoTransaccion !== "ingreso" && tipoTransaccion !== "egreso") {    //valida DropDown
            alert("Por favor selecciona un tipo de transacción");
            return;
        }

        if (isNaN(montoTransaccion) || montoTransaccion <= 0) {                 //valida monto transaccion
            alert("Por favor ingresa un monto válido");
            return;
        }

        if (descripcion.value === "") {
            alert("por favor ingresa el detalle de transaccion")
            return;
        }

        // Intentar actualizar el saldo
        const exito = actualizarSaldo(balance, montoTransaccion, tipoTransaccion);
        ingresaTransaccionStorage();

        // Si se actualizó correctamente, limpiar los campos
        if (exito) {
            descripcion.value = "";
            montoInput.value = ""; // Limpiar el campo de monto
            tipoDropDown.selectedIndex = 0; // Resetear el dropdown al primer option
            
            // Recalcular totales después de agregar transacción
            calcularTotales();
            
            // Actualizar la lista de transacciones si la función existe
            if (typeof window.actualizarVistaTransacciones === 'function') {
                window.actualizarVistaTransacciones();
            }
            
            alert("Transaccion registrada exitosamente");
        }
    });



    // ===== INICIALIZAR =====
    cargarSaldoInicial();
});