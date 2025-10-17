import { obtenerBase } from './localstorage.js';
import { listarInformacionUsuario } from "./localstorage.js";

const cerrarSesion = (nombreStorage = "basedefault") => {
  const base = obtenerBase(nombreStorage);
  const idx = base.findIndex((u) => u.logeado === true);
  if (idx === -1) return false; // no hay usuario logeado
  base[idx].logeado = false;
  localStorage.setItem(nombreStorage, JSON.stringify(base));
  return true;
};

cerrarSesion('basedefault');
top.location.href = 'login.html';