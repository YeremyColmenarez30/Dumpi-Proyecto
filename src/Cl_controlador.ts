import Cl_mDatos, { iDatos } from "./Cl_mDatos.js";
import Cl_vRegistro from "./Cl_vRegistro.js";
import Cl_mCategoria, { iCategoria } from "./Cl_mCategorias.js";
import Cl_mRegistro from "./Cl_mRegistro.js";
import Cl_vCategoria from "./Cl_vCategoria.js";

export default class Cl_controlador {
  public modeloRegistro: Cl_mRegistro;
  public modeloCategoria: Cl_mCategoria;
  public vistaRegistro: Cl_vRegistro;
  public vistaCategoria: Cl_vCategoria;

  constructor(modeloRegistro: Cl_mRegistro, vistaRegistro: Cl_vRegistro, vistaCategoria: Cl_vCategoria, modeloCategoria: Cl_mCategoria) {
    this.modeloRegistro = modeloRegistro;
    this.vistaRegistro = vistaRegistro;
    this.vistaCategoria = vistaCategoria;
    this.modeloCategoria = modeloCategoria ?? new Cl_mCategoria("");

    // Conectar vistas
    this.vistaRegistro._controlador = this;
    this.vistaCategoria._controlador = this;
  }

  /** CRUD de registros */
  agregarRegistro({ registroData, callback }: { registroData: iDatos; callback: (error: string | false) => void }): void {
    const nuevoDato = new Cl_mDatos(registroData);
    const error = nuevoDato.error();
    if (error) {
      callback(error);
      return;
    }
    this.modeloRegistro.agregarRegistro({ datos: nuevoDato, callback });
  }

  datosRegistrados(): iDatos[] {
    return this.modeloRegistro.listarRegistro();
  }

  editarTransaccion(referencia: number, cambios: Partial<iDatos>, callback: (error: string | false) => void): void {
    this.modeloRegistro.editarRegistro(referencia, cambios, callback);
  }

 eliminarTransaccion(referencia: number, callback: (error: string | false) => void): void {
  this.modeloRegistro.eliminarRegistro(referencia, callback);
}

  filtrarTransacciones(texto: string): iDatos[] {
    return this.modeloRegistro.filtrarRegistros(texto);
  }

  /** Categorías */
  agregarCategoria({ categoriaData, callback }: { categoriaData: iCategoria; callback: (error: string | false) => void }): void {
    this.modeloCategoria.agregarCategoria({
      categoria: new Cl_mCategoria(categoriaData.nombre),
      callback,
    });
  }

  categoriasRegistradas(): iCategoria[] {
    return this.modeloCategoria.listarCategoria();
  }

  vaciarCategorias(): void {
    const actuales = this.modeloCategoria.listarCategoria().map(c => c.nombre);
    actuales.forEach(n => this.modeloCategoria.deleteCategoria({ nombre: n, callback: () => {} }));
    localStorage.removeItem("categoria");
  }
}