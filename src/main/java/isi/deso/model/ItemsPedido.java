/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author ivogo
 */
@Getter
@Setter
@Entity
@Table(name = "Items_Pedido")
public class ItemsPedido {

    public ItemsPedido() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_items_pedido", nullable = false)
    private int id_items_pedido;

    @Column
    private int cantidad;

    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_item_menu", referencedColumnName = "id_item_menu")
    private ItemMenu itemMenu;

    public ItemsPedido(int cant, ItemMenu item) {
        this.itemMenu = item;
        this.cantidad = cant;
    }

    public String toString() {
        return this.id_items_pedido + " " + this.itemMenu.toString() + " " + this.cantidad;
    }

    public double getPrecio() {
        return this.itemMenu.getPrecio() * this.cantidad;
    }

}
