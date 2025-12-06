const STORAGE_KEY = "dumpi-registros";
import Cl_mDatos from "./Cl_mDatos.js";
export default class Cl_mRegistro {
    constructor() {
        this.datos = [];
        const guardados = localStorage.getItem(STORAGE_KEY);
        if (guardados) {
            const lista = JSON.parse(guardados);
            this.datos = lista.map(d => new Cl_mDatos(d));
        }
    }
    agregarRegistro({ datos, callback, }) {
        const error = datos.error();
        if (error) {
            callback(error);
            return;
        }
        const existe = this.datos.find(d => d.referencia === datos.referencia);
        if (existe) {
            callback("La referencia ya está registrada.");
            return;
        }
        this.datos.push(datos);
        // guardamos SIEMPRE con la misma clave
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    listarRegistro() {
        return this.datos.map(d => d.toJSON());
    }
    // Buscar por referencia (devuelve el modelo o undefined)
    buscarPorReferencia(referencia) {
        return this.datos.find(d => d.referencia === referencia);
    }
    // Editar un registro existente
    editarRegistro({ datosActualizados, callback, }) {
        const existenteIndex = this.datos.findIndex(d => d.referencia === datosActualizados.referencia);
        if (existenteIndex === -1) {
            callback("No existe un registro con esa referencia.");
            return;
        }
        const actualizado = new Cl_mDatos(datosActualizados);
        const error = actualizado.error();
        if (error) {
            callback(error);
            return;
        }
        this.datos[existenteIndex] = actualizado;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    // Eliminar por referencia
    eliminarPorReferencia({ referencia, callback, }) {
        const originalLength = this.datos.length;
        this.datos = this.datos.filter(d => d.referencia !== referencia);
        if (this.datos.length === originalLength) {
            callback("No se encontró un registro con esa referencia.");
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.listarRegistro()));
        callback(false);
    }
}
