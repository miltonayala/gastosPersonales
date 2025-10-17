// json base
const basePorDefecto = [
  {
    usuario: "Gerson Borja",
    clave: "12345678",
    saldo: 1000,
    logeado: false,
    transacciones: [
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 500,
        fecha: "2025-10-15 08:50:18"
      },
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 550,
        fecha: "2025-10-14 11:50:18"
      },
      {
        tipo: "egreso",
        descripcion: "Pago de luz",
        monto: 50,
        fecha: "2025-10-10 12:50:18"
      },
    ],
  },
  {
    usuario: "Vladi Alvarez",
    clave: "12345678",
    saldo: 3500,
    logeado: false,
    transacciones: [
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 2500,
        fecha: "2025-10-14 11:50:18"
      },
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 1000,
        fecha: "2025-10-12 11:50:18"
      },
    ],
  },
  {
    usuario: "Victor Velasco",
    clave: "12345678",
    saldo: 5000,
    logeado: false,
    transacciones: [
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 2500,
        fecha: "2025-10-12 11:50:18"
      },
      {
        tipo: "ingreso",
        descripcion: "Salario 2",
        monto: 2500,
        fecha: "2025-10-12 11:50:18"
      }
    ],
  },
  {
    usuario: "milton.ayala",
    clave: "a9f4b2c7", // random password
    saldo: 2000,
    logeado: false,
    transacciones: [
      {
        tipo: "ingreso",
        descripcion: "Freelance Project",
        monto: 1200,
        fecha: "2025-10-16 09:30:00"
      },
      {
        tipo: "egreso",
        descripcion: "Compra de libros",
        monto: 200,
        fecha: "2025-10-17 15:20:00"
      },
      {
        tipo: "egreso",
        descripcion: "Cena",
        monto: 100,
        fecha: "2025-10-18 20:00:00"
      }
    ],
  },
  {
    usuario: "emerson.torres",
    clave: "DAW901",
    saldo: 2050,
    logeado: false,
    transacciones: [
      {
        tipo: "ingreso",
        descripcion: "PAGO DE PLANILLA UDB",
        monto: 1000,
        fecha: "2025-10-15 08:00:00"
      },
      {
        tipo: "ingreso",
        descripcion: "PAGO DE PLANILLA UDB",
        monto: 1000,
        fecha: "2025-10-30 08:00:00"
      },
      {
        tipo: "ingreso",
        descripcion: "TRANSFER365 ABONO R TORRES #123456",
        monto: 50,
        fecha: "2025-10-20 10:15:00"
      },
      {
        tipo: "egreso",
        descripcion: "AMAZON.COM*ORDER #112-3344556",
        monto: 120,
        fecha: "2025-10-21 13:45:00"
      },
      {
        tipo: "egreso",
        descripcion: "TEMU*ONLINE PURCHASE #A987654",
        monto: 80,
        fecha: "2025-10-22 16:30:00"
      },
      {
        tipo: "egreso",
        descripcion: "SUPER SELECTOS*FACTURA #55678",
        monto: 60,
        fecha: "2025-10-23 18:20:00"
      }
    ],
  },
];

// convierte en texto el objeto y lo guarda en localstorage
export const inicializarBase = (nombreStorage) => {
  if (!localStorage.getItem(nombreStorage)) {
    const datos = JSON.stringify(basePorDefecto);
    localStorage.setItem(nombreStorage, datos);
  }
};

//convertir en json
export const obtenerBase = (nombreStorage) => {
  const obtenerLocal = localStorage.getItem(nombreStorage);
  const convertirEnJson = JSON.parse(obtenerLocal);
  return convertirEnJson;
};

export const listarInformacionUsuario = () => {
  const base = obtenerBase("basedefault");
  const usuarioLogeado = base.find((u) => u.logeado === true);
  return usuarioLogeado;
};

