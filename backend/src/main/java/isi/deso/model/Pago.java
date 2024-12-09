/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.model;

import jakarta.persistence.*;

/**
 *
 * @author tobir
 */

@Entity
@Table(name = "pago")
public class Pago {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id_pago", nullable = false)
        protected int id_pago;

        @Column
        protected double monto;

        @Column(name = "metodo_pago")
        @Enumerated(EnumType.STRING)
        protected TipoPago tipoPago;

        @Column(name = "cvu/alias")
        protected String credencial;

        public Pago() {
        }

        public Pago(double monto, TipoPago tipo, String credencial) {
                this.monto = monto;
                this.tipoPago = tipo;
                this.credencial = credencial;
        }

}
