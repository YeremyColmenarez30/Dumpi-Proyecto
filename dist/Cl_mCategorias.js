export default class Cl_mCategoria {
    constructor(nombre) {
        this._nombre = "";
        this.arrCategoria = [];
        this.nombre = nombre;
    }
    // Mantienes tu set original
    set nombre(nombre) {
        this._nombre = nombre.toLocaleLowerCase().trim();
    }
    get nombre() {
        return this._nombre;
    }
    get ValidarNombre() {
        return this._nombre.length > 0;
    }
    get ValidarCategoria() {
        if (!this.ValidarNombre)
            return "Nombre";
        return true;
    }
    agregarCategoria({ categoria, callback, }) {
        let error = categoria.ValidarCategoria;
        if (!error) {
            callback(error);
            return;
        }
        // Normalizar para comparar
        let nombreNormalizado = this.formatearCategoria(categoria.nombre);
        let existe = this.arrCategoria.find((c) => this.formatearCategoria(c.nombre) === nombreNormalizado);
        if (existe) {
            callback("La categoría ya existe.");
            return;
        }
        // Guardar siempre en plural y con primera letra mayúscula
        categoria._nombre = nombreNormalizado;
        this.arrCategoria.push(categoria);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));
        callback(false);
    }
    listarCategoria() {
        let lista = [];
        this.arrCategoria.forEach((categoria) => {
            lista.push(categoria.toJSON());
        });
        return lista;
    }
    deleteCategoria({ nombre, callback, }) {
        const nombreNormalizado = this.formatearCategoria(nombre);
        let indice = this.arrCategoria.findIndex((c) => this.formatearCategoria(c.nombre) === nombreNormalizado);
        if (indice < 0) {
            callback(`La categoría "${nombre}" no existe.`);
            return;
        }
        this.arrCategoria.splice(indice, 1);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));
        callback(false);
    }
    toJSON() {
        return {
            nombre: this.formatearCategoria(this.nombre),
        };
    }
    /** 🔎 Normalizar: plural + primera letra mayúscula */
    /** Convierte el texto a plural y capitaliza la primera letra */
    formatearCategoria(nombre) {
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
