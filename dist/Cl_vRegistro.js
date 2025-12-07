import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vRegistro extends Cl_vGeneral {
    constructor() {
        var _a, _b, _c, _d, _e;
        super({ formName: "formRegistro" });
        // Inputs
        this.inReferencia = document.getElementById("inReferencia");
        this.inConcepto = document.getElementById("inConcepto");
        this.inCategoria = document.getElementById("inCategoria");
        this.inMonto = document.getElementById("inMonto");
        this.inFecha = document.getElementById("inFecha");
        // Botones
        this.btRegistrar = document.getElementById("btRegistrar");
        this.btCancelar = document.getElementById("btCancelar");
        this.btEditar = document.getElementById("btEditar");
        this.btEliminar = document.getElementById("btEliminar");
        this.btFiltrar = document.getElementById("btFiltrar");
        // Tabla
        this.tbody = document.getElementById("divDatosRegistrados");
        // Eventos
        (_a = this.btRegistrar) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.agregarRegistro());
        (_b = this.btCancelar) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.cancelar());
        (_c = this.btEditar) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.editRegistro());
        (_d = this.btEliminar) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => this.eliminarRegistro());
        (_e = this.btFiltrar) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => this.filtrarRegistros());
        // Mostrar registros al iniciar
        this.mostrarDatosRegistrados();
    }
    /** Mostrar registros en la tabla */
    mostrarDatosRegistrados(lista) {
        var _a, _b;
        if (!this.tbody)
            return;
        this.tbody.innerHTML = "";
        const datos = (_b = lista !== null && lista !== void 0 ? lista : (_a = this._controlador) === null || _a === void 0 ? void 0 : _a.datosRegistrados()) !== null && _b !== void 0 ? _b : [];
        for (let d of datos) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${d.referencia}</td>
        <td>${d.concepto}</td>
        <td>${d.monto}</td>
        <td>${d.fecha}</td>
        <td>${d.categoria}</td>
        <td>${d.tipo}</td>
      `;
            // Al hacer clic en la fila, cargar datos al formulario
            tr.addEventListener("click", () => {
                this.inReferencia.value = d.referencia.toString();
                this.inConcepto.value = d.concepto;
                this.inMonto.value = d.monto.toString();
                this.inFecha.value = d.fecha;
                this.inCategoria.value = d.categoria;
                document.getElementById("RegistroFormDat_cargo").checked = d.tipo === "cargo";
                document.getElementById("RegistroFormDat_abono").checked = d.tipo === "abono";
            });
            this.tbody.appendChild(tr);
        }
    }
    /** Agregar registro */
    agregarRegistro() {
        var _a, _b, _c, _d, _e;
        const referenciaStr = (_a = this.inReferencia) === null || _a === void 0 ? void 0 : _a.value.trim();
        const referencia = Number(referenciaStr); // 🔑 convertir a número
        const concepto = (_b = this.inConcepto) === null || _b === void 0 ? void 0 : _b.value.trim();
        const categoria = (_c = this.inCategoria) === null || _c === void 0 ? void 0 : _c.value.trim();
        const monto = Number((_d = this.inMonto) === null || _d === void 0 ? void 0 : _d.value);
        const fecha = (_e = this.inFecha) === null || _e === void 0 ? void 0 : _e.value.trim();
        let tipo = "";
        const cargoRadio = document.getElementById("RegistroFormDat_cargo");
        const abonoRadio = document.getElementById("RegistroFormDat_abono");
        if (cargoRadio === null || cargoRadio === void 0 ? void 0 : cargoRadio.checked)
            tipo = "cargo";
        else if (abonoRadio === null || abonoRadio === void 0 ? void 0 : abonoRadio.checked)
            tipo = "abono";
        if (!referenciaStr || isNaN(referencia) || !concepto || !categoria || isNaN(monto) || !fecha || !tipo) {
            alert("Todos los campos son obligatorios y deben ser válidos.");
            return;
        }
        this._controlador.agregarRegistro({
            registroData: { referencia, concepto, categoria, monto, fecha, tipo },
            callback: (error) => {
                var _a;
                if (error)
                    alert(error);
                else {
                    (_a = document.getElementById("formRegistro")) === null || _a === void 0 ? void 0 : _a.reset();
                    this.mostrarDatosRegistrados();
                }
            },
        });
    }
    cancelar() {
        var _a;
        (_a = document.getElementById("formRegistro")) === null || _a === void 0 ? void 0 : _a.reset();
        this.mostrarDatosRegistrados();
    }
    editRegistro() {
        var _a, _b, _c, _d, _e, _f, _g;
        const referenciaStr = (_a = this.inReferencia) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (!referenciaStr) {
            alert("Selecciona primero un registro de la tabla.");
            return;
        }
        const referencia = Number(referenciaStr);
        const cambios = {
            concepto: (_b = this.inConcepto) === null || _b === void 0 ? void 0 : _b.value.trim(),
            categoria: (_c = this.inCategoria) === null || _c === void 0 ? void 0 : _c.value.trim(),
            monto: Number((_d = this.inMonto) === null || _d === void 0 ? void 0 : _d.value),
            fecha: (_e = this.inFecha) === null || _e === void 0 ? void 0 : _e.value.trim(),
            tipo: ((_f = document.getElementById("RegistroFormDat_cargo")) === null || _f === void 0 ? void 0 : _f.checked)
                ? "cargo"
                : ((_g = document.getElementById("RegistroFormDat_abono")) === null || _g === void 0 ? void 0 : _g.checked)
                    ? "abono"
                    : "",
        };
        this._controlador.editarTransaccion(referencia, cambios, (error) => {
            var _a;
            if (error)
                alert(error);
            else {
                (_a = document.getElementById("formRegistro")) === null || _a === void 0 ? void 0 : _a.reset();
                this.mostrarDatosRegistrados();
            }
        });
    }
    eliminarRegistro() {
        var _a;
        const referenciaStr = (_a = this.inReferencia) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (!referenciaStr) {
            alert("Selecciona primero un registro de la tabla.");
            return;
        }
        const referencia = Number(referenciaStr);
        this._controlador.eliminarTransaccion(referencia, (error) => {
            var _a;
            if (error)
                alert(error);
            else {
                (_a = document.getElementById("formRegistro")) === null || _a === void 0 ? void 0 : _a.reset();
                this.mostrarDatosRegistrados();
            }
        });
    }
    filtrarRegistros() {
        var _a;
        const criterio = (_a = document.getElementById("inFiltro")) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (!criterio) {
            this.mostrarDatosRegistrados();
            return;
        }
        const resultados = this._controlador.filtrarTransacciones(criterio);
        this.mostrarDatosRegistrados(resultados);
    }
}
