// Importaciones de modelos y vistas necesarios para el controlador
import Cl_mDatos, { iDatos } from "./Cl_mDatos.js";       // Modelo de datos individuales y su interfaz
import Cl_vRegistro from "./Cl_vRegistro.js";             // Vista para manejar registros
import Cl_mCategoria, { iCategoria } from "./Cl_mCategorias.js"; // Modelo de categorías y su interfaz
import Cl_mRegistro from "./Cl_mRegistro.js";             // Modelo que gestiona múltiples registros
import Cl_vCategoria from "./Cl_vCategoria.js";           // Vista para manejar categorías

// Clase principal que actúa como controlador entre modelos y vistas
export default class Cl_controlador {
  // Propiedades públicas: referencias a modelos y vistas
  public modeloRegistro: Cl_mRegistro;
  public modeloCategoria: Cl_mCategoria;
  public vistaRegistro: Cl_vRegistro;
  public vistaCategoria: Cl_vCategoria;

  // Constructor: recibe instancias de modelos y vistas, y las conecta
  constructor(
    modeloRegistro: Cl_mRegistro,
    vistaRegistro: Cl_vRegistro,
    vistaCategoria: Cl_vCategoria,
    modeloCategoria: Cl_mCategoria
  ) {
    this.modeloRegistro = modeloRegistro;
    this.vistaRegistro = vistaRegistro;
    this.vistaCategoria = vistaCategoria;
    // Si no se pasa un modelo de categoría, se crea uno vacío
    this.modeloCategoria = modeloCategoria ?? new Cl_mCategoria("");

    // Conectar las vistas con el controlador
    this.vistaRegistro._controlador = this;
    this.vistaCategoria._controlador = this;
  }

  /** ---------------- CRUD de registros ---------------- */

  // Agregar un nuevo registro validando primero los datos
  agregarRegistro({
    registroData,
    callback,
  }: {
    registroData: iDatos;
    callback: (error: string | false) => void;
  }): void {
    const nuevoDato = new Cl_mDatos(registroData); // Crear instancia de datos
    const error = nuevoDato.error();               // Validar datos
    if (error) {
      callback(error); // Si hay error, se devuelve al callback
      return;
    }
    // Si no hay error, se agrega al modelo de registros
    this.modeloRegistro.agregarRegistro({ datos: nuevoDato, callback });
  }

  // Listar todos los registros almacenados
  datosRegistrados(): iDatos[] {
    return this.modeloRegistro.listarRegistro();
  }

  // Editar un registro existente, identificado por referencia
  editarTransaccion(
    referencia: number,
    cambios: Partial<iDatos>,
    callback: (error: string | false) => void
  ): void {
    this.modeloRegistro.editarRegistro(referencia, cambios, callback);
  }

  // Eliminar un registro existente
  eliminarTransaccion(
    referencia: number,
    callback: (error: string | false) => void
  ): void {
    this.modeloRegistro.eliminarRegistro(referencia, callback);
  }

  // Filtrar registros según un texto de búsqueda
  filtrarTransacciones(texto: string): iDatos[] {
    return this.modeloRegistro.filtrarRegistros(texto);
  }

  /** ---------------- Manejo de categorías ---------------- */

  // Agregar una nueva categoría
  agregarCategoria({
    categoriaData,
    callback,
  }: {
    categoriaData: iCategoria;
    callback: (error: string | false) => void;
  }): void {
    this.modeloCategoria.agregarCategoria({
      categoria: new Cl_mCategoria(categoriaData.nombre),
      callback,
    });
  }

  // Listar todas las categorías registradas
  categoriasRegistradas(): iCategoria[] {
    return this.modeloCategoria.listarCategoria();
  }

  // Vaciar todas las categorías existentes y limpiar almacenamiento local
  vaciarCategorias(): void {
    const actuales = this.modeloCategoria.listarCategoria().map(c => c.nombre);
    // Eliminar cada categoría una por una
    actuales.forEach(n =>
      this.modeloCategoria.deleteCategoria({ nombre: n, callback: () => {} })
    );
    // También se borra del localStorage
    localStorage.removeItem("categoria");
  }
}