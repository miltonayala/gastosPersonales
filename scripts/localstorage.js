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
    transacciones: [],
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

// se lista el objeto del usuario con el estado logeado en true
export const listarInformacionUsuario = () => {
  const base = obtenerBase("basedefault");
  const usuarioLogeado = base.find((u) => u.logeado === true);
  return usuarioLogeado;
};

