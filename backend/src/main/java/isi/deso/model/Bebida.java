package isi.deso.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author pablo
 */
@Getter
@Setter
@Entity
@Table(name = "bebida")
public class Bebida extends ItemMenu {

    @Column(name = "graduacionAlcohol")
    private double graduacionAlcohol;

    @Column(name = "tamaño")
    private int tamanio;

    public Bebida() {
        super();
    }

    public Bebida(String nombre, String descripcion, Categoria categoria, double precio, int tamanio,
            double graduacionAlcohol, boolean aptoVegano, Vendedor vendedor) {

        super(nombre, descripcion, categoria, precio, aptoVegano, vendedor);
        this.tamanio = tamanio;
        this.graduacionAlcohol = graduacionAlcohol;
    }

    @Override
    public double peso(double p) {
        if (graduacionAlcohol > 0) {
            return ((0.99 * tamanio) * 1.2);
        } else {
            return ((1.04 * tamanio) * 1.2);
        }
    }

    @Override
    public boolean esComida() {
        return false;
    }

    @Override
    public boolean esBebida() {
        return true;
    }

    public boolean aptoVegano() {
        return this.aptoVegano;
    }

    public boolean esBebidaAlcoholica() {
        return this.graduacionAlcohol > 0;
    }

}
