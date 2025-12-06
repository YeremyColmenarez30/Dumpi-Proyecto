// iDatos.ts
/**
 * Interfaz para representar los datos de un registro.
 */
export interface iDatos {
  referencia: number; // Referencia del registro.
  concepto: string;   // Concepto del registro.
  categoria: string;  // Categoría del registro.
  monto: number;      // Monto del registro.
  tipo: "cargo" | "abono"; // Tipo de registro (solo "cargo" o "abono").
  fecha: string;      // Fecha del registro.
}

// Cl_mDatos.ts
/**
 * Clase para representar un registro de datos.
 */
export default class Cl_mDatos {
  private _referencia: number = 0; // Referencia del registro.
  private _concepto: string = "";   // Concepto del registro.
  private _categoria: string = "";  // Categoría del registro.
  private _monto: number = 0.0;     // Monto del registro.
  private _tipo: "cargo" | "abono" = "cargo"; // Tipo de registro (valor por defecto).
  private _fecha: string = "";      // Fecha del registro.

  /**
   * Constructor de la clase Cl_mDatos.
   * @param datos - Los datos del registro.
   */
  constructor(datos: iDatos) {
    // Asignar los valores de los datos al objeto Cl_mDatos.
    this.referencia = datos.referencia;
    this.concepto   = datos.concepto;
    this.categoria  = datos.categoria;
    this.monto      = datos.monto;
    this.tipo       = datos.tipo;
    this.fecha      = datos.fecha;
  }

  // Referencia
  /** Setter para la referencia del registro. */
  set referencia(referencia: number) { 
    this._referencia = referencia; 
  }
  /** Getter para la referencia del registro. */
  get referencia(): number { 
    return this._referencia; 
  }

  // Concepto
  /** Setter para el concepto del registro. */
  set concepto(concepto: string) {
    this._concepto = concepto.toUpperCase().trim(); 
  }
  /** Getter para el concepto del registro. */
  get concepto(): string { 
    return this._concepto; 
  }

  // Categoría
  /** Setter para la categoría del registro. */
  set categoria(categoria: string) {
    this._categoria = categoria.trim(); 
  }
  /** Getter para la categoría del registro. */
  get categoria(): string { 
    return this._categoria; 
  }

  // Monto
  /** Setter para el monto del registro. */
  set monto(monto: number) {
    this._monto = monto; 
  }
  /** Getter para el monto del registro. */
  get monto(): number { 
    return this._monto; 
  }

  // Tipo (solo cargo o abono)
  /** Setter para el tipo del registro. */
  set tipo(tipo: "cargo" | "abono") {
    if (tipo !== "cargo" && tipo !== "abono") {
      throw new Error("Tipo inválido: debe ser 'cargo' o 'abono'");
    }
    this._tipo = tipo; 
  }
  /** Getter para el tipo del registro. */
  get tipo(): "cargo" | "abono" { 
    return this._tipo; 
  }

  // Fecha
  /** Setter para la fecha del registro. */
  set fecha(fecha: string) {
    this._fecha = fecha.trim(); 
  }
  /** Getter para la fecha del registro. */
  get fecha(): string { 
    return this._fecha; 
  }

  // Validaciones específicas
  /** Valida que la referencia contenga solo números. */
  get validarReferencia(): boolean {
    const referenciaString = this.referencia.toString();
    if (referenciaString.length === 0) return false;
    const referenciaRegex = /^[0-9]+$/;
    return referenciaRegex.test(referenciaString);
  }

  /** Valida que el concepto tenga entre 1 y 30 caracteres. */
  get validarConcepto(): boolean {
    return this.concepto.length > 0 && this.concepto.length < 30;
  }

  /** Valida que el monto sea mayor a cero. */
  get validarMonto(): boolean {
    return this.monto > 0;
  }

  /** Valida que la fecha contenga solo números. */
  get validarFecha(): boolean {
    const fechaRegex = /^[0-9]+$/;
    return fechaRegex.test(this._fecha);
  }

  // Método central de validación
  /**
   * Verifica todas las validaciones y devuelve un mensaje de error si alguna falla.
   * @returns Un string con el error o false si no hay errores.
   */
  error(): string | false {
    if (!this.validarReferencia) return "La referencia debe contener solo números.";
    if (!this.validarConcepto) return "El concepto debe tener entre 1 y 30 caracteres.";
    if (!this.validarMonto) return "El monto debe ser mayor a cero.";
    if (!this.validarFecha) return "La fecha debe contener solo números.";
    return false;
  }

  // Exportar como objeto plano
  /**
   * Convierte el registro en un objeto JSON plano.
   * @returns El objeto iDatos con los valores actuales.
   */
  toJSON(): iDatos {
    return {
      referencia: this.referencia,
      concepto: this.concepto,
      categoria: this.categoria,
      monto: this.monto,
      tipo: this.tipo,
      fecha: this.fecha
    };
  }
}