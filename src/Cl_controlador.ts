import Cl_mDatos, { iDatos } from "./Cl_mDatos.js";
import Cl_vRegistro from "./Cl_vRegistro.js";
import Cl_mRegistro from "./Cl_mRegistro.js";   // 👈 usa tu modelo de colección

export default class Cl_controlador {
  private modelo: Cl_mRegistro;    // en vez de array suelto
  public vista: Cl_vRegistro;

  constructor(vista: Cl_vRegistro) {
    this.vista = vista;
    this.vista.controlador = this;
    this.modelo = new Cl_mRegistro();   // carga desde localStorage dentro del modelo
  }

  agregarRegistro({
    registroData,
    callback,
  }: {
    registroData: iDatos;
    callback: (error: string | false) => void;
  }): void {
    // construir Cl_mDatos a partir de los datos planos
    const nuevoDato = new Cl_mDatos(registroData);

    // delegar en Cl_mRegistro, que valida duplicados + guarda en localStorage
    this.modelo.agregarRegistro({
      datos: nuevoDato,
      callback,
    });
  }

  datosRegistrados(): iDatos[] {
    // siempre pregunta al modelo, que ya está sincronizado con localStorage
    return this.modelo.listarRegistro();
  }
  editarRegistro({
  registroData,
  callback,
}: {
  registroData: iDatos;
  callback: (error: string | false) => void;
}): void {
  this.modelo.editarRegistro({ datosActualizados: registroData, callback });
}

eliminarRegistro({
  referencia,
  callback,
}: {
  referencia: number;
  callback: (error: string | false) => void;
}): void {
  this.modelo.eliminarPorReferencia({ referencia, callback });
}

buscarRegistro(referencia: number): iDatos | undefined {
  const encontrado = this.modelo.buscarPorReferencia(referencia);
  return encontrado ? encontrado.toJSON() : undefined;
}

}
