import { iDatos } from "./Cl_mDatos.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vRegistro extends Cl_vGeneral {
  private inReferencia!: HTMLInputElement;
  private inConcepto!: HTMLInputElement;
  private inMonto!: HTMLInputElement;
  private inFecha!: HTMLInputElement;
  private inCategoria!: HTMLInputElement;
  private btRegistrar!: HTMLButtonElement;
  private btCancelar!: HTMLButtonElement;
  private btEditar!: HTMLButtonElement;
  private btEliminar!: HTMLButtonElement;
  private btFiltrar!: HTMLButtonElement;
  private tbody!: HTMLTableSectionElement;
  public _controlador: any;

  constructor() {
    super({ formName: "formRegistro" });

    // Inputs
    this.inReferencia = document.getElementById("inReferencia") as HTMLInputElement;
    this.inConcepto   = document.getElementById("inConcepto") as HTMLInputElement;
    this.inCategoria  = document.getElementById("inCategoria") as HTMLInputElement;
    this.inMonto      = document.getElementById("inMonto") as HTMLInputElement;
    this.inFecha      = document.getElementById("inFecha") as HTMLInputElement;

    // Botones
    this.btRegistrar = document.getElementById("btRegistrar") as HTMLButtonElement;
    this.btCancelar  = document.getElementById("btCancelar") as HTMLButtonElement;
    this.btEditar    = document.getElementById("btEditar") as HTMLButtonElement;
    this.btEliminar  = document.getElementById("btEliminar") as HTMLButtonElement;
    this.btFiltrar   = document.getElementById("btFiltrar") as HTMLButtonElement;

    // Tabla
    this.tbody = document.getElementById("divDatosRegistrados") as HTMLTableSectionElement;

    // Eventos
    this.btRegistrar?.addEventListener("click", () => this.agregarRegistro());
    this.btCancelar?.addEventListener("click", () => this.cancelar());
    this.btEditar?.addEventListener("click", () => this.editRegistro());
    this.btEliminar?.addEventListener("click", () => this.eliminarRegistro());
    this.btFiltrar?.addEventListener("click", () => this.filtrarRegistros());

    // Mostrar registros y totales al iniciar
    this.mostrarDatosRegistrados();
    this.actualizarTotales();
  }

  /** Mostrar registros en la tabla */
  mostrarDatosRegistrados(lista?: iDatos[]) {
    if (!this.tbody) return;
    this.tbody.innerHTML = "";
    const datos: iDatos[] = lista ?? this._controlador?.datosRegistrados() ?? [];

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
      tr.addEventListener("click", () => {
        this.inReferencia.value = d.referencia.toString();
        this.inConcepto.value   = d.concepto;
        this.inMonto.value      = d.monto.toString();
        this.inFecha.value      = d.fecha;
        this.inCategoria.value  = d.categoria;
        (document.getElementById("RegistroFormDat_cargo") as HTMLInputElement).checked = d.tipo === "cargo";
        (document.getElementById("RegistroFormDat_abono") as HTMLInputElement).checked = d.tipo === "abono";
      });
      this.tbody.appendChild(tr);
    }
    this.actualizarTotales();
  }

  /** Agregar registro */
  agregarRegistro() {
    const referenciaStr = this.inReferencia?.value.trim();
    const referencia = Number(referenciaStr);
    const concepto   = this.inConcepto?.value.trim();
    const categoria  = this.inCategoria?.value.trim();
    const monto      = Number(this.inMonto?.value);
    const fecha      = this.inFecha?.value.trim();

    let tipo: "cargo" | "abono" | "" = "";
    const cargoRadio = document.getElementById("RegistroFormDat_cargo") as HTMLInputElement;
    const abonoRadio = document.getElementById("RegistroFormDat_abono") as HTMLInputElement;
    if (cargoRadio?.checked) tipo = "cargo";
    else if (abonoRadio?.checked) tipo = "abono";

    if (!referenciaStr || isNaN(referencia) || !concepto || !categoria || isNaN(monto) || !fecha || !tipo) {
      alert("Todos los campos son obligatorios y deben ser válidos.");
      return;
    }

    this._controlador.agregarRegistro({
      registroData: { referencia, concepto, categoria, monto, fecha, tipo },
      callback: (error: string | false) => {
        if (error) alert(error);
        else {
          (document.getElementById("formRegistro") as HTMLFormElement)?.reset();
          this.mostrarDatosRegistrados();
          this.actualizarTotales();
        }
      },
    });
  }

  cancelar() {
    (document.getElementById("formRegistro") as HTMLFormElement)?.reset();
    this.mostrarDatosRegistrados();
    this.actualizarTotales();
  }

  editRegistro() {
    const referenciaStr = this.inReferencia?.value.trim();
    if (!referenciaStr) {
      alert("Selecciona primero un registro de la tabla.");
      return;
    }
    const referencia = Number(referenciaStr);
    const cambios = {
      concepto: this.inConcepto?.value.trim(),
      categoria: this.inCategoria?.value.trim(),
      monto: Number(this.inMonto?.value),
      fecha: this.inFecha?.value.trim(),
      tipo: (document.getElementById("RegistroFormDat_cargo") as HTMLInputElement)?.checked
        ? "cargo"
        : (document.getElementById("RegistroFormDat_abono") as HTMLInputElement)?.checked
        ? "abono"
        : "",
    };

    this._controlador.editarTransaccion(referencia, cambios, (error: string | false) => {
      if (error) alert(error);
      else {
        (document.getElementById("formRegistro") as HTMLFormElement)?.reset();
        this.mostrarDatosRegistrados();
        this.actualizarTotales();
      }
    });
  }

  eliminarRegistro() {
    const referenciaStr = this.inReferencia?.value.trim();
    if (!referenciaStr) {
      alert("Selecciona primero un registro de la tabla.");
      return;
    }
    const referencia = Number(referenciaStr);

    this._controlador.eliminarTransaccion(referencia, (error: string | false) => {
      if (error) alert(error);
      else {
        (document.getElementById("formRegistro") as HTMLFormElement)?.reset();
        this.mostrarDatosRegistrados();
        this.actualizarTotales();
      }
    });
  }

  filtrarRegistros() {
    const criterio = (document.getElementById("inFiltro") as HTMLInputElement)?.value.trim();
    if (!criterio) {
      this.mostrarDatosRegistrados();
      return;
    }
    const resultados: iDatos[] = this._controlador.filtrarTransacciones(criterio);
    this.mostrarDatosRegistrados(resultados);
    this.actualizarTotales();
  }

  /** 🔑 Actualizar recuadros de totales */
  actualizarTotales() {
    const balance = this._controlador?.modeloRegistro?.obtenerBalanceAnalisis();
    if (!balance) return;

    (document.querySelector("#registroAbonos span") as HTMLElement).textContent =
      balance.montoTotalAbonos.toFixed(2);

    (document.querySelector("#registroCargos span") as HTMLElement).textContent =
      balance.montoTotalCargos.toFixed(2);

    (document.querySelector("#registroSaldo span") as HTMLElement).textContent =
      balance.saldoFinal.toFixed(2);
  }
}