package isi.deso.model;

import jakarta.persistence.*;
import java.util.List;

import lombok.Data;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author pablo
 */

@Data
@Entity
@Table(name = "item_menu")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class ItemMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item_menu")
    protected int id;

    @Column(name = "nombre")
    protected String nombre;

    @Column(name = "descripcion")
    protected String descripcion;

    @Column(name = "precio")
    protected double precio;

    @Column(name = "aptoVegano")
    protected boolean aptoVegano;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_categoria", referencedColumnName = "id_categoria")
    protected Categoria categoria;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vendedor", referencedColumnName = "id_vendedor")
    protected Vendedor vendedor;

    @OneToMany(mappedBy = "itemMenu", fetch = FetchType.LAZY)
    private List<ItemsPedido> itemsPedidos;

    @Column(name = "disponible", nullable = false)
    private boolean habilitado;

    public abstract double peso(double p);

    public abstract boolean esComida();

    public abstract boolean esBebida();

    public ItemMenu() {
        this.habilitado = true;
    }

    public ItemMenu(String nombre, String descripcion, Categoria categoria, double precio, boolean aptoVegano,
            Vendedor vendedor) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.aptoVegano = aptoVegano;
        this.vendedor = vendedor;
        this.habilitado = true;
    }

    @Override
    public String toString() {
        String s = (this.getId() + " " + this.getNombre() + " " + this.getDescripcion() + " "
                + this.categoria.toString() + " " + this.getPrecio());
        return s;
    }

    public void printLn() {
        System.out.println(this.toString());
    }

    public boolean getAptoVegano() {
        return this.aptoVegano;
    }

}
