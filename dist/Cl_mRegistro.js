import Cl_mDatos from "./Cl_mDatos.js";
/**
 * Modelo de registros: maneja la lista y persistencia en localStorage.
 */
export default class Cl_mRegistro {
    constructor() {
        this.datos = [];
        // Cargar registros guardados
        const guardados = localStorage.getItem("datos");
        if (guardados) {
            const lista = JSON.parse(guardados);
            // 🔑 Forzar referencia y monto como number al reconstruir
            this.datos = lista.map(d => new Cl_mDatos(Object.assign(Object.assign({}, d), { referencia: Number(d.referencia), monto: Number(d.monto) })));
        }
    }
    /** Agregar registro */
    agregarRegistro({ datos, callback }) {
        const error = datos.error();
        if (error) {
            callback(error);
            return;
        }
        if (this.datos.find(d => d.referencia === datos.referencia)) {
            callback("La referencia ya está registrada.");
            return;
        }
        this.datos.push(datos);
        localStorage.setItem("datos", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    /** Listar registros planos */
    listarRegistro() {
        return this.datos.map(d => d.toJSON());
    }
    /** Editar */
    editarRegistro(referencia, cambios, callback) {
        const index = this.datos.findIndex(d => d.referencia === referencia);
        if (index === -1) {
            callback(`No se encontró el registro con referencia: ${referencia}`);
            return;
        }
        Object.assign(this.datos[index], cambios);
        localStorage.setItem("datos", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    /** Eliminar */
    eliminarRegistro(referencia, callback) {
        const index = this.datos.findIndex(d => d.referencia === referencia);
        if (index === -1) {
            callback(`No se encontró el registro con referencia: ${referencia}`);
            return;
        }
        this.datos.splice(index, 1);
        localStorage.setItem("datos", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    /** Filtrar */
    filtrarRegistros(texto) {
        const criterio = texto.toLowerCase();
        return this.listarRegistro().filter(d => d.referencia.toString().includes(criterio) ||
            d.concepto.toLowerCase().includes(criterio) ||
            d.categoria.toLowerCase().includes(criterio) ||
            d.monto.toString().includes(criterio) ||
            d.fecha.toLowerCase().includes(criterio) ||
            d.tipo.toLowerCase().includes(criterio));
    }
}
