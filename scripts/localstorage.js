// json base
const basePorDefecto = [
  {
    usuario: "Gerson Borja",
    clave: "12345678",
    saldo: 5000,
    logeado: false,
    transacciones: [
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 408,
      },
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 408,
      },
      {
        tipo: "egreso",
        descripcion: "Salario 1",
        monto: 408,
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
        monto: 408,
      },
      {
        tipo: "ingreso",
        descripcion: "Salario 1",
        monto: 408,
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

export const listarInformacionUsuario = (nombreStorage) => {
  const base = obtenerBase(nombreStorage);
  const usuarioLogeado = base.find((u) => u.logeado === true);
  return usuarioLogeado;
};

