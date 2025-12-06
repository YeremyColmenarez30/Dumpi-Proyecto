import Cl_mDatos, { iDatos } from "./Cl_mDatos.js";   // Modelo de datos
import Cl_vRegistro from "./Cl_vRegistro.js";         // Vista de registros
import Cl_mCategoria, { iCategoria } from "./Cl_mCategorias.js"; // Modelo de categorías
import Cl_mRegistro from "./Cl_mRegistro.js";
import Cl_vCategoria from "./Cl_vCategoria.js";

export default class Cl_controlador {
  // Propiedades modelo
  public modeloDatos: Cl_mDatos[] = [];       // Lista de registros
  public modeloRegistro: Cl_mRegistro;     // Manejo de registros
  public modeloCategoria: Cl_mCategoria;      // Manejo de categorías

  // Propiedad vista
  public vistaRegistro: Cl_vRegistro;

  constructor(modeloRegistro: Cl_mRegistro, 
    vista: Cl_vRegistro, 
    VistaCategoria: Cl_vCategoria,
     modeloCategoria: Cl_mCategoria) {
    this.modeloRegistro = modeloRegistro;

    this.vistaRegistro = vista;
    this.modeloCategoria = new Cl_mCategoria(""); // inicializar modelo de categorías
    this.vista.controlador = this;                // Conectar vista con controlador
  }

  /** Agregar un nuevo registro */
  agregarRegistro({
    registroData,
    callback,
  }: {
    registroData: iDatos;
    callback: (error: string | false) => void;
  }): void {
    try {
      const nuevoDato = new Cl_mDatos(registroData);
      const error = nuevoDato.error();

      if (error) {
        callback(error);
        return;
      }

      this.modeloDatos.push(nuevoDato);
      callback(false);
    } catch (e: any) {
      callback(e.message);
    }
  }

  /** Listar registros en formato JSON */
  datosRegistrados(): iDatos[] {
    return this.modeloDatos.map((r) => r.toJSON());
  }

  /** Agregar nueva categoría */
  agregarCategoria({
    categoriaData,
    callback,
  }: {
    categoriaData: iCategoria;
    callback: (error: string | false) => void;
  }): void {
    this.modeloCategoria.agregarCategoria({
      categoria: new Cl_mCategoria(categoriaData.nombre),
      callback: (error: string | false) => {
        callback(error);
      },
    });
  }

  /** Listar categorías */
  categoriasRegistradas(): iCategoria[] {
    return this.modeloCategoria.listarCategoria();
  }
}