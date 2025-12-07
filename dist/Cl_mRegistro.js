import Cl_mDatos from "./Cl_mDatos.js";
/**
 * Modelo de registros: maneja la lista, persistencia en localStorage y análisis financiero.
 */
export default class Cl_mRegistro {
    constructor() {
        this.datos = [];
        // Cargar registros guardados
        const guardados = localStorage.getItem("datos");
        if (guardados) {
            const lista = JSON.parse(guardados);
            // 🔑 Forzar referencia y monto como number al reconstruir
            this.datos = lista.map((d) => new Cl_mDatos(Object.assign(Object.assign({}, d), { referencia: Number(d.referencia), monto: Number(d.monto) })));
        }
    }
    /** Agregar registro */
    agregarRegistro({ datos, callback, }) {
        const error = datos.error();
        if (error) {
            callback(error);
            return;
        }
        if (this.datos.find((d) => d.referencia === datos.referencia)) {
            callback("La referencia ya está registrada.");
            return;
        }
        this.datos.push(datos);
        localStorage.setItem("datos", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    /** Listar registros planos */
    listarRegistro() {
        return this.datos.map((d) => d.toJSON());
    }
    /** Editar */
    editarRegistro(referencia, cambios, callback) {
        const index = this.datos.findIndex((d) => d.referencia === referencia);
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
        const index = this.datos.findIndex((d) => d.referencia === referencia);
        if (index === -1) {
            callback(`No se encontró el registro con referencia: ${referencia}`);
            return;
        }
        this.datos.splice(index, 1);
        localStorage.setItem("datos", JSON.stringify(this.listarRegistro()));
        callback(false);
    }
    /** Filtrar por texto libre */
    filtrarRegistros(texto) {
        const criterio = texto.toLowerCase();
        return this.listarRegistro().filter((d) => d.referencia.toString().includes(criterio) ||
            d.concepto.toLowerCase().includes(criterio) ||
            d.categoria.toLowerCase().includes(criterio) ||
            d.monto.toString().includes(criterio) ||
            d.fecha.toLowerCase().includes(criterio) ||
            d.tipo.toLowerCase().includes(criterio));
    }
    // --- MÉTODOS DE ANÁLISIS ---
    /** Balance general */
    obtenerBalanceAnalisis() {
        const resultado = this.datos.reduce((acc, mov) => {
            if (mov.tipo.toUpperCase() === "ABONO") {
                acc.montoTotalAbonos += mov.monto;
            }
            else if (mov.tipo.toUpperCase() === "CARGO") {
                acc.montoTotalCargos += mov.monto;
            }
            return acc;
        }, { montoTotalAbonos: 0, montoTotalCargos: 0, saldoFinal: 0 });
        resultado.saldoFinal =
            resultado.montoTotalAbonos - resultado.montoTotalCargos;
        return resultado;
    }
    /** Desglose por categoría */
    desglosePorCategoria() {
        const desglose = this.datos.reduce((acc, mov) => {
            if (!acc[mov.categoria]) {
                acc[mov.categoria] = {
                    totalAbonos: 0,
                    totalCargos: 0,
                    diferencial: 0,
                };
            }
            if (mov.tipo.toUpperCase() === "ABONO") {
                acc[mov.categoria].totalAbonos += mov.monto;
            }
            else if (mov.tipo.toUpperCase() === "CARGO") {
                acc[mov.categoria].totalCargos += mov.monto;
            }
            return acc;
        }, {});
        for (const cat in desglose) {
            desglose[cat].diferencial =
                desglose[cat].totalAbonos - desglose[cat].totalCargos;
        }
        return desglose;
    }
    /** Mayor categoría de gasto e ingreso */
    obtenerMayorCategoria() {
        const desglose = this.desglosePorCategoria();
        let mayorGasto = null;
        let mayorIngreso = null;
        for (const nombreCategoria in desglose) {
            const datos = desglose[nombreCategoria];
            if (!mayorGasto || datos.totalCargos > mayorGasto.monto) {
                mayorGasto = { nombre: nombreCategoria, monto: datos.totalCargos };
            }
            if (!mayorIngreso || datos.totalAbonos > mayorIngreso.monto) {
                mayorIngreso = { nombre: nombreCategoria, monto: datos.totalAbonos };
            }
        }
        return { mayorGasto, mayorIngreso };
    }
    /** Filtrado avanzado */
    listarMovimientosFiltrados({ fecha, montoMin, montoMax, referencia, categoria, }) {
        let resultados = this.datos;
        if (categoria === null || categoria === void 0 ? void 0 : categoria.trim()) {
            resultados = resultados.filter((mov) => mov.categoria === categoria);
        }
        if (referencia === null || referencia === void 0 ? void 0 : referencia.trim()) {
            const refLower = referencia.toLowerCase();
            resultados = resultados.filter((mov) => mov.referencia.toString().toLowerCase().includes(refLower));
        }
        if (fecha === null || fecha === void 0 ? void 0 : fecha.trim()) {
            resultados = resultados.filter((mov) => mov.fecha.slice(0, 10) === fecha);
        }
        if (montoMin !== undefined || montoMax !== undefined) {
            resultados = resultados.filter((mov) => {
                const cumpleMin = montoMin === undefined || mov.monto >= montoMin;
                const cumpleMax = montoMax === undefined || mov.monto <= montoMax;
                return cumpleMin && cumpleMax;
            });
        }
        return resultados.map((mov) => mov.toJSON());
    }
}
