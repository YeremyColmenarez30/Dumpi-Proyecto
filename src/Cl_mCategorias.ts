// Interfaz que define la estructura mínima de una categoría
export interface iCategoria {
  nombre: string;
}

// Clase que representa una categoría y gestiona un conjunto de ellas
export default class Cl_mCategoria {
  // Nombre interno de la categoría (normalizado)
  private _nombre: string = "";
  // Arreglo interno que almacena todas las categorías creadas
  private arrCategoria: Cl_mCategoria[] = [];

  // Constructor: recibe un nombre y lo asigna usando el setter
  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // Setter: normaliza el nombre a minúsculas y sin espacios
  set nombre(nombre: string) {
    this._nombre = nombre.toLocaleLowerCase().trim();
  }

  // Getter: devuelve el nombre interno
  get nombre(): string {
    return this._nombre;
  }

  // Valida que el nombre no esté vacío
  get ValidarNombre(): boolean {
    return this._nombre.length > 0;
  }

  // Valida la categoría completa: si no hay nombre, devuelve "Nombre"; si está bien, devuelve true
  get ValidarCategoria(): string | true {
    if (!this.ValidarNombre) return "Nombre";
    return true;
  }

  // Agregar una nueva categoría al arreglo
  agregarCategoria({
    categoria,
    callback,
  }: {
    categoria: Cl_mCategoria;
    callback: (error: string | false) => void;
  }): void {
    // Validar la categoría antes de agregar
    let error = categoria.ValidarCategoria;
    if (!error) {
      callback(error);
      return;
    }

    // Normalizar nombre para comparación
    let nombreNormalizado = this.formatearCategoria(categoria.nombre);

    // Verificar si ya existe
    let existe = this.arrCategoria.find(
      (c) => this.formatearCategoria(c.nombre) === nombreNormalizado
    );

    if (existe) {
      callback("La categoría ya existe.");
      return;
    }

    // Guardar siempre en plural y con primera letra mayúscula
    categoria._nombre = nombreNormalizado;

    // Agregar al arreglo interno
    this.arrCategoria.push(categoria);

    // Persistir en localStorage
    localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));

    // Callback sin error
    callback(false);
  }

  // Listar todas las categorías en formato plano (iCategoria)
  listarCategoria(): iCategoria[] {
    let lista: iCategoria[] = [];
    this.arrCategoria.forEach((categoria) => {
      lista.push(categoria.toJSON());
    });
    return lista;
  }

  // Eliminar una categoría por nombre
  deleteCategoria({
    nombre,
    callback,
  }: {
    nombre: string;
    callback: (error: string | false) => void;
  }): void {
    const nombreNormalizado = this.formatearCategoria(nombre);

    // Buscar índice de la categoría
    let indice = this.arrCategoria.findIndex(
      (c) => this.formatearCategoria(c.nombre) === nombreNormalizado
    );

    if (indice < 0) {
      callback(`La categoría "${nombre}" no existe.`);
      return;
    }

    // Eliminar del arreglo
    this.arrCategoria.splice(indice, 1);

    // Actualizar localStorage
    localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));

    // Callback sin error
    callback(false);
  }

  // Convertir la categoría a objeto plano (JSON)
  toJSON(): iCategoria {
    return {
      nombre: this.formatearCategoria(this.nombre),
    };
  }

  /** 🔎 Normalizar: plural + primera letra mayúscula */
  /** Convierte el texto a plural y capitaliza la primera letra */
  private formatearCategoria(nombre: string): string {
    let n = nombre; // ya está en minúsculas y sin espacios gracias al set

    // Quitar acentos
    n = n.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Asegurar plural (terminar en "s")
    if (!n.endsWith("s")) {
      n = n + "s";
    }

    // Capitalizar primera letra
    return n.charAt(0).toUpperCase() + n.slice(1);
  }
}