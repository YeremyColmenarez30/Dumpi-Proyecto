import Cl_mDatos from "./Cl_mDatos.js";
/**
 * Clase Cl_mRegistro
 * Se encarga de manejar la colección de registros (Cl_mDatos),
 * incluyendo la carga inicial desde localStorage, la validación,
 * el almacenamiento y la conversión a objetos planos.
 */
export default class Cl_mRegistro {
    /**
     * Constructor de la clase Cl_mRegistro.
     * Al iniciar, intenta cargar los registros guardados en localStorage.
     */
    constructor() {
        this.datos = []; // Lista interna de registros
        // 🔎 Recuperar datos guardados en localStorage bajo la clave "agenda"
        let guardados = localStorage.getItem("datos");
        if (guardados) {
            // Convertir el JSON a objetos iDatos y luego instanciarlos como Cl_mDatos
            let lista = JSON.parse(guardados);
            this.datos = lista.map(d => new Cl_mDatos(d));
        }
    }
    /**
     * Método para agregar un nuevo registro.
     * @param datos - El objeto Cl_mDatos a agregar.
     * @param callback - Función de retorno para manejar errores o éxito.
     */
    agregarRegistro({ datos, callback, }) {
        // 🔎 Validar el registro usando el método central de Cl_mDatos
        let error = datos.error();
        if (error) {
            callback(error);
            return;
        }
        // 🔎 Validar duplicados por referencia (no se permiten referencias repetidas)
        let existe = this.datos.find(d => d.referencia === datos.referencia);
        if (existe) {
            callback("La referencia ya está registrada.");
            return;
        }
        // 🔎 Guardar en memoria y persistir en localStorage
        this.datos.push(datos);
<<<<<<< HEAD
        localStorage.setItem("datos", JSON.stringify(this.listarRegistro()));
=======
        localStorage.setItem("registro", JSON.stringify(this.listarRegistro()));
>>>>>>> 3049ed2e76a932db3cc5f67271ccd426ed426338
        // 🔎 Notificar éxito
        callback(false);
    }
    /**
     * Método para listar todos los registros.
     * @returns Un arreglo de objetos iDatos (JSON plano).
     */
    listarRegistro() {
        // 🔎 Convertimos los objetos Cl_mDatos a JSON plano usando toJSON()
        return this.datos.map(d => d.toJSON());
    }
}
