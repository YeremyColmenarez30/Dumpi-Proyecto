// Cl_mDatos.ts
/**
 * Clase para representar un registro de datos.
 */
export default class Cl_mDatos {
    /**
     * Constructor de la clase Cl_mDatos.
     * @param datos - Los datos del registro.
     */
    constructor(datos) {
        this._referencia = 0; // Referencia del registro.
        this._concepto = ""; // Concepto del registro.
        this._categoria = ""; // Categoría del registro.
        this._monto = 0.0; // Monto del registro.
        this._tipo = "cargo"; // Tipo de registro (valor por defecto).
        this._fecha = ""; // Fecha del registro.
        // Asignar los valores de los datos al objeto Cl_mDatos.
        this.referencia = datos.referencia;
        this.concepto = datos.concepto;
        this.categoria = datos.categoria;
        this.monto = datos.monto;
        this.tipo = datos.tipo;
        this.fecha = datos.fecha;
    }
    // Referencia
    /** Setter para la referencia del registro. */
    set referencia(referencia) {
        this._referencia = referencia;
    }
    /** Getter para la referencia del registro. */
    get referencia() {
        return this._referencia;
    }
    // Concepto
    /** Setter para el concepto del registro. */
    set concepto(concepto) {
        this._concepto = concepto.toUpperCase().trim();
    }
    /** Getter para el concepto del registro. */
    get concepto() {
        return this._concepto;
    }
    // Categoría
    /** Setter para la categoría del registro. */
    set categoria(categoria) {
        this._categoria = categoria.trim();
    }
    /** Getter para la categoría del registro. */
    get categoria() {
        return this._categoria;
    }
    // Monto
    /** Setter para el monto del registro. */
    set monto(monto) {
        this._monto = monto;
    }
    /** Getter para el monto del registro. */
    get monto() {
        return this._monto;
    }
    // Tipo (solo cargo o abono)
    /** Setter para el tipo del registro. */
    set tipo(tipo) {
        if (tipo !== "cargo" && tipo !== "abono") {
            throw new Error("Tipo inválido: debe ser 'cargo' o 'abono'");
        }
        this._tipo = tipo;
    }
    /** Getter para el tipo del registro. */
    get tipo() {
        return this._tipo;
    }
    // Fecha
    /** Setter para la fecha del registro. */
    set fecha(fecha) {
        this._fecha = fecha.trim();
    }
    /** Getter para la fecha del registro. */
    get fecha() {
        return this._fecha;
    }
    // Validaciones específicas
    /** Valida que la referencia contenga solo números. */
    get validarReferencia() {
        const referenciaString = this.referencia.toString();
        if (referenciaString.length === 0)
            return false;
        const referenciaRegex = /^[0-9]+$/;
        return referenciaRegex.test(referenciaString);
    }
    /** Valida que el concepto tenga entre 1 y 30 caracteres. */
    get validarConcepto() {
        return this.concepto.length > 0 && this.concepto.length < 30;
    }
    /** Valida que el monto sea mayor a cero. */
    get validarMonto() {
        return this.monto > 0;
    }
    // Método central de validación
    /**
     * Verifica todas las validaciones y devuelve un mensaje de error si alguna falla.
     * @returns Un string con el error o false si no hay errores.
     */
    error() {
        if (!this.validarReferencia)
            return "La referencia debe contener solo números.";
        if (!this.validarConcepto)
            return "El concepto debe tener entre 1 y 30 caracteres.";
        if (!this.validarMonto)
            return "El monto debe ser mayor a cero.";
        return false;
    }
    // Exportar como objeto plano
    /**
     * Convierte el registro en un objeto JSON plano.
     * @returns El objeto iDatos con los valores actuales.
     */
    toJSON() {
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
