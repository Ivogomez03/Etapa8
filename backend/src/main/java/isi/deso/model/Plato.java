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
@Table(name = "plato")
public class Plato extends ItemMenu {
    @Column(name = "cant_calorias")
    private int calorias;
    @Column(name = "aptoCeliaco")
    private boolean aptoCeliaco;
    @Column(name = "aptoVegetariano")
    private boolean aptoVegetariano;

    public Plato() {
        super();
    }

    public Plato(String nombre, String descripcion, Categoria categoria, double precio, int calorias,
            boolean aptoCeliaco, boolean aptoVegetariano, boolean aptoVegano, Vendedor vendedor) {
        super(nombre, descripcion, categoria, precio, aptoVegano, vendedor);
        this.calorias = calorias;
        this.aptoCeliaco = aptoCeliaco;
        this.aptoVegetariano = aptoVegetariano;
    }

    @Override
    public double peso(double p) {
        return (1.1 * p);
    }

    @Override
    public boolean esComida() {
        return true;
    }

    @Override
    public boolean esBebida() {
        return false;
    }

    @Override
    public boolean getAptoVegano() {
        return this.aptoVegano;
    }

}
